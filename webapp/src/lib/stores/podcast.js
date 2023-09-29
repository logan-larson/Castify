import { writable } from 'svelte/store';

export const podcastList = writable([]);
export const currentPodcastId = writable(null);