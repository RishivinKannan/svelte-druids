<script>
    import TextColorOption from "./TextColorOption.svelte";
    import Select from "./Select.svelte";
    /**
     * [{label:"...",
     * value:...,
     * textColor:/TextColorPill Props/,
     * },...]
     * @type {array}
     */
    export let textColorOptions;
    
    export let onChange = (paletteColor) => {};
    export let selectedTextColor = null;
</script>

<Select
    value={selectedTextColor}
    options={textColorOptions}
    {onChange}
    optionRender={TextColorOption}
    valueRender={TextColorOption}
    {...$$restProps}
/>
