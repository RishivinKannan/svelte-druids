

<script>
    import { onMount } from 'svelte';
   
  
    export let items = [];
    export let itemWidth = 100;
    export let lines = 1;
  
    let containerWidth = 0;
    let visibleItemCount = 0;
  
    
    let containerRef;
    
    onMount(() => {
      const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (entry.target === containerRef) {
          containerWidth = entry.contentRect.width;
          calculateItemWidth()
          calculateVisibleItems();
        }
      }
    });
      resizeObserver.observe(containerRef);
      calculateItemWidth()
      calculateVisibleItems();
      return () => {
        resizeObserver.disconnect();
      };
    });
    
    
    function calculateItemWidth() {
    // Find the widest item's width
    let maxWidth = 0;
    items.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.style.position = 'absolute';
      itemDiv.style.visibility = 'hidden';
      itemDiv.style.whiteSpace = 'nowrap';
      itemDiv.textContent = item;
      document.body.appendChild(itemDiv);
      maxWidth = Math.max(maxWidth, itemDiv.offsetWidth);
      document.body.removeChild(itemDiv);
    });

    // Calculate item width based on the widest item and number of lines
    if (containerWidth > 0  ) {
      itemWidth = Math.floor(Math.max(maxWidth, containerWidth / Math.ceil(items.length / lines)));
      itemWidth += 20
    } else {
      itemWidth = 0;
    }
  }


  
  
    function calculateVisibleItems() {
      if (containerWidth > 0) {
        visibleItemCount = Math.floor((containerWidth / itemWidth)*lines);
   
      } else {
        visibleItemCount = 0;
      }
    }
  </script>
  
  <style>
    .overflow-list {
      display: flex;
      flex-wrap: wrap;
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
        display: flex;
        justify-content: center;
        align-items: center;
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
  