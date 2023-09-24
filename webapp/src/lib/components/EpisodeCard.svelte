<script>
	import { isPlaying, currentEpisode, audioPlayer } from "$lib/stores/player";

	export let episode;

	function play() {
		isPlaying.play();
		currentEpisode.set(episode);
		$audioPlayer.src = episode.file;
		$audioPlayer.play();
	}
	
	function pause() {
		isPlaying.pause();
		$audioPlayer.pause();
	}
</script>

<div class="bg-primary-500 shadow overflow-hidden sm:rounded-lg flex justify-between px-4">
	<div class="flex">
		<img class="w-20 h-20 my-auto mx-3 rounded-full" src="{episode.image}" alt="Episode cover art" />
		<div class="px-1 py-5">
			<h3 class="text-lg leading-6 font-medium text-gray-900 text-start">
				{episode.title}
			</h3>
			<p class="mt-1 max-w-2xl text-sm text-gray-500 text-start">
				{episode.description}
			</p>
		</div>
	</div>
	<!-- A circle button with a play icon in the middle -->
	{#if $isPlaying && $currentEpisode.title === episode.title}
	<button class="btn bg-secondary-200 rounded-full p-3 shadow-md my-auto mx-2" on:click={pause}>
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
	<button class="btn bg-secondary-200 rounded-full p-3 shadow-md my-auto mx-2" on:click={play}>
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
</div>