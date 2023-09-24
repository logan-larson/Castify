<script>
	import EpisodeCard from '$lib/components/EpisodeCard.svelte';

	// Hardcoded episodes for now
	const episodes = [
		{
			title: 'Episode 1',
			description: 'This is the first episode',
			audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
		},
		{
			title: 'Episode 2',
			description: 'This is the second episode',
			audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
		},
		{
			title: 'Episode 3',
			description: 'This is the third episode',
			audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
		}
	];
</script>

<div class="container h-full mx-auto flex justify-center mt-16">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2">Welcome to Castify</h2>
		<p class="text-lg">
			Click the play button on an episode below to start listening!
		</p>

		{#each episodes as episode}
			<div class="w-3/4">
				<EpisodeCard {episode} />
			</div>
		{/each}
	</div>
</div>