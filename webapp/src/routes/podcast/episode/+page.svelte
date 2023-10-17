<script>
	import EpisodeCard from '$lib/components/EpisodeCard.svelte';
	import ScrollToTop from '$lib/components/ScrollToTop.svelte';
	import { currentEpisodeId } from '$lib/stores/episode.js';
	
	let data = null;
	/*
	import { onMount } from 'svelte';
	import { GET_PODCAST } from '$lib/queries/podcastQueries';
	import { query } from '$lib/utils/graphql-client.js';
	import { currentPodcastId } from '$lib/stores/podcast.js';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	let episodes = [];

	onMount(async () => {
		try {
			// Load the podcast based on the slug param
			const response = await query(GET_PODCAST, { id: $currentPodcastId });

			const { podcast } = response;

			console.log('podcast', podcast);

			data = podcast;
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
	*/

</script>

<ScrollToTop />
<!-- Show loading state while request is being made -->
{#if data}
<div class="container h-full mx-auto flex justify-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<img class="mt-10 w-60 h-60 rounded-lg" src="{data.image}" alt="Podcast cover art" />
		<h1 class="h1 mt-8">{data.title}</h1>
		<p class="text-lg w-2/3">{data.description}</p>
	</div>
</div>
{:else}
<div class="container h-full mx-auto flex justify-center">
 	<!-- TODO: Substitute with real content -->
	<p>{$currentEpisodeId}</p>

	<div class="space-y-2 text-center flex flex-col items-center">
		<div class="mt-10 h-60 w-60 rounded-lg bg-gray-300 animate-pulse" />
		<div class="mt-10 h-12 w-full rounded-full bg-gray-300 animate-pulse" />
		<div class="mt-12 h-6 w-full rounded-full bg-gray-300 animate-pulse" />
		<div class="h-6 w-full rounded-full bg-gray-300 animate-pulse" />
		<div class="h-6 w-full rounded-full bg-gray-300 animate-pulse" />
	</div>
</div>
{/if}

