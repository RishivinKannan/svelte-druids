<script lang="ts">
    import "../css/global.css";
    import {
        Column,
        createRender,
        createTable,
        Render,
        Subscribe,
    } from "svelte-headless-table";
    import { readable, writable } from "svelte/store";
    import {
        addSortBy,
        addResizedColumns,
        addSelectedRows,
        addTableFilter,
        addHiddenColumns,
    } from "svelte-headless-table/plugins";
    import UpIcon from "./icons/UpIcon.svelte";
    import DownIcon from "./icons/DownIcon.svelte";
    import SelectIndicator from "./SelectIndicator.svelte";
    import SearchIcon from "./icons/SearchIcon.svelte";
    import Popover from "./Popover.svelte";
    import { hide } from "@popperjs/core";
    import SettingsIcon from "./icons/SettingsIcon.svelte";

    export let data: any[];
    export let columns: any[];
    export let selectableRows = false;
    export let globalSearch = true;
    export let searchPlaceholder = "";
    export let menu = false;
    export let resizeable = false;

    let table = createTable(data, {
        sort: addSortBy(),
        resize: addResizedColumns(),
        select: addSelectedRows(),
        filter: addTableFilter(),
        hide: addHiddenColumns(),
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
                        initialWidth: 35,
                        maxWidth: 35,
                    },
                },
            }),
        ];
    }

    let tableColumns = table.createColumns([
        ...selectCols,
        ...columns.map((column) => table.column(column)),
    ]);

    let {
        flatColumns,
        headerRows,
        rows,
        tableAttrs,
        tableBodyAttrs,
        pluginStates,
    } = table.createViewModel(tableColumns);

    let { filterValue } = pluginStates.filter;

    let { hiddenColumnIds } = pluginStates.hide;

    const ids = flatColumns.map((c) => c.id);
    let hideForId = Object.fromEntries(ids.map((id) => [id, false]));

    $: $hiddenColumnIds = Object.entries(hideForId)
        .filter(([, hide]) => hide)
        .map(([id]) => id);
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
            <Popover>
                <button slot="trigger" class="druids-table-settings-trigger">
                    <SettingsIcon />
                </button>
                <div slot="popper" class="druids-table-settings">
                    {#each ids as id}
                        {#if id == "selected"}
                            <span></span>
                        {:else}
                            <div>
                                <label for="hide-{id}">{id}</label>
                                <input
                                    style="all: set;"
                                    id="hide-{id}"
                                    type="checkbox"
                                    bind:checked={hideForId[id]}
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
                    {#each headerRow.cells as cell (cell.id)}
                        <Subscribe
                            attrs={cell.attrs()}
                            let:attrs
                            props={cell.props()}
                            let:props
                        >
                            <th
                                {...attrs}
                                on:click={props.sort.toggle}
                                use:props.resize
                            >
                                <div>
                                    {#if props.sort.order === "asc"}
                                        <UpIcon />
                                    {:else if props.sort.order === "desc"}
                                        <DownIcon />
                                    {/if}
                                    <Render of={cell.render()} />
                                </div>

                                {#if !props.resize.disabled && resizeable}
                                    <div
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
        {#each $rows as row (row.id)}
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

<style>
    .druids-table-header {
        width: inherit;
        display: flex;
        padding: 4px 0px;
        justify-content: space-between;
    }

    .druids-table-header input[type="text"] {
        all: unset;
    }

    .druids-table-settings div {
        display: flex;
        justify-content: space-between;
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
        width: inherit;
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

    .druids-table-body tr:last-child td {
        border-bottom: none;
    }
    th {
        position: relative;
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
