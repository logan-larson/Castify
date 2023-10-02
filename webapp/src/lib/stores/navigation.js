import { localStorageStore } from '@skeletonlabs/skeleton';

//import { writable, get } from 'svelte/store'

export const activeTab = localStorageStore('activeTab', 'home');
export const isExpanded = localStorageStore('isExanded', true);