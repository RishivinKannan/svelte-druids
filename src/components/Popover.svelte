<script lang="ts">
    import { onMount } from "svelte";
    import { createPopper } from "@popperjs/core";
    import { flip } from "@popperjs/core";
    import { preventOverflow } from "@popperjs/core";
    import Badge from "./Badge.svelte";

    type Placement =
        | "auto"
        | "auto-start"
        | "auto-end"
        | "top"
        | "top-start"
        | "top-end"
        | "bottom"
        | "bottom-start"
        | "bottom-end"
        | "right"
        | "right-start"
        | "right-end"
        | "left"
        | "left-start"
        | "left-end";

    type Strategy = "absolute" | "fixed";

    type Rect = {
        width: number;
        height: number;
        x: number;
        y: number;
    };
    type OffsetFunc = ({
        popper,
        reference,
        placement,
    }: {
        popper: Rect;
        reference: Rect;
        placement: Placement;
    }) => [number?, number?];

    export let placement: Placement = "bottom-end";
    export let strategy: Strategy = "absolute";
    export let popperOffset: OffsetFunc | [number?, number?] = [0, 8];
    export let isHoverable = false;
    export let maxWidth: number = null;
    export let width: number = null;
    export let isRounded = false;

    $: maxWidthStyle = maxWidth ? `max-width: ${maxWidth}px ;` : "";
    $: widthStyle = maxWidth ? `width: ${width}px ;` : "";
    $: roundedStyle = !isRounded ? `border-radius: 0px;` : "";

    $: popperStyles = maxWidthStyle + widthStyle + roundedStyle;

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

        document.body.appendChild(outsideRef);

        outsideRef.addEventListener("click", hide);

        return () => {
            document.body.removeChild(outsideRef);
        };
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

<!-- <svelte:window on:resize={()=>popperInstance.update()}/> -->
<div>
    <span bind:this={triggerRef}>
        <slot name="trigger" />
    </span>

    <div style={popperStyles} bind:this={popperRef} id="druids-popover-popper">
        <slot name="popper" />
    </div>
</div>
<div id="druids-popover-outside" bind:this={outsideRef}></div>

<style>
    #druids-popover-popper {
        display: none;
        background: #fff;
        color: black;
        padding: 12px;
        border-radius: 6px;
        box-shadow: 0 6px 30px rgba(0, 0, 0, 0.2);
        z-index: 999;
        max-height: 300px;
        overflow-y: auto;
    }

    #druids-popover-outside {
        display: none;
        position: absolute;
        inset: 0;
        z-index: 998;
    }
</style>
