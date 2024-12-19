<script>
	import { activeTab, isExpanded } from '$lib/stores/navigation';

   export let isSidebar;

   function changeTab(tab) {
      activeTab.set(tab);
   }
</script>

<!-- Mobile Navbar -->
{#if !isSidebar}
<div class="flex justify-between text-white p-4 md:hidden">
   <a href="/" on:click={() => changeTab('')} class="{$activeTab === '' ? 'text-primary-700' : ''} flex flex-col items-center hover:text-primary-700 transition-colors duration-200">
      <span class="text-xl mb-1"><i class="fas fa-home"></i></span>
      Home
   </a>
   <a href="/library" on:click={() => changeTab('library')} class="{$activeTab === 'library' ? 'text-primary-700' : ''} flex flex-col items-center hover:text-primary-700 transition-colors duration-200">
      <span class="text-xl mb-1"><i class="fas fa-book"></i></span>
      Library
   </a>
   <a href="/discover" on:click={() => changeTab('discover')} class="{$activeTab === 'discover' ? 'text-primary-700' : ''} flex flex-col items-center hover:text-primary-700 transition-colors duration-200">
      <span class="text-xl mb-1"><i class="fas fa-search"></i></span>
      Discover
   </a>
   <a href="/feed" on:click={() => changeTab('feed')} class="{$activeTab === 'feed' ? 'text-primary-700' : ''} flex flex-col items-center hover:text-primary-700 transition-colors duration-200">
      <span class="text-xl mb-1"><i class="fas fa-rss"></i></span>
      Feed
   </a>
</div>
{/if}

<!-- Desktop Navbar -->
{#if isSidebar}
<div class="hidden md:flex md:flex-col text-white p-4 {$isExpanded ? 'w-64' : 'w-16'} transition-all">
   <a href="/" on:click={() => changeTab('')} class="{$activeTab === '' ? 'text-secondary-500' : ''} flex items-center mb-4 hover:text-secondary-500 transition-colors duration-200">
      <span class="icon text-xl mr-2"><i class="fas fa-home"></i></span>
      {#if $isExpanded}
      Home
      {/if}
   </a>
   <a href="/library" on:click={() => changeTab('library')} class="{$activeTab === 'library' ? 'text-secondary-500' : ''} flex items-center mb-4 hover:text-secondary-500 transition-colors duration-200">
      <span class="icon text-xl mr-2"><i class="fas fa-book"></i></span>
      {#if $isExpanded}
      Library
      {/if}
   </a>
   <a href="/discover" on:click={() => changeTab('discover')} class="{$activeTab === 'discover' ? 'text-secondary-500' : ''} flex items-center mb-4 hover:text-secondary-500 transition-colors duration-200">
      <span class="icon text-xl mr-2"><i class="fas fa-search"></i></span>
      {#if $isExpanded}
      Discover
      {/if}
   </a>
   <a href="/feed" on:click={() => changeTab('feed')} class="{$activeTab === 'feed' ? 'text-secondary-500' : ''} flex items-center mb-4 hover:text-secondary-500 transition-colors duration-200">
      <span class="icon text-xl mr-2"><i class="fas fa-rss"></i></span>
      {#if $isExpanded}
      Feed
      {/if}
   </a>
</div>
{/if}