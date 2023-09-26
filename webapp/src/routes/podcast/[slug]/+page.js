import { serverSideQuery } from "$lib/utils/graphql-client";
import { GET_PODCAST } from "$lib/queries/podcastQueries";

export async function load({ params }) {
	try {
		// Load the podcast based on the slug
		const response = await serverSideQuery(GET_PODCAST, { id: params.slug });

		const { podcast } = response;

		return { podcast };
	} catch (error) {
		console.error(error);
		return null;
	}
}