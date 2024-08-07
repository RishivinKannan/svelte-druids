<script>
    import Label from "./Label.svelte";
    import PalettePill from "../pills/PalettePill.svelte";
    export let label;
    export let value = null;
    export let palette;
</script>

<!-- svelte-ignore a11y-interactive-supports-focus -->
<div {value} role="button" on:click class="{$$restProps.class} druids-paletteoption" {...$$restProps}>
    <PalettePill {...palette} hasBorder={true} />
    <Label style='color:inherit;'>
        {label}
    </Label>
</div>


<style>
    div{
        display: grid;
        gap: 0px 8px;
        grid-template-columns: 1fr 3fr;
        align-items: center;
    }
</style>