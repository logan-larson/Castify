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

			// Save the podcast
			const createResult = await session.run(
				'CREATE (p:Podcast { id: randomUUID(), title: $title, description: $description, url: $url, image: $image, lastUpdated: datetime($lastUpdated) })  RETURN p',
				{
					title: podcastFeed.title,
					description: podcastFeed.description === '' ? podcastFeed.itunes.subtitle : podcastFeed.description,
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

				await session.run(
					'CREATE (e:Episode { id: randomUUID(), title: $title, description: $description, url: $url, image: $image, releaseDate: datetime($releaseDate), duration: $duration })  RETURN e',
					{
						title: episode.title,
						description: '',
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
	}
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