<script>
  import { authTitle } from './auth';
  import { onMount } from 'svelte';
  import { query, registerQuery } from "$lib/utils/graphql-client";
  import { LOGIN_USER, REGISTER_USER } from "$lib/queries/userQueries";
  import { user } from '$lib/stores/user';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

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
      const { data } = await query({
        query: LOGIN_USER,
        variables: { 
          email: email,
          password: password
        },
      });

      user.login(data.user);
      dispatch('close');
    } catch (error) {
      console.error('Error: fetching user data', error);
    }
  }

  async function register() {
    // handle register
    try {
      const response = await registerQuery();

      /*
      const response = await query(
        REGISTER_USER,
        {
        variables: { 
          username: username,
          email: email,
          password: password
        },
      });
      */

      const { register } = response;

      user.login(register);
      dispatch('close');
    } catch (error) {
      console.error('Error: fetching user data', error);
    }
  }
</script>

{#if isLogin}
  <input type="email" bind:value={email} placeholder="Email" />
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