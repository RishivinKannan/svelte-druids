<script>
    import { renderComponent } from "@tanstack/svelte-table";
    import Popover from "./Popover.svelte";
    import Table from "./Table.svelte";
    import { onMount } from "svelte";
    /**
     *   Array of props whicch will pass to the component. Required.
     * @type {array}
     */
    export let props = [];

    /**
     *  Component to be render. Required.
     */
    export let comp;

    /**
     *  This helps to find label in props that can be search in the table. Required.
     * @type {string}
     */
    export let accessorKey;

    /**
     * @type {number}
     * How many lines of tags to be render?
     */
    export let lines = 1;

    /**
     * @type {number} gap between tags in X-axis.
     */
    export let gapX = 2;

    /**
     * @type {number} gap between tags in Y-axis.
     */
    export let gapY = 2;

    /**
     * @type {string} content that placed before the customOverflow.
     */
    export let beforeContent = "";

    /**
     * @type {string} content that placed after the customOverflow.
     */
    export let afterContent = "";

    /**
     * @type {number} maxCount of visible tags to be render.
     */
    export let maxCount = null;


    $: gapStyle = `gap: ${gapY}px ${gapX}px;`;

    let allElementsRef;
    let containerRef;
    let overflowIndicatorRef;

    let containerWidth=0;


    let columns = [
        {
            header:accessorKey,
            accessorKey,
            cell: ({row})=> {
                return renderComponent(comp,row.original)}
        }
    ]


    let renderElements = []

    onMount(() => {
        var resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                if (entry.target === containerRef) {
                    containerWidth = entry.contentRect.width;
                    calculateRender();
                }
            }
        });
        resizeObserver.observe(containerRef);
        calculateRender();
        return () => {
            resizeObserver.disconnect();
        };
    });

    function calculateRender() {
        let currentWidth = 0;


        currentWidth += beforeContent
            ? allElementsRef.children[0].offsetWidth
            : 0;

        let rowCount = 1;

        let indicatorWidth = overflowIndicatorRef?.offsetWidth;
        let newElementList = [];

        for (let i = 0; i < (maxCount ? maxCount : props.length); i++) {
            let elementWidth = 0;
            
            const alltagsDiv = allElementsRef.children;
            const tagDiv = alltagsDiv[beforeContent ? i + 1 : i];
            
            elementWidth = tagDiv.offsetWidth + gapX;

            let indicatorWidthValue =
                rowCount === lines
                    ? indicatorWidth
                        ? indicatorWidth + 3
                        : 0
                    : 0;

            if (
                currentWidth + elementWidth + indicatorWidthValue >
                containerWidth
            ) {
                rowCount += 1;
                currentWidth = elementWidth;
            } else {
                currentWidth += elementWidth;
            }

            if (rowCount <= lines) {
                newElementList.push(props[i]);
            } else {
                break;
            }
        }
        renderElements = newElementList;
    }
</script>

<div bind:this={containerRef} class="druids-customOverflow-container">
    <div
        style={gapStyle}
        class="druids-customOverflow-list druids-customOverflow-list-render"
    >
        {#if beforeContent}
            <div class="druids-customOverflow-contents">{beforeContent}</div>
        {/if}
        {#each renderElements as prop}
            <svelte:component this={comp} {...prop}></svelte:component>
        {/each}

        {#if props.length !== renderElements.length}
            <Popover maxWidth={300}>
                <button
                    slot="trigger"
                    style="background-color: inherit;"
                    bind:this={overflowIndicatorRef}
                    class="druids-customOverflow-overflow-indicator"
                    >+{props.length - renderElements.length}</button
                >
                <div slot="popper" style="width:100%">
                    <Table data={props} {columns} searchPlaceholder="Search here..." />
                </div>
            </Popover>
        {:else if afterContent}
            <div class="druids-customOverflow-contents">{afterContent}</div>
        {/if}
    </div>
</div>

<div
    bind:this={allElementsRef}
    style="{gapStyle} position: absolute; inset: 0;"
    class="druids-customOverflow-list druids-customOverflow-list-all"
>
    {#if beforeContent}
        <div class="druids-customOverflow-contents">{beforeContent}</div>
    {/if}

    {#each props as prop}
        <svelte:component this={comp} {...prop} />
    {/each}

    {#if afterContent}
        <div class="druids-customOverflow-contents">{afterContent}</div>
    {/if}
</div>

<style>
    .druids-customOverflow-container {
        box-sizing: border-box;
        padding: 4px;
        
    }

    .druids-customOverflow-list {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }
    .druids-customOverflow-list-render {
        overflow: hidden;
    }

    .druids-customOverflow-list-all {
        position: absolute;
        visibility: hidden;
        z-index: -999;
    }
    .druids-customOverflow-contents {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .druids-customOverflow-overflow-indicator {
        margin-left: 4px;
        font-style: italic;
        border: solid 2px var(--ui-border);
        border-radius: 4px;
        padding: 2px 6px;
    }
</style>
