<script context="module">

    export function highlightWords(value, highlight) {
        let pattern = new RegExp(highlight, "gi");
        if(!highlight){
            return value;
        }
        else{

            return value.replace(
                pattern,
                (match) => `<span class='druids-highlight-match'>${match}</span>`,
            );
        }
    }

</script>

<script>
    export let highlight;
    export let value;

    // $:highlight = highlight.replace('/\s/g','').length?'':highlight

    // $: pattern = new RegExp(highlight, "gi");

    // $: render = value.replace(
    //     pattern,
    //     (match) => `<span style='background: #FFF5BA;'>${match}</span>`,
    // );

    $: render = highlightWords(value,highlight)
</script>

{#if !highlight}
    <span>{value}</span>
{:else}
    <span>{@html render}</span>
{/if}
