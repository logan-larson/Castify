import { localStorageStore } from '@skeletonlabs/skeleton';

import { writable, get } from 'svelte/store'

export const audioPlayer = writable();
export const currentEpisode = localStorageStore('currentEpisode', { url: '' });

export const status = writable('default');

const createIsPlaying = () => {
	const { subscribe, set, update } = writable(false);

	return {
		subscribe,
		toggle: () => update(v => !v),
		play: () => set(true),
		pause: () => set(false)
	};
};

export const isPlaying = createIsPlaying();
export const currentTime = localStorageStore('currentTime', 0);

export const isExpanded = localStorageStore('isExpanded', false);