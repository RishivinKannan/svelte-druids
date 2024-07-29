<script>
    import { onMount } from "svelte";
    import Popover from "./Popover.svelte";
    import Tooltip from "./Tooltip.svelte";

    export let label = null;

    export let allowOverflow = false;

    export let maxWidth = null;

    export let tolltipContent;
    let el;

    let overflowed = false;

    $: Style = maxWidth
        ? typeof maxWidth === "bigint"
            ? `--overflower-max-width:${maxWidth};`
            : `--overflower-max-width:${maxWidth}px;`
        : "--overflower-max-width: 100%;";

    onMount(() => {
        var resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                if (entry.target === el) {
                    console.log(true);
                    overflowed = isOverflowing(el);
                }
            }
        });

        resizeObserver.observe(el);
        overflowed = isOverflowing(el);

        return () => {
            resizeObserver.disconnect();
        };
    });

    function isOverflowing(el) {
        let isOverflowing =
            el.clientWidth < el.scrollWidth ||
            el.clientHeight < el.scrollHeight;
        return isOverflowing;
    }
</script>

{#if allowOverflow}
    {#if label}
        {@html label}
    {:else}
        <slot />
    {/if}
{:else}
    <Tooltip content={label?label:tolltipContent} hasTooltip={overflowed}>
        <div class="druids-overflower" bind:this={el} style={Style}>
            {#if label}
                {@html label}
            {:else}
                <slot />
            {/if}
        </div>
    </Tooltip>
{/if}

<style>
    .druids-overflower {
        max-width: var(--overflower-max-width);
        min-width: 0;
        white-space: nowrap;
        text-wrap: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

</style>
