<script>
    import '../../css/global.css'
    import humanFormatNumber from "../../utils/humanFormatNumber";
    /**
     * @type {number}
     */
    export let value;
    export let type = "human";
    /**
     * @type {undefined|0|1|2}
     */
    export let maxDecimal = undefined;
    /**
     * @type {string}
     */
    export let perUnit;
    export let nullText = "---";
    /**
     * @type {string}
     */
    export let valuePrefix = null;
    /**
     * @type {string}
     */
    export let unitSuffix = null;

    export let perUnitClassName = "";
    // export let unitClassName = "";
    export let valueClassName = "";
    export let unitSuffixClassName = "";
    export let valuePrefixClassName = "";

    export let className = "";

    export let style = "";

    export let compactDuration =false

    $: formattedValue = value
        ? humanFormatNumber(value, type, maxDecimal,compactDuration) || nullText
        : nullText;
</script>

<span {style} class="druids-formatnumber {className}">
    {#if valuePrefix}
        <span class={valuePrefixClassName}>{valuePrefix}</span>
    {/if}
    <span class={valueClassName}
        >{#if value}{formattedValue}{:else}{nullText}{/if}</span
    >{#if perUnit}<span class={perUnitClassName}>{perUnit}</span>{/if}

    {#if unitSuffix}
        <span class={unitSuffixClassName}>{unitSuffix}</span>
    {/if}
</span>

<style>
    .druids-formatnumber{
        color: var(--ui-text);
    }
</style>