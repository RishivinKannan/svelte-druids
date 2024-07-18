<script>
    import "../css/global.css";
    export let label = "";
    /**
     * @type {icon}
     */
    export let icon = null;
    /**
     * @type {string}
     */
    export let iconColor = null;
    /**
     * @type {'xs'|'sm'|'md'|'lg'}
     */
    export let size = "sm";
    export let backgroundColor = "";
    export let textColor = "";
    export let shouldParseKey = true;
    /**
     * @type {()=>void}
     */
    export let onClick = null;

    /**
     * @type {()=>void}
     */
    export let onDelete = null;

    $: sizeClass = `druids-tag-size-${size}`;
    $: iconColorStyle = iconColor ? `color: ${iconColor};` : "";
    $: backgroundColorStyle = backgroundColor
        ? `background-color: ${backgroundColor};`
        : "";
    $: textColorStyle = textColor ? `color: ${textColor};` : "";
    $: labelSplit = label.split(":");
</script>

<span class="druids-tag-span {sizeClass} " style=" {backgroundColorStyle}">
    {#if icon}
        <span style={iconColorStyle} class="druids-tag-icon">
            <svelte:component this={icon} />
        </span>
    {/if}
    {#if onClick}
        <button on:click={onClick} class="druids-tag-clickable">
            {#if shouldParseKey}
                {#each labelSplit as labelWord, idx}
                    <span
                        style={textColorStyle}
                        class="druids-tag-word-{idx + 1}"
                    >
                        {labelWord}{#if idx < labelSplit.length - 1 && labelSplit.length >= 2}:{/if}
                    </span>
                {/each}
            {:else}
                <span style={textColorStyle} class="druids-tag-word-1">
                    {label}</span
                >
            {/if}
        </button>
    {:else if shouldParseKey}
        {#each labelSplit as labelWord, idx}
            <span style={textColorStyle} class="druids-tag-word-{idx + 1}">
                {labelWord}{#if idx < labelSplit.length - 1 && labelSplit.length >= 2}:{/if}
            </span>
        {/each}
    {:else}
        <span style={textColorStyle} class="druids-tag-word-1">
            {label}</span
        >style
    {/if}
    {#if onDelete}
        <button on:click={onDelete} class="druids-tag-deletable">X</button>
    {/if}
</span>

<style>
    .druids-tag-span {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        border-radius: 4px;
        background: var(--ui-tag-background);
        color: var(--ui-text-tertiary);
        padding: 4px 8px;
    }
    .druids-tag-icon {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .druids-tag-deletable {
        float: right;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
    .druids-tag-span:has(.druids-tag-deletable) .druids-tag-clickable {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    .druids-tag-span:has(.druids-tag-deletable) {
        padding: 0 0 0 8px;
    }

    .druids-tag-span:has(.druids-tag-clickable) {
        padding: 0;
        gap: 0;
    }

    button {
        all: unset;
        height: 100%;
        border-radius: 4px;
        display: inline-block;
        padding: 4px 8px;
    }

    .druids-tag-word-1 {
        color: var(--ui-text-tertiary);
    }
    .druids-tag-word-2 {
        color: var(--ui-ai-primary);
    }
    .druids-tag-size-xs {
        font-size: x-small;
    }
    .druids-tag-size-sm {
        font-size: small;
    }
    .druids-tag-size-md {
        font-size: medium;
    }
    .druids-tag-size-lg {
        font-size: larger;
    }

    .druids-tag-clickable:hover,
    .druids-tag-deletable:hover {
        background: var(--ui-interaction-primary) !important;
        color: var(--ui-text-knockout);
    }

    .druids-tag-clickable:hover .druids-tag-word-1,
    .druids-tag-clickable:hover .druids-tag-word-2 {
        color: var(--ui-text-knockout) !important;
    }
</style>
