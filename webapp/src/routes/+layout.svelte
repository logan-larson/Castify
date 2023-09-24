<script>
	import '../app.postcss';
	// Components
	import { AppShell, AppBar, Avatar, Modal } from '@skeletonlabs/skeleton';
	import AuthModal from '$lib/components/AuthModal.svelte';
	import { query } from '$lib/utils/graphql-client';
	import { LOGOUT_USER } from '$lib/queries/userQueries';
	
	// Lifecycle
	import { onMount } from 'svelte';

	// Stores
	import { currentUser } from '$lib/stores/user';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup, initializeStores, getModalStore } from '@skeletonlabs/skeleton';

	initializeStores();

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	const modalStore = getModalStore();

	const modalComponentRegistry = {
		authModal: {
			ref: AuthModal,
			slot: '<p>Slot content</p>'
		}
	};

	export let data;

	onMount(async () => {
		currentUser.login(data.user);
	});

	function openAuthModal() {
		const authModal = {
			type: 'component',
			component: 'authModal',
			title: 'Login',
		};

		modalStore.trigger(authModal);
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

<Modal components={modalComponentRegistry} />

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Castify</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<!-- Profile or Login -->
				{#if $currentUser}
					<Avatar
						width="w-10"
						rounded="rounded-full"
						cursor="cursor-pointer"
						initials="{$currentUser.username.substring(0, 1)}"
						on:click={logout}
					/>
				{:else}
					<button class="btn variant-ghost-surface" on:click={openAuthModal}>Login</button>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />

	<svelte:fragment slot="footer">
		<p class="text-center mb-4">Media Player...</p>
	</svelte:fragment>
</AppShell>
