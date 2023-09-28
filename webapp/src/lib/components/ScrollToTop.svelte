<script>
	import { onMount } from "svelte";
	let element;

	onMount(() => {
		element.scrollIntoView();
	});
</script>

<div bind:this={element}></div>