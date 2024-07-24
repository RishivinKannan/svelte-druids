<script>
    import "../css/global.css";
    export let label = null;
    /*
     * @type {number}
     */
    export let count = null;

    export let icon = null;
    export let iconProps = {};

    export let size = "xs";
    /*  It will infer the label or level.You can opt out of this by false
     * @type {string|boolean} Optional
     */
    export let title = null;
    export let level = "default";

    /*
     *   @type {boolean|function}
     */
    export let clickable = false;

    export let isFullWidth = false;
    export let hasAutoHeight = false;
    export let isSoft = false;
    export let isCircle = false;

    $: heightStyle = hasAutoHeight
        ? "height: 100%;"
        : !label
          ? isCircle
              ? ""
              : "height: 20px;"
          : "";
    $: widthStyle = isFullWidth ? "width: 100%" : "";

    $: levelClass = `druids-statuspill-${level}`;

    $: sizeClass = `druids-statuspill-size-${size}`;

    $: withoutLabelpadding = label ? "" : "padding-left:2px;padding-right:2px;";

    $: titleValue = typeof title === 'string' ? title : typeof title === "boolean" ?'':label ? label : level;

    function handleClick() {
        if (typeof clickable === "function") {
            clickable();
        }
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
<span
    on:click={handleClick}
    title={titleValue}
    style="{withoutLabelpadding}{heightStyle}{widthStyle}"
    class:druids-statuspill-Soft={isSoft}
    class:druids-statuspill-Clickable={clickable}
    class:druids-statuspill-Circle={isCircle}
    class=" {levelClass} {sizeClass} druids-statuspill"
>
    {#if icon}
        <svelte:component this={icon} {...iconProps} />
    {/if}
    {#if count}
        <span>
            {count}
        </span>
    {/if}
    <span>
        {#if label}
            {@html label}
        {/if}
    </span>
</span>

<style>
    .druids-statuspill-size-xs {
        font-size: x-small;
    }
    .druids-statuspill-size-sm {
        font-size: small;
    }
    .druids-statuspill-size-md {
        font-size: medium;
    }
    .druids-statuspill-size-lg {
        font-size: larger;
    }

    .druids-statuspill {
        width: auto;
        height: auto;
        box-sizing: border-box;
        padding: 2px 8px;
        border-radius: 4px;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-weight: 600;
        background: var(--ui-status-other);
        color: var(--ui-text-knockout);
        font-size: x-small;
    }

    .druids-statuspill.druids-statuspill-Circle {
        border-radius: 100%;
        padding: 0px 0px;
        height: 6px;
        width: 6px;
    }

    .druids-statuspill.druids-statuspill-default {
        background: var(--ui-status-other);
        color: var(--ui-text-knockout);
    }

    .druids-statuspill.druids-statuspill-default.druids-statuspill-Clickable:hover {
        background: var(--ui-status-other-contrast);
    }

    .druids-statuspill.druids-statuspill-Clickable {
        cursor: pointer;
    }

    .druids-statuspill.druids-statuspill-success {
        background: var(--ui-status-success);
        color: var(--ui-text-knockout);
    }

    .druids-statuspill.druids-statuspill-success.druids-statuspill-Clickable:hover {
        background: var(--ui-status-success-contrast);
    }

    .druids-statuspill.druids-statuspill-warning {
        background: var(--ui-status-warning);
        color: var(--ui-text-knockout);
    }

    .druids-statuspill.druids-statuspill-warning.druids-statuspill-Clickable:hover {
        background: var(--ui-status-warning-contrast);
    }

    .druids-statuspill.druids-statuspill-danger {
        background: var(--ui-status-danger);
        color: var(--ui-text-knockout);
    }

    .druids-statuspill.druids-statuspill-danger.druids-statuspill-Clickable:hover {
        background: var(--ui-status-danger-contrast);
    }

    .druids-statuspill.druids-statuspill-default.druids-statuspill-Soft {
        background: var(--ui-status-other-soft);
        color: var(--ui-status-other);
    }

    .druids-statuspill.druids-statuspill-default.druids-statuspill-Soft.druids-statuspill-Clickable:hover {
        background: color-mix(in srgb, var(--ui-status-other) 20%, transparent);
    }

    .druids-statuspill.druids-statuspill-success.druids-statuspill-Soft {
        background: var(--ui-status-success-soft);
        color: var(--ui-status-success);
    }

    .druids-statuspill.druids-statuspill-success.druids-statuspill-Soft.druids-statuspill-Clickable:hover {
        background: color-mix(
            in srgb,
            var(--ui-status-success) 20%,
            transparent
        );
    }

    .druids-statuspill.druids-statuspill-warning.druids-statuspill-Soft {
        background: var(--ui-status-warning-soft);
        color: var(--ui-status-warning);
    }

    .druids-statuspill.druids-statuspill-warning.druids-statuspill-Soft.druids-statuspill-Clickable:hover {
        background: color-mix(
            in srgb,
            var(--ui-status-warning) 20%,
            transparent
        );
    }

    .druids-statuspill.druids-statuspill-danger.druids-statuspill-Soft {
        background: var(--ui-status-danger-soft);
        color: var(--ui-status-danger);
    }

    .druids-statuspill.druids-statuspill-danger.druids-statuspill-Soft.druids-statuspill-Clickable:hover {
        background: color-mix(
            in srgb,
            var(--ui-status-danger) 20%,
            transparent
        );
    }
</style>
