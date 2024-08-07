<script>
    import "../../css/global.css";
    import ExternalLinkIcon from "../icons/ExternalLinkIcon.svelte";
    export let label = null;
    export let href;
    export let ref;
    export let title = null;
    export let size = "md";
    export let isExternal = false;
    export let hasExternalIcon = true;
    export let isFullWidth = false;
    export let isInline = false;
    export let shouldBeUnderlined = true;
    export let className = "";

    /**
     * @type {'default'|'plain'|'color-on-hover'|'no-classname'}
     */
    export let linkType = "default";

    $: sizeClass = `druids-link-${size}`;

    $: linkTypeClass = `druids-link-${linkType}`;
</script>

<a
    {href}
    {title}
    bind:this={ref}
    target={isExternal ? "_blank" : "_self"}
    class="druids-link {sizeClass} {linkTypeClass} {className}"
    class:druids-fullwidth={isFullWidth}
    class:druids-inline={isInline}
    class:druids-nounderline={!shouldBeUnderlined}
    {...$$restProps}
>
    {#if label}
        {label}
    {:else}
        <slot />
    {/if}
    {#if isExternal & hasExternalIcon}
        <span class="druids-external">
            <ExternalLinkIcon />
        </span>
    {/if}
</a>

<style>
    .druids-link {
        display: inline-flex;
        gap: 2px;
    }
    .druids-link.druids-inline{
        display: inline;
        box-sizing: border-box;
        vertical-align: middle;
    }
    .druids-external{
        display: inline-flex;
        justify-content: center;
        align-items: center;
        vertical-align: text-top;
    }

    .druids-link.druids-fullwidth{
        width: 100%;
    }
    .druids-link-xxs {
        font-size: small;
    }

    .druids-link-xs {
        font-size: smaller;
    }
    .druids-link-sm {
        font-size: medium;
    }
    .druids-link-md {
        font-size: large;
    }
    .druids-link-lg {
        font-size: x-large;
    }

    .druids-link.druids-link-default {
        text-decoration: none;
        color: var(--ui-interaction-primary);
    }
    .druids-link.druids-link-default:hover {
        color: var(--ui-link-hover);
    }

    .druids-link.druids-link-plain {
        color: var(--ui-text);
        text-decoration: none;
    }

    .druids-link.druids-link-plain:hover {
        color: var(--ui-text);
    }

    .druids-link.druids-link-color-on-hover {
        text-decoration: none;
        color: var(--ui-text);
    }

    .druids-link.druids-link-color-on-hover:hover {
        color: var(--ui-interaction-primary);
    }
</style>
