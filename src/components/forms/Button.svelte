<script>
    import "../../css/global.css";
    import Loading from "../icons/Loading.svelte";
    export let label;
    /**
     * @type {string}
     */
    export let href = null;
    export let type = "button";
    /**
     * @type {string}
     */
    export let title = null;
    /**
     * @type {string}
     */
    export let ariaLabel = null;
    export let isHovered = false;
    export let isLoading = false;
    export let isDisabled = false;
    export let isActive = false;
    export let isFullWidth = false;
    export let isShade = false;
    export let isNaked = false;
    export let isPrimary = false;
    export let isBorderless = false;
    export let level = "default";
    export let size = "md";
    export let style = "";

    export let icon = null;
    export let iconProps = {};
    export let iconRight = null;
    export let iconRightProps = {};

    $: ariaLabelValue = ariaLabel ? ariaLabel : label;
    $: sizeClass = `druids-button-${size}`;

    $: levelVar = `--druids-button-color:var(--ui-status-${level});--druids-button-color-contrast:var(--ui-status-${level}-contrast);`;
</script>

{#if href}
    <!-- svelte-ignore a11y-mouse-events-have-key-events -->

    <!-- -->
    <a
        {href}
        {title}
        aria-label={ariaLabelValue}
        disabled={isDisabled | isLoading}
        class="druids-button {sizeClass}"
        class:druids-button-hovered={isHovered}
        class:druids-button-shade={isShade}
        class:druids-button-primary={isPrimary}
        class:druids-button-naked={isNaked}
        class:druids-button-active={isActive}
        class:druids-button-fullwidth={isFullWidth}
        class:druids-button-borderless={isBorderless}
        style="{style}{levelVar}"
        on:click
        on:blur
        on:focus
        on:mouseenter
        on:mouseleave
        on:mousedown
        on:mouseout
        on:mouseover
        on:auxclick
        data-fullwidth={isFullWidth}
        {...$$restProps}
    >
        {#if isLoading}
            <span class="druids-button-icon">
                <Loading />
            </span>
        {:else if icon}
            <svelte:component this={icon} {...iconProps} />
        {/if}

        {label}

        {#if iconRight}
            <svelte:component this={iconRight} {...iconRightProps} />
        {/if}
    </a>
{:else}
    <button
        {title}
        {type}
        aria-label={ariaLabelValue}
        disabled={isDisabled | isLoading}
        class="druids-button {sizeClass}"
        class:druids-button-hovered={isHovered}
        class:druids-button-shade={isShade}
        class:druids-button-primary={isPrimary}
        class:druids-button-naked={isNaked}
        class:druids-button-active={isActive}
        class:druids-button-fullwidth={isFullWidth}
        class:druids-button-borderless={isBorderless}
        style="{style}{levelVar}"
        on:click
        on:blur
        on:focus
        on:mouseenter
        on:mouseleave
        on:mousedown
        on:mouseout
        on:mouseover
        on:auxclick
        data-fullwidth={isFullWidth}
        {...$$restProps}
    >
        {#if isLoading}
            <span class="druids-loading-indicator">
                <Loading />
            </span>
        {:else if icon}
            <svelte:component this={icon} {...iconProps} />
        {/if}

        {label}

        {#if iconRight}
            <svelte:component this={iconRight} {...iconRightProps} />
        {/if}
    </button>
{/if}

<style>
    .druids-button {
        all: unset;
        display: inline-flex;
        align-items: center;
        gap: 0px 4px;
        cursor: pointer;
        color: var(--druids-button-color, var(--ui-text));
        border: 1px solid var(--druids-button-color, var(--ui-border));
        padding: 4px 8px;
        border-radius: 4px;
    }
    .druids-button[data-fullwidth="true"] {
        width: 100%;
        text-align: center;
    }

    .druids-button-xs {
        font-size: x-small;
    }
    .druids-button-sm {
        font-size: small;
    }
    .druids-button-md {
        font-size: medium;
    }
    .druids-button-lg {
        font-size: larger;
        padding: 6px 12px;
    }


    .druids-loading-indicator {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: var(--ui-text);
        animation: spin 1s linear infinite;
    }

    .druids-button.druids-button-shade {
        color: var(--druids-button-color, var(--ui-text-tertiary));
    }
    .druids-button.druids-button-primary {
        background: var(--druids-button-color, var(--ui-interaction-primary));
        color: var(--ui-text-knockout);
    }
    .druids-button.druids-button-naked {
        color: var(--ui-text-tertiary);
        background: transparent;
        border: none;
    }

    .druids-button.druids-button-borderless {
        border: none;
        color: var(--ui-text-tertiary);
    }
    .druids-button.druids-button-borderless.druids-button-primary {
        background: transparent;
        color: var(--druids-button-color, var(--ui-interaction-primary));
    }

    /*Disabled State*/

    .druids-button:disabled {
        background: var(--ui-background-secondary) !important;
        color: var(--ui-text-disabled) !important;
        cursor: not-allowed;
    }

    /* Active state */

    .druids-button:active {
        outline: 3px solid rgba(0, 0, 0, 0.03);
        outline-offset: -4px;
    }
    .druids-button:active:disabled{
        outline: none;
    }
    .druids-button.druids-button-naked:active {
        outline: none;
    }
    .druids-button.druids-button-primary:active {
        outline: 3px solid rgba(0, 0, 0, 0.06);
    }
    .druids-button.druids-button-naked:active {
        outline: none;
    }

    /* Forced Active state */
    .druids-button.druids-button-active {
        outline: 3px solid rgba(0, 0, 0, 0.02);
        outline-offset: -4px;
    }
    .druids-button.druids-button-naked.druids-button-active {
        outline: none;
    }
    .druids-button.druids-button-primary.druids-button-active {
        outline: 3px solid rgba(0, 0, 0, 0.06);
    }
    .druids-button.druids-button-naked.druids-button-active {
        outline: none;
    }

    /* Hovered State */

    .druids-button:hover {
        border-color: var(--druids-button-color-contrast,var(--ui-background-shade));
    }
    .druids-button:disabled:hover{
        border-color: var(--ui-border);
    }

    .druids-button.druids-button-shade:hover {
        background: var(--druids-button-color, var(--ui-interaction-primary));
        color: var(--ui-text-knockout);
    }

    .druids-button.druids-button-naked:hover {
        color: var(--druids-button-color, var(--ui-text));
    }

    .druids-button.druids-button-naked.druids-button-primary:hover {
        color: var(
            --druids-button-color-contrast,
            var(--ui-interaction-primary-contrast)
        );
    }
    .druids-button.druids-button-naked.druids-button-primary {
        color: var(--druids-button-color, var(--ui-interaction-primary));
    }

    .druids-button.druids-button-borderless:hover,
    .druids-button.druids-button-borderless.druids-button-primary:hover {
        background: var(--druids-button-color, var(--ui-interaction-primary));
        color: var(--ui-text-knockout);
    }

    .druids-button.druids-button-borderless.druids-button-primary.druids-button-shade:hover {
        background: transparent;
        color: var(--ui-text-knockout);
    }
    .druids-button.druids-button-borderless.druids-button-naked:hover {
        color: var(--druids-button-color);
    }

    .druids-button.druids-button-borderless.druids-button-naked.druids-button.druids-button-primary:hover {
        color: var(--ui-text-knockout);
    }
    .druids-button.druids-button-borderless.druids-button-naked.druids-button.druids-button-shade:hover {
        background: transparent;
    }

    .druids-button.druids-button-borderless.druids-button-naked.druids-button.druids-button-primary.druids-button-shade:hover {
        color: var(
            --druids-button-color-contrast,
            var(--ui-interaction-primary-contrast)
        );
    }

    .druids-button.druids-button-borderless.druids-button-primary.druids-button-shade:hover {
        background: var(--druids-button-color, var(--ui-interaction-primary));
    }

    /* Forced Hover state */

    .druids-button.druids-button-hovered {
        border-color: var(--ui-background-shade);
    }
    .druids-button:disabled.druids-button-hovered{
        border-color: var(--ui-border);
    }
    .druids-button.druids-button-shade.druids-button-hovered {
        background: var(--druids-button-color, var(--ui-interaction-primary));
        color: var(--ui-text-knockout);
    }

    .druids-button.druids-button-naked.druids-button-hovered {
        color: var(--druids-button-color, var(--ui-text));
    }

    .druids-button.druids-button-naked.druids-button-primary.druids-button-hovered {
        color: var(
            --druids-button-color-contrast,
            var(--ui-interaction-primary-contrast)
        );
    }
    .druids-button.druids-button-naked.druids-button-primary {
        color: var(--druids-button-color, var(--ui-interaction-primary));
    }

    .druids-button.druids-button-borderless.druids-button-hovered,
    .druids-button.druids-button-borderless.druids-button-primary.druids-button-hovered {
        background: var(--druids-button-color, var(--ui-interaction-primary));
        color: var(--ui-text-knockout);
    }

    .druids-button.druids-button-borderless.druids-button-primary.druids-button-shade.druids-button-hovered {
        background: transparent;
        color: var(--ui-text-knockout);
    }
    .druids-button.druids-button-borderless.druids-button-naked.druids-button-hovered {
        color: var(--druids-button-color);
    }

    .druids-button.druids-button-borderless.druids-button-naked.druids-button.druids-button-primary.druids-button-hovered {
        color: var(--ui-text-knockout);
    }
    .druids-button.druids-button-borderless.druids-button-naked.druids-button.druids-button-shade.druids-button-hovered {
        background: transparent;
    }

    .druids-button.druids-button-borderless.druids-button-naked.druids-button.druids-button-primary.druids-button-shade.druids-button-hovered {
        color: var(
            --druids-button-color-contrast,
            var(--ui-interaction-primary-contrast)
        );
    }

    .druids-button.druids-button-borderless.druids-button-primary.druids-button-shade.druids-button-hovered {
        background: var(--druids-button-color, var(--ui-interaction-primary));
    }
</style>
