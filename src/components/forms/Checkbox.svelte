<script>
    import Overflower from "../Overflower.svelte";
    export let isChecked = false;
    export let isDisabled = false;
    export let isIndeterminate = false;
    export let id = null;
    export let label;
    export let value;
    export let name;
    export let hasOverflower = true;
    export let size = "md";
    export let inputClassName = "";
    export let labelClassName = "";

    $: sizeClass = `druids-checkbox-${size}`
</script>

<label class="druids-checkbox-label {sizeClass} {labelClassName}">
    <input
        {id}
        type="checkbox"
        bind:checked={isChecked}
        disabled={isDisabled}
        bind:indeterminate={isIndeterminate}
        class="druids-checkbox {inputClassName}"
        {value}
        {name}
        on:change
        on:click
        on:focus
        on:blur
        on:mouseenter
        on:mouseleave
        on:mousedown
        on:mouseover
        {...$$restProps}
    />
    <Overflower allowOverflow={!hasOverflower} {label}/>
</label>

<style>
    .druids-checkbox-label {
        display: inline-flex;
        max-width: 100%;
        align-items: center;
        gap: 4px;
    }

    .druids-checkbox-label.druids-checkbox-xs{
        font-size: smaller;
    }
    .druids-checkbox-label.druids-checkbox-sm{
        font-size: small;
    }
    .druids-checkbox-label.druids-checkbox-xs .druids-checkbox,.druids-checkbox-label.druids-checkbox-sm .druids-checkbox{
       transform: scale(.9);
    }
    .druids-checkbox-label.druids-checkbox-md{
        font-size: medium;
    }
    .druids-checkbox-label.druids-checkbox-md .druids-checkbox{
        transform: scale(1);
    }
    .druids-checkbox-label.druids-checkbox-lg{
        font-size: large;
    }
    .druids-checkbox-label.druids-checkbox-lg .druids-checkbox{
        transform: scale(1.2);
    }

</style>
