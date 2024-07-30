<script context="module">
    import { createTippy } from "../utils/tippy.js";
    const tippy = createTippy({
        maxWidth: "none",
        theme: "dark",
        placement: "auto",
    });

    export { tippy as tooltip };
</script>

<script>
    import "../css/global.css";
    import "tippy.js/dist/tippy.css";

    export let content;
    export let hasTooltip = true;
    export let allowHTML = false;
</script>

<span
    use:tippy={{ content, allowHTML }}
    data-tooltip-disabled={!hasTooltip}
    style="max-width: 100%;"
>
    <slot />
</span>

<style>
    span {
        cursor: inherit;
    }
    span[data-tooltip-disabled="true"] {
        cursor: inherit;
        pointer-events: none;
    }
    :global(.tippy-box[data-theme~="dark"]) {
        background-color: var(--ui-background-shade);
        color: var(--ui-text-knockout);
    }
    :global(
            .tippy-box[data-theme~="dark"][data-placement^="bottom"]
                > .tippy-arrow::before
        ) {
        border-bottom-color: var(--ui-background-shade);
    }
    :global(
            .tippy-box[data-theme~="dark"][data-placement^="top"]
                > .tippy-arrow::before
        ) {
        border-top-color: var(--ui-background-shade);
    }
    :global(
            .tippy-box[data-theme~="dark"][data-placement^="left"]
                > .tippy-arrow::before
        ) {
        border-left-color: var(--ui-background-shade);
    }
    :global(
            .tippy-box[data-theme~="dark"][data-placement^="right"]
                > .tippy-arrow::before
        ) {
        border-right-color: var(--ui-background-shade);
    }
</style>
