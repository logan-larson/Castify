<script>
	import { query } from '$lib/utils/graphql-client';
	import { LOGIN_USER, REGISTER_USER } from '$lib/queries/userQueries';
	import { currentUser } from '$lib/stores/user';

	// Props
	/** Exposes parent props to this component. */
	export let parent;

	// Stores
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();
	const toastStore = getToastStore();

	// State
	let isLogin = true;

	// Form Data
	const formData = {
		email: '',
		username: '',
		password: '',
	};

	function onFormSubmit() {
		if (isLogin) {
			login();
		} else {
			register();
		}
	}

	async function login() {
		try {
			validateLoginInput();

			const response = await query(
				LOGIN_USER,
				{ 
					loginInput: {
						email: formData.email,
						password: formData.password
					}
				},
			);

			const { loginUser } = response;

			currentUser.login(loginUser); // set user in store

			modalStore.close();
		} catch (error) {
			console.log('Error: logging in', error);

			const errorToast = {
				type: 'toast',
				title: 'Error',
				message: error.message,
				duration: 3000,
				background: 'variant-filled-error',
				zIndex: 'z-[1000]',
			};

			toastStore.trigger(errorToast);
		}
	}

	async function register() {
		try {

			validateRegisterInput();	

			const response = await query(
				REGISTER_USER,
				{
					registerInput: {
						username: formData.username,
						email: formData.email,
						password: formData.password
					}
				}
			);

			const { registerUser } = response;

			currentUser.login(registerUser);

			modalStore.close();
		} catch (error) {
			const errorToast = {
				type: 'toast',
				title: 'Error',
				message: error.message,
				duration: 3000,
				background: 'variant-filled-error',
				zIndex: 'z-[1000]',
			};

			toastStore.trigger(errorToast);
		}
	}

	function validateRegisterInput() {
		const { email, username, password } = formData;

		if (!email || !username || !password) {
			throw new Error('Please fill out all fields.');
		}

		if (!email.includes('@')) {
			throw new Error('Please enter a valid email.');
		}

		if (password.length < 6) {
			throw new Error('Password must be at least 6 characters.');
		}

		return true;
	}

	function validateLoginInput() {
		const { email, password } = formData;

		if (!email || !password) {
			throw new Error('Please fill out all fields.');
		}

		if (!email.includes('@')) {
			throw new Error('Please enter a valid email.');
		}

		if (password.length < 6) {
			throw new Error('Password must be at least 6 characters.');
		}

		return true;
	}

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<div class="flex justify-center">
			<button
				class:underline={isLogin}
				class="btn btn-primary text-2xl font-bold"
				style="text-underline-position: under"
				on:click={() => { isLogin = true; }}
				>Login</button>
			<button
				class:underline={!isLogin}
				class="btn btn-primary text-2xl font-bold"
				style="text-underline-position: under"
				on:click={() => { isLogin = false; }}
				>Register</button>
		</div>

		<!-- Enable for debugging: -->
		<form class="modal-form {cForm}">
			<label class="label">
				<span>Email</span>
				<input class="input" type="email" bind:value={formData.email} placeholder="Enter email..." />
			</label>
			{#if !isLogin}
				<label class="label">
					<span>Username</span>
					<input class="input" type="text" bind:value={formData.username} placeholder="Enter username..." />
				</label>
			{/if}
			<label class="label">
				<span>Password</span>
				<input class="input" type="password" bind:value={formData.password} placeholder="Enter password..." />
			</label>
		</form>
		<!-- prettier-ignore -->
		<footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>{isLogin ? "Login" : "Register"}</button>
    </footer>
	</div>
{/if}