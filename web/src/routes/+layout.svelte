<script>
	import '../app.postcss';
	// @ts-nocheck
	import { onMount } from 'svelte';
	import AuthModal from './AuthModal.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { authTitle } from './auth';
	import { currentUser } from '$lib/stores/user';
	import { LOGOUT_USER } from '$lib/queries/userQueries';
	import { query } from '$lib/utils/graphql-client';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

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

	function logout() {
		try {
			query(LOGOUT_USER);
			currentUser.logout();
		} catch (error) {
			console.error('Error: logging out', error);
		}
	}
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotLead="flex justify-start" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<button on:click={toggleDrawer}>Toggle Drawer</button>
				<h3>Castify</h3>
			</svelte:fragment>

			<svelte:fragment slot="trail">
				{#if $currentUser}
					<button on:click={logout}>Logout</button>
				{:else}
					<button on:click={openAuthModal}>Login</button>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		{#if $currentUser}
			<p>Hello, {$currentUser.username}!</p>
		{:else}
			<p>Not logged in</p>
		{/if}
	</svelte:fragment>

	<slot />

	<svelte:fragment slot="footer">
		<p>Media Player</p>
	</svelte:fragment>
</AppShell>

<Modal show={showAuthModal} title={$authTitle} on:close={closeAuthModal}>
	<AuthModal close={ () => showAuthModal = false } />
</Modal>

