 <script>
	import { audioPlayer, currentTimeLocal, isPlaying, currentEpisode } from "$lib/stores/player";

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

		$currentTimeLocal = $audioPlayer.currentTime;

		isPlaying.pause();
	}

 </script>

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

