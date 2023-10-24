import { driver } from "../../database/driver.js";
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
import Parser from 'rss-parser';

dotenv.config();

export const PodcastMutations = {
	async addPodcast(_, { addPodcastInput: { rssUrl } }, context) {
		const session = driver.session();

		try {
			// Check if podcast exists with rssUrl
			// If so throw error, rssUrls must be unique to each podcast
			const result = await session.run(
				'MATCH (p:Podcast {url: $rssUrl}) RETURN p', { rssUrl }
			);

			if (result && result.records.length > 0) {
				const podcast = result.records[0].get('p').properties;

				if (podcast) {
					throw new GraphQLError(
						'A podcast is already registered with the RSS URL: ' + rssUrl,
						{
							extensions: {
								code: 'PODCAST_ALREADY_EXISTS'
							}
						}
					);
				}
			}

			// Fetch the podcast from the RSS URL
			const parser = new Parser();
			const podcastFeed = await parser.parseURL(rssUrl);
			const lastUpdated = new Date().toISOString();
			const description = podcastFeed.description;

			// Save the podcast
			const createResult = await session.run(
				'CREATE (p:Podcast { id: randomUUID(), title: $title, description: $description, url: $url, image: $image, lastUpdated: datetime($lastUpdated) })  RETURN p',
				{
					title: podcastFeed.title,
					description: description,
					image: podcastFeed.image.url,
					url: rssUrl,
					lastUpdated: lastUpdated
				}
			);

			const podcast = createResult.records[0].get('p').properties;

			// Create a separate thread and save each episode
			const episodes = podcastFeed.items;

			for (let i = 0; i < episodes.length; i++) {
				const episode = episodes[i];
				const releaseDate = new Date(episode.pubDate).toISOString();
				const description = episode.description
					? episode.description 
					: episode.content.encoded
						? episode.content.encoded
						: ""
						;

				console.log(description);

				await session.run(
					'CREATE (e:Episode { id: randomUUID(), title: $title, description: $description, url: $url, image: $image, releaseDate: datetime($releaseDate), duration: $duration })  RETURN e',
					{
						title: episode.title,
						description: description,
						image: episode.itunes.image || podcast.image,
						url: episode.enclosure.url,
						releaseDate: releaseDate,
						duration: episode.itunes.duration || 0
					}
				);
			}

			// Create a relationship between the podcast and the episodes
			await session.run(
				'MATCH (p:Podcast {id: $podcastId}), (e:Episode) WHERE e.url IN $episodeUrls CREATE (p)-[r:HAS_EPISODE]->(e) RETURN p',
				{
					podcastId: podcast.id,
					episodeUrls: episodes.map(episode => episode.enclosure.url)
				}
			);

			return podcast;
		} catch (error) {
			throw new GraphQLError(
				'An error occurred while adding the podcast: ' + error.message,
				{
					extensions: {
						code: 'PODCAST_ADD_ERROR'
					}
				}
			);
		} finally {
			await session.close();
		}
	},
	async updatePodcast(_, { updatePodcastInput: { id } }, context) {
		// Find the podcast by id
		const session = driver.session();

		try {
			// Check if podcast exists with rssUrl
			// If so throw error, rssUrls must be unique to each podcast
			const result = await session.run(
				'MATCH (p:Podcast {id: $id}) RETURN p', { id }
			);

			if (!result || result.records.length == 0) {
					throw new GraphQLError(
						`A podcast does not exist with the id: ${id}`,
						{
							extensions: {
								code: 'PODCAST_DOES_NOT_EXIST'
							}
						}
					);
			}

			const podcast = result.records[0].get('p').properties;

			// If it's lastUpdated date is less than 1 hour ago, return the podcast
			let oneHourAgo = new Date();
			oneHourAgo.setHours(oneHourAgo.getHours() - 1);

			if (podcast.lastUpdated > oneHourAgo.toISOString()) {
				return podcast;
			}

			// Get the latest details from the RSS feed
			const parser = new Parser();
			const podcastFeed = await parser.parseURL(podcast.url);
			const lastUpdated = new Date().toISOString();

			// Check which attributes need to be updated
			// If the title, description, or image have changed, update them
			if (podcast.title != podcastFeed.title || podcast.description != podcastFeed.description || podcast.image != podcastFeed.image.url) {

				// Update the podcast
				await session.run(
					'MATCH (p:Podcast {id: $id}) SET p.title = $title, p.description = $description, p.image = $image, p.lastUpdated = datetime($lastUpdated) RETURN p',
					{
						id: podcast.id,
						title: podcastFeed.title,
						description: podcastFeed.description === '' ? podcastFeed.itunes.summary : podcastFeed.description,
						image: podcastFeed.image.url,
						lastUpdated: lastUpdated
					}
				);
			}

			// For each episode, check if it exists
			const episodes = podcastFeed.items;

			for (let i = 0; i < episodes.length; i++) {
				const feedEpisode = episodes[i];

				const episodeResult = await session.run(
					'MATCH (e:Episode {url: $url}) RETURN e', { url: feedEpisode.enclosure.url }
				);

				if (episodeResult && episodeResult.records.length > 0) {
					const episode = episodeResult.records[0].get('e').properties;
					const releaseDate = new Date(feedEpisode.pubDate).toISOString();

					// If it exists and a field is different, update it
					if (episode
						|| episode.releaseDate != releaseDate
						|| episode.duration != feedEpisode.itunes.duration
						|| episode.title != feedEpisode.title
						|| episode.description != feedEpisode.itunes.summary
						|| episode.image != feedEpisode.itunes.image || podcast.image
					) {
						await session.run(
							'MATCH (e:Episode {id: $id}) SET e.title = $title, e.description = $description, e.url = $url, e.image = $image, e.releaseDate = datetime($releaseDate), e.duration = $duration RETURN e',
							{
								id: episode.id,
								title: feedEpisode.title,
								description: feedEpisode.itunes.summary,
								image: feedEpisode.itunes.image || podcast.image,
								url: feedEpisode.enclosure.url,
								releaseDate: releaseDate,
								duration: feedEpisode.itunes.duration || 0
							}
						);
					}
				} else {
					// If it doesn't exist, create it
					const releaseDate = new Date(feedEpisode.pubDate).toISOString();
					const createResult = await session.run(
						'CREATE (e:Episode { id: randomUUID(), title: $title, description: $description, url: $url, image: $image, releaseDate: datetime($releaseDate), duration: $duration })  RETURN e',
						{
							title: feedEpisode.title,
							description: feedEpisode.itunes.summary,
							image: feedEpisode.itunes.image || podcast.image,
							url: feedEpisode.enclosure.url,
							releaseDate: releaseDate,
							duration: feedEpisode.itunes.duration || 0
						}
					);

					//const episode = createResult.records[0].get('e').properties;

					// Create a relationship between the podcast and the episode
					await session.run(
						'MATCH (p:Podcast {id: $podcastId}), (e:Episode) WHERE e.url IN $episodeUrls CREATE (p)-[r:HAS_EPISODE]->(e) RETURN p',
						{
							podcastId: podcast.id,
							episodeUrls: episodes.map(episode => episode.enclosure.url)
						}
					);
				}
			}

			// Delete any episodes that no longer exist
			await session.run(
				'MATCH (p:Podcast {id: $podcastId})-[r:HAS_EPISODE]->(e:Episode) WHERE NOT e.url IN $episodeUrls DELETE r, e RETURN p',
				{
					podcastId: podcast.id,
					episodeUrls: episodes.map(episode => episode.enclosure.url)
				}
			);

			// Get the podcast and all of its episodes
			const podcastResult = await session.run(
				'MATCH (p:Podcast {id: $id})-[r:HAS_EPISODE]->(e:Episode) RETURN p, collect(e) as episodes',
				{ id }
			);

			const updatedPodcast = podcastResult.records[0].get('p').properties;
			const updatedEpisodes = podcastResult.records[0].get('episodes').map(record => record.properties);

			updatedPodcast.episodes = updatedEpisodes;

			// Return the podcast
			return updatedPodcast;
		} catch (error) {
			throw new GraphQLError(
				'An error occurred while updating the podcast: ' + error.message,
				{
					extensions: {
						code: 'PODCAST_UPDATE_ERROR'
					}
				}
			);
		} finally {
			await session.close();
		}
	},
}

export const PodcastQueries = {
	/*
	async podcasts(_, __, context) {
		const session = driver.session();

		try {
			const result = await session.run(
				'MATCH (p:Podcast) RETURN p'
			);

			const podcasts = result.records.map(record => record.get('p').properties);

			return podcasts;
		} catch (error) {
			console.log(error);
			return [];
		} finally {
			await session.close();
		}
	},
	async podcast(_, { id }, context) {
		const session = driver.session();

		try {
			// Get the podcast and all of its episodes
			const result = await session.run(
				'MATCH (p:Podcast {id: $id})-[r:HAS_EPISODE]->(e:Episode) RETURN p, collect(e) as episodes',
				{ id }
			);

			const podcast = result.records[0].get('p').properties;

			podcast.episodes = result.records[0].get('episodes').map(record => record.properties);

			return podcast;
		} catch (error) {
			console.log(error);
			return null;
		} finally {
			await session.close();
		}
	}
	*/
}