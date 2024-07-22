<script context="module">
    import { createRender } from "svelte-headless-table";
    /**
     * It is an importable function that uses to render the Custom Component.
     */
    export { createRender };
</script>

<script>
    import "../css/global.css";
    import moveIndex from "../utils/moveIndex";
    import {
        createTable,
        Render,
        Subscribe,
    } from "svelte-headless-table";
    import {
        addSortBy,
        addResizedColumns,
        addSelectedRows,
        addTableFilter,
        addHiddenColumns,
        addPagination,
        addColumnOrder,
    } from "svelte-headless-table/plugins";
    import UpIcon from "./icons/UpIcon.svelte";
    import DownIcon from "./icons/DownIcon.svelte";
    import SelectIndicator from "./SelectIndicator.svelte";
    import SearchIcon from "./icons/SearchIcon.svelte";
    import Popover from "./Popover.svelte";

    import SettingsIcon from "./icons/SettingsIcon.svelte";
    import Pagination from "./Pagination.svelte";
    import PopoverMenuItem from "./PopoverMenuItem.svelte";
    import MoveRight from "./icons/MoveRight.svelte";
    import MoveLeft from "./icons/MoveLeft.svelte";
    import HideIcon from "./icons/HideIcon.svelte";
    import PopoverMenuSection from "./PopoverMenuSection.svelte";
    /**
     * @type {Readable|Writable}
     */
    export let data;
    /*
     * refer: https://svelte-headless-table.bryanmylee.com/docs/api/create-columns#table-column-columndef-datacolumn
     */
    export let columns = [];
    export let displays = [];
    export let groups = [];
    export let selectableRows = false;
    export let globalSearch = true;
    export let searchPlaceholder = "";
    export let menu = false;
    export let resizeable = false;
    export let dropdown = false;
    export let pagination = false;
    export let initialPageSize = 5;
    export let initialHiddenColumnIds = [];
    export let initialColumnOrderIds = [];

    let table = createTable(data, {
        sort: addSortBy(),
        resize: addResizedColumns(),
        select: addSelectedRows(),
        filter: addTableFilter(),
        hide: addHiddenColumns(),
        colOrder: addColumnOrder({
            initialColumnOrderIds,
        }),
        page: addPagination({
            initialPageSize: pagination ? initialPageSize : $data.length,
        }),
    });
    let selectCols = [];

    if (selectableRows) {
        selectCols = [
            table.display({
                id: "selected",
                header: (_, { pluginStates }) => {
                    const { allRowsSelected, someRowsSelected } =
                        pluginStates.select;
                    return createRender(SelectIndicator, {
                        isSelected: allRowsSelected,
                        isSomeSubRowsSelected: someRowsSelected,
                    });
                },
                cell: ({ row }, { pluginStates }) => {
                    const { isSomeSubRowsSelected, isSelected } =
                        pluginStates.select.getRowState(row);
                    return createRender(SelectIndicator, {
                        isSelected,
                        isSomeSubRowsSelected,
                    });
                },
                plugins: {
                    resize: {
                        disable: true,
                        initialWidth: 30,
                        maxWidth: 30,
                    },
                },
            }),
        ];
    }

    let tableColumns = table.createColumns([
        ...selectCols,
        ...displays.map((dis) => table.display(dis)),
        ...columns.map((column) => table.column(column)),
        ...groups.map(({ columns, ...rest }) =>
            table.group({
                ...rest,
                columns: columns.map((col) => table.column(col)),
            }),
        ),
    ]);

    let {
        flatColumns,
        visibleColumns,
        headerRows,
        pageRows,
        tableAttrs,
        tableBodyAttrs,
        pluginStates,
    } = table.createViewModel(tableColumns);

    let { filterValue } = pluginStates.filter;

    let { pageSize, pageCount, pageIndex, hasPreviousPage, hasNextPage } =
        pluginStates.page;

    let { hiddenColumnIds } = pluginStates.hide;

    const ids = flatColumns.map((c) => c.id);
    let hideForId = Object.fromEntries(ids.map((id) => [id, false]));
    initialHiddenColumnIds.map((col) => (hideForId[col] = true));

    $: {
        $hiddenColumnIds = Object.entries(hideForId)
            .filter(([, hide]) => hide)
            .map(([id]) => id);
    }

    let { columnIdOrder } = pluginStates.colOrder;
    $columnIdOrder =
        initialColumnOrderIds.length !== 0 ? initialColumnOrderIds : ids;

    function moveColumnToLeft(idx) {
        let oldIdx = idx;
        let newIdx = idx - 1;
        if (idx > 0) $columnIdOrder = moveIndex($columnIdOrder, oldIdx, newIdx);
        console.log($columnIdOrder);
    }

    function moveColumnToRight(idx) {
        let oldIdx = idx;
        let newIdx = idx + 1;

        if (idx <= flatColumns.length)
            $columnIdOrder = moveIndex($columnIdOrder, oldIdx, newIdx);
    }


    function handleHide(id) {
        hideForId[id] = !hideForId[id];
    }
</script>

<div class="druids-table-header">
    {#if globalSearch}
        <div class="druids-table-header-input">
            <SearchIcon />
            <input
                type="text"
                bind:value={$filterValue}
                placeholder={searchPlaceholder}
            />
        </div>
    {/if}

    {#if menu}
        <div>
            <Popover isRounded>
                <button slot="trigger" class="druids-table-settings-trigger">
                    <SettingsIcon />
                </button>
                <div slot="popper" class="druids-table-settings">
                    {#each ids as id (id)}
                        {#if id == "selected"}
                            <span></span>
                        {:else}
                            <div>
                                <label for="hide-{id}">{id}</label>
                                <input
                                    style="all: set;"
                                    id="hide-{id}"
                                    type="checkbox"
                                    checked={hideForId[id]}
                                    on:click={() => handleHide(id)}
                                />
                            </div>
                        {/if}
                    {/each}
                </div>
            </Popover>
        </div>
    {/if}
</div>
<table {...tableAttrs} class="druids-table" cellspacing="0" cellpadding="0">
    <thead class="druids-table-head">
        {#each $headerRows as headerRow (headerRow.id)}
            <Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
                <tr {...rowAttrs} class="druids-table-head-row">
                    {#each headerRow.cells as cell, idx (cell.id)}
                        <Subscribe
                            attrs={cell.attrs()}
                            let:attrs
                            props={cell.props()}
                            let:props
                        >
                            <th {...attrs} use:props.resize>
                                <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
                                <div on:click={props.sort.toggle}>
                                    {#if props.sort.order === "asc"}
                                        <UpIcon />
                                    {:else if props.sort.order === "desc"}
                                        <DownIcon />
                                    {/if}
                                    <Render of={cell.render()} />
                                </div>
                                {#if cell.id !== "selected" && dropdown}
                                    <div class="druids-table-dropdown">
                                        <Popover isPadded={false}>
                                            <button
                                                slot="trigger"
                                                class="druids-table-dropdown-trigger"
                                            >
                                                <SettingsIcon />
                                            </button>
                                            <svelte:fragment
                                                slot="popper"
                                                let:hide
                                            >
                                                <PopoverMenuSection
                                                    separator="bottom"
                                                >
                                                    <PopoverMenuItem
                                                        label="Move to Left"
                                                        icon={MoveLeft}
                                                        width={"200px"}
                                                        onClick={() => {
                                                            moveColumnToLeft(
                                                                idx,
                                                            );
                                                            hide();
                                                        }}
                                                    />
                                                    <PopoverMenuItem
                                                        label="Move to Right"
                                                        icon={MoveRight}
                                                        width={"200px"}
                                                        onClick={() => {
                                                            moveColumnToRight(
                                                                idx,
                                                            );
                                                            hide();
                                                        }}
                                                    />
                                                </PopoverMenuSection>
                                                <PopoverMenuItem
                                                    label="Hide"
                                                    icon={HideIcon}
                                                    danger
                                                    width={"200px"}
                                                    onClick={() => {
                                                        hideForId[cell.id] =
                                                            true;
                                                        hide();
                                                    }}
                                                />
                                            </svelte:fragment>
                                        </Popover>
                                    </div>
                                {/if}

                                {#if !props.resize.disabled && resizeable}
                                    <span
                                        class="druids-table-resizer resizer"
                                        use:props.resize.drag
                                    />
                                {/if}
                            </th>
                        </Subscribe>
                    {/each}
                </tr>
            </Subscribe>
        {/each}
    </thead>
    <tbody {...tableBodyAttrs} class="druids-table-body">
        {#each $pageRows as row (row.id)}
            <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
                <tr {...rowAttrs}>
                    {#each row.cells as cell (cell.id)}
                        <Subscribe
                            attrs={cell.attrs()}
                            props={cell.props()}
                            let:attrs
                            let:props
                        >
                            <td {...attrs} class:matches={props.filter.matches}>
                                <Render of={cell.render()} />
                            </td>
                        </Subscribe>
                    {/each}
                </tr>
            </Subscribe>
        {/each}
    </tbody>
</table>
<div class="druids-table-footer">
    {#if pagination}
        {#if data.length <= 5}
            <div>
                <label for="pageSize" class="druids-tabel-select-label"
                    >Rows per Page:</label
                >
                <select id="pageSize" bind:value={$pageSize}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={$data.length}>All</option>
                </select>
            </div>
        {/if}
        <div>
            <Pagination
                {hasPreviousPage}
                {hasNextPage}
                {pageIndex}
                totalPages={pageCount}
            />
        </div>
    {/if}
</div>

<style>
    .druids-table-header,
    .druids-table-footer {
        width: 100%;
        max-width: inherit;
        display: flex;
        padding: 4px 0px;
        justify-content: space-between;
    }

    .druids-table-footer {
        justify-content: flex-end;
        align-items: center;
    }
    .druids-tabel-select-label {
        display: inline-block;
        font-size: small;
        color: var(--ui-text-tertiary);
    }

    .druids-table-footer select {
        background-color: white;
        border-radius: 4px;
        display: inline-block;
        font: small;
        line-height: 1.25em;
        padding: 2px;
        border: solid 2px var(--ui-border);
        color: var(--ui-interaction-primary-contrast);
        margin: 0;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .druids-table-header input[type="text"] {
        all: unset;
    }

    .druids-table-settings div {
        display: flex;
        justify-content: space-between;
        min-width: 100px;
        gap: 4px;
    }

    .druids-table-settings-trigger {
        all: unset;
        padding: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 6px;
    }

    .druids-table-settings-trigger:hover,
    .druids-table-settings-trigger:focus {
        background: var(--ui-interaction-primary);
        color: var(--ui-text-knockout);
    }
    .druids-table-header-input {
        padding: 4px;
        display: flex;
        align-items: center;
        gap: 4px;
        border: solid 1px var(--ui-border);
        border-radius: 4px;
    }

    .druids-table {
        width: 100%;
        max-width: inherit;
        border: solid 1px var(--ui-border);
        color: var(--ui-text);
        background: var(--ui-background);
    }
    .druids-table th:has(div:hover) {
        background: var(--ui-interaction-primary);
        color: var(--ui-text-knockout);
    }

    .druids-table-body tr:hover {
        background: var(--ui-interaction-secondary);
    }
    .druids-table th,
    .druids-table td {
        border-bottom: solid 1px var(--ui-border);
        padding: 4px 8px 4px 8px;
        text-align: start;
        text-overflow: ellipsis;
    }

    .druids-table td {
        overflow: hidden;
    }

    .druids-table-body tr:last-child td {
        border-bottom: none;
    }
    th {
        position: relative;
    }

    .druids-table-dropdown {
        position: absolute;
        right: 2px;
        top: 0;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .druids-table-dropdown:hover,
    .druids-table-dropdown:focus {
        background: var(--ui-interaction-primary-contrast);
    }

    .druids-table th:has(div:hover) .druids-table-dropdown-trigger {
        color: inherit;
    }

    .druids-table-dropdown-trigger {
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        background: transparent;
        color: transparent;
        border: none;
        cursor: pointer;
    }

    .druids-table-dropdown-menu {
        all: unset;
        width: 100px;
        font-size: small;
        font-weight: normal;
        padding: 8px;
        background: var(--ui-background);
        color: var(--ui-text-secondary);
        border-bottom: solid 1px var(--ui-border);
        cursor: pointer;
    }

    .druids-table-dropdown-menu:disabled {
        cursor: not-allowed;
    }

    .druids-table-resizer {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        width: 2px;
        background: lightgray;
        cursor: col-resize;
        z-index: 1;
    }
    .druids-table-resizer:hover {
        width: 4px;
    }

    .matches {
        background: var(--ui-interaction-secondary-contrast);
    }
</style>
