<script>
	import { audioPlayer, currentEpisode, isPlaying, status, isExpanded, currentTime } from "$lib/stores/player";
	import { format } from "$lib/utils/formatting";
	import { onMount, onDestroy } from "svelte";

	let duration = 0;
	let formattedTime = format($currentTime);
	let paused = true;
	let volume = 0.5;
	let src = $currentEpisode.url;

	onMount(() => {
		// Load the audio player to the current time
		$audioPlayer.currentTime = $currentTime;
		$audioPlayer.load();
	});

	onDestroy(() => {
		// Save the current time to the store
		$currentTime = $audioPlayer.currentTime;
	});

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
		// TODO: Show episode details page
	}
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<audio
	bind:this={$audioPlayer}
	bind:duration={duration}
	bind:paused={paused}
	bind:volume={volume}
	on:canplay="{() => $status = 'can play some'}"
	on:canplaythrough="{() => $status = 'can play all'}"
	on:waiting="{() => $status = 'waiting'}"
	on:timeupdate="{() => $status = 'playing'}"
	on:seeking="{() => $status = 'seeking'}"
	on:ended="{() => {$isPlaying = false; $currentTime = 0}}"
	src={src}
/>

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
		<span class="icon text-xl mb-1"><i class="fas fa-rotate-left"></i></span>
	</button>

	<!-- Play/Pause Button -->
	{#if $isPlaying}
	<button type="button" class="btn-icon btn-icon-lg variant-ghost-surface" on:click={pause}>
		<span class="icon text-xl mb-1"><i class="fas fa-pause"></i></span>
	</button>
	{:else}
	<button type="button" class="btn-icon btn-icon-lg variant-ghost-surface" on:click={play}>
		<span class="icon text-xl mb-1"><i class="fas fa-play"></i></span>
	</button>
	{/if}

	<!-- Skip Forward Button -->
	<button type="button" class="btn-icon btn-icon-lg variant-ghost-surface" on:click={skipForward}>
		<span class="icon text-xl mb-1"><i class="fas fa-rotate-right"></i></span>
	</button>

	<!-- Expand/Collapse Player -->
	{#if $isExpanded}
	<button type="button" class="btn-icon btn-icon-lg variant-ghost-surface" on:click={togglePlayer}>
		<span class="icon text-xl mb-1"><i class="fas fa-chevron-down"></i></span>
	</button>
	{:else}
	<button type="button" class="btn-icon btn-icon-lg variant-ghost-surface" on:click={togglePlayer}>
		<span class="icon text-xl mb-1"><i class="fas fa-chevron-up"></i></span>
	</button>
	{/if}
</div>