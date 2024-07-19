<script>
    import "../css/global.css";
    export let icon = null;
    export let iconProps = {};
    export let label = "";
    export let descriptionBelow = null;
    export let descriptionRight = null;
    export let breif = null;
    export let isLoading = false;
    export let isDisabled = false;
    export let danger = false;
    export let onClick = () => {};
    export let width = null;

    $: dangerClass = danger ? "druids-popovermenuitem-button-danger" : "";
    $: widthStyle = width ? `width: ${width}` : "";

    $: disabled = isDisabled || isLoading;
</script>

<button
    {disabled}
    style={widthStyle}
    class="druids-popovermenuitem-button {dangerClass}"
    on:click={onClick}
>
    <div class="druids-popovermenuitem-details">
        {#if isLoading}
            <span></span>
        {:else if icon}
            <span class="druids-popovermenuitem-icon">
                <svelte:component this={icon} {...iconProps} />
            </span>
        {/if}
        <span class="druids-popovermenuitem-label">
            <span>
                {label}
            </span>
            {#if descriptionBelow}
                <span class="druids-popovermenuitem-desc-below"
                    >{descriptionBelow}</span
                >
            {/if}
        </span>
        {#if breif}
            <span class="druids-popovermenuitem-breif">{breif}</span>
        {/if}
    </div>
    {#if descriptionRight}
        <span class="druids-popovermenuitem-desc-right">{descriptionRight}</span
        >
    {/if}
</button>

<style>
    .druids-popovermenuitem-button {
        all: unset;
        padding: 8px;
        width: 200px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--ui-text);
        font-weight: normal;
    }

    .druids-popovermenuitem-button:hover {
        background: var(--ui-interaction-primary);
        color: var(--ui-text-knockout) !important;
    }

    .druids-popovermenuitem-button:hover span {
        color: var(--ui-text-knockout);
    }

    .druids-popovermenuitem-details {
        display: inline-flex;
        align-items: center;
        gap: 8px;
    }

    .druids-popovermenuitem-button-danger * {
        color: var(--ui-status-danger);
    }

    .druids-popovermenuitem-button-danger .druids-popovermenuitem-icon {
        color: var(--ui-status-danger);
    }

    .druids-popovermenuitem-button-danger:hover {
        background: var(--ui-status-danger);
    }

    .druids-popovermenuitem-label {
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        font-size: small;
    }

    .druids-popovermenuitem-desc-below,
    .druids-popovermenuitem-desc-right {
        color: var(--ui-text-secondary);
    }

    .druids-popovermenuitem-desc-below {
        font-size: x-small;
    }

    .druids-popovermenuitem-desc-right {
        font-size: small;
    }

    .druids-popovermenuitem-breif {
        font-size: x-small;
        color: var(--ui-text-secondary);
    }

    .druids-popovermenuitem-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: var(--ui-text-secondary);
    }
</style>
