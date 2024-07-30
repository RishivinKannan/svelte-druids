<script>
    import TextIcon from "./icons/TextIcon.svelte";
    /*
     * @type {string}
     */
    export let textColor;
    /*
     * @type {string}
     */
    export let backgroundColor;
    export let style = "";
</script>

<span
    class="druids-txtpalette"
    style="{style} --palette-color:{textColor};--palette-background-color:{backgroundColor};"
>
    <TextIcon />
</span>

<style>
    .druids-txtpalette {
        display: inline-flex;
        background: var(--palette-background-color);
        color: var(--palette-color);
        font-size: small;
        justify-content: center;
        align-items: center;
        padding: 2px;
        border-radius: 3px;
        width: 20px;
        height: 20px;
    }
</style>
