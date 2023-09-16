<script>
	import '../app.postcss';
	// @ts-nocheck
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { query } from '$lib/utils/graphql-client';
	import { GET_USER } from '$lib/queries/userQueries';
	import AuthModal from './AuthModal.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { authTitle } from './auth';
	import { user } from '$lib/stores/user';

	let drawerOpen = true;
	let showAuthModal = false;

	onMount(async () => {
		/*
		load().then(({ props }) => {
			user.login(props.user);
		})catch(error => {
			console.error('Error loading user data', error);
		});
		*/

		const userId = localStorage.getItem('userId');

		if (userId === null) {
			user.login(null);
			return;
		}

		try {
			const { data } = await query({
				query: GET_USER,
				variables: { id: userId }
			});

			user.login(data.user);
		} catch (error) {
			console.error('Error: fetching user data', error);
		}
	});

	function toggleDrawer() {
		drawerOpen = !drawerOpen;
	}

	function openAuthModal() {
		showAuthModal = true;
	}

	function closeAuthModal() {
		showAuthModal = false;
	}
</script>

<div class="header">
	<button on:click={toggleDrawer}>Toggle Drawer</button>
	<button on:click={openAuthModal}>Login</button>
	<h1>Castify</h1>
</div>

<div class="drawer" class:open={drawerOpen}>
	{#if $user}
		<p>Hello, {$user.username}!</p>
	{:else}
		<p>Not logged in</p>
	{/if}
</div>

<div class="content" class:shifted={!drawerOpen}>
	<slot />
</div>

<Modal show={showAuthModal} title={$authTitle} on:close={closeAuthModal}>
	<AuthModal close={ () => showAuthModal = false } />
</Modal>

<style>
	.header {
		background-color: #333;
		color: white;
		padding: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.drawer {
		width: 250px;
		height: 100vh;
		background-color: #f5f5f5;
		transition: transform 0.3s ease;
		transform: translateX(-100%);
	}

	.drawer.open {
		transform: translateX(0);
	}

	.content {
		margin-left: 250px;
		padding: 2rem;
	}

	.content.shifted {
		margin-left: 0;
	}
</style>
