<script context="module">
    import {
        getFilteredRowModel,
        getPaginationRowModel,
        getSortedRowModel,
        renderComponent,
    } from "@tanstack/svelte-table";

    export { renderComponent };
</script>

<script>
    import { rankItem } from "@tanstack/match-sorter-utils";
    import {
        createSvelteTable,
        flexRender,
        getCoreRowModel,
    } from "@tanstack/svelte-table";
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import moveIndex from "../utils/moveIndex";
    import CheckBox from "./CheckBox.svelte";
    import InputText from "./forms/InputText.svelte";
    import HighlightCell, { highlightWords } from "./HighlightCell.svelte";
    import DownIcon from "./icons/DownIcon.svelte";
    import HideIcon from "./icons/HideIcon.svelte";
    import MoveLeft from "./icons/MoveLeft.svelte";
    import MoveRight from "./icons/MoveRight.svelte";
    import SearchIcon from "./icons/SearchIcon.svelte";
    import SettingsIcon from "./icons/SettingsIcon.svelte";
    import UpIcon from "./icons/UpIcon.svelte";
    import Pagination from "./nav/Pagination.svelte";
    import Select from "./forms/Select.svelte";
    import Popover from "./Popover.svelte";
    import PopoverMenuItem from "./PopoverMenuItem.svelte";
    import PopoverMenuSection from "./PopoverMenuSection.svelte";
    import Toggle from "./forms/Toggle.svelte";
    import PaginationSummary from "./nav/PaginationSummary.svelte";

    export let data;
    /*
     * refer: https://tanstack.com/table/latest/docs/api/core/column-def
     * Additionally, You can specify render function in ColumnDef which will help with highlight letter when global search.
     *
     * eg. [{
     *  ...default,
     *
     *  // Don't specify cell when you use render because cell has high priority.//
     *
     *  render:({value,props})=>renderComponent(Component,CompProps),
     *
     * }]
     *
     * //typeof props is {table: Table<TData>,row: Row<TData>,column: Column<TData>,cell: Cell<TData>,getValue: () => any,renderValue: () => any}
     *
     * // refer above.
     *
     * // Value will be html dom elements.
     * so, The best would be to use Badge,Tag,StatusPill etc..,
     * or else  render the Component that will render {@html value} //
     */
    export let columns = [];
    export let selectableRows = false;
    export let globalSearch = true;
    export let searchPlaceholder = "Search Globally";
    export let menu = false;
    export let resizeable = false;
    export let dropdown = false;
    export let pagination = false;
    export let initialPageSize = 5;
    export let initialPageIndex = 0;
    export let initialHiddenColumnIds = [];
    export let initialColumnOrderIds = [];

    /**
     * PaginationSummaryProps
     */
    export let summary = {};

    /**
     * It is use to store the state of table in localStorage. Optional.
     * @type {string}
     */
    export let localStorageKey = null;
    export let hasUnsort = true;

    let visibilityKey;
    let orderKey;
    let paginationKey;
    let sizingKey;
    $: if (localStorageKey) {
        visibilityKey = `${localStorageKey}-visibility`;
        orderKey = `${localStorageKey}-order`;
        paginationKey = `${localStorageKey}-pagination`;
        sizingKey = `${localStorageKey}-sizing`;
    }

    let selectColumn = {
        id: "select-col",
        header: ({ table }) =>
            renderComponent(CheckBox, {
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
            }),
        cell: ({ row }) =>
            renderComponent(CheckBox, {
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                onChange: row.getToggleSelectedHandler(),
            }),
        size: 20,
        enableResizing: false,
    };

    // sorting
    let sorting = [];
    const setSorting = (updater) => {
        if (updater instanceof Function) {
            sorting = updater(sorting);
        } else {
            sorting = updater;
        }
        options.update((old) => ({
            ...old,
            state: {
                ...old.state,
                sorting,
            },
        }));
    };

    //column visibility
    let columnVisibility =
        initialHiddenColumnIds.length === 0
            ? {}
            : Object.fromEntries(
                  initialHiddenColumnIds.map((id) => [id, false]),
              );

    const setColumnVisibility = (updater) => {
        if (updater instanceof Function) {
            columnVisibility = updater(columnVisibility);
        } else {
            columnVisibility = updater;
        }
        options.update((old) => ({
            ...old,
            state: {
                ...old.state,
                columnVisibility,
            },
        }));
        if (localStorageKey) {
            localStorage.setItem(
                visibilityKey,
                JSON.stringify($table.getState().columnVisibility),
            );
        }
    };

    //Column Order
    let columnOrder = initialColumnOrderIds;

    const setColumnOrder = (updater) => {
        if (updater instanceof Function) {
            columnOrder = updater(columnOrder);
        } else {
            columnOrder = updater;
        }
        options.update((old) => ({
            ...old,
            state: {
                ...old.state,
                columnOrder,
            },
        }));
        if (localStorageKey) {
            localStorage.setItem(
                orderKey,
                JSON.stringify($table.getState().columnOrder),
            );
        }
    };

    function moveColumnToLeft(idx) {
        let oldIdx = idx;
        let newIdx = idx - 1;
        if (idx > 0)
            $table.setColumnOrder((_updater) =>
                moveIndex(
                    $table.getAllLeafColumns().map((d) => d.id),
                    oldIdx,
                    newIdx,
                ),
            );
    }

    function moveColumnToRight(idx) {
        let oldIdx = idx;
        let newIdx = idx + 1;

        if (idx <= $table.getAllLeafColumns().length)
            $table.setColumnOrder((_updater) =>
                moveIndex(
                    $table.getAllLeafColumns().map((d) => d.id),
                    oldIdx,
                    newIdx,
                ),
            );
    }

    //GobalFilter
    let gobalFilterValue = "";
    const fuzzyFilter = (row, columnId, value, addMeta) => {
        const itemRank = rankItem(row.getValue(columnId), value);
        addMeta({ itemRank });

        return itemRank.passed;
    };

    //Pagination
    let paginationValue = !pagination
        ? { pageIndex: 0, pageSize: data.length }
        : { pageIndex: initialPageIndex, pageSize: initialPageSize };

    const setPagination = (updater) => {
        if (updater instanceof Function) {
            paginationValue = updater(paginationValue);
        } else {
            paginationValue = updater;
        }
        options.update((old) => ({
            ...old,
            state: {
                ...old.state,
                pagination: paginationValue,
            },
        }));
        // if(localStorageKey){

        //     localStorage.setItem(
        //         paginationKey,
        //         JSON.stringify($table.getState().pagination),
        //     );
        // }
    };

    //column sizing

    let columnSizing = {};

    const setColumnSizing = (updater) => {
        if (updater instanceof Function) {
            columnSizing = updater(columnSizing);
        } else {
            columnSizing = updater;
        }
        options.update((old) => ({
            ...old,
            state: {
                ...old.state,
                columnSizing,
            },
        }));
        if (localStorageKey) {
            localStorage.setItem(
                sizingKey,
                JSON.stringify($table.getState().columnSizing),
            );
        }
    };

    $: columnsValue = columns.map((col) => {
        if (col["cell"] !== undefined) {
            return col;
        } else if (col["render"] !== undefined) {
            return {
                ...col,
                cell: (info) =>
                    col.render({
                        value: highlightWords(
                            info.getValue(),
                            info.table.getState().globalFilter,
                        ),
                        props: info,
                    }),
            };
        } else {
            return {
                ...col,
                cell: (info) =>
                    renderComponent(HighlightCell, {
                        value: info.getValue()?.toString()
                            ? info.getValue().toString()
                            : "",
                        highlight: info.table.getState().globalFilter,
                    }),
            };
        }
    });

    const options = writable({
        data,
        columns: selectableRows ? [selectColumn, ...columns] : columns,
        state: {
            sorting,
            columnVisibility,
            columnOrder,
            columnSizing,
            pagination: paginationValue,
        },
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        enableSortingRemoval: hasUnsort,
        enableResizing: resizeable,
        columnResizeMode: "onChange",
        onColumnSizingChange: setColumnSizing,
        onColumnOrderChange: setColumnOrder,
        onColumnVisibilityChange: setColumnVisibility,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        globalFilterFn: "fuzzy",
        getFilteredRowModel: getFilteredRowModel(),
        onPaginationChange: setPagination,
        getPaginationRowModel: getPaginationRowModel(),
    });

    const table = createSvelteTable(options);

    const handleKeyUp = (e) => {
        $table.setGlobalFilter(String(e?.target?.value));
    };

    const PageSizeOptions = [
        {
            label: "Show 2 rows",
            value: 2,
        },
        {
            value: 5,
            label: "Show 5 rows",
        },
        {
            value: 10,
            label: "Show 10 rows",
        },
        {
            label: "Show 20 rows",
            value: 20,
        },
        {
            label: "Show All",
            value: data.length,
        },
    ];

    onMount(() => {
        let state = {};
        if (localStorageKey) {
            let localVisibility = localStorage.getItem(visibilityKey);
            let localOrder = localStorage.getItem(orderKey);
            let localSizing = localStorage.getItem(sizingKey);

            state = {
                columnVisibility: localVisibility
                    ? JSON.parse(localVisibility)
                    : columnVisibility,

                columnOrder: localOrder ? JSON.parse(localOrder) : columnOrder,

                columnSizing: localSizing
                    ? JSON.parse(localSizing)
                    : columnSizing,
            };
        }
        options.update((old) => ({
            ...old,
            columns: selectableRows
                ? [selectColumn, ...columnsValue]
                : columnsValue,
            state: {
                ...old.state,
                ...state,
            },
        }));
    });
</script>

<div class="druids-table-container">
    <div class="druids-table-header">
        {#if $table.getState().pagination.pageSize < data.length}
        <div style="flex-grow: 1;">
        <PaginationSummary
            pageStart={$table.getState().pagination.pageSize *
                $table.getState().pagination.pageIndex +
                1}
            pageEnd={$table.getState().pagination.pageSize *
                ($table.getState().pagination.pageIndex + 1)}
            elementLabel={summary.elementLabel ? summary.elementLabel : "Row"}
            totalElements={$table.getPageCount()}
            {...summary}
        />
        </div>
        {/if}
        {#if globalSearch}
            <InputText
                icon={SearchIcon}
                bind:value={gobalFilterValue}
                on:keyup={handleKeyUp}
                placeholder={searchPlaceholder}
            />
        {/if}

        {#if menu}
            <div class="druids-table-menu">
                <Popover isRounded>
                    <button
                        slot="trigger"
                        class="druids-table-settings-trigger"
                    >
                        <SettingsIcon />
                    </button>
                    <div slot="popper" class="druids-table-settings">
                        <Toggle
                            style="justify-content:space-between;font-weight:bold;width:100%;flex-direction:row-reverse;"
                            size="xs"
                            label="All"
                            isChecked={$table.getIsAllColumnsVisible()}
                            on:change={$table.getToggleAllColumnsVisibilityHandler()}
                        />
                        {#each $table.getAllLeafColumns() as column}
                            <Toggle
                                style="justify-content:space-between;font-weight:bold;width:100%;flex-direction:row-reverse;"
                                size="xs"
                                label={column.id}
                                isChecked={column.getIsVisible()}
                                on:change={column.getToggleVisibilityHandler()}
                            />
                        {/each}
                    </div>
                </Popover>
            </div>
        {/if}
    </div>
    <table class="druids-table" cellspacing="0" cellpadding="0">
        <thead class="druids-table-head">
            {#each $table.getHeaderGroups() as headerGroup}
                <tr class="druids-table-head-row">
                    {#each headerGroup.headers as header}
                        <th style="width: {header.getSize()}px">
                            <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
                            <div
                                on:click={header.column.getToggleSortingHandler()}
                            >
                                {#if !header.isPlaceholder}
                                    <svelte:component
                                        this={flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                    />
                                {/if}
                                {#if header.column
                                    .getIsSorted()
                                    .toString() === "asc"}
                                    <UpIcon />
                                {:else if header.column
                                    .getIsSorted()
                                    .toString() === "desc"}
                                    <DownIcon />
                                {/if}
                            </div>
                            {#if header.column.id !== "select-col" && dropdown}
                                <div class="druids-table-dropdown">
                                    <Popover isPadded={false}>
                                        <button
                                            slot="trigger"
                                            class="druids-table-dropdown-trigger"
                                        >
                                            <SettingsIcon />
                                        </button>
                                        <svelte:fragment slot="popper" let:hide>
                                            <PopoverMenuSection
                                                separator="bottom"
                                            >
                                                <PopoverMenuItem
                                                    isDisabled={header.column.getIsFirstColumn()}
                                                    label="Move to Left"
                                                    icon={MoveLeft}
                                                    width={"200px"}
                                                    onClick={() => {
                                                        moveColumnToLeft(
                                                            header.column.getIndex(),
                                                        );
                                                        hide();
                                                    }}
                                                />
                                                <PopoverMenuItem
                                                    isDisabled={header.column.getIsLastColumn()}
                                                    label="Move to Right"
                                                    icon={MoveRight}
                                                    width={"200px"}
                                                    onClick={() => {
                                                        moveColumnToRight(
                                                            header.column.getIndex(),
                                                        );
                                                        hide();
                                                    }}
                                                />
                                            </PopoverMenuSection>
                                            <PopoverMenuItem
                                                label="Hide"
                                                isDisabled={!header.column.getCanHide()}
                                                icon={HideIcon}
                                                danger
                                                width={"200px"}
                                                onClick={(e) => {
                                                    header.column.getToggleVisibilityHandler()(
                                                        e,
                                                    );
                                                    hide();
                                                }}
                                            />
                                        </svelte:fragment>
                                    </Popover>
                                </div>
                            {/if}
                            {#if header.column.getCanResize() && resizeable}
                                <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
                                <button
                                    class="druids-table-resizer resizer"
                                    on:dblclick={() =>
                                        header.column.resetSize()}
                                    on:mousedown={header.getResizeHandler()}
                                    on:touchstart={header.getResizeHandler()}
                                />
                            {/if}
                        </th>
                    {/each}
                </tr>
            {/each}
        </thead>
        <tbody class="druids-table-body">
            {#each $table.getRowModel().rows as row}
                <tr>
                    {#each row.getVisibleCells() as cell}
                        <td style="width: {cell.column.getSize()}px" data-isResizing={cell.column.getIsResizing()}>
                            <svelte:component
                                this={flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext(),
                                )}
                            />
                        </td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
    <div class="druids-table-footer">
        {#if pagination}
            <div>
                <label for="pageSize" class="druids-tabel-select-label"
                    >Rows per Page:</label
                >
                <Select
                    options={PageSizeOptions}
                    value={PageSizeOptions[1]}
                    onChange={(val) => $table.setPageSize(val.value)}
                />
            </div>
            {#if $table.getState().pagination.pageSize < data.length}
                <div>
                    <Pagination
                        currentPage={$table.getState().pagination.pageIndex + 1}
                        onChange={(idx) => $table.setPageIndex(idx - 1)}
                        totalPages={$table.getPageCount()}
                    />
                </div>
            {/if}
        {/if}
    </div>
</div>

<style>
    .druids-table-container {
        padding: 4px;
    }
    .druids-table-header {
        display: flex;
        padding: 4px 0px;
        justify-content: space-between;
        align-items: center;
        gap:4px;
        flex-wrap: wrap;
    }

    .druids-table-footer {
        display: flex;
        padding: 8px 0px;
        gap: 8px;
        justify-content: end;
        align-items: center;
        flex-wrap: wrap;
    }
    .druids-tabel-select-label {
        display: inline-block;
        font-size: small;
        color: var(--ui-text-tertiary);
    }

    /* .druids-table-footer select {
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
    } */

    /* .druids-table-header input[type="text"] {
        all: unset;
        color: var(--ui-text);
    }

    .druids-table-header input::placeholder {
        color: var(--ui-icon);
    } */
    /* .druids-table-settings label {
        display: flex;
        justify-content: space-between;
        min-width: 100px;
        gap: 4px;
    } */
    .druids-table-settings {
        width: 100px;
        max-width: 100%;
    }

    .druids-table-settings-trigger {
        all: unset;
        padding: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 6px;
        color: var(--ui-icon);
    }

    .druids-table-settings-trigger:hover,
    .druids-table-settings-trigger:focus {
        background: var(--ui-interaction-primary);
        color: var(--ui-text-knockout);
    }
    /* .druids-table-header-input {
        width: 50%;
        min-width: 200px;
        max-width: 400px;
        padding: 4px;
        display: flex;
        align-items: center;
        gap: 4px;
        border: solid 1px var(--ui-border);
        border-radius: 4px;
        color: var(--ui-icon);
    } */

    .druids-table {
        width: 100%;
        max-width: 100%;
        border: solid 1px var(--ui-border);
        color: var(--ui-text);
        background: var(--ui-background);
        border-radius: 4px;
        overflow: hidden;
    }
    .druids-table th:has(div:hover) {
        background: var(--ui-interaction-primary);
        color: var(--ui-text-knockout);
    }

    .druids-table th {
        cursor: pointer;
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

    .druids-table-dropdown-trigger:not(:hover):focus {
        outline: none;
    }

    .druids-table-resizer {
        all: unset;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        width: 3px;
        z-index: 1;
        cursor: col-resize;
    }
    .druids-table-resizer:hover,
    .druids-table-resizer:active {
        background: var(--ui-interaction-primary-contrast);
    }
    .druids-table-resizer:active{
        width: 4px;
    }

    .druids-table:has( .druids-table-resizer:active) td[data-isResizing="true"]{
        border-right: 2px solid var(--ui-interaction-primary);
    }
</style>
