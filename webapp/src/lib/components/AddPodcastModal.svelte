<script>
	import { query } from '$lib/utils/graphql-client';
	import { ADD_PODCAST } from '$lib/queries/podcastQueries';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { podcastList } from '$lib/stores/podcast.js';
	import { readable } from 'svelte/store';

	// Props
	/** Exposes parent props to this component. */
	export let parent;

	// Stores
	const modalStore = getModalStore();
	const toastStore = getToastStore();

	// Form Data
	const formData = {
		rssUrl: '',
	};

	async function onFormSubmit() {
		try {
			const response = await query(
				ADD_PODCAST,
				{ 
					addPodcastInput: {
						rssUrl: formData.rssUrl
					}
				},
			);

			const { addPodcast } = response;

			if (!addPodcast) {
				toastStore.trigger({
					message: 'Could not find podcast at the URL: ' + formData.rssUrl,
					background: 'variant-filled-error',
					zIndex: 'z-[1000]',
				});	
				return;
			}

			podcastList.update((list) => {
				list.push(addPodcast);
				return list;
			});

			toastStore.trigger({
				message: `Successfully added ${addPodcast.title}!`,
				background: 'variant-filled-success',
				zIndex: 'z-[1000]',
			});

			modalStore.close();
		} catch (error) {
			console.error('Error: adding podcast - ', error);

			toastStore.trigger({
				message: 'Could not find podcast at the URL: ' + formData.rssUrl,
				background: 'variant-filled-error',
				zIndex: 'z-[1000]',
			});	
		}
	}

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<div class="flex justify-center">
			Add Podcast
		</div>

		<!-- Enable for debugging: -->
		<form class="modal-form {cForm}">
			<label class="label">
				<span>RSS Feed URL</span>
				<input class="input" type="text" bind:value={formData.rssUrl} placeholder="Enter RSS feed URL..." />
			</label>
		</form>
		<!-- prettier-ignore -->
		<footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Submit</button>
    </footer>
	</div>
{/if}