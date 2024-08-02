<script>
    import InputText from "./InputText.svelte";
    import Label from "./Label.svelte";

    export let label;
    export let type = "row";
    export let input = InputText;
    export let inputProps = {};
    export let labelProps = {};
    export let id;
    export let isRequired = false;
    export let size ='md'
    export let isFullWidth =false;
    export let style = ''

    $: marginStyle = (type === "group"| type === "group-reverse") ? "margin:0;":"";

    $: typeClass = `druids-field-${type}`;
</script>

<div class="druids-field-container {typeClass}" class:druids-field-fullwidth={isFullWidth} {style}>
    <Label
        {label}
        htmlFor={id}
        {size}
        hasBackground={(type === "group"| type === "group-reverse")? true : false}
        style="{marginStyle}{labelProps?.style};"
        lockupSide={type==='group'?"LEFT":type==="group-reverse"?'RIGHT':''}
        conditionality={isRequired && "required"}
    />
    <svelte:component
        this={input}
        {id}
        {size}
        {isFullWidth}
        style="{marginStyle}{inputProps?.style};"
        lockupSide={type==='group'?"RIGHT":type==="group-reverse"?'LEFT':''}
    />
</div>

<style>
    .druids-field-container {
        display: inline-flex;
        align-items: center;
        flex-wrap: nowrap;
    }
    .druids-field-container.druids-field-fullwidth{
        width: 100%;
    }

    .druids-field-container.druids-field-row {
        flex-direction: row;
        gap: 4px;
        flex-wrap: nowrap;
    }

    .druids-field-container.druids-field-column {
        align-items: start;
        flex-direction: column;
        flex-wrap: nowrap;
    }
    .druids-field-container.druids-field-row-reverse {
        flex-direction: row-reverse;
        gap: 4px;
        flex-wrap: nowrap;
    }
    
    .druids-field-container.druids-field-column-reverse {
        align-items: start;
        flex-direction: column-reverse;
        flex-wrap: nowrap;
    }

    .druids-field-container.druids-field-group-reverse {
        flex-direction: row-reverse;
        flex-wrap: nowrap;
    }
</style>
