<script>
    export let separator = null;
    export let header = null;
</script>

<div class="druids-popovermenu-section">
    {#if separator === "top"}
        <span class="druids-popovermenu-separator" />
    {/if}
    {#if header}
        <h4>{header}</h4>
    {/if}
    <div>
        <slot />
    </div>
    {#if separator === "bottom"}
        <span class="druids-popovermenu-separator" />
    {/if}
</div>

<style>
    .druids-popovermenu-separator {
        background-color: var(--ui-border);
        display: block;
        height: 1px;
        /* margin: 4px 0; */
        pointer-events: none;
        width: 100%;
    }

    .druids-popovermenu-section {
        display: flex;
        flex-direction: column;
    }

    .druids-popovermenu-section h4 {
        all: unset;
        font-size: medium;
        font-weight: semi-bold;
        padding: 4px 8px;
        color: var(--ui-text-secondary);
    }
</style>
