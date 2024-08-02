<script>
    import '../../css/global.css'
    export let options = [];
    export let name;
    export let value;
    export let isDisabled = false;
    export let direction = 'row'
    export let size = 'md'

    export let className =''
    export let style = '';

    $: flexDirection = `--druids-flex-direction:${direction};`
    $: sizeClass = `druids-radio-${size}`
</script>

<div class='druids-radio-container {className} {sizeClass}' style="{flexDirection}{style}">
    {#each options as opt}
        <label class="druids-radio-label" class:druids-radio-disabled={isDisabled}>
            <input {name} type="radio" value={opt?.value} bind:group={value} on:change disabled={isDisabled} {...$$restProps}/>
            <span>{opt?.label}</span>
        </label>
    {/each}
</div>


<style>
    .druids-radio-container{
        display: flex;
        font-size: large;
        flex-direction: var(--druids-flex-direction);
        color: var(--ui-text);
    }
    .druids-radio-label{
        display: inline-flex;
        gap: 2px;
    }
    .druids-radio{
        transform: scale(1.2);
    }

    .druids-radio-container.druids-radio-xs{
        font-size: small;
    }
    .druids-radio-container.druids-radio-sm{
        font-size: medium;
    }
    .druids-radio-container.druids-radio-xs .druids-radio,.druids-radio-container.druids-radio-sm .druids-radio{
       transform: scale(1);
    }
    .druids-radio-container.druids-radio-md{
        font-size: large;
    }
    .druids-radio-container.druids-radio-md .druids-radio{
        transform: scale(1.2);
    }
    .druids-radio-container.druids-radio-lg{
        font-size: larger;
    }
    .druids-radio-container.druids-radio-lg .druids-radio{
        transform: scale(1.3);
    }
</style>