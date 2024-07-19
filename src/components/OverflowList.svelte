<script>
    import { onMount } from "svelte";
    import { portal } from "./Portal/Portal.svelte";

    export let lines = 1;
    export let gapX = 4;
    export let gapY = 4;
    export let maxCount = null;
    export let style = "";
    export let justify = "";
    export let alignItems = "";
    export let height = "auto";

    let allContainer;
    let containerRef;
    let indicatorRef;
    let remaining = 0;

    let containerWidth = 0;
    let children;

    $: flexStyle = `justify-content: ${justify}; align-items: ${alignItems};`;
    $: heightStyle = `height: ${height};`;
    $: gapStyle = `gap: ${gapY}px ${gapX}px;`;

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
        children = allContainer.children;
        calculateRender();

        return () => {
            resizeObserver.disconnect();
        };
    });

    function calculateRender() {
        allContainer.style.display = "flex";
        let currentWidth = 0;
        let rowCount = 1;
        let visibleElements = [];
        let length = maxCount ? maxCount : children.length;
        for (let i = 0; i < length; i++) {
            let elementWidth = 0;

            elementWidth = children[i].offsetWidth + gapX;

            let indicatorWidth =
                rowCount === lines ? indicatorRef.offsetWidth + 3 : 0;
            if (currentWidth + elementWidth + indicatorWidth > containerWidth) {
                rowCount += 1;
                currentWidth = elementWidth;
            } else {
                currentWidth += elementWidth;
            }

            if (rowCount <= lines) {
                visibleElements = [
                    ...visibleElements,
                    children[i].cloneNode(true),
                ];
            } else {
                break;
            }
        }
        let newremaining = children.length - visibleElements.length;
        if (remaining != newremaining) {
            remaining = newremaining;
            containerRef.replaceChildren(...visibleElements);
            if (remaining > 0) {
                indicatorRef.replaceChildren(`+${remaining}`);
                containerRef.appendChild(indicatorRef);
            }
        }
        allContainer.style.display = "none";
    }
</script>

<div
    bind:this={containerRef}
    class="druids-overflow-container"
    style=" {gapStyle} {flexStyle} {heightStyle} {style}"
></div>
<div
    use:portal={"body"}
    bind:this={allContainer}
    style="visibility:hidden; position:absolute;"
    class="druids-overflow-container"
>
    <slot />
    <button bind:this={indicatorRef} class="druids-overflow-indicator"></button>
</div>

<style>
    .druids-overflow-container {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }

    .druids-overflow-indicator {
        all: unset;
        padding: 4px;
        font-size: small;
    }
</style>
