<script>
	import PodcastCard from '$lib/components/PodcastCard.svelte';
	import { podcastList } from '$lib/stores/podcast.js'
	import { currentUser } from '$lib/stores/user';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { GET_PODCASTS } from "$lib/queries/podcastQueries";
	import { query } from '$lib/utils/graphql-client.js';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();
	const modalStore = getModalStore();

	onMount(async () => {
		try {
			const response = await query(GET_PODCASTS);

			const { podcasts } = response;

			podcastList.set(podcasts);
		} catch (error) {
			console.error('Error: getting podcasts', error);
			podcastList.set([]);
		}
	});

	function addPodcast() {
		if ($currentUser) {
			const addPodcastModal = {
				type: 'component',
				component: 'addPodcastModal',
				title: 'Add Podcast',
				zIndex: 'z-[777]'
			};

			modalStore.trigger(addPodcastModal);
		} else {
			const authModal = {
				type: 'component',
				component: 'authModal',
				title: 'Login',
				zIndex: 'z-[777]'
			};

			modalStore.trigger(authModal);
		}
	}
</script>

<div class="container h-full mx-auto flex justify-center">
	<div class="text-center flex flex-col items-center">
		<h2 class="h2 my-10">Welcome to Castify</h2>
		<p class="text-lg mb-10">
			Click on a podcast to view its episodes or add a new podcast by clicking the button below.
		</p>

		<button class="btn bg-secondary-200 p-3 pr-5 shadow-md mb-10 mx-2" on:click={addPodcast}>
			<svg class="h-8 w-8 text-secondary-400" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 6v6m0 0v6m0-6h6m-6 0H6"
				/>
			</svg>
			<span class="text-secondary-400">
				Add Podcast
			</span>
		</button>

		<div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-2 mb-28">
		{#each $podcastList as podcast}
			<div class="w-60">
				<PodcastCard {podcast} />
			</div>
		{/each}
		</div>

	</div>
</div>