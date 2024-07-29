<script>
    import "../css/global.css";
    import InfoIcon from "./icons/InfoIcon.svelte";
    import Overflower from "./Overflower.svelte";
    import Popover from "./Popover.svelte";
    /*
     * @type {string}
     */
    export let tagKey;
    /*
     * @type {string|array}
     */
    export let tagValue;
    export let icon = null;
    export let iconProps = {};
    export let logo = null;
    export let logoProps = {};
    /*
     * @type {string}
     */
    export let infoMessage = null;

    export let onClick = () => {};

    export let onMouseEnter = () => {};

    export let onMouseLeave = () => {};

    let buttonRef;

    $: renderTagValue = typeof tagValue === "string" ? tagValue : tagValue[0];

    $: tagTitle =
        typeof tagValue === "string"
            ? `${tagKey}:${tagValue}`
            : tagValue.join(",");
</script>

<button
    bind:this={buttonRef}
    class="druids-calloutTag-button"
    title={tagTitle}
    on:click={onClick}
    on:mouseenter={onMouseEnter}
    on:mouseleave={onMouseLeave}
>
    <div>
        <div class="druids-calloutTag-head">
            <Overflower tolltipContent={tagKey?.toUpperCase()}>
                {tagKey?.toUpperCase()}
            </Overflower>
            {#if infoMessage}
                <Popover
                    isHoverable
                    popperOffset={[0, 0]}
                    isPadded={false}
                    isRounded
                >
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <span
                        slot="trigger"
                        class={"druids-calloutTag-info"}
                        on:mouseenter={() => buttonRef.removeAttribute("title")}
                        on:mouseleave={() =>buttonRef.setAttribute("title", tagTitle)}
                    >
                        <svelte:component this={InfoIcon} />
                    </span>

                    <div slot="popper" style="padding: 8px;">
                        {@html infoMessage}
                    </div>
                </Popover>
            {/if}
        </div>
        <div class="druids-calloutTag-body">
            {#if icon}
                <svelte:component this={icon} {...iconProps} />
            {/if}
            <Overflower tolltipContent={renderTagValue}>
                {@html renderTagValue}
            </Overflower>
        </div>
    </div>

    {#if logo}
        <svelte:component this={logo} {...logoProps} />
    {/if}
</button>

<style>
    .druids-calloutTag-button {
        all: unset;
        display: inline-flex;
        max-width: 100%;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 6px;
        background: var(--ui-background);
        color: var(--ui-text);
        border-radius: 2px;
        outline: solid 1px var(--ui-border);
        font-size: small;
    }

    .druids-calloutTag-button:hover {
        background: var(--ui-interaction-primary);
        color: var(--ui-text-knockout);
        outline: none;
        cursor: pointer;
    }

    .druids-calloutTag-button > div {
        display: inline-flex;
        max-width: 100%;
        flex-direction: column;
        gap: 4px;
    }

    .druids-calloutTag-head {
        display: inline-flex;
        justify-content: space-between;
        align-items: center;
        font-weight: bold;
        font-size: small;
        overflow: hidden;
    }
    .druids-calloutTag-info {
        float: right;
        color: var(--ui-interaction-primary);
    }

    .druids-calloutTag-button:hover .druids-calloutTag-info {
        color: var(--ui-text-knockout);
    }

    .druids-calloutTag-body {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: small;
    }
</style>
