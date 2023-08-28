<script>
	import {goto} from "$app/navigation";
	import {onMount} from "svelte";

    let isAuthenticated = false;

    let drawerOpen = true;

    onMount(() => {
        // Make API call to 
    });

    function toggleDrawer() {
        drawerOpen = !drawerOpen;
    }
</script>

<div class="header">
  <button on:click={toggleDrawer}>Toggle Drawer</button>
  <h1>My SvelteKit App</h1> 
</div>

<div class="drawer" class:open={drawerOpen}>
  <!-- Add drawer content here -->
  <p>Drawer Content</p>
</div>

<div class="content" class:shifted={!drawerOpen}>
    <slot></slot>
</div>

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

