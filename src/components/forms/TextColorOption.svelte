<script>
    import Label from "./Label.svelte";
    import TextColorPill from "../pills/TextColorPill.svelte";
    export let label;
    export let value = null;
    export let textColorProps;
</script>

<!-- svelte-ignore a11y-interactive-supports-focus -->
<div {value} role="button" on:click class="{$$restProps.class}" {...$$restProps}>
    <TextColorPill {...textColorProps} />
    <Label style='color:inherit;'>
        {label}
    </Label>
</div>


<style>
    div{
        display: grid;
        gap: 0px 8px;
        grid-template-columns: 1fr 5fr;
        align-items: center;
    }
</style>