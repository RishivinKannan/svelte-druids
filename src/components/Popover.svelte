<script>
    import { onMount } from "svelte";
    import { createPopper } from "@popperjs/core";
    import { flip } from "@popperjs/core";
    import { preventOverflow } from "@popperjs/core";
    import Badge from "./Badge.svelte";
    import { portal } from "./Portal/Portal.svelte";

    // type Strategy = "absolute" | "fixed";

    // type Rect = {
    //     width: number;
    //     height: number;
    //     x: number;
    //     y: number;
    // };
    /**
     * @typedef { ("auto"| "auto-start"| "auto-end"| "top"| "top-start"| "top-end"| "bottom"| "bottom-start"| "bottom-end"| "right"| "right-start"| "right-end"| "left"| "left-start"| "left-end")} Placement
     * @type {Placement}
     */
    export let placement = "bottom-end";
    /**
     * @type {"absolute"|"inline"}
     */
    export let strategy = "absolute";

    /**
     *
     * @typedef {({popper,reference,placement}: {popper: Rect; reference: Rect;placement: Placement;}) => [number?, number?]} OffsetFunc
     * @typedef {{width: number  height: number   x: number;  y: number}} Rect
     * @type {OffsetFunc | [number?,number?]}
     */
    export let popperOffset = [0, 8];
    export let isHoverable = false;
    /**
     * @type {number}
     */
    export let maxWidth = null;
    export let maxHeight = null;
    /**
     * @type {number}
     */
    export let width = null;
    export let isRounded = false;
    export let isPadded = true;

    $: maxWidthStyle = maxWidth ? `max-width: ${maxWidth}px ;` : "";
    $: maxHeightStyle = maxHeight ? `max-height: ${maxHeight}px ;` : "";
    $: widthStyle = width ? `width: ${width}px ;` : "width: auto;";
    $: roundedStyle = !isRounded ? `border-radius: 0px;` : "";
    $: paddingStyle = isPadded ? "padding: 12px;" : "";

    $: popperStyles = maxWidthStyle + widthStyle + roundedStyle + paddingStyle;

    let showEvents = [];
    let hideEvents = [];

    $: isHoverable
        ? (showEvents = ["mouseenter", "focus"])
        : (showEvents = ["click", "focus"]);
    $: isHoverable ? (hideEvents = ["mouseleave", "blur"]) : (hideEvents = []);

    let triggerRef;
    let popperRef;
    let popperInstance;
    let outsideRef;

    onMount(() => {
        popperInstance = createPopper(triggerRef.children[0], popperRef, {
            placement,
            strategy,
            modifiers: [
                flip,
                preventOverflow,
                {
                    name: "offset",
                    options: {
                        offset: popperOffset,
                    },
                },
            ],
        });

        showEvents.forEach((event) => {
            triggerRef.children[0].addEventListener(event, show);
        });
        hideEvents.forEach((event) => {
            triggerRef.children[0].addEventListener(event, hide);
        });

        outsideRef.addEventListener("click", hide);
    });

    function show() {
        popperRef.style.display = "block";
        if (!isHoverable) outsideRef.style.display = "block";

        popperInstance.setOptions((options) => ({
            ...options,
            modifiers: [
                ...options.modifiers,
                { name: "eventListeners", enabled: true },
            ],
        }));

        popperInstance.update();
    }

    function hide() {
        popperRef.style.display = "none";
        outsideRef.style.display = "none";

        popperInstance.setOptions((options) => ({
            ...options,
            modifiers: [
                ...options.modifiers,
                { name: "eventListeners", enabled: false },
            ],
        }));
    }
</script>

<div>
    <span bind:this={triggerRef}>
        <slot name="trigger" />
    </span>

    <div style={popperStyles} bind:this={popperRef} id="druids-popover-popper">
        <slot name="popper" {hide} />
    </div>
</div>

<div
    use:portal={"body"}
    class="druids-popover-outside"
    bind:this={outsideRef}
></div>

<style>
    #druids-popover-popper {
        display: none;
        background: var(--ui-background);
        color: var(--ui-text);
        border-radius: 6px;
        box-shadow: 0 6px 30px rgba(0, 0, 0, 0.2);
        z-index: 999;
        max-height: 300px;
    }

    .druids-popover-outside {
        display: none;
        position: absolute;
        inset: 0;
        z-index: 989;
    }
</style>
