<script>
    import { onMount } from "svelte";
    import Badge from "./Badge.svelte";
    import Popover from "./Popover.svelte";
    import Table from "./Table.svelte";
    import { readable } from "svelte/store";

    export let tags = [];
    export let tagMaxWidth = null;
    export let lines = 1;
    export let gapX = 2;
    export let gapY = 2;
    export let size = "sm";
    export let beforeContent = "";
    export let afterContent = "";
    export let maxCount = null;
    export let expandType = "inline";

    $: tagsData = readable(
        tags.map((tag) => {
            return { tag: tag };
        }),
    );

    let columns = [
        {
            header: "Tags",
            accessor: "tag",
        },
    ];

    $: alltagsVisibility = alltagsShow
        ? "visibility: visible;"
        : "visibility: hidden; overflow:hidden;";

    $: rendertagsVisibility = !alltagsShow
        ? "visibility: visible;"
        : "visibility: hidden;";

    $: gapStyle = `gap: ${gapY}px ${gapX}px;`;

    let rendertags = [];
    let containerWidth = 0;
    let containerRef;

    let alltagsShow = false;

    function handleIndicatorClick() {
        alltagsShow = !alltagsShow;
    }

    onMount(() => {
        var resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                if (entry.target === containerRef) {
                    containerWidth = entry.contentRect.width;
                    calculateRendertags();
                }
            }
        });
        resizeObserver.observe(containerRef);
        calculateRendertags();
        return () => {
            resizeObserver.disconnect();
        };
    });

    function calculateRendertags() {
        let currentWidth = 0;

        currentWidth += beforeContent
            ? containerRef.querySelector("#alltags").children[0].offsetWidth
            : 0;

        let rowCount = 1;

        let indicatorWidth = containerRef.querySelector(
            "#overflow-indicator",
        )?.offsetWidth;
        let newVisibletags = [];

        for (let i = 0; i < (maxCount ? maxCount : tags.length); i++) {
            let tagWidth = 0;

            if (tagMaxWidth) {
                tagWidth = tagMaxWidth + gapX;
            } else {
                const alltagsDiv =
                    containerRef.querySelector("#alltags").children;
                const tagDiv = alltagsDiv[beforeContent ? i + 1 : i];

                tagWidth = tagDiv.offsetWidth + gapX;
            }

            let indicatorWidthValue =
                rowCount === lines
                    ? indicatorWidth
                        ? indicatorWidth + 3
                        : 0
                    : 0;

            if (
                currentWidth + tagWidth + indicatorWidthValue >
                containerWidth
            ) {
                rowCount += 1;
                currentWidth = tagWidth;
            } else {
                currentWidth += tagWidth;
            }

            if (rowCount <= lines) {
                newVisibletags.push(tags[i]);
            } else {
                break;
            }
        }
        rendertags = newVisibletags;
    }
</script>

<div bind:this={containerRef} class="druids-taglist-container">
    <div
        style="{gapStyle} {rendertagsVisibility}"
        class="druids-taglist-list druids-taglist-list-render"
    >
        {#if beforeContent}
            <div class="druids-taglist-contents">{beforeContent}</div>
        {/if}
        {#each rendertags as tag}
            <Badge label={tag} {size} />
        {/each}

        {#if tags.length !== rendertags.length}
            {#if expandType == "inline"}
                <button
                    on:click={handleIndicatorClick}
                    id="overflow-indicator"
                    class="druids-taglist-overflow-indicator"
                    >+{tags.length - rendertags.length}</button
                >
            {:else if expandType == "popover"}
                <Popover
                    maxWidth={300}
                    popoverClassName="druids-taglist-popover"
                >
                    <button
                        slot="trigger"
                        style="background-color: inherit;"
                        id="overflow-indicator"
                        class="druids-taglist-overflow-indicator"
                        >+{tags.length - rendertags.length}</button
                    >
                    <div slot="popper" style="width:100%">
                        <Table data={tagsData} {columns} />
                    </div>
                </Popover>
            {:else}
                <button
                    id="overflow-indicator"
                    class="druids-taglist-overflow-indicator"
                    >+{tags.length - rendertags.length}</button
                >
            {/if}
        {:else if afterContent}
            <div class="druids-taglist-contents">{afterContent}</div>
        {/if}
    </div>

    <div
        id="alltags"
        style="{gapStyle} {alltagsVisibility} position: absolute; inset: 0;"
        class="druids-taglist-list druids-taglist-list-all"
    >
        {#if beforeContent}
            <div class="druids-taglist-contents">{beforeContent}</div>
        {/if}
        {#each tags as tag, index}
            <Badge label={tag} {size} />
        {/each}
        {#if afterContent}
            <div class="druids-taglist-contents">{afterContent}</div>
        {/if}
        <button
            on:click={handleIndicatorClick}
            id="overflow-indicator"
            class="druids-taglist-overflow-indicator">less</button
        >
    </div>
</div>

<style>
    .druids-taglist-container {
        width: auto;
        position: relative;
        box-sizing: border-box;
        padding: 4px;
    }

    .druids-taglist-list {
        display: flex;
        flex-wrap: wrap;
    }
    .druids-taglist-list-render {
        overflow: hidden;
    }

    .druids-taglist-list-all {
        z-index: 0;
    }
    .druids-taglist-contents {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .druids-taglist-overflow-indicator {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 4px;
        font-style: italic;
    }
</style>
