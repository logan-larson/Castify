<script>
	import PodcastCard from '$lib/components/PodcastCard.svelte';
	import { podcastList } from '$lib/stores/podcast.js'
	import { currentUser } from '$lib/stores/user';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	const modalStore = getModalStore();

	export let data;

	onMount(async () => {
		podcastList.set(data.podcasts || []);
	});

	function addPodcast() {
		if ($currentUser) {
			const addPodcastModal = {
				type: 'component',
				component: 'addPodcastModal',
				title: 'Add Podcast',
			};

			modalStore.trigger(addPodcastModal);
		} else {
			const authModal = {
				type: 'component',
				component: 'authModal',
				title: 'Login',
			};

			modalStore.trigger(authModal);
		}
	}
</script>

<div class="container h-full mx-auto flex justify-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2 mt-10">Welcome to Castify</h2>
		<p class="text-lg">
			Click on a podcast to view its episodes or add a new podcast by clicking the button below.
		</p>

		<button class="btn bg-secondary-200 rounded-full p-3 pr-5 shadow-md my-auto mx-2" on:click={addPodcast}>
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

		<div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-2">
		{#each $podcastList as podcast}
			<div class="w-60">
				<PodcastCard {podcast} />
			</div>
		{/each}
		</div>

	</div>
</div>