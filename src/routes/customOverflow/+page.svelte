<script>
    import HttpRequestBar from "../../components/HttpRequestBar.svelte";
    import Tag from "../../components/Tag.svelte";
    import Tooltip from "../../components/Tooltip.svelte";
</script>

<HttpRequestBar
    statusCode={200}
    url="https://druids.datadoghq.com/components/layout/Overflower?example5_state=N4IglgzgagpgTgFzAYwIYBsQC4BmGIwC+QA#example5"
    queryParams={{ search: "what" }}
    isFullWidth
/>
<Tooltip content='what' hasTooltip={true}>

    <Tag size="lg" label={"hfashflshflhslfhslfhlshflhflshlf"} />
</Tooltip>


