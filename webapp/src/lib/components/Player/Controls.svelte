<script>
	import { audioPlayer, currentEpisode, isPlaying, status, isExpanded, currentTime } from "$lib/stores/player";
	import { currentEpisodeId } from '$lib/stores/episode.js';

	function play() {
		if ($audioPlayer.src.length === 0) return;

		if ($audioPlayer.src !== $currentEpisode.url) {
			$audioPlayer.src = $currentEpisode.url;
			$audioPlayer.load();
		}

		$audioPlayer.play();
		isPlaying.play();
	}

	function pause() {
		$audioPlayer.pause();

		$currentTime = $audioPlayer.currentTime;

		isPlaying.pause();
	}

	function skipBackward() {
		$audioPlayer.currentTime -= 15;
		$currentTime = $audioPlayer.currentTime;
	}

	function skipForward() {
		$audioPlayer.currentTime += 15;
		$currentTime = $audioPlayer.currentTime;
	}

	function togglePlayer() {
		$isExpanded = !$isExpanded;
	}
	
	function showEpisode() {
		currentEpisodeId.set($currentEpisode.id);
		window.location.href = `/podcast/episode`;
	}
</script>

<div class="flex justify-around fixed bottom-2 w-full">

	<!-- Episode Image -->
	<button class="flex gap-2 items-start" on:click={showEpisode}>
		{#if $currentEpisode.url && $currentEpisode.url.length > 0}
			<img class="w-14 h-14 md:w-20 md:h-20 rounded-full" src="{$currentEpisode.image}" alt="Episode cover art" />
		{:else}
			<div class="placeholder-circle animate-pulse w-10 h-10 md:w-20 md:h-20" />
		{/if}
	</button>

	<!-- Skip Backward Button -->
	<button type="button" class="btn-icon btn-icon-lg variant-ghost-surface" on:click={skipBackward}>
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
			<path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
		</svg>
	</button>

	<!-- Play/Pause Button -->
	{#if $isPlaying}
	<button type="button" class="btn-icon btn-icon-lg variant-ghost-surface" on:click={pause}>
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
			<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
		</svg>
	</button>
	{:else}
	<button type="button" class="btn-icon btn-icon-lg variant-ghost-surface" on:click={play}>
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
			<path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
		</svg>
	</button>
	{/if}

	<!-- Skip Forward Button -->
	<button type="button" class="btn-icon btn-icon-lg variant-ghost-surface" on:click={skipForward}>
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
			<path stroke-linecap="round" stroke-linejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
		</svg>
	</button>

	<!-- Expand/Collapse Player -->
	{#if $isExpanded}
	<button type="button" class="btn-icon btn-icon-lg variant-ghost-surface" on:click={togglePlayer}>
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
			<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
		</svg>
	</button>
	{:else}
	<button type="button" class="btn-icon btn-icon-lg variant-ghost-surface" on:click={togglePlayer}>
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
			<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
		</svg>
	</button>
	{/if}
</div>