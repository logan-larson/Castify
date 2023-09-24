<script>
	import '../app.postcss';
	// Components
	import { AppShell, AppBar, Avatar, Modal, Toast } from '@skeletonlabs/skeleton';
	import AuthModal from '$lib/components/AuthModal.svelte';
	import AddPodcastModal from '$lib/components/AddPodcastModal.svelte';
	import { query } from '$lib/utils/graphql-client';
	import { LOGOUT_USER } from '$lib/queries/userQueries';
	import Player from '$lib/components/Player.svelte';
	
	// Lifecycle
	import { onMount } from 'svelte';

	// Stores
	import { currentUser } from '$lib/stores/user';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup, initializeStores, getModalStore, popup } from '@skeletonlabs/skeleton';

	initializeStores();

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	const modalStore = getModalStore();

	const modalComponentRegistry = {
		authModal: {
			ref: AuthModal,
			slot: '<p>Slot content</p>'
		},
		addPodcastModal: {
			ref: AddPodcastModal,
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

	const profileOptions = {
		event: 'click',
		target: 'profileOptions',
		placement: 'bottom',
	};

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

<Toast />

{#if $currentUser}
<div class="card p-4 w-72 shadow-xl" data-popup="profileOptions">
	<div class="flex flex-col items-center">
		<Avatar
			width="w-20"
			rounded="rounded-full"
			initials="{$currentUser.username.substring(0, 1)}"
		/>
		<p class="text-center mt-2">{$currentUser.username}</p>
	</div>
	<div class="flex flex-col mt-4">
		<button class="btn variant-ghost-surface" on:click={logout}>Logout</button>
	</div>
</div>
{/if}

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar background="bg-secondary-500">
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Castify</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<!-- Profile or Login -->
				{#if $currentUser}
					<button
						use:popup={profileOptions}
					>
						<Avatar
							width="w-10"
							rounded="rounded-full"
							cursor="cursor-pointer"
							initials="{$currentUser.username.substring(0, 1)}"
						/>
					</button>
				{:else}
					<button class="btn variant-ghost-surface" on:click={openAuthModal}>Login</button>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />

	<svelte:fragment slot="footer">
		<Player />
	</svelte:fragment>
</AppShell>
