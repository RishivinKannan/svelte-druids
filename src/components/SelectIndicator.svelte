<script>
    export let isSelected;
    export let isSomeSubRowsSelected;

    $: indeterminate = $isSelected ? false : $isSomeSubRowsSelected;
</script>

<input type="checkbox" bind:checked={$isSelected} {indeterminate} />
