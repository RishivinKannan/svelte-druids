<script>
    export let isSelected;
    export let isSomeSubRowsSelected=false;

    $: indeterminate = $isSelected ? false : $isSomeSubRowsSelected;
</script>

<input type="checkbox" bind:checked={$isSelected} {indeterminate} />
