<script>
	import { audioPlayer, currentEpisode, isPlaying, status } from "$lib/stores/player";
	import { format } from "$lib/utils/formatting";
	import { onMount } from "svelte";

	let duration = 0;
	let currentTime = 0;
	let formattedTime = format(currentTime);
	let paused = true;
	let volume = 0.5;

	let src = $currentEpisode.file;

	onMount(() => {
		//$audioPlayer.load();
	});

	function play() {
		if ($audioPlayer.src.length === 0) return;

		if ($audioPlayer.src !== $currentEpisode.file) {
			$audioPlayer.src = $currentEpisode.file;
			$audioPlayer.load();
		}

		$audioPlayer.play();
		isPlaying.play();
	}

	function pause() {
		$audioPlayer.pause();
		isPlaying.pause();
	}
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<audio
	bind:this={$audioPlayer}
	bind:duration={duration}
	bind:currentTime={currentTime}
	bind:paused={paused}
	bind:volume={volume}
	on:canplay="{() => $status = 'can play some'}"
	on:canplaythrough="{() => $status = 'can play all'}"
	on:waiting="{() => $status = 'waiting'}"
	on:timeupdate="{() => $status = 'playing'}"
	on:seeking="{() => $status = 'seeking'}"
	on:ended="{() => {$isPlaying = false; currentTime = 0}}"
	src={src}
/>

<div class="m-4 card-footer p-4 bg-primary-500 shadow rounded grid grid-cols-3">
	<!-- Currently playing episode details -->
	<div class="flex">
		<div class="flex gap-2 items-start">
			{#if $currentEpisode.file.length > 0}
				<img class="w-20 h-20 rounded-full" src="{$currentEpisode.image}" alt="Episode cover art" />
				<div class="px-1 py-5">
					<h3 class="text-lg leading-6 font-medium text-gray-900 text-start">
						{$currentEpisode.title}
					</h3>
					<p class="mt-1 max-w-2xl text-sm text-gray-500 text-start">
						{$currentEpisode.description}
					</p>
				</div>
				<!-- <div class="flex flex-col">
					<p class="text-center mt-2 text-secondary-900">{$currentEpisode.title}</p>
					<p class="text-center mt-2 text-secondary-900">{$currentEpisode.description}</p>
				</div> -->
			{:else}
				<div class="placeholder-circle animate-pulse w-20 h-20" />
				<div class="align-center flex flex-col gap-2">
					<div class="placeholder animate-pulse w-32" />
					<div class="placeholder animate-pulse w-48" />
					<div class="placeholder animate-pulse w-48" />
				</div>
			{/if}
		</div>
	</div>

	<!-- Player controls -->
	<div class="flex justify-center">
		{#if $isPlaying}
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
</div>