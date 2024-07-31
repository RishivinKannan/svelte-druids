<script>
    import FormatNumber from "./FormatNumber.svelte";
    import PercentBar from "./PercentBar.svelte";
    export let value;
    /**
     * @type {number}
     */
    export let percentage;
    export let minWidth = 60;
    export let percentbarProps = {};
    export let className;

    $: minWidthVar = `--druids-numberpercent-minwidth:${minWidth}px;`
</script>



<span style={minWidthVar} class="druids-numberpercent {className}">
    {#if typeof value === "number"}
        <FormatNumber {value} {...$$restProps} />
    {:else}
        {value}
    {/if}
    <PercentBar {percentage} {...percentbarProps} />
</span>


<style>
    .druids-numberpercent{
        display: inline-flex;
        min-width: var(--druids-numberpercent-minwidth,60px);
        gap: 2px 8px;
        justify-content: right;
        align-items: center;
        flex-wrap: wrap;
    }

</style>