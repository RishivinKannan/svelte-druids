<script>
    import "../css/global.css";
    export let pageIndex;
    export let hasNextPage;
    export let hasPreviousPage;
    export let totalPages;

    $: currentPage = pageIndex + 1;

    export let handlePrev;
    export let handleNext;
    export let setPage;

    function handleInput(e){
        setPage(e.target.value -1)
    }


    
</script>

<ul class="druids-pagination-list">
    <li>
        <button
            on:click={handlePrev}
            disabled={!hasPreviousPage}
            class="druids-pagination-buttons">Prev</button
        >
    </li>
    <li>
        <input
            type="number"
            min={1}
            max={totalPages}
            step={1}
            value={currentPage}
            on:keydown={handleInput}
            disabled={totalPages === 1}
            class="druids-pagination-input"
        />
        of {totalPages} Pages
    </li>
    <li>
        <button
            on:click={handleNext}
            disabled={!hasNextPage}
            class="druids-pagination-buttons">Next</button
        >
    </li>
</ul>

<style>
    .druids-pagination-list {
        display: flex;
        gap: 6px;
        list-style: none;
        color: var(--ui-text-secondary);
        font-size: small;
    }

    .druids-pagination-list input[type="number"] {
        min-width: 14px;
        border: solid 1px var(--ui-border);
        border-radius: 4px;
        padding: 2px 4px;
        color: var(--ui-interaction-primary-contrast);
    }

    .druids-pagination-list input[type="number"]::-webkit-inner-spin-button,
    .druids-pagination-list input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .druids-pagination-list input[type="number"] {
        -moz-appearance: textfield;
    }

    .druids-pagination-buttons {
        color: var(--ui-interaction-primary-contrast);
        background: var(--ui-background-secondary);
        padding: 4px 8px;
        border-radius: 4px;
        border: none;
        cursor: auto;
    }

    .druids-pagination-buttons:hover {
        color: var(--ui-text-knockout);
        background: var(--ui-interaction-primary);
    }

    .druids-pagination-buttons:disabled {
        color: var(--ui-text-disabled);
    }
    .druids-pagination-buttons:disabled:hover {
        background: var(--ui-background-secondary);
    }
</style>
