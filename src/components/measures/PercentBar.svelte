<script>
    import "../../css/global.css";
    export let percentage = 0;
    export let width = "100%";
    export let height = 12;
    export let barColor = null;
    export let backgroundColor = null;
    export let outlineColor = null;
    export let valuePosition = "start";
    export let isDisabled = false;
    export let title = null;
    export let style = "";

    $: outlineColorVar = outlineColor
        ? `--druids-percentbar-outline:${outlineColor};`
        : "";
    $: backgroundColorVar = backgroundColor
        ? `--druids-percentbar-background:${backgroundColor};`
        : "";
    $: barColorVar = barColor ? `--druids-percentbar-bar:${barColor};` : "";
    $: disabledColorVar = isDisabled
        ? `--druids-percentbar-background:var(--ui-border) !important;--druids-percentbar-bar:var(--ui-border) !important;--druids-percentbar-outline:var(--ui-border) !important;`
        : "";
    $: widthVar =
        typeof width === "string"
            ? `--druids-percentbar-width:${width};`
            : `--druids-percentbar-width:${width}px;`;
    $: heightVar =
        typeof height === "string"
            ? `--druids-percentbar-height:${height};`
            : `--druids-percentbar-height:${height}px;`;

    $: percentageVar = isDisabled
        ? `--druids-percentbar-percentage:100%;`
        : `--druids-percentbar-percentage:${percentage}%;`;

    $: containerStyles = `${style}${heightVar}${widthVar}${outlineColorVar}${backgroundColorVar}${barColorVar}${disabledColorVar}`;
</script>

<div {title} class="druids-percentbar-container" style={containerStyles}>
    <div
        class="druids-percentbar-bar"
        data-position={valuePosition}
        style={percentageVar}
    ></div>
</div>

<style>
    .druids-percentbar-container {
        width: var(--druids-percentbar-width, 60px);
        height: var(--druids-percentbar-height, 12px);
        background: var(--druids-percentbar-background, var(--ui-border));
        outline: 1px solid var(--druids-percentbar-outline, none);
    }
    .druids-percentbar-bar {
        width: var(--druids-percentbar-percentage,0%);
        height: 100%;
        background: var(--druids-percentbar-bar, var(--ui-dataviz-blue));
        transition-property: width;
        transition-duration: 1s;
        transition-timing-function: ease-in-out;
    }
    .druids-percentbar-bar[data-position="end"] {
        float: right;
    }
</style>
