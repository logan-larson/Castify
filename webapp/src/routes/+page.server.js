// Load the podcast list from the server

import { GET_PODCASTS } from "$lib/queries/podcastQueries";
import { serverSideQuery } from "$lib/utils/graphql-client";

export async function load() {
	try {
		const response = await serverSideQuery(GET_PODCASTS);

		const { podcasts } = response;

		return {
			podcasts
		};
	} catch (error) {
		console.error(error);
		return null;
	}
}