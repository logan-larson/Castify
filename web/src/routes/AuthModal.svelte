<script>
  import { authTitle } from './auth';
  import { onMount } from 'svelte';
  import { query } from "$lib/utils/graphql-client";
  import { LOGIN_USER, REGISTER_USER } from "$lib/queries/userQueries";
  import { user } from '$lib/stores/user';
  import { createEventDispatcher } from 'svelte';

  /**
	 * @type {() => void}
	 */
  export let close;

  let isLogin = true;
  let email = '';
  let username = '';
  let password = '';

  function toggleForm() {
    isLogin = !isLogin;
    let password = '';

    if (isLogin) {
      authTitle.set('Login');
    } else {
      authTitle.set('Register');
    }
  }

  onMount(() => {
    if (isLogin) {
      authTitle.set('Login');
    } else {
      authTitle.set('Register');
    }
  });

  async function login() {
    // handle login
    try {
      const response = await query(
        LOGIN_USER,
        { 
          username: username,
          password: password
        },
      );
      console.log(response);

      const { login } = response;

      console.log(login);
      user.login(login.user);
      close();
    } catch (error) {
      console.error('Error: fetching user data', error);
    }
  }

  async function register() {
    // handle register
    try {

      const response = await query(
        REGISTER_USER,
        {
          username: username,
          email: email,
          password: password
        }
      );

      const { register } = response;

      user.login(register.user);
      close();
    } catch (error) {
      console.error('Error: fetching user data', error);
    }
  }
</script>

{#if isLogin}
  <input type="text" bind:value={username} placeholder="Username" />
  <input type="password" bind:value={password} placeholder="Password" />
  <button on:click={login}>Login</button>
  <p>Don't have an account? <a href="#top" on:click={toggleForm}>Register</a></p>
{:else}
  <input type="text" bind:value={username} placeholder="Username" />
  <input type="email" bind:value={email} placeholder="Email" />
  <input type="password" bind:value={password} placeholder="Password" />
  <button on:click={register}>Register</button>
  <p>Already have an account? <a href="#top" on:click={toggleForm}>Login</a></p>
{/if}

<style>
  input {
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    background-color: #0077cc;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  button:hover {
    background-color: #0055a4;
  }

  p {
    margin-top: 10px;
    text-align: center;
  }

  a {
    color: #0077cc;
    text-decoration: none;
    cursor: pointer;
  }

  a:hover {
    text-decoration: underline;
  }
</style>