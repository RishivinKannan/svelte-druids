<script>
    import formatCompactNumber from "../../utils/formatCompactNumber";
    import "../../css/global.css";
    import Overflower from "../Overflower.svelte";

    export let className = "";
    export let as = "span";
    export let iconProps = {};
    export let compProps = {};
    export let label = "";
    export let count = false;
    export let maxCount = 99;
    export let icon = null;

    /**
     * @type {"left"|"right"}
     */
    export let iconPosition = "left";
    export let isInteractive = false;
    export let isBorderless = false;
    export let title = "";
    export let hasTooltip = false;
    export let backgroundColor = "";
    export let textColor = "";
    export let borderColor = "";
    /**
     * size of the tags
     * @type {"xs" | "sm" | "md" | "lg"} .
     */
    export let size = "md";
    /**
     * @type {"default"|"danger"|"warning"}
     */
    export let level = "default";

    export let hasEllipsisWithToolTip = true;

    $: titleAttr = hasTooltip & (count > 1000) ? JSON.stringify(count) : title;

    $: levelClass = `druids-badge-${level}`;

    $: borderColorStyle = borderColor ? `border-color: ${borderColor}` : "";
    $: backgroundColorStyle = backgroundColor
        ? `background-color: ${backgroundColor};`
        : "";
    $: textColorStyle = textColor ? `color: ${textColor};` : "";

    $: interactiveclass = isInteractive ? "druids-badge-interactive " : "";
    $: borderlessClass = isBorderless ? "druids-badge-borderless " : "";
    $: sizeClass = `druids-badge-size-${size}`;
    $: countClass = count ? "druids-badge-countClass" : "";

    $: countValue =
        count < maxCount
            ? formatCompactNumber(count)
            : `${formatCompactNumber(maxCount)}+`;
</script>

{#if typeof as === "string"}
    <!-- customElementWrapper -->
    <svelte:element
        this={as}
        {...$$restProps}
        style="{backgroundColorStyle} {textColorStyle} {borderColorStyle}"
        title={titleAttr}
        class="druids-badge-span {interactiveclass} {sizeClass} {borderlessClass} {countClass} {levelClass}  {className}"
    >
        {#if iconPosition == "left"}
            <svelte:component this={icon} {...iconProps} />
        {/if}

        {#if count}
            {#if count === true}
                <span class="druids-badge-count"> 1 </span>
            {:else}
                <span class="druids-badge-count">
                    {countValue}
                </span>
            {/if}
        {:else}
            <Overflower allowOverflow={!hasEllipsisWithToolTip} tolltipContent={label}>
                {@html label}
            </Overflower>
        {/if}

        {#if iconPosition == "right"}
            <svelte:component this={icon} {...iconProps} />
        {/if}
    </svelte:element>
{:else}
    <!-- customComponentWrapper -->
    <svelte:component this={as} {...compProps}>
        <span
            style="{backgroundColorStyle} {textColorStyle} {borderColorStyle}"
            title={titleAttr}
            class="druids-badge-span {interactiveclass} {sizeClass} {borderlessClass} {countClass} {levelClass}  {className}"
        >
            {#if iconPosition == "left"}
                <svelte:component this={icon} {...iconProps} />
            {/if}

            {#if count}
                {#if count === true}
                    <span class="druids-badge-count"> 1 </span>
                {:else}
                    <span class="druids-badge-count">
                        {countValue}
                    </span>
                {/if}
            {:else}
                <Overflower allowOverflow={!hasEllipsisWithToolTip} tolltipContent={label}>
                    {@html label}
                </Overflower>
            {/if}

            {#if iconPosition == "right"}
                <svelte:component this={icon} {...iconProps} />
            {/if}
        </span>
    </svelte:component>
{/if}

<style>
    .druids-badge-span {
        background: var(--ui-background);
        padding: 0.25rem 0.75rem;
        width: auto;
        display: inline-flex;
        max-width: 90%;
        gap: 4px;
        justify-content: center;
        align-items: center;
        border-radius: 32px;
        border: solid 1px;
        border-color: var(--ui-border);
        color: var(--ui-text);
    }

    .druids-badge-interactive:hover.druids-badge-span {
        background-color: var(--ui-background-secondary);
    }

    .druids-badge-interactive:hover.druids-badge-countClass {
        background-color: var(--ui-interaction-secondary-contrast);
    }

    .druids-badge-borderless.druids-badge-span {
        border: none;
    }
    .druids-badge-span.druids-badge-countClass {
        border: none;
        background-color: var(--ui-background-secondary);
    }
    .druids-badge-count {
        font-weight: 600;
        padding: 1px;
    }
    .druids-badge-icon {
        width: 1em;
    }

    .druids-badge-size-xs {
        font-size: x-small;
    }
    .druids-badge-size-sm {
        font-size: small;
    }
    .druids-badge-size-md {
        font-size: medium;
    }
    .druids-badge-size-lg {
        font-size: larger;
    }

    .druids-badge-span.druids-badge-default {
        border-color: var(--ui-border);
        color: var(--ui-text);
    }

    .druids-badge-span.druids-badge-warning {
        border: none !important;
        background-color: var(--ui-status-warning-soft);
        color: var(--ui-status-warning-contrast);
    }

    .druids-badge-span.druids-badge-danger {
        border: none !important;
        background-color: var(--ui-status-danger-soft);
        color: var(--ui-status-danger-contrast);
    }
</style>
