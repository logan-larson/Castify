<script>
	import { isExpanded } from "$lib/stores/player";

	function togglePlayer() {
		$isExpanded = !$isExpanded;
	}
</script>

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