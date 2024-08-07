<script>
    import '../../css/global.css'
    export let label=null;
    export let isChecked = false;
    export let id = null;
    export let isDisabled = false;
    export let name = null;
    export let size = "md";
    export let style = ''

    $: sizeClass = `druids-toggle-${size}`;
</script>

<label class="root-style {sizeClass}" {style}>
    <label class="switch {sizeClass}">
        <input
            type="checkbox"
            {name}
            {id}
            checked={isChecked}
            disabled={isDisabled}
            on:change
        />
        <span class="slider"></span>
    </label>
    {#if label}
        <span>{label}</span>
    {/if}
</label>

<style>
    .root-style {
        --druids-toggle-width-xs: 34px;
        --druids-toggle-width-sm: 38px;
        --druids-toggle-width-md: 44px;
        --druids-toggle-width-lg: 56px;

        --druids-toggle-height-xs: 19px;
        --druids-toggle-height-sm: 24px;
        --druids-toggle-height-md: 25px;
        --druids-toggle-height-lg: 31px;

        --druids-toggle-slider-xs: 13px;
        --druids-toggle-slider-sm: 15px;
        --druids-toggle-slider-md: 18px;
        --druids-toggle-slider-lg: 24px;

        display: inline-flex;
        align-items: center;
        gap: 8px;
    }

    .root-style.druids-toggle-xs {
        font-size: smaller;
    }
    .root-style.druids-toggle-sm {
        font-size: small;
    }
    .root-style.druids-toggle-md {
        font-size: medium;
    }
    .root-style.druids-toggle-lg {
        font-size: larger;
    }
    .switch {
        position: relative;
        display: inline-block;
        width: var(--druids-toggle-width-md);
        height: var(--druids-toggle-height-md);
    }
    .switch.druids-toggle-xs {
        width: var(--druids-toggle-width-xs);
        height: var(--druids-toggle-height-xs);
    }
    .switch.druids-toggle-sm {
        width: var(--druids-toggle-width-sm);
        height: var(--druids-toggle-height-sm);
    }
    .switch.druids-toggle-md {
        width: var(--druids-toggle-width-md);
        height: var(--druids-toggle-height-md);
    }
    .switch.druids-toggle-lg {
        width: var(--druids-toggle-width-lg);
        height: var(--druids-toggle-height-lg);
    }

    .switch.druids-toggle-xs .slider:before {
        height: calc(var(--druids-toggle-slider-xs));
        width: calc(var(--druids-toggle-slider-xs));
    }
    .switch.druids-toggle-sm .slider:before {
        height: calc(var(--druids-toggle-slider-sm));
        width: calc(var(--druids-toggle-slider-sm));
    }
    .switch.druids-toggle-md .slider:before {
        height: calc(var(--druids-toggle-slider-md));
        width: calc(var(--druids-toggle-slider-md));
    }
    .switch.druids-toggle-lg .slider:before {
        height: calc(var(--druids-toggle-slider-lg));
        width: calc(var(--druids-toggle-slider-lg));
    }

    .switch input {
        opacity: 1;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0px;
        background: var(--ui-status-other-soft);
        transition: 0.4s;
        border-radius: 30px;
        border: 1px solid #ccc;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: var(--druids-toggle-slider-md);
        width: var(--druids-toggle-slider-md);
        border-radius: 16px;
        left: 3px;
        top: 50%;
        transform: translateY(-50%);
        background-color: var(--ui-background);
        box-shadow: 0 2px 5px #999999;
        transition: 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    input:checked + .slider {
        background: var(--ui-interaction-primary);
        border: 1px solid transparent;
    }

    input:checked + .slider:before {
        transform: translateX(100%) translateY(-50%);
    }
</style>
