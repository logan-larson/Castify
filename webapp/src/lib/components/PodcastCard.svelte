<script>
    import { currentPodcastId } from '$lib/stores/podcast.js';

	export let podcast;

	const truncatedDescription = podcast.description.length > 64
		? podcast.description.substring(0, 64) + '...'
		: podcast.description
		;

    function openPodcast() {
        //window.location.href = `/podcast`;

        currentPodcastId.set(podcast.id);
    }
</script>

<a href="/podcast" on:click={openPodcast} class="card card-hover overflow-hidden rounded-lg shadow-md">
    <header class="h-2/3 relative">
        <img class="w-full h-full object-cover rounded-t-lg" src="{podcast.image}" alt="Podcast cover art" />
    </header>
    <div class="p-4 h-1/3 relative">
        <div class="absolute inset-0 bg-secondary-500 rounded-b-lg shadow-md"></div>
        <h3 class="text-primary-500 z-10 relative">{podcast.title}</h3>
        <p class="text-primary-500 z-10 relative">{truncatedDescription}</p>
    </div>
</a>