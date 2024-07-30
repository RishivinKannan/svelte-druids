<script>
    import TableNew, { renderComponent } from "../../components/Table.svelte";
    import StatusPill from "../../components/StatusPill.svelte";
    const data = [
        { foo: "Winter", bar: 30, baz: "true" },
        { foo: "Spring", bar: 63, baz: "false" },
        { foo: "Summer", bar: 92, baz: "true" },
        { foo: "Fall", bar: 72},
    ];

    const columns = [
        {
            header: "Season",
            accessorKey: "foo",
            render: ({value}) => {
                return renderComponent(StatusPill, { label: value,level:'success',isSoft:true });
            },
        },
        {
            header: "Avg. temp",
            accessorKey: "bar",
        },
        {
            header: "Baz",
            accessorKey: "baz",
        },
    ];
    let toggle = true;


</script>

<input type="checkbox" bind:checked={toggle}>
{#if toggle }
<TableNew {...{ columns, data }} pagination menu dropdown selectableRows localStorageKey='what'/>
{/if}
