<script context="module">
    import {
        filterFns,
        getFilteredRowModel,
        getPaginationRowModel,
        getSortedRowModel,
        renderComponent,
    } from "@tanstack/svelte-table";

    export { renderComponent };
</script>

<script>
    import {
        createSvelteTable,
        flexRender,
        getCoreRowModel,
    } from "@tanstack/svelte-table";
    import { rankItem } from "@tanstack/match-sorter-utils";
    import { writable } from "svelte/store";
    import UpIcon from "./icons/UpIcon.svelte";
    import DownIcon from "./icons/DownIcon.svelte";
    import Popover from "./Popover.svelte";
    import SettingsIcon from "./icons/SettingsIcon.svelte";
    import PopoverMenuSection from "./PopoverMenuSection.svelte";
    import PopoverMenuItem from "./PopoverMenuItem.svelte";
    import MoveLeft from "./icons/MoveLeft.svelte";
    import MoveRight from "./icons/MoveRight.svelte";
    import HideIcon from "./icons/HideIcon.svelte";
    import moveIndex from "../utils/moveIndex";
    import CheckBox from "./CheckBox.svelte";
    import SearchIcon from "./icons/SearchIcon.svelte";
    import PaginationNew from "./PaginationNew.svelte";
    import { onMount } from "svelte";
    import HighlightCell from "./HighlightCell.svelte";

    export let data;
    /*
     * refer: https://svelte-headless-table.bryanmylee.com/docs/api/create-columns#table-column-columndef-datacolumn
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
    export let localStorageKey = "druids-table-key";

    let visibilityKey;
    let orderKey;
    let paginationKey;
    let sizingKey;
    $: {
        visibilityKey = `${localStorageKey}-visibility`;
        orderKey = `${localStorageKey}-order`;
        paginationKey = `${localStorageKey}-pagination`;
        sizingKey = `${localStorageKey}-sizing`;
    }

    let selectColumn = [
        {
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
        },
    ];

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
        localStorage.setItem(
            visibilityKey,
            JSON.stringify($table.getState().columnVisibility),
        );
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
        localStorage.setItem(
            orderKey,
            JSON.stringify($table.getState().columnOrder),
        );
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
        // localStorage.setItem(
        //     paginationKey,
        //     JSON.stringify($table.getState().pagination),
        // );
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
        localStorage.setItem(
            sizingKey,
            JSON.stringify($table.getState().columnSizing),
        );
    };

    $: columnsValue = columns.map((col) => {
        if (col["cell"] == undefined)
            return {
                ...col,
                cell: (info) =>
                    renderComponent(HighlightCell, {
                        value: info.getValue()?.toString()? info.getValue().toString():'',
                        highlight: info.table.getState().globalFilter,
                    }),
            };
        else {
            return col;
        }
    });


    const options = writable({
        data,
        columns: selectableRows
            ? [...selectColumn, ...columns]
            : columns,
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
    onMount(() => {
        let localVisibility = localStorage.getItem(visibilityKey);
        let localOrder = localStorage.getItem(orderKey);
        let localSizing = localStorage.getItem(sizingKey);

        let state = {
            columnVisibility: localVisibility
                ? JSON.parse(localVisibility)
                : columnVisibility,

            columnOrder: localOrder ? JSON.parse(localOrder) : columnOrder,

            columnSizing: localSizing ? JSON.parse(localSizing) : columnSizing,
        };
        options.update((old) => ({
            ...old,
            columns:columnsValue,
            state: {
                ...old.state,
                ...state,
            },
        }));
    });
</script>

<div class="druids-table-header">
    {#if globalSearch}
        <div class="druids-table-header-input">
            <SearchIcon />
            <input
                type="text"
                bind:value={gobalFilterValue}
                on:keyup={handleKeyUp}
                placeholder={searchPlaceholder}
            />
        </div>
    {/if}

    {#if menu}
        <div class="druids-table-menu">
            <Popover isRounded>
                <button slot="trigger" class="druids-table-settings-trigger">
                    <SettingsIcon />
                </button>
                <div slot="popper" class="druids-table-settings">
                    <label>
                        All
                        <input
                            checked={$table.getIsAllColumnsVisible()}
                            on:change={$table.getToggleAllColumnsVisibilityHandler()}
                            type="checkbox"
                        />
                    </label>
                    {#each $table.getAllLeafColumns() as column}
                        <label>
                            {column.id}
                            <input
                                checked={column.getIsVisible()}
                                on:change={column.getToggleVisibilityHandler()}
                                type="checkbox"
                            />
                        </label>
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
                        <div on:click={header.column.getToggleSortingHandler()}>
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
                                        <PopoverMenuSection separator="bottom">
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
                            <span
                                class="druids-table-resizer resizer"
                                on:dblclick={() => header.column.resetSize()}
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
                    <td style="width: {cell.column.getSize()}px">
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
            <select
                id="pageSize"
                value={$table.getState().pagination.pageSize}
                on:change={(e) => {
                    $table.setPageSize(Number(e.target.value));
                }}
            >
                {#each [2, 5, 10, 20, 30] as val}
                    <option value={val}>Show {val}</option>
                {/each}
                <option value={data.length}>All</option>
            </select>
        </div>
        <div>
            <PaginationNew
                hasPreviousPage={$table.getCanPreviousPage()}
                hasNextPage={$table.getCanNextPage()}
                handleNext={$table.nextPage}
                handlePrev={$table.previousPage}
                pageIndex={$table.getState().pagination.pageIndex}
                setPage={$table.setPageIndex}
                totalPages={$table.getPageCount()}
            />
        </div>
    {/if}
</div>

<style>
    .druids-table-header,
    .druids-table-footer {
        display: flex;
        padding: 4px 0px;
        justify-content: space-between;
        align-items: center;
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

    .druids-table-settings label {
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
        width: 50%;
        min-width: 200px;
        max-width: 400px;
        padding: 4px;
        display: flex;
        align-items: center;
        gap: 4px;
        border: solid 1px var(--ui-border);
        border-radius: 4px;
    }

    .druids-table {
        width: 100%;
        max-width: 100%;
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

    .druids-table-resizer {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        width: 2px;
        background: lightgray;
        z-index: 1;
        cursor: col-resize;
    }
    .druids-table-resizer:hover,
    .druids-table-resizer:focus {
        width: 6px;
    }
</style>
