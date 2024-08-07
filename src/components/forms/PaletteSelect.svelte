<script>
    import PaletteOption from "./PaletteOption.svelte";
    import Select from "./Select.svelte";

    export let paletteColors;
    export let onChange = (paletteColor) => {};
    export let selectedPalette = null;
</script>

<Select
    value={selectedPalette}
    options={paletteColors}
    {onChange}
    optionRender={PaletteOption}
    valueRender={PaletteOption}
    {...$$restProps}
/>
