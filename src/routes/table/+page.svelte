<script>
    import { readable, writable } from "svelte/store";
    import Table from "../../components/Table.svelte";
    import Pagination from "../../components/Pagination.svelte";
    import Tag from "../../components/Tag.svelte";
    import Icon from "../../components/icon.svelte";
    import TagList from "../../components/TagList.svelte";

    const data = readable([
        { foo: "Winter", bar: 30, baz: true },
        { foo: "Spring", bar: 63, baz: false },
        { foo: "Summer", bar: 92, baz: true },
        { foo: "Fall", bar: 72 },
    ]);

    const columns = [
        { header: "Season", accessor: "foo" },
        { header: "Avg. temp", accessor: "bar" },
        { header: "Baz", accessor: "baz" },
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

<Tag label="what:why" size="sm" icon={Icon} />

<TagList tags={[{ label: "what:icon", icon: Icon }]} />
