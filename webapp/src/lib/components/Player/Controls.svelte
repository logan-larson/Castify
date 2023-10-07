<script>
	import EpisodeDetails from "./Controls/EpisodeDetails.svelte";
	import SkipBackward from "./Controls/SkipBackward.svelte";
	import PlayPause from "./Controls/PlayPause.svelte";
	import SkipForward from "./Controls/SkipForward.svelte";
	import ExpandCollapse from "./Controls/ExpandCollapse.svelte";
	import Timeline from "./Controls/Timeline.svelte";
</script>

<!-- Mobile Controls -->
<div class="flex md:hidden justify-around w-full">
	<EpisodeDetails />

	<SkipBackward />

	<PlayPause />

	<SkipForward />

	<ExpandCollapse />
</div>

<!-- Desktop Controls -->
<div class="hidden md:flex justify-around w-full">
	<!-- Episode Details -->
	<EpisodeDetails />

	<!-- Timeline -->
	<Timeline />

	<!-- Controls -->
	<div class="flex">
		<!-- Skip Backward -->
		<SkipBackward />
		<!-- Play/Pause -->
		<PlayPause />
		<!-- Skip Forward -->
		<SkipForward />
	</div>

	<!-- Manage Queue -->

	<!-- Expand/Collapse -->
	<ExpandCollapse />
</div>