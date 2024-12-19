import { localStorageStore } from '@skeletonlabs/skeleton';

export const podcastList = localStorageStore('podcastList', []);
export const currentPodcastId = localStorageStore('currentPodcastId', '');