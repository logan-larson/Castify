<script>
	import { audioPlayer, currentEpisode, isPlaying, status, isExpanded, currentTimeLocal, currentTime, duration } from "$lib/stores/player";
	import { onMount, onDestroy } from "svelte";

	import Controls from './Controls.svelte';
	import Timeline from "./Controls/Timeline.svelte";

	let paused = true;
	let volume = 0.5;
	let src = $currentEpisode.url;

	onMount(() => {
		// Load the audio player to the current time
		$audioPlayer.currentTime = $currentTimeLocal;
		$audioPlayer.load();
	});

	onDestroy(() => {
		// Save the current time to the store
		$currentTimeLocal = $audioPlayer.currentTime;
	});

</script>

<!-- svelte-ignore a11y-media-has-caption -->
<audio
	bind:this={$audioPlayer}
	bind:duration={$duration}
	bind:paused={paused}
	bind:volume={volume}
	bind:currentTime={$currentTime}
	on:canplay="{() => $status = 'can play some'}"
	on:canplaythrough="{() => $status = 'can play all'}"
	on:waiting="{() => $status = 'waiting'}"
	on:timeupdate="{() => $status = 'playing'}"
	on:seeking="{() => $status = 'seeking'}"
	on:ended="{() => {$isPlaying = false; $currentTimeLocal = 0; $currentTime = 0;}}"
	src={src}
/>

<div class="rounded-lg shadow flex flex-col justify-end items-center fixed py-2 gap-2 w-full z-[800] {$isExpanded ? 'h-[100%] bottom-0 left-0 bg-surface-800' : 'h-[10%] md:h-[8%] bottom-0 left-0 bg-surface-800/95'} transition-all duration-500">
	{#if $isExpanded}
		<!-- Full Player View -->
		<Timeline inFullPlayer={true} />
		<Controls />
	{:else}
		<!-- Mini Player View -->
		<Controls />
	{/if}
</div>