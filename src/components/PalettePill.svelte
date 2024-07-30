<script>
    import "../css/global.css";

    /*
     * @type {string|string[]}
     */
    export let colors = "#ffffff";
    export let size = "md";
    export let hasBorder = true;
    export let hasTitle = false;

    $: sizeClass = `druids-colorpalette-${size}`;
    $: isSquareClass =
        typeof colors === "string"
            ? "druids-isSquare"
            : colors.length === 1
              ? "druids-isSquare"
              : "";
</script>

<div
    class="druids-colorpalette {sizeClass} {isSquareClass}"
    data-border={hasBorder}
>
    {#if typeof colors === "string"}
        <div
            style="background-color: {colors};"
            title={hasTitle ? colors : ""}
        ></div>
    {:else}
        {#each colors as color}
            <div
                style="background-color: {color};"
                title={hasTitle ? color : ""}
            ></div>
        {/each}
    {/if}
</div>

<style>
    .druids-colorpalette {
        display: inline-flex;
        flex-wrap: nowrap;
        width: 29px;
        height: 16px;
        border-radius: 4px;
        overflow: hidden;
    }

    .druids-colorpalette[data-border="true"] {
        border: 0.5px solid var(--ui-border);
        background: var(--ui-border);
    }

    .druids-colorpalette.druids-isSquare {
        width: 18px;
        height: 18px;
        border-radius: 3px;
    }

    .druids-colorpalette-md {
        width: 29px;
        height: 16px;
    }
    .druids-colorpalette-md.druids-isSquare {
        width: 18px;
        height: 18px;
    }

    .druids-colorpalette-xs,
    .druids-colorpalette-sm {
        width: 23px;
        height: 12px;
    }
    .druids-colorpalette-xs.druids-isSquare {
        width: 12px;
        height: 12px;
    }

    .druids-colorpalette-sm.druids-isSquare {
        width: 15px;
        height: 15px;
    }

    .druids-colorpalette-lg {
        width: 35px;
        height: 20px;
    }
    .druids-colorpalette-lg.druids-isSquare {
        width: 20px;
        height: 20px;
    }

    .druids-colorpalette div {
        height: 100%;
        width: 100%;
    }
</style>
