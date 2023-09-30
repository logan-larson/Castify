<script>
	import EpisodeCard from '$lib/components/EpisodeCard.svelte';
	import ScrollToTop from '$lib/components/ScrollToTop.svelte';

	export let data;

	let episodes = data.podcast.episodes || [];
</script>

<ScrollToTop />
<div class="container h-full mx-auto flex justify-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<img class="mt-10 w-60 h-60 rounded-full" src="{data.podcast.image}" alt="Podcast cover art" />
		<h1 class="h1 mt-8">{data.podcast.title}</h1>
		<p class="text-lg w-2/3">{data.podcast.description}</p>

		{#each episodes as episode}
			<EpisodeCard {episode} />
		{/each}
	</div>
</div>
