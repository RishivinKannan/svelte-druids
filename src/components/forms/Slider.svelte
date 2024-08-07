<script>
    import "../../css/global.css";
    export let min = 0;
    export let max = 100;
    export let step = null;
    export let isDisabled = false;
    export let value = 0;
    export let marks = null;

    export let size = "md";
    export let level = "default";
    export let customColor = null;
    export let style = "";
    export let onChange = () => {};

    $: sizeClass = `druids-slider-${size}`;
    $: levelVar = `--druids-slider-track:var(--ui-status-${level});`;

    $: customColorStyle = customColor
        ? `--druids-custom-color:${customColor};`
        : "";

    $: range = Array.isArray(value) ? [...value] : [0, Number(value)];

    $: customSteps = marks
        ? Object.keys(marks).map((val) => Number(val))
        : null;

    $: minRange = Math.min(...range);
    $: maxRange = Math.max(...range);

    function generateUniqueId() {
        return "steplist-" + Math.random().toString(36).substr(2, 9);
    }

    let uniqueId = generateUniqueId();

    function handleCustomStep(e) {
        function getNearestValue(value) {
            return customSteps.reduce((prev, curr) => {
                return Math.abs(curr - value) < Math.abs(prev - value)
                    ? curr
                    : prev;
            });
        }

        if (marks) {
            if (step === null) {
                let nearestValue = getNearestValue(e.target.value);
                e.target.value = nearestValue;
            }
        }

        if (e.target.id === `${uniqueId}-0`) {
            range[0] = e.target.value;
        } else if (e.target.id === `${uniqueId}-1`) {
            range[1] = e.target.value;
        }
    }
</script>

<div
    class="druids-slider-container {sizeClass}"
    style="{levelVar}{customColorStyle} {style}"
>
    {#if (typeof value === "number") | (typeof value === "string")}
        <input
            type="range"
            id="{uniqueId}-1"
            {min}
            {max}
            {step}
            disabled={isDisabled}
            {value}
            class="druids-slider"
            on:input={handleCustomStep}
            on:change={(e) => onChange(e, e.target.value)}
        />
    {:else}
        {#each value as val, idx}
            <input
                type="range"
                id="{uniqueId}-{idx}"
                {min}
                {max}
                {step}
                disabled={isDisabled}
                value={val}
                class="druids-slider"
                on:input={handleCustomStep}
                on:change={(e) => {
                    onChange(e, [minRange, maxRange]);
                }}
                style="pointer-events: none;"
            />
        {/each}
    {/if}
    {#if marks}
        <div class="druids-slider-marks">
            {#each Object.entries(marks) as [key, val]}
                <span style="left:{(Number(key) / max) * 100}%">{val}</span>
            {/each}
        </div>
    {/if}
    <div
        class="druids-slider-track"
        style="left:{minRange}%;width:{((maxRange - minRange) / max) *
            100}%;background: var(--druids-custom-color,var(--druids-slider-track, var(--ui-interaction-primary)));"
    ></div>
</div>

<style>
    .druids-slider-container {
        box-sizing: border-box;
        position: relative;
        width: 100%;
        height: 3px;
        border-radius: 100px;
        background: var(--ui-border);
    }

    .druids-slider-container:has(.druids-slider:disabled) .druids-slider-track {
        background: var(--ui-background-secondary);
    }

    .druids-slider-container:has(.druids-slider:disabled)
        .druids-slider::-webkit-slider-thumb {
        background: var(--ui-background-secondary);
    }
    .druids-slider-container:has(.druids-slider:disabled)
        .druids-slider::-moz-range-thumb {
        background: var(--ui-background-secondary);
    }

    .druids-slider-container.druids-slider-lg {
        height: 8px;
    }

    .druids-slider-container.druids-slider-lg
        .druids-slider::-webkit-slider-thumb {
        width: 20px;
        height: 20px;
    }
    .druids-slider-container.druids-slider-lg .druids-slider::-moz-range-thumb {
        width: 20px;
        height: 20px;
    }

    .druids-slider {
        all: unset;
        z-index: 99;
        position: absolute;
        top: 50%;
        left: 0%;
        transform: translateY(-50%);
        width: 100%;
        height: inherit;
        -webkit-appearance: none;
        appearance: none;
        outline: none;
        background: none;
    }
    .druids-slider-track {
        z-index: 0;
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: var(--druids-slider-track, var(--ui-interaction-primary));
    }

    .druids-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: var(--druids-custom-color,var(--druids-slider-track, var(--ui-interaction-primary)));
        cursor: grab;
        pointer-events: auto;
    }

    .druids-slider::-moz-range-thumb {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: var(--druids-slider-track, var(--ui-interaction-primary));
        cursor: move; /* fallback if grab cursor is unsupported */
        cursor: grab;
        cursor: -moz-grab;
        cursor: -webkit-grab;
    }

    .druids-slider-marks {
        position: absolute;
        inset: 0;
    }
    .druids-slider-marks span {
        position: absolute;
        font-size: small;
        transform: translateX(-50%);
        margin-top: 15px;
    }
</style>
