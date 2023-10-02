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
	}

	function skipForward() {
		$audioPlayer.currentTime += 15;
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
	on:ended="{() => {$isPlaying = false; currentTime = 0}}"
	src={src}
/>

<div class="rounded-lg shadow grid fixed w-full z-[800] {$isExpanded ? 'h-[100%] bottom-0 left-0 bg-surface-800' : 'h-[10%] bottom-0 left-0 bg-surface-800/95'} transition-all duration-500">
	{#if $isExpanded}
	<!-- Full Player View -->
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
		<button class="btn bg-secondary-200 rounded-full p-3 shadow-md my-auto mx-2" on:click={skipBackward}>
			<svg class="h-8 w-8 text-secondary-400" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M19 20L9 12l10-8v16zM5 19V5"
				/>
			</svg>
		</button>

		<!-- Play/Pause Button -->
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

		<!-- Skip Forward Button -->
		<button class="btn bg-secondary-200 rounded-full p-3 shadow-md my-auto mx-2" on:click={skipForward}>
			<svg class="h-8 w-8 text-secondary-400" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M5 4l10 8-10 8V4zM19 5v14"
				/>
			</svg>
		</button>

		<!-- Expand/Collapse Player -->
		<button class="btn bg-secondary-200 rounded-full p-3 shadow-md my-auto mx-2" on:click={togglePlayer}>
			{#if $isExpanded}
			<svg class="h-8 w-8 text-secondary-400" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M19 9l-7 7-7-7"
				/>
			</svg>
			{:else}
			<svg class="h-8 w-8 text-secondary-400" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M5 15l7-7 7 7"
				/>
			</svg>
			{/if}
		</button>
	</div>
	{:else}
	<!-- Mini Player View -->
	<div class="flex justify-around fixed bottom-2 w-full">
		
		<!-- Episode Image -->
		<div class="flex gap-2 items-start">
			{#if $currentEpisode.url && $currentEpisode.url.length > 0}
				<img class="w-14 h-14 md:w-20 md:h-20 rounded-full" src="{$currentEpisode.image}" alt="Episode cover art" />
				{#if $isExpanded}
				<div class="md:px-1 md:py-5">
					<h3 class="text-sm md:text-lg leading-6 font-medium text-gray-900 text-start">
						{$currentEpisode.title}
					</h3>
					<p class="md:mt-1 max-w-2xl text-xs md:text-sm text-gray-500 text-start">
						{$currentEpisode.description}
					</p>
				</div>
				{/if}
				<!-- <div class="flex flex-col">
					<p class="text-center mt-2 text-secondary-900">{$currentEpisode.title}</p>
					<p class="text-center mt-2 text-secondary-900">{$currentEpisode.description}</p>
				</div> -->
			{:else}
				<div class="placeholder-circle animate-pulse w-10 h-10 md:w-20 md:h-20" />
				{#if $isExpanded}
				<div class="grid grid-cols-5 justify-center bottom-0 h-fit fixed animate-pulse w-16 md:w-32" />
				<div class="placeholder animate-pulse w-24 md:w-48" />
				<div class="placeholder animate-pulse w-24 md:w-48" />
				{/if}
			{/if}
		</div>

		<!-- Skip Backward Button -->
		<button class="btn bg-secondary-200 rounded-full p-3 shadow-md my-auto mx-2" on:click={skipBackward}>
			<svg class="h-8 w-8 text-secondary-400" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M19 20L9 12l10-8v16zM5 19V5"
				/>
			</svg>
		</button>

		<!-- Play/Pause Button -->
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

		<!-- Skip Forward Button -->
		<button class="btn bg-secondary-200 rounded-full p-3 shadow-md my-auto mx-2" on:click={skipForward}>
			<svg class="h-8 w-8 text-secondary-400" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M5 4l10 8-10 8V4zM19 5v14"
				/>
			</svg>
		</button>

		<!-- Expand/Collapse Player -->
		<button class="btn bg-secondary-200 rounded-full p-3 shadow-md my-auto mx-2" on:click={togglePlayer}>
			{#if $isExpanded}
			<svg class="h-8 w-8 text-secondary-400" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M19 9l-7 7-7-7"
				/>
			</svg>
			{:else}
			<svg class="h-8 w-8 text-secondary-400" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M5 15l7-7 7 7"
				/>
			</svg>
			{/if}
		</button>
	</div>
	{/if}
</div>