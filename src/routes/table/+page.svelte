<script>
    import { readable } from "svelte/store";
    import Table from "../../components/Table.svelte";

    const data = readable([
        { id: 0, foo: "Winter", bar: 30, baz: true },
        { id: 1, foo: "Spring", bar: 63, baz: false },
        { id: 2, foo: "Summer", bar: 92, baz: true },
        { id: 3, foo: "Fall", bar: 72 },
    ]);

    const columns = [
        { header: "Season", accessor: "foo" },
        { header: "Avg. temp", accessor: "bar", type: "numeric" },
        { header: "Baz", accessor: "baz" },
    ];
</script>

<div style="width:400px;">
    <Table
        {data}
        {columns}
        selectableRows
        searchPlaceholder="Search here..."
        menu
    ></Table>
</div>
