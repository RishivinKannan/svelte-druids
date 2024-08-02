<script>
    import "../../css/global.css";
    import { lockupStyle } from "../../utils/component-helper";

    export let label = "";
    export let isAbove = false;
    export let className = "";
    export let hasBackground = false;
    export let size = "md";
    export let title = null;
    export let htmlFor = null;
    export let conditionality = null
    export let lockupSide = "FULL";
    export let style = "";

    $: sizeClass = `druids-label-${size}`;

    $: lockup = lockupStyle(lockupSide);
</script>

<label
    {title}
    for={htmlFor}
    class="druids-label {sizeClass} {className}"
    class:druids-label-above={isAbove}
    class:druids-label-background={hasBackground}
    style="{style} {lockup}"
    data-conditionality={conditionality}
    {...$$restProps}
>
    {#if label}
        {label}
    {:else}
        <slot />
    {/if}
</label>

<style>
    .druids-label {
        display: inline-block;
        font-size: medium;
        color: var(--ui-text);
        margin: 2px;
    }

    .druids-label[data-conditionality='required']:after{
        content: ' *';
        color: rgb(202, 2, 2);
    }
    .druids-label[data-conditionality='optional']:after{
        content: ' optional';
        font-size: x-small;
        position: relative;
        bottom:4px;
    }
    .druids-label.druids-label-above {
        display: block;
    }

    .druids-label.druids-label-background {
        padding: 6px 12px;
        background: var(--ui-border);
        border-radius: 4px;
        color: var(--ui-text-secondary);
    }

    .druids-label-xs {
        font-size: smaller;
    }
    .druids-label-sm {
        font-size: small;
    }
    .druids-label-md {
        font-size: medium;
    }
    .druids-label-lg {
        font-size: larger;
    }
</style>
