<script>
	import '../app.postcss';
	// Components
	import { AppShell, AppBar, Avatar, Modal } from '@skeletonlabs/skeleton';
	import AuthModal from '$lib/components/AuthModal.svelte';
	
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
			props: {
				title: 'Login',
				body: 'This is the body of the modal',
				regionFooter: 'flex justify-end',
				buttonTextCancel: 'Cancel',
				buttonTextPositive: 'Submit',
				buttonNeutral: 'btn-neutral',
				buttonPositive: 'btn-positive'
			},
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
		}

		modalStore.trigger(authModal);

		console.log('modalStore', modalStore);
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
				<strong class="text-xl uppercase">Skeleton</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<!-- Profile or Login -->
				{#if $currentUser}
					<Avatar
						rounded="rounded-full"
						cursor="cursor-pointer"
						initials="$currentUser.username.substring(0, 1).toUppercase()"
					/>
				{:else}
					<button class="text-sm" on:click={openAuthModal}>Login</button>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
