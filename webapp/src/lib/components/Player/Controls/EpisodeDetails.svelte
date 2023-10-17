<script>
	import { currentEpisode } from "$lib/stores/player";

	function showEpisode() {
		currentEpisodeId.set($currentEpisode.id);
		window.location.href = `/podcast/episode`;
	}
</script>

<!-- Episode Image -->
<button class="flex gap-2 items-start" on:click={showEpisode}>
	{#if $currentEpisode.url && $currentEpisode.url.length > 0}
		<img class="w-14 h-14 rounded-full" src="{$currentEpisode.image}" alt="Episode cover art" />
	{:else}
		<div class="placeholder-circle animate-pulse w-10 h-10" />
	{/if}
</button>

<!-- Episode Title -->
