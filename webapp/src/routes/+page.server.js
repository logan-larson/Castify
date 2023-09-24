// Load the podcast list from the server

import { GET_PODCASTS } from "$lib/queries/podcastQueries";
import { serverSideQuery } from "$lib/utils/graphql-client";

export async function load() {
	try {
		const response = await serverSideQuery(GET_PODCASTS, {});
		const { getPodcasts } = response;

		return {
			podcasts: getPodcasts
		};
	} catch (error) {
		console.error(error);
		return null;
	}
}