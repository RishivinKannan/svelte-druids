<script>
    import StatusPill from "./pills/StatusPill.svelte";
    import HttpStatusPill from "./pills/HttpStatusPill.svelte";
    import Popover from "./Popover.svelte";
    import Overflower from "./Overflower.svelte";

    /**
     * @type {number|string}
     */
    export let statusCode;
    /**
     * @type {string}
     */
    export let url;
    export let queryParams = {};
    /**
     * @type {string}
     */
    export let method = "GET";
    export let isFullWidth = false;

    $: widthStyle = isFullWidth ? "" : "max-width:400px;";

    const copyFunction = () => {
        const query = new URLSearchParams(queryParams);
        const queryString =
            Object.keys(queryParams).length !== 0 ? `?${query.toString()}` : "";
        const URL = url + queryString;
        navigator.clipboard
            .writeText(URL)
            .then(() => alert("URL copied to your clipboard"));
    };
</script>

<div class="druids-httprequest-div">
    <StatusPill
        label={method}
        isSoft
        size="md"
        customStyle="border-top-right-radius: 0;border-bottom-right-radius:0;color:var(--ui-text)"
    />
    <button class="druids-httprequest-button" on:click={copyFunction}>
        <Overflower label={url} maxWidth={isFullWidth ? "none" : 400} />
    </button>
    {#if Object.keys(queryParams).length !== 0}
        <Popover isRounded>
            <button
                slot="trigger"
                title="queries"
                class="druids-httprequest-trigger">?</button
            >

            <svelte:fragment slot="popper">
                {#each Object.entries(queryParams) as [key, value] (key)}
                    <span class="druids-httprequest-key">{key}= </span><span
                        class="druids-httprequest-value">{value}</span
                    >
                {/each}
            </svelte:fragment>
        </Popover>
    {/if}
    <HttpStatusPill
        {statusCode}
        hasTextDescription
        size="md"
        customStyle="border-top-left-radius: 0;border-bottom-left-radius:0;"
    />
</div>

<style>
    .druids-httprequest-div {
        display: inline-flex;
        max-width: 100%;
    }

    .druids-httprequest-button {
        border: none;
        display: block;
        min-width: 0;
        font-size: medium;
        white-space: nowrap;
        padding: 2px 6px;
        color: var(--ui-text-secondary);
        background: var(--ui-background-secondary);
        cursor: pointer;
    }

    .druids-httprequest-button:hover {
        background: color-mix(
            in srgb,
            var(--ui-background-secondary) 70%,
            transparent
        );
        color: color-mix(in srgb, var(--ui-text-secondary) 80%, transparent);
    }

    .druids-httprequest-trigger {
        all: unset;
        color: var(--ui-text-secondary);
        height: auto;
        padding: 4px 8px;
        font-size: medium;
        background: var(--ui-placeholder);
        cursor: pointer;
    }

    .druids-httprequest-value {
        color: var(--ui-text-secondary);
    }
    .druids-httprequest-key {
        color: var(--ui-tag-text-value);
    }
</style>
