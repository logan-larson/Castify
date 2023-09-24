<script>
  import { createEventDispatcher, onMount } from 'svelte';

  const dispatch = createEventDispatcher();

  export let show = false;
  export let title = '';

  function close() {
    console.log('closing from modal');
    dispatch("close");
  }
</script>

{#if show}
  <div class="overlay">
    <div class="modal">
      <h2>{title}</h2>
      <button class="close" on:click={() => { dispatch("close") }}>x</button>
      <slot {close}></slot> <!-- This is where the content will be injected -->
    </div>
  </div>
{/if}

<style>
  /* Styles for the modal overlay */
  .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10;
  }
  /* Styles for the modal content */
  .modal {
      position: relative;
      background: white;
      padding: 20px;
      border-radius: 8px;
      width: 80vw;
      max-width: 500px;
      transition: transform 0.3s, opacity 0.3s;
  }
  /* Styles for the close button */
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.5rem;
    cursor: pointer;
  }

  h2 {
    margin-top: 0;
    text-align: center;
  }
</style>
