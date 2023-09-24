import { serverSideQuery } from "$lib/utils/graphql-client";
import { GET_PODCAST } from "$lib/queries/podcastQueries";

export function load({ params }) {
	// Load the podcast based on the slug
	console.log(params);

	return serverSideQuery(GET_PODCAST, { id: params.slug });
}