<script>
    import "../css/global.css";
    export let label = "";
    /*
     * @type {number}
     */
    export let count = null;

    export let icon = null;
    export let iconProps = {};

    export let size = "xs";

    export let title = "";
    export let level = "default";

    export let isClickable = false;
    export let isFullWidth = false;
    export let hasAutoHeight = false;
    export let isSoft = false;
    export let isCircle = false;

    $: heightStyle = hasAutoHeight ? "height: 100%;" : (!label & isCircle)? "":"height: 20px;";
    $: widthStyle = isFullWidth ? "width: 100%" : "";

    $: levelClass = `druids-statuspill-${level}`;

    $: sizeClass = `druids-statuspill-size-${size}`;

    $: withoutLabelPadding = label ? `padding-left:8px;padding-right:8px;` : "";
</script>

<span
    {title}
    style=" {withoutLabelPadding}{heightStyle}{widthStyle}"
    class:druids-statuspill-Soft={isSoft}
    class:druids-statuspill-Clickable={isClickable}
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
        {label}
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
        box-sizing: border-box;
        padding: 4px 2px;
        border-radius: 4px;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-weight: 600;
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

    .druids-statuspill.druids-statuspill-default.druids-statuspill-Clickable:hover{
        background: var(--ui-status-other-contrast);
    }


    .druids-statuspill.druids-statuspill-success {
        background: var(--ui-status-success);
        color: var(--ui-text-knockout);
    }

    .druids-statuspill.druids-statuspill-success.druids-statuspill-Clickable:hover{
        background: var(--ui-status-success-contrast);
    }

    .druids-statuspill.druids-statuspill-warning {
        background: var(--ui-status-warning);
        color: var(--ui-text-knockout);
    }

    .druids-statuspill.druids-statuspill-warning.druids-statuspill-Clickable:hover{
        background: var(--ui-status-warning-contrast);
    }

    .druids-statuspill.druids-statuspill-danger {
        background: var(--ui-status-danger);
        color: var(--ui-text-knockout);
    }

    .druids-statuspill.druids-statuspill-danger.druids-statuspill-Clickable:hover{
        background: var(--ui-status-danger-contrast);
    }


    .druids-statuspill.druids-statuspill-default.druids-statuspill-Soft {
        background: var(--ui-status-other-soft);
        color: var(--ui-status-other);
    }

    .druids-statuspill.druids-statuspill-default.druids-statuspill-Soft.druids-statuspill-Clickable:hover{
        background: color-mix(in srgb, var(--ui-status-other) 20%, transparent);
    }


    .druids-statuspill.druids-statuspill-success.druids-statuspill-Soft {
        background: var(--ui-status-success-soft);
        color: var(--ui-status-success);
    }

    .druids-statuspill.druids-statuspill-success.druids-statuspill-Soft.druids-statuspill-Clickable:hover{
        background:  color-mix(in srgb, var(--ui-status-success) 20%, transparent);
    }

    .druids-statuspill.druids-statuspill-warning.druids-statuspill-Soft {
        background: var(--ui-status-warning-soft);
        color: var(--ui-status-warning);
    }

    .druids-statuspill.druids-statuspill-warning.druids-statuspill-Soft.druids-statuspill-Clickable:hover{
        background:  color-mix(in srgb, var(--ui-status-warning) 20%, transparent);
    }

    .druids-statuspill.druids-statuspill-danger.druids-statuspill-Soft {
        background: var(--ui-status-danger-soft);
        color: var(--ui-status-danger);
    }

    .druids-statuspill.druids-statuspill-danger.druids-statuspill-Soft.druids-statuspill-Clickable:hover{
        background:  color-mix(in srgb, var(--ui-status-danger) 20%, transparent);
    }



</style>
