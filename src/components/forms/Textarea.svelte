<script>
    import { onMount } from "svelte";
    import { tooltip } from "../Tooltip.svelte";
    import "../../css/global.css";
    import { lockupStyle } from "../../utils/component-helper";

    export let value = "";
    export let width = 240;
    export let size = "md";
    export let style = "";
    export let placeholder = "";
    export let level = "default";
    export let isSoft = false;
    export let isDisabled = false;
    export let isLoading = false;
    export let isReadOnly = false;
    export let isFullWidth = false;
    export let defaultRows = 2;
    export let maxRows = null;

    export let validationLevel = null;
    export let validationMessage = null;
    export let hasValidationIcon = true;
    export let focusOnMount = false;
    export let selectOnMount = false;

    export let lockupSide = "FULL";

    export let onEscacpe = () => {};
    export let onReturn = () => {};

    let ref;

    $: lockup = lockupStyle(lockupSide);

    $: sizeClass = `druids-input-${size}`;

    $: levelName = validationMessage
        ? validationLevel
            ? validationLevel
            : level
        : level;

    $: levelVar = levelName
        ? `--druids-input-color:var(--ui-status-${levelName});--druids-input-color-soft:var(--ui-status-${levelName}-soft);`
        : "";

    $: widthVar = isFullWidth
        ? `--druids-input-width:100%;`
        : typeof width === "string"
          ? `--druids-input-width: ${width};`
          : `--druids-input-width: ${width}px;`;

    function keyUpHandler(e) {
        if (e.key === "Escape") {
            onEscacpe();
        }
        if (e.key === "Enter") {
            onReturn();
        }
    }

    onMount(() => {
        if (focusOnMount) ref.focus();
        if (selectOnMount) ref.select();

        if (maxRows) {
            function getLineHeight(element) {
                const style = window.getComputedStyle(element);
                const lineHeight = parseInt(style.lineHeight);

                if (isNaN(lineHeight)) {
                    const fontSize = parseInt(style.fontSize);
                    return fontSize * 1.4;
                }

                return lineHeight;
            }

            ref.addEventListener("input", function () {
                const lineHeight = getLineHeight(ref);
                const maxHeight = lineHeight * maxRows;

                ref.style.height = "auto"; // Reset the height
                if (ref.scrollHeight > maxHeight) {
                    ref.style.height = `${maxHeight}px`;
                    ref.style.overflowY = "auto";
                } else {
                    ref.style.height = `${ref.scrollHeight}px`;
                    ref.style.overflowY = "hidden";
                }
            });
        }
    });
</script>

<div
    class="druids-input-container"
    class:druids-input-fullwidth={isFullWidth}
    style="{widthVar}{levelVar}{style}{lockup}"
>
    <textarea
        class="druids-input {sizeClass}"
        class:druids-input-soft={isSoft}
        bind:this={ref}
        {placeholder}
        bind:value
        readonly={isReadOnly}
        disabled={isDisabled | isLoading}
        on:change
        on:click
        on:blur
        on:focus
        on:mouseenter
        on:mouseleave
        on:mouseover
        on:mousedown
        on:keypress={keyUpHandler}
        rows={defaultRows}
        {...$$restProps}
    />
    {#if validationMessage}
        {#if hasValidationIcon}
            <div class="druids-input-message"></div>
        {/if}
        <div
            class="druids-input-tooltip"
            use:tooltip={{ content: validationMessage }}
        ></div>
    {/if}
</div>

<style>
    .druids-input-tooltip {
        position: absolute;
        background: transparent;
        inset: 0;
    }
    .druids-input-message {
        position: absolute;
        top: 0;
        right: 0;
        transform: translateX(50%) translateY(-50%);
        width: 12px;
        height: 12px;
        background: var(--druids-input-color);
        border-radius: 100%;
    }

    .druids-input-container {
        position: relative;
        box-sizing: border-box;
        display: inline-block;
        max-width: 100%;
        outline: 1px solid var(--druids-input-color, var(--ui-border));
        border-radius: 4px;
        padding: 8px 12px;
    }
    .druids-input-container.druids-input-fullwidth {
        width: 100%;
    }

    .druids-input.druids-input-md {
        font-size: medium;
    }
    .druids-input.druids-input-lg {
        font-size: larger;
    }

    .druids-input {
        all: unset;
        width: var(--druids-input-width, 240px);
        max-width: var(--druids-input-width, 240px);
        color: var(--ui-text);
        z-index: 1;
        word-wrap: break-word;
    }
    .druids-input-container:has(.druids-input:disabled) {
        background: var(--ui-background-secondary);
        outline: var(--ui-border);
    }
    .druids-input:disabled,
    .druids-input:disabled::placeholder {
        color: var(--ui-text-disabled);
        cursor: not-allowed;
    }

    .druids-input-container:has(.druids-input:focus) {
        outline: 1px solid
            var(--druids-input-color, var(--ui-interaction-primary));
        background: var(
            --druids-input-color-soft,
            var(--ui-interaction-secondary)
        );
    }

    .druids-input::placeholder {
        color: var(--ui-text-secondary);
    }

    .druids-input-container.druids-input-soft {
        background: var(--ui-status-other-soft);
    }
</style>
