<script>
	import EpisodeCard from '$lib/components/EpisodeCard.svelte';
	import ScrollToTop from '$lib/components/ScrollToTop.svelte';
	import { onMount } from 'svelte';
	import { GET_PODCAST_DETAILS } from '$lib/queries/podcastQueries';
	import { query } from '$lib/utils/graphql-client.js';
	import { currentPodcastId } from '$lib/stores/podcast.js';
	import { TabGroup, Tab, getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	let data = null;

	let sortTabSet = 0;
	$: sortAsc = sortTabSet === 0;

	$: episodes = episodes == null ? [] :
		sortAsc ? episodes.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)) : episodes.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));

	onMount(async () => {
		try {
			// Load the podcast based on the slug param
			const variables = {
				"where": {
					"id": $currentPodcastId,
				},
				"options": {
					"sort": [
						{
							"releaseDate": sortAsc ? "ASC" : "DESC"
						}
					]
				},
			};

			const response = await query(GET_PODCAST_DETAILS, variables);

			const { podcasts } = response;

			data = podcasts[0];
			episodes = data.episodes || [];
		} catch (error) {
			console.error(error);

			toastStore.trigger({
				type: 'toast',
				title: 'Error',
				message: error.message,
				duration: 3000,
				background: 'variant-filled-error',
			});

			data = null;
		}
	});

</script>

<ScrollToTop />
<!-- Show loading state while request is being made -->
{#if data}
<div class="container h-full mx-auto flex justify-center mb-32">
	<div class="space-y-10 text-center flex flex-col items-center">
		<img class="mt-10 w-60 h-60 rounded-lg" src="{data.image}" alt="Podcast cover art" />
		<h1 class="h1 mt-8">{data.title}</h1>
		<p class="text-lg w-2/3">{data.description}</p>

		<TabGroup>
			<Tab bind:group={sortTabSet} name="newest" value={0}>Newest</Tab>
			<Tab bind:group={sortTabSet} name="oldest" value={1}>Oldest</Tab>
		</TabGroup>	

		{#each episodes as episode}
			<EpisodeCard {episode} />
		{/each}
	</div>
</div>
{:else}
<div class="container h-full mx-auto flex justify-center">
	<div class="space-y-2 text-center flex flex-col items-center">
		<div class="mt-10 h-60 w-60 rounded-lg bg-gray-300 animate-pulse" />
		<div class="mt-10 h-12 w-full rounded-full bg-gray-300 animate-pulse" />
		<div class="mt-12 h-6 w-full rounded-full bg-gray-300 animate-pulse" />
		<div class="h-6 w-full rounded-full bg-gray-300 animate-pulse" />
		<div class="h-6 w-full rounded-full bg-gray-300 animate-pulse" />
	</div>
</div>
{/if}

