<!-- OverflowList.svelte -->

<script>
    // Import necessary dependencies
    import { onMount, onDestroy } from 'svelte';
   
  
    // Props for the component
    export let items = [];
    export let itemWidth = 100; // Average width of each item in pixels
  
    let containerWidth = 0;
    let visibleItemCount = 0;
  
    
    let containerRef;
    
    onMount(() => {
        const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (entry.target === containerRef) {
          containerWidth = entry.contentRect.width;
          calculateVisibleItems();
        }
      }
    });
      resizeObserver.observe(containerRef);
      calculateVisibleItems();
      return () => {
        resizeObserver.disconnect();
      };
    });
  
  
    function calculateVisibleItems() {
      if (containerWidth > 0) {
        visibleItemCount = Math.floor(containerWidth / itemWidth);
      } else {
        visibleItemCount = 0;
      }
    }
  </script>
  
  <style>
    /* Example styles, adjust as per your design */
    .overflow-list {
      display: flex;
      overflow: hidden;
    }
  
    .item {
      margin-right: 8px;
      padding: 4px 8px;
      border: 1px solid #ccc;
      background-color: #f0f0f0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  
    .overflow-indicator {
      margin-left: 4px;
      font-style: italic;
    }
  </style>
  
  <div class="overflow-list" bind:this={containerRef}>
    {#each items as item, index}
      {#if index < visibleItemCount}
        <div class="item">{item}</div>
      {:else}
        {#if index === visibleItemCount}
          <div class="overflow-indicator">+{items.length - visibleItemCount}</div>
        {/if}
      {/if}
    {/each}
  </div>
  