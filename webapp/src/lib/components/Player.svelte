<script>
	import { isExpanded } from '$lib/stores/player';
	import Controls from './Controls.svelte';

</script>

<div class="rounded-lg shadow grid fixed w-full z-[800] {$isExpanded ? 'h-[100%] bottom-0 left-0 bg-surface-800' : 'h-[10%] bottom-0 left-0 bg-surface-800/95'} transition-all duration-500">
	{#if $isExpanded}
	<!-- Full Player View -->
	<Controls />
	{:else}
	<!-- Mini Player View -->
	<Controls />
	{/if}
</div>