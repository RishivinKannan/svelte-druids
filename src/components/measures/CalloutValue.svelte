<script>
    import "../../css/global.css";
    import ExternalLinkIcon from "../icons/ExternalLinkIcon.svelte";
    import RightDownIcon from "../icons/RightDownIcon.svelte";
    import RightUpIcon from "../icons/RightUpIcon.svelte";

    import Overflower from "../Overflower.svelte";

    /*
     * @type {string}
     */
    export let tagKey;
    /**
     * eg. [{value:'',unit:''},...]
     * @type {string|array}
     */
    export let tagValue;
    export let icon = null;
    export let iconProps = {};
    export let logo = null;
    export let logoProps = {};
    /**
     * @type {string} 
     */
    export let href = null;
    export let isExternal = false;
    /**
     * @type {string} 
     */
    export let unit = null;
    /**
     * @type {string} 
     */
    export let additionalText = null;
    export let hasInternalSpacing = false;

    export let level = "default";
    export let hasStatusBorder = false;
    export let size = "md";
    /**
     * @type {string} 
     */
    export let direction = null;

    /**
     * @type {string}
     */
    export let backgroundColor = null;
    /**
     * @type {string} 
     */
    export let textColor = null;
    export let isBorderless = false;
    export let isDisabled = false;

    $: customColors = backgroundColor ? `background: ${backgroundColor};` : "";

    $: customTextColor = textColor ? !isDisabled ? `color:${textColor}` : "":'';

    $: sizeClass = `druids-calloutValue-${size}`;

    $: colorVars = `--calloutValue-value:var(--ui-status-${level}-contrast);--calloutValue-unit:var(--ui-status-${level});--calloutValue-border:var(--ui-status-${level});`;

    $: hoverClass = href ? "druids-calloutValue-hover" : "";

    $: statusBorder = hasStatusBorder ? "druids-statusborder" : "";

    $: borderStyle = isBorderless ? "outline: none;" : "";

    $: disableClass = isDisabled ? "druids-disabled" : "";
    $: dirIcon =
        direction === "up"
            ? RightUpIcon
            : direction === "down"
              ? RightDownIcon
              : direction === "flat"
                ? FlatIcon
                : null;
</script>

<a
    {href}
    class="druids-calloutValue-button {sizeClass} {hoverClass} {statusBorder} {disableClass}"
    style="{customColors} {colorVars} {borderStyle} {customTextColor} "
    target={isExternal?"_blank":'_self'}
    {...$$restProps}
>
    <div>
        <div class="druids-calloutValue-head">
            <Overflower hasTooltip={false}>
                {tagKey?.toUpperCase()}
            </Overflower>
            {#if isExternal}
                <ExternalLinkIcon />
            {/if}
        </div>
        <div class="druids-calloutValue-body">
            {#if icon}
                <span style={customTextColor} class="druids-icon">
                    <svelte:component this={icon} {...iconProps} />
                </span>
            {/if}
            <Overflower hasTooltip={false}>
                {#if (typeof tagValue === "string") | (typeof tagValue === "number")}
                    <span
                        style={customTextColor}
                        class="druids-calloutValue-value">{@html tagValue}</span
                    >{#if hasInternalSpacing}{" "}{/if}{#if unit}<span
                            class="druids-calloutValue-unit"
                            style={customTextColor}
                        >
                            {unit}
                        </span>
                    {/if}
                {:else}
                    {#each tagValue as item}
                        <span
                            style={customTextColor}
                            class="druids-calloutValue-value"
                            >{item["value"]}</span
                        >{#if hasInternalSpacing}{" "}{/if}<span
                            class="druids-calloutValue-unit"
                            style={customTextColor}>{item["unit"]}</span
                        >
                    {/each}
                    {#if unit}
                        <span
                            class="druids-calloutValue-unit"
                            style={customTextColor}
                        >
                            {unit}
                        </span>
                    {/if}
                {/if}
            </Overflower>
            <span class="druids-dirIcon" style={customTextColor}>
                <svelte:component this={dirIcon} />
            </span>
        </div>
        {#if additionalText}
            <div class="druids-calloutValue-additionalText">
                {additionalText}
            </div>
        {/if}
    </div>

    {#if logo}
        <svelte:component this={logo} {...logoProps} />
    {/if}
</a>

<style>
    .druids-calloutValue-button {
        all: unset;
        display: inline-flex;
        max-width: 100%;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 6px;
        background: var(--ui-background);
        color: var(--ui-text);
        border-radius: 2px;

        outline: solid 2px var(--ui-border);
    }
    .druids-calloutValue-button.druids-disabled {
        color: var(--ui-text-disabled) !important;
        --calloutValue-value: var(--ui-text-disabled) !important;
        --calloutValue-unit: var(--ui-text-disabled) !important;
        --calloutValue-border: var(--ui-text-disabled) !important;
    }

    .druids-calloutValue-button.druids-statusborder {
        outline: solid 1px var(--calloutValue-border, var(--ui-border));
    }

    .druids-calloutValue-button.druids-calloutValue-hover:hover {
        background: var(--ui-interaction-primary);
        color: var(--ui-text-knockout) ;
        --calloutValue-value: var(--ui-text-knockout) !important;
        --calloutValue-unit: var(--ui-text-knockout) !important;
        outline: none;
        cursor: pointer;
    }

    .druids-calloutValue-button > div {
        display: inline-flex;
        max-width: 100%;
        flex-direction: column;
        gap: 4px;
    }

    .druids-calloutValue-head {
        display: inline-flex;
        justify-content: space-between;
        align-items: center;
        font-weight: bold;
        font-size: 0.9rem;
        overflow: hidden;
    }

    .druids-calloutValue-body {
        display: inline-flex;
        align-items: center;
        gap: 4px;
    }
    .druids-icon {
        color: var(--ui-icon);
    }

    .druids-dirIcon {
        display: inline-flex;
        justify-content: center;
        align-items: end;
        color: var(--calloutValue-value, var(--ui-text));
        font-size: var(--calloutValue-unit-size);
    }
    .druids-calloutValue-value {
        font-size: var(--calloutValue-value-size, x-large);
        font-weight: bolder;
        color: var(--calloutValue-value, var(--ui-text));
    }
    .druids-calloutValue-unit {
        font-size: var(--calloutValue-unit-size, large);
        color: var(--calloutValue-unit, var(--ui-text-secondary));
        font-weight: bold;
    }

    .druids-calloutValue-additionalText {
        color: var(--ui-text-secondary);
        font-size: small;
    }

    .druids-calloutValue-xs {
        --calloutValue-value-size: large;
        --calloutValue-unit-size: medium;
    }
    .druids-calloutValue-sm {
        --calloutValue-value-size: x-large;
        --calloutValue-unit-size: large;
    }
    .druids-calloutValue-md {
        --calloutValue-value-size: xx-large;
        --calloutValue-unit-size: larger;
    }
    .druids-calloutValue-lg {
        --calloutValue-value-size: 3rem;
        --calloutValue-unit-size: 2rem;
    }
</style>
