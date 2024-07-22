<script>
    export let checked;
    export let indeterminate=false;
    export let disabled=false;
    export let onChange=()=>{};
</script>

<input type="checkbox" {disabled} {checked} {indeterminate} on:change={onChange}  />