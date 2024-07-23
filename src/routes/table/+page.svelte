<script>
    import { readable, writable } from "svelte/store";
    import Badge from "../../components/Badge.svelte";
    import UpIcon from "../../components/icons/UpIcon.svelte";
    import OverflowList from "../../components/OverflowList.svelte";
    import PopoverMenuItem from "../../components/PopoverMenuItem.svelte";
    import PopoverMenuSection from "../../components/PopoverMenuSection.svelte";
    import Table from "../../components/Table.svelte";

    const data = [
        { foo: "Winter", bar: 30, baz: true },
        { foo: "Spring", bar: 63, baz: false },
        { foo: "Summer", bar: 92, baz: true },
        { foo: "Fall", bar: 72 },
    ];

    const columns = [
        { header: "Season", accessorKey: "foo" },
        { header: "Avg. temp", accessorKey: "bar" },
        { header: "Baz", accessorKey: "baz" },
    ];

    const currentPage = writable(1);
    const hasNextPage = readable(true);
    const hasPreviousPage = readable(false);
    const totalPages = readable(10);

    $: PaginationProps = {
        currentPage,
        hasNextPage,
        hasPreviousPage,
        totalPages,
    };
</script>

<div style="max-width:500px; width:100%;">
    <Table
        {data}
        {columns}
        selectableRows
        resizeable
        searchPlaceholder="Search here..."
        dropdown
        menu
        pagination
    ></Table>
</div>

<OverflowList lines={3} maxCount={3} justify="flex-start" alignItems="stretch">
    {#each Array(10).fill(null) as val, idx (idx)}
        <Badge count={idx + 1} icon={UpIcon} />
    {/each}
</OverflowList>
<div style="width: 400px;">
    <PopoverMenuSection header="Section" separator="bottom">
        <PopoverMenuItem label="Action" danger />
    </PopoverMenuSection>
</div>
