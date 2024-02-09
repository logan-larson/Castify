<script>
	import { isPlaying, currentEpisode, audioPlayer } from "$lib/stores/player";
	import { currentEpisodeId } from '$lib/stores/episode.js';
	import { formatDuration, formatDate } from '$lib/utils/formatting.js';

	export let episode;

	function play() {
		$audioPlayer.src = episode.url;
		$audioPlayer.play();
		isPlaying.play();
		currentEpisode.set(episode);
	}
	
	function pause() {
		isPlaying.pause();
		$audioPlayer.pause();
	}

	function openEpisode() {
		currentEpisodeId.set(episode.id);
	}
</script>

<a href="/podcast/episode" on:click|self={openEpisode} class="w-[90vw] md:w-[900px] bg-primary-500 shadow overflow-hidden rounded-lg flex justify-between px-4">
	<div class="px-1 py-5">
		<h3 class="text-sm md:text-lg overflow-hidden w-[250px] md:w-[700px] leading-6 font-medium text-gray-900 text-start whitespace-nowrap text-ellipsis">
			{episode.title}
		</h3>
		<p class="mt-1 md:max-w-[250px] text-sm text-gray-500 text-start overflow-hidden whitespace-nowrap">
			{formatDate(episode.releaseDate)} - {formatDuration(episode.duration)}
		</p>
		<p class="mt-1 w-[200px] md:w-[700px] text-sm text-gray-500 text-start overflow-hidden whitespace-nowrap text-ellipsis">
			{episode.description}
		</p>
	</div>
	<!-- A circle button with a play icon in the middle -->
	{#if $isPlaying && $currentEpisode.title === episode.title}
	<button class="btn bg-secondary-200 rounded-full p-3 shadow-md my-auto mx-2" on:click|preventDefault={pause}>
		<svg class="h-8 w-8 text-secondary-400" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M6 4h4v16H6zM14 4h4v16h-4z"
			/>
		</svg>
	</button>
	{:else}
	<button class="btn bg-secondary-200 rounded-full p-3 shadow-md my-auto mx-2" on:click|preventDefault={play}>
		<svg class="h-8 w-8 text-secondary-400" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M9 5v14l10-7z"
			/>
		</svg>
	</button>
	{/if}
</a>