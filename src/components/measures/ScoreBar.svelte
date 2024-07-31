<script>
    import '../../css/global.css'
    export let total = 5;
    export let value = 0;
    export let style = "";
    export let level = "default";

    $: levelVar = `--druids-scorebar-level: var(--ui-status-${level},var(--ui-dataviz-blue));`;
</script>

<div style="{style} {levelVar}">
    {#each Array(total).fill("") as bar, idx}
        {#if idx < value}
            <div class="druids-scorebar-bar" data-filled />
        {:else}
            <div class="druids-scorebar-bar" />
        {/if}
    {/each}
</div>


<style>
    .druids-scorebar-bar{
        display: inline-block;
        width: 4px;
        height: 18px;
        background: var(--ui-border);
        margin-right: 2px;
        border-radius: 4px;
        
    }
    
    .druids-scorebar-bar[data-filled]{
        background: var(--druids-scorebar-level,var(--ui-border)) !important;
    }
</style>