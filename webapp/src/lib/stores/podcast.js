import { writable } from 'svelte/store';

export const podcastList = writable([
	{
		id: 1,
		title: 'Requiem in D minor, K. 626',
		link: '',
		description: 'Wolfgang Amadeus Mozart',
		image: 'https://fastly.picsum.photos/id/12/200/200.jpg?hmac=cX-VZ_FED6NC7EKPOnEaNhQEKw6Dy85IfsKItBkkGWA',
		items: []
	},
	{
		id: 2,
		title: 'Requiem in D minor, K. 626',
		link: '',
		description: 'Wolfgang Amadeus Mozart',
		image: 'https://fastly.picsum.photos/id/12/200/200.jpg?hmac=cX-VZ_FED6NC7EKPOnEaNhQEKw6Dy85IfsKItBkkGWA',
		items: []
	},
	{
		id: 3,
		title: 'Requiem in D minor, K. 626',
		link: '',
		description: 'Wolfgang Amadeus Mozart',
		image: 'https://fastly.picsum.photos/id/12/200/200.jpg?hmac=cX-VZ_FED6NC7EKPOnEaNhQEKw6Dy85IfsKItBkkGWA',
		items: []
	}
]);