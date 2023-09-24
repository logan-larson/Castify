import { writable, get } from 'svelte/store'

export const audioPlayer = writable();
export const currentEpisode = writable({ file: '' });

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

export const episodeList = writable([
	{
		title: 'Requiem in D minor, K. 626',
		description: 'Wolfgang Amadeus Mozart',
		url: 'https://sveltejs.github.io/assets/music/mozart.mp3',
	},
	{
		title: 'Symphony no. 5 in Cm, Op. 67',
		description: 'Ludwig van Beethoven',
		url: 'https://sveltejs.github.io/assets/music/beethoven.mp3',
	},
	{
		title: 'Mars, the Bringer of War',
		description: 'Gustav Holst',
		url: 'https://sveltejs.github.io/assets/music/holst.mp3',
	}
]);