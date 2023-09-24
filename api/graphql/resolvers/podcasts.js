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

			// Save the podcast
			const createResult = await session.run(
				'CREATE (p:Podcast { id: randomUUID(), title: $title, description: $description, url: $url, image: $image })  RETURN p',
				{
					title: podcastFeed.title,
					description: podcastFeed.description,
					image: podcastFeed.image.url,
					url: rssUrl
				}
			);

			const newPodcast = createResult.records[0].get('p').properties;

			return newPodcast;
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
			const result = await session.run(
				'MATCH (p:Podcast {id: $id}) RETURN p',
				{ id }
			);

			const podcast = result.records[0].get('p').properties;

			return podcast;
		} catch (error) {
			console.log(error);
			return null;
		} finally {
			await session.close();
		}
	}
}