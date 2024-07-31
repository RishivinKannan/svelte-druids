<script>
    import prettyMilliseconds from "pretty-ms";
    import "../../css/global.css";
    /*
     * @type  {string}
     */
    export let textLabel = null;

    export let iconLabel = null;
    export let iconProps = {};

    export let size = "sm";

    export let level = "default";

    /*
     * @type  {number}
     */
    export let msPeriod = null;

    export let isFullWidth = false;

    $: widthStyle = isFullWidth ? "width: 100%; justify-content:center;" : "";

    $: levelClass = `druids-timepill-${level}`;

    $: sizeClass = `druids-timepill-size-${size}`;

    $: period = msPeriod
        ? prettyMilliseconds(msPeriod>0?msPeriod:0, { compact: true })
        : null;

</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
<span style="{widthStyle} " class=" {levelClass} {sizeClass} druids-timepill">
    {#if iconLabel}
        <svelte:component this={iconLabel} {...iconProps} />
    {:else if textLabel}
        <span>{textLabel}</span>
    {:else if period}
        <span>{period}</span>
    {:else}
        -
    {/if}
</span>

<style>
    .druids-timepill.druids-timepill-size-sm {
        font-size: x-small;
    }
    .druids-timepill.druids-timepill-size-md {
        font-size: small;
    }

    .druids-timepill {
        width: auto;
        height: auto;
        box-sizing: border-box;
        padding: 2px 4px;
        border-radius: 4px;
        display: inline-flex;
        align-items: center;
        gap: 2px;
        font-weight: 600;
        background: var(--ui-tag-background);
        color: var(--ui-status-other-contrast);
        font-size: x-small;
    }

    .druids-timepill.druids-timepill-success {
        background: var(--ui-status-success);
        color: var(--ui-text-knockout);
    }
</style>
