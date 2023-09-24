<script>
	export let episode;

	function play() {
		console.log('Playing episode', episode.title);
	}
</script>

<div class="bg-white shadow overflow-hidden sm:rounded-lg flex justify-between">
	<div class="px-4 py-5 sm:px-6">
		<h3 class="text-lg leading-6 font-medium text-gray-900 text-start">
			{episode.title}
		</h3>
		<p class="mt-1 max-w-2xl text-sm text-gray-500 text-start">
			{episode.description}
		</p>
	</div>
	<!-- A circle button with a play icon in the middle -->
	<button class="bg-gray-200 rounded-full p-3 shadow-md my-auto mx-2" on:click={play}>
		<svg class="h-8 w-8 text-gray-400" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M9 5v14l10-7z"
			/>
		</svg>
	</button>
</div>