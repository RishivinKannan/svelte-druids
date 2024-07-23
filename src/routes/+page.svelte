<script>
    import Badge from "../components/Badge.svelte";
    import Icon from "../components/icon.svelte";

    import Table from "../components/Table.svelte";
    import TagList from "../components/TagList.svelte";

    let array = ["agdagag", "agdagag", "agdagag", "agdaga", "adhlla"];
    let items = [];

    for (let i = 0; i < 4; i++) {
        items = [...items, ...array];
    }

    const data = [
        { name: "Ada Lovelace", age: 21 },
        { name: "Barbara Liskov", age: 52 },
        { name: "Richard Hamming", age: 38 },
    ];

    const columns = [
        {
            header: "Name",
            accessorKey: "name",
        },
        {
            header: "Age",
            accessorKey: "age",
        },
    ];
</script>

<div class="container">
    <Badge label="watchdog" icon={Icon} iconPosition="right" />

    <Badge label="watchdog" icon={Icon} iconPosition="left" />

    <Badge label="watchdog" icon={Icon} iconPosition="right" isBorderless />

    <Badge label="watchdog" icon={Icon} iconPosition="right" isInteractive />

    <Badge
        label="watchdog"
        icon={Icon}
        iconPosition="right"
        isInteractive
        count={20}
    />

    <Badge
        label="watchdog"
        icon={Icon}
        iconPosition="right"
        count={1234}
        maxCount={2000}
    />

    <Badge
        label="watchdog"
        icon={Icon}
        iconPosition="right"
        count={1234}
        maxCount={2000}
        level="warning"
    />

    <Badge
        label="watchdog"
        icon={Icon}
        iconPosition="right"
        count={1234}
        maxCount={2000}
        level="danger"
        hasTooltip
    />

    <Badge
        label="watchdog"
        icon={Icon}
        iconPosition="right"
        size="xs"
        level="warning"
    />
    <Badge
        label="watchdog"
        compProps={{ href: "/yeah!", onClick: (e) => console.log(e) }}
        icon={Icon}
        iconPosition="right"
        size="sm"
        level="danger"
    />

    <Badge
        label="watchdog"
        icon={Icon}
        iconPosition="right"
        size="lg"
        title="Badge"
        as="button"
        name="button"
    />
</div>
<TagList tags={items} lines={2} gapY={10} />

<Table {data} {columns} dropdown></Table>

<style>
    .container {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 12px;
        padding: 2rem;
    }
</style>
