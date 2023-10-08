<script>
	import '../app.postcss';
	// Components
	import { AppShell, AppBar, Avatar, Modal, Toast, getToastStore, Drawer } from '@skeletonlabs/skeleton';
	import AuthModal from '$lib/components/AuthModal.svelte';
	import AddPodcastModal from '$lib/components/AddPodcastModal.svelte';
	import { query } from '$lib/utils/graphql-client';
	import { GET_CURRENT_USER, LOGOUT_USER } from '$lib/queries/userQueries';
	import Player from '$lib/components/Player/Player.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import { isExpanded, activeTab } from '$lib/stores/navigation';
	
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

	onMount(async () => {
		try {
			const response = await query(GET_CURRENT_USER);

			const { getCurrentUser } = response;

			currentUser.login(getCurrentUser);
		} catch (error) {
			console.error('Error: getting current user', error);
			currentUser.logout();
		}
	});

	function openAuthModal() {
		const authModal = {
			type: 'component',
			component: 'authModal',
			title: 'Login',
			zIndex: 'z-[777]'
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

	//let expandedClass = 'w-64';
	//$: expandedClass = $isExpanded ? 'w-64' : 'w-12';
	//$: expandedClass = $isExpanded ? 'w-64' : 'w-16';

</script>

<Toast />

<Modal components={modalComponentRegistry} />

<Drawer />

{#if $currentUser}
<div class="card p-4 w-72 shadow-xl z-[999]" data-popup="profileOptions">
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
<!-- <AppShell slotSidebarLeft="bg-surface-500/5 {$isExpanded ? 'md:w-64' : 'md:w-16'} transition-all" slotFooter=""> -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar background="bg-secondary-500">
			<svelte:fragment slot="lead">
				<!-- <button class="hidden md:block btn btn-sm mr-4" on:click={() => { $isExpanded = !$isExpanded }}>
					<span>
						<svg viewBox="0 0 100 100" class="fill-token w-4 h-4">
							<rect width="100" height="20" />
							<rect y="30" width="100" height="20" />
							<rect y="60" width="100" height="20" />
						</svg>
					</span>
				</button> -->
				<a href="/" class="text-xl uppercase flex items-center gap-1" on:click={() => $activeTab = ''}>
					<img class="w-10 h-10" src="/transparent-bg-512x512.png" alt="Castify logo" />
					<strong>Castify</strong>
				</a>
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

	<svelte:fragment slot="sidebarLeft">
		<!-- <NavBar isSidebar={true} /> -->
	</svelte:fragment>

	<!-- Page Route Content -->
	<slot />

	<svelte:fragment slot="footer">
		<Player />
		<!-- <NavBar isSidebar={false} /> -->
	</svelte:fragment>
</AppShell>