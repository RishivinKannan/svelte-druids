<script>
    import { onMount } from "svelte";

    import Popover from "../Popover.svelte";
    import Table, { renderComponent } from "../Table.svelte";
    import Tag from "./Tag.svelte";

    /**
     *   Array of string | Array of objects which is props of each tag exclude size prop
     *   eg. ['tag','tag'] | [{label:'tag',icon: Icon, iconColor:"black" }]
     * @type {array} tags that are to be render.
     */
    export let tags = [];

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
     * @type {"xs" | "sm" | "md" | "lg"} size of the tags.
     */
    export let size = "sm";

    /**
     * @type {string} content that placed before the tagList.
     */
    export let beforeContent = "";

    /**
     * @type {string} content that placed after the tagList.
     */
    export let afterContent = "";

    /**
     * @type {"popover" | "inline"} when click on the indicator button, it will show the alltags in inline or Popover.
     */
    export let expandType = "popover";

    /**
     * @type {number} maxCount of visible tags to be render.
     */
    export let maxCount = null;
    /**
     * @type {number} specify the width of the space for each tags to be render.
        Optional
     */
    export let tagMaxWidth = null;

    $: tagsData = tags.map((tag) =>
        typeof tag === "object" ? tag : { label: tag },
    );

    let columns = [
        {
            header: "Tags",
            accessorKey: "label",
            render: ({ value, props }) =>
                renderComponent(Tag, { ...props.row.original, label: value }),
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

    let rendered = false;

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
        rendered = true;
        return () => {
            resizeObserver.disconnect();
        };
    });

    // whenever line props change it will rerender. rendered used for calculateRenderTags only after onMount;
    $: {
        if (rendered & (lines > 0)) calculateRendertags();
    }
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
            {#if typeof tag === "object"}
                <Tag {...tag} {size} />
            {:else}
                <Tag label={tag} {size} />
            {/if}
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
                <Popover maxWidth={300}>
                    <button
                        slot="trigger"
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
        {#each tags as tag}
            {#if typeof tag === "object"}
                <Tag {...tag} {size} />
            {:else}
                <Tag label={tag} {size} />
            {/if}
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
        background: var(--ui-background-elevated);
        color: var(--ui-text);
        margin-left: 4px;
        font-style: italic;
        border: solid 2px var(--ui-border);
        border-radius: 4px;
        padding: 2px 6px;
        cursor: pointer;
    }
</style>
