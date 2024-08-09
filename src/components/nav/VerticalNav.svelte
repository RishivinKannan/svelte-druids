<script>
    import "../../css/global.css";
    export let items = [];
    export let hasSquaredItems = false;
    export let className = "";
</script>

<div class="druids-vertical-nav {className}">
    {#each items as item}
        {#if item.href}
            <a
                href={item?.href}
                class:active={item?.isActive}
                class:lockup={!hasSquaredItems}
                on:click={items?.onClick}
                on:mouseenter={items?.onMouseOver}
                on:mouseleave={items?.onMouseLeave}
            >
                {#if item.icon}
                    <span class="druids-icon"
                        ><svelte:component
                            this={item?.icon}
                            {...item?.iconProps}
                        /></span
                    >
                {/if}
                {#if item.subLabel}
                    <div class="druids-label-container">
                        <span class="druids-label">{item.label}</span>
                        <span class="druids-sublabel">{item.subLabel}</span>
                    </div>
                {:else}
                    <span>{item.label}</span>
                {/if}
            </a>
        {:else}
            <button
                class:active={item?.isActive}
                class:lockup={!hasSquaredItems}
                on:click={item?.onClick}
                on:mouseenter={items?.onMouseOver}
                on:mouseleave={items?.onMouseLeave}
                {...item}
            >
                {#if item.icon}
                    <span class="druids-icon"
                        ><svelte:component
                            this={item?.icon}
                            {...item?.iconProps}
                        /></span
                    >
                {/if}
                {#if item.subLabel}
                    <div class="druids-label-container">
                        <span class="druids-label">{item.label}</span>
                        <span class="druids-sublabel">{item.subLabel}</span>
                    </div>
                {:else}
                    <span>{item.label}</span>
                {/if}
            </button>
        {/if}
    {/each}
</div>

<style>
    .druids-vertical-nav {
        display: flex;
        flex-direction: column;
        max-width: 256px;
        min-width: 200px;
        align-items: stretch;
        justify-content: flex-start;
        color: var(--ui-text);
        font-size: medium;
    }
    .druids-vertical-nav button.lockup {
        border-radius: 4px;
    }

    .druids-vertical-nav button:hover {
        background: var(--ui-interaction-secondary);
        color: var(--ui-interaction-primary);
    }

    .druids-vertical-nav button:hover .druids-icon,
    .druids-vertical-nav button:hover .druids-sublabel {
        color: inherit;
    }

    .druids-vertical-nav button.active {
        background: var(--ui-interaction-primary);
        color: var(--ui-text-knockout);
    }

    .druids-vertical-nav button.active .druids-icon,
    .druids-vertical-nav button.active .druids-sublabel {
        color: inherit;
    }

    .druids-vertical-nav button {
        all: unset;
        display: flex;
        padding: 8px 16px;

        text-align: left;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: nowrap;
    }
    .druids-label-container {
        display: flex;
        flex-direction: column;
    }
    .druids-label {
        font-size: large;
    }

    .druids-sublabel {
        font-size: small;
        color: var(--ui-text-secondary);
    }

    .druids-icon {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        color: var(--ui-icon);
        margin-right: 16px;
    }
</style>
