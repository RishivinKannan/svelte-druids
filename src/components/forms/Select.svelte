<script>
    import { createPopper, flip, preventOverflow } from "@popperjs/core";
    import { onMount } from "svelte";
    import "../../css/global.css";
    import clickOutside from "../../utils/clickOutside";
    import DropdownArrow from "../icons/DropdownArrow.svelte";
    import { lockupStyle } from "../../utils/component-helper";
    import Loading from "../icons/Loading.svelte";

    export let options = [];
    export let value = null;
    export let placeholder = "Placeholder";
    export let disabled = false;
    export let focusOnMount = false;
    export let hasArrow = true;
    export let clearable = false;
    export let noSearchText = "No Results Found";
    export let lockupSide = "FULL";
    export let maxOpenWidth = "";
    export let maxOpenHeight = "";
    export let minOpenWidth = "";
    export let minOpenHeight = "";

    export let id = null;
    export let name = null;

    export let minWidth = "";
    export let maxWidth = "";

    export let filterFn = defaultFilter;
    export let onChange = (option) => {};
    export let onFocus = () => {};
    export let onInputChange = (value) => {};
    export let onInputKeyUp = () => {};
    export let onBlur = () => {};
    export let onClose = () => {};

    export let optionRender = null;
    export let valueRender = null;

    export let inputName = null;
    export let isBorderless = false;
    export let isFullWidth = false;
    export let isLoading = false;
    export let onCloseResetInput = false;
    export let onBlurResetInput = false;
    export let onSelectResetInput = true;

    export let size = "md";
    export let className = "";
    export let style = "";

    $: lockup = lockupStyle(lockupSide);
    $: sizeClass = `druids-select-${size}`;

    let inputVal = "";
    let display = false;
    let inputRef;
    let selectRef;
    let popperRef;
    let popperInstance;

    let focusIdx = 0;

    function handleSelectBlur(e) {
        if (onBlurResetInput) {
            inputVal = "";
        }
        onBlur(e);
    }

    function defaultFilter(options, input) {
        return options.filter((opt) =>
            opt.label.toLowerCase().includes(input.toLowerCase()),
        );
    }

    function handleSelect(opt) {
        hide();
        value = opt;
        onChange(opt);
        if (onSelectResetInput) {
            inputVal = "";
        }
    }

    function handleClose() {
        hide();
        onClose();
        if (onCloseResetInput) {
            inputVal = "";
        }
    }

    function handleOpen() {
        if (!disabled) {
            show();
        }
    }

    function handleSelectKeyUp(e) {
        if ((e.key === "Enter") & !display) {
            handleOpen();
        }
    }

    function handleOptionKeyDown(e) {
        if (display) {
            if (e.key === "ArrowUp") {
                if (focusIdx > 0) focusIdx = focusIdx - 1;
                else focusIdx = filterFn(options, inputVal).length - 1;
            }
            if (e.key === "ArrowDown") {
                if (focusIdx < filterFn(options, inputVal).length - 1)
                    focusIdx = focusIdx + 1;
                else focusIdx = 0;
            }
            if (e.key === "Enter") {
                handleSelect(filterFn(options, inputVal)[focusIdx]);
            }
            if (e.key === "Escape") {
                handleClose();
                selectRef.focus();
            }
        }
    }

    function show() {
        display = true;
        popperRef.style.display = "block";

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
        display = false;
        popperRef.style.display = "none";

        popperInstance.setOptions((options) => ({
            ...options,
            modifiers: [
                ...options.modifiers,
                { name: "eventListeners", enabled: false },
            ],
        }));
    }

    onMount(() => {
        if (focusOnMount) {
            selectRef.focus();
        }
        popperInstance = createPopper(selectRef, popperRef, {
            placement: "bottom-start",
            strategy: "absolute",
            modifiers: [
                flip,
                preventOverflow,
                {
                    name: "offset",
                    options: {
                        offset: [-1, -selectRef.offsetHeight - 1],
                    },
                },
            ],
        });
    });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<button
    class="druids-select {sizeClass} {className}"
    class:druids-select-borderless={isBorderless}
    class:druids-select-fullwidth={isFullWidth}
    style="min-width:{minWidth || 'initial'};max-width:{maxWidth ||
        'initial'};{lockup}{style}"
    {disabled}
    bind:this={selectRef}
    on:keyup={handleSelectKeyUp}
    on:focus={onFocus}
    on:blur={handleSelectBlur}
>
    {#if value}
        {#if valueRender}
            <svelte:component
                this={valueRender}
                {...value}
                on:click={handleOpen}
                class="option"
            />
        {:else}
            <option {...value} on:click={handleOpen} class="option" />
        {/if}
        {#if clearable}
            <button class="druids-select-clear" on:click={() => (value = "")}
                >⤬</button
            >
        {/if}
    {:else}
        <option
            label={placeholder}
            on:click={handleOpen}
            class="druids-placeholder option"
        />
    {/if}
    {#if hasArrow}
        <span class="druids-select-arrow" on:click={handleOpen}>
            <DropdownArrow />
        </span>
    {/if}

    <div
        bind:this={popperRef}
        class="druids-select-option"
        use:clickOutside
        on:outside={handleClose}
        on:keydown={handleOptionKeyDown}
        style="max-width:{maxOpenWidth};max-height:{maxOpenHeight};min-width:{minOpenWidth};min-height:{minOpenHeight};"
    >
        <!-- svelte-ignore a11y-autofocus -->
        <input
            name={inputName}
            bind:this={inputRef}
            bind:value={inputVal}
            placeholder={value?.label ?? placeholder}
            autofocus={display}
            on:change={(e) => onInputChange(e.target.value)}
            on:keyup={onInputKeyUp}
        />
        <div>
            {#if isLoading}
                <span class="druids-select-loading"><Loading /> </span>
            {:else}
                {#each filterFn(options, inputVal) as opt, idx}
                    {#if optionRender}
                        <svelte:component
                            this={optionRender}
                            {...opt}
                            class="option {idx === focusIdx && 'focus'}"
                            on:click={handleSelect(opt)}
                            tabindex="0"
                            on:mouseenter={() => (focusIdx = idx)}
                        />
                    {:else}
                        <option
                            {...opt}
                            class="option {idx === focusIdx && 'focus'}"
                            on:click={handleSelect(opt)}
                            tabindex="0"
                            on:mouseenter={() => (focusIdx = idx)}
                        />
                    {/if}
                {/each}
                {#if filterFn(options, inputVal).length === 0}
                    <div class="druids-select-nosearch">
                        {noSearchText}
                    </div>
                {/if}
            {/if}
        </div>
    </div>

    <input {id} {name} value={value?.value} class="druids-select-input" />
</button>

<style>
    .druids-select-input {
        visibility: hidden;
        position: absolute;
        pointer-events: none;
        top: 0;
        left: 0;
        width: 0;
    }
    .druids-select-loading {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: large;
        padding: 12px;
        color: var(--ui-text);
        animation: spin 1s linear infinite;
    }
    .druids-select-clear {
        all: unset;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0px 4px;
        font-size: small;
        background-color: var(--ui-text-tertiary);
        color: var(--ui-text-knockout);
        border-radius: 50%;
        cursor: pointer;
    }
    .druids-select-arrow {
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--ui-icon);
        padding-right: 2px;
        padding-top: 2px;
    }

    .druids-select {
        all: unset;
        position: relative;
        display: inline-flex;
        align-items: center;
        outline: 1.5px solid var(--ui-border);
        border-radius: 4px;
        cursor: pointer;
        font-size: medium;
    }

    .druids-select-xs {
        font-size: smaller;
    }
    .druids-select-sm {
        font-size: small;
    }
    .druids-select-md {
        font-size: medium;
    }
    .druids-select-lg {
        font-size: larger;
    }

    .druids-select.druids-select-borderless {
        outline: none;
    }

    .druids-select.druids-select-fullwidth {
        width: 100%;
    }

    .druids-select.druids-select-fullwidth .druids-select-option {
        width: 100%;
    }

    .druids-select:disabled:hover {
        outline: 1.5px solid var(--ui-border);
    }

    .druids-select-nosearch {
        padding: 8px;
        background: var(--ui-background);
        color: var(--ui-text-secondary);
    }

    .druids-placeholder,
    .druids-select-option input::placeholder {
        color: var(--ui-text-tertiary);
    }
    .druids-select:hover,
    .druids-select:focus {
        outline: 2px solid var(--ui-background-shade);
    }
    .druids-select:has(.druids-select-option):hover {
        outline-color: var(--ui-border);
    }

    .druids-select::after {
        position: absolute;
        top: 0;
    }

    .druids-select-option {
        display: none;
        background: var(--ui-background-elevated);
        outline: 1px solid var(--ui-interaction-primary);
        border-radius: 4px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        position: absolute;
        top: 0;
        left: 0;
    }

    .druids-select-option input {
        all: unset;
        box-sizing: border-box;
        width: inherit;
        cursor: text;
        padding: 4px 8px;
        background: var(--ui-interaction-secondary);
        border-bottom: 1px solid var(--ui-border);
    }

    /* Not global    */

    .druids-select.druids-select-fullwidth > .option {
        flex-grow: 1;
    }
    .druids-select > .option {
        padding: 4px 8px;
    }
    .druids-select:disabled > .option {
        color: var(--ui-text-tertiary);
    }
    .druids-select-option div .option {
        padding: 8px;
    }

    .druids-select-option div:not(:hover) .option.focus {
        background: var(--ui-interaction-primary);
        color: var(--ui-text-knockout);
        outline: none;
    }

    .druids-select-option div .option:hover,
    .druids-select-option div .option:focus {
        background: var(--ui-interaction-primary);
        color: var(--ui-text-knockout);
        outline: none;
    }

    :global(.druids-select.druids-select-fullwidth > .option) {
        flex-grow: 1;
    }
    :global(.druids-select > .option) {
        padding: 4px 8px;
    }
    :global(.druids-select:disabled > .option) {
        color: var(--ui-text-tertiary);
    }
    :global(.druids-select-option div .option) {
        padding: 8px;
    }

    :global(.druids-select-option div:not(:hover) .option.focus) {
        background: var(--ui-interaction-primary);
        color: var(--ui-text-knockout);
        outline: none;
    }

    :global(
            .druids-select-option div .option:hover,
            .druids-select-option div .option:focus
        ) {
        background: var(--ui-interaction-primary);
        color: var(--ui-text-knockout);
        outline: none;
    }
</style>
