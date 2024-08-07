<script>
    import PaletteOption from "./PaletteOption.svelte";
    import Select from "./Select.svelte";
    /**
     * [{label:"...",
     * value:...,
     * palette:/paletteProps/,
     * },...]
     * @type {array}
     */
    export let paletteOptions;
    export let onChange = (paletteColor) => {};
    export let selectedPalette = null;
</script>

<Select
    value={selectedPalette}
    options={paletteOptions}
    {onChange}
    optionRender={PaletteOption}
    valueRender={PaletteOption}
    {...$$restProps}
/>
