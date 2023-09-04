// @ts-nocheck
// stores/user.js
import { writable } from 'svelte/store';

const createUserStore = () => {
  const { subscribe, set, update } = writable(null);

  return {
    subscribe,
    login: (userData) => set(userData),
    logout: () => set(null),
    updateProfile: (updatedData) => update(user => ({ ...user, ...updatedData }))
  };
}

export const user = createUserStore();
