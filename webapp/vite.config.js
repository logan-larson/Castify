import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

//const API_ENDPOINT = process.env.VITE_API_ENDPOINT || 'http://localhost:4000/graphql';

export default defineConfig({
	plugins: [sveltekit(), purgeCss()],
	/*
	server: {
		proxy: {
			'/api': API_ENDPOINT
		}
	}
	*/
});
