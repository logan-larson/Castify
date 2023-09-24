<script>
	import '../app.postcss';
	// @ts-nocheck
	import { onMount } from 'svelte';
	import AuthModal from './AuthModal.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { authTitle } from './auth';
	import { currentUser } from '$lib/stores/user';

	export let data;

	let drawerOpen = true;
	let showAuthModal = false;

	onMount(async () => {
		currentUser.login(data.user);
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
	{#if $currentUser}
		<p>Hello, {$currentUser.username}!</p>
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
