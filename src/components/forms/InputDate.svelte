<script>
    import { onMount } from "svelte";
    import { tooltip } from "../Tooltip.svelte";
    import "../../css/global.css";
    import Loading from "../icons/Loading.svelte";
    import { lockupStyle } from "../../utils/component-helper";


    export let icon = null;
    export let iconProps = {};
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

    export let validationLevel = null;
    export let validationMessage = null;
    export let hasValidationIcon = true;
    export let focusOnMount = false;
    export let selectOnMount =false;

    export let lockupSide = 'FULL';


    export let onEscacpe =()=>{}
    export let onReturn =()=>{}

    let ref;

    $:lockup = lockupStyle(lockupSide)

    $: sizeClass = `druids-input-${size}`;

    $: levelName = validationMessage
        ? validationLevel
            ? validationLevel
            : level
        : level;

    $: levelVar = levelName
        ? `--druids-input-color:var(--ui-status-${levelName});--druids-input-color-soft:var(--ui-status-${levelName}-soft);`
        : "";

    $: widthVar =
        typeof width === "string"
            ? `--druids-input-width: ${width};`
            : `--druids-input-width: ${width}px;`;


    function keyUpHandler(e){
        if(e.key==='Escape'){
            onEscacpe()
        }
        if(e.key === 'Enter'){
            onReturn()
        }
    }

    onMount(() => {
        if (focusOnMount) ref.focus();
        if(selectOnMount) ref.select();
    });
</script>

<div
    class="druids-input-container {sizeClass}"
    class:druids-input-fullwidth={isFullWidth}
    class:druids-input-soft={isSoft}
    style="{widthVar}{levelVar}{style}{lockup}"
>
    {#if isLoading}
        <span class="druids-input-loading"><Loading /> </span>
    {:else if icon}
        <svelte:component this={icon} {...iconProps} />
    {/if}
    <input
        bind:this={ref}
        type="date"
        {placeholder}
        bind:value
        readonly={isReadOnly}
        disabled={isDisabled | isLoading}
        class="druids-input"
        class:druids-input-fullwidth={isFullWidth}
        on:keypress={keyUpHandler}
        on:change
        on:click
        on:blur
        on:focus
        on:mouseenter
        on:mouseleave
        on:mouseover
        on:mousedown
        on:keyup
        on:keydown
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

    .druids-input-loading {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: var(--ui-text);
        animation: spin 1s linear infinite;
    }
    .druids-input-container {
        position: relative;
        display: inline-flex;
        gap: 4px;
        box-sizing: border-box;
        flex-wrap: nowrap;
        align-items: center;
        outline: 1px solid var(--druids-input-color, var(--ui-border));
        padding: 4px 8px;
        border-radius: 4px;
        color: var(--ui-icon);
        max-width: 100%;
        margin: 2px;
    }
    .druids-input-container.druids-input-fullwidth {
        width: 100%;
    }
    .druids-input.druids-input-fullwidth {
        flex-grow: 1;
    }
    .druids-input-xs {
        font-size: smaller;
    }
    .druids-input-sm {
        font-size: small;
    }
    .druids-input-md {
        font-size: medium;
    }
    .druids-input-lg {
        font-size: larger;
        padding: 6px 12px;
    }

    .druids-input {
        all: unset;
        width: var(--druids-input-width, 240px);
        color: var(--ui-text);
        z-index: 1;
        max-width: 100%;
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
