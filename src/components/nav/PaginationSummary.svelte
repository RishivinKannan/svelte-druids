<script>
    import "../../css/global.css";
    import humanFormatNumber from "../../utils/humanFormatNumber";
    export let pageStart;
    export let pageEnd;
    export let elementLabel;
    export let totalElements;
    export let totalElementsPrefix = null;
    export let isRounded = false;

    $: total = isRounded
        ? humanFormatNumber(totalElements).toUpperCase()
        : totalElements;
</script>

<span class="druids-pagination-summary">
    <span>Showing</span>
    <span class="druids-pagination-bold">{pageStart}-{pageEnd}</span>
    <span>of</span>
    <span class="druids-pagination-bold">
        {#if totalElementsPrefix}
            {totalElementsPrefix}
        {/if}
        {total}
    </span>
    <span>{elementLabel}</span>
</span>

<style>
    .druids-pagination-summary {
        color: var(--ui-text);
        font-weight: 400;
        font-size: 13px;
        line-height: 28px;
        text-wrap: nowrap;
    }
    .druids-pagination-bold {
        font-weight: 600;
    }
</style>
