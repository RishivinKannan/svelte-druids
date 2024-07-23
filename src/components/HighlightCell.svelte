<script>

    export let highlight;
    export let value;

    // $:highlight = highlight.replace('/\s/g','').length?'':highlight

    $: pattern = new RegExp(highlight,"gi")

    $: render = value.replace(pattern,match => `<span style='background: #FFF5BA;'>${match}</span>`);



    
</script>

{#if !highlight}
<span>{value}</span>
{:else}
<span>{@html render}</span>
{/if}
