<script>
    import { onMount } from "svelte";
    import Popover from "./Popover.svelte";

    export let label = null;

    export let maxWidth = null;
    let el;

    let overflowed = false;

    $:Style = maxWidth ? typeof maxWidth === 'bigint'? `--overflower-max-width:${maxWidth};`: `--overflower-max-width:${maxWidth}px;` : "--overflower-max-width: none;";

    onMount(() => {
        var resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                if (entry.target === el) {
                    console.log(true)
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

<Popover isHoverable shouldVisible={overflowed} isPadded={false} maxWidth={500}>
<div slot="trigger" class="druids-overflower" bind:this={el} style={Style}>
    {#if label}
        {@html label}
    {:else}
        <slot />
    {/if}
</div>


    <div slot="popper" class='druids-overflower-popper'>
        {#if label}
            {label}
        {:else}
            <slot />
        {/if}
    </div>
</Popover>

<style>
    .druids-overflower {
        max-width: var(--overflower-max-width);
        min-width: 0;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .druids-overflower-popper{
        font-size: small;
        padding: 4px 8px;
        text-wrap: wrap;
    }
</style>
