<script>
    import "../../css/global.css";
    import LeftPageArrow from "../icons/LeftPageArrow.svelte";
    import RightPageArrow from "../icons/RightPageArrow.svelte";
    /**
     * @type {number}
     */
    export let currentPage;
    /**
     * @type {number}
     */
    export let totalPages;
    export let onChange = (currentPage) => {};
    export let className = "";

    function handleClick(idx) {
        if (idx !== currentPage) {
            onChange(idx);
        }
    }
</script>

<nav class="druids-pagination-container {className}">
    <button
        on:click={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
    >
        <LeftPageArrow size="1.7" />
    </button>
    {#if totalPages < 10}
        {#each Array(totalPages).fill("") as page, idx}
            <button
                on:click={() => handleClick(idx + 1)}
                class:druids-pagination-active={currentPage === idx + 1}
                >{idx + 1}</button
            >
        {/each}
    {:else if currentPage < 6}
        {#each Array(currentPage).fill("") as page, idx}
            <button
                on:click={() => handleClick(idx + 1)}
                class:druids-pagination-active={currentPage === idx + 1}
                >{idx + 1}</button
            >
        {/each}
        {#each Array(7 - currentPage) as page, idx}
            <button on:click={() => handleClick(currentPage + idx + 1)}
                >{currentPage + idx + 1}</button
            >
        {/each}
        <button class="druids-nonclickable">...</button>
        <button on:click={() => handleClick(totalPages)}>{totalPages}</button>
    {:else if totalPages - currentPage < 5}
        <button on:click={() => handleClick(1)}>1</button>
        <button class="druids-nonclickable">...</button>
        {#each Array(5).fill("") as page, idx}
            <button
                on:click={() => handleClick(totalPages - 5 + idx)}
                class:druids-pagination-active={totalPages - 5 + idx ===
                    currentPage}>{totalPages - 5 + idx}</button
            >
        {/each}
        <button
            on:click={() => handleClick(totalPages)}
            class:druids-pagination-active={totalPages === currentPage}
            >{totalPages}</button
        >
    {:else}
        <button on:click={() => handleClick(1)}>1</button>
        <button class="druids-nonclickable">...</button>

        {#each Array(5).fill("") as page, idx}
            <button
                on:click={() => handleClick(currentPage - 2 + idx)}
                class:druids-pagination-active={currentPage ===
                    currentPage - 2 + idx}>{currentPage - 2 + idx}</button
            >
        {/each}
        <button class="druids-nonclickable">...</button>
        <button on:click={() => handleClick(totalPages)}>{totalPages}</button>
    {/if}

    <button
        on:click={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
    >
        <RightPageArrow size="1.7" />
    </button>
</nav>

<style>
    .druids-pagination-container {
        all: unset;
        display: inline-flex;
        gap: 4px;
        align-items: center;
        font-size: small;
    }
    .druids-pagination-container button {
        all: unset;
        display: inline-flex;
        font-weight: 400;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: none;
        color: var(--ui-interaction-primary);
        min-width: 28px;
        line-height: 28px;
        height: 28px;
        padding: 4px;
        border-radius: 4px;
    }

    .druids-pagination-container button:hover {
        background: var(--ui-interaction-secondary);
    }
    .druids-pagination-container button.druids-pagination-active,
    .druids-pagination-container button:active {
        background: var(--ui-interaction-primary);
        color: var(--ui-text-knockout);
    }

    .druids-pagination-container button.druids-nonclickable:active,
    .druids-pagination-container button.druids-nonclickable:hover {
        background: transparent;
        color: var(--ui-interaction-primary);
    }

    .druids-pagination-container button:disabled {
        background: transparent;
        color: var(--ui-text-disabled);
    }
</style>
