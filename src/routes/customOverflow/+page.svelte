<script>
    import HttpRequestBar from "../../components/HttpRequestBar.svelte";
    import PalletePill from "../../components/PalettePill.svelte";
    import Tag from "../../components/Tag.svelte";
    import TextColorPill from "../../components/TextColorPill.svelte";
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


<PalletePill colors={['#000000',"#8000ff",'#ffffff']} size='md' hasBorder={true}/>


<TextColorPill textColor='yellow' backgroundColor='red' size='xs'/>