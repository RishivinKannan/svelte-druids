<script>
    import { tooltip } from "../Tooltip.svelte";

    export let src;
    export let srcset = null;
    export let alt = "";
    export let label = "";
    export let labelPacement = "top";
    export let size = "md";
    export let ringColor = "";

    $: sizeClass = `druids-avatar-${size}`;
    
</script>

<img
    style="outline-color:{ringColor};"
    {src}
    {srcset}
    {...$$restProps}
    use:tooltip={{ content: label, placement: labelPacement }}
    {alt}
    class="druids-avatar {sizeClass}"
/>

<style>
    .druids-avatar {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        outline: 1px solid transparent;
    }

    .druids-avatar.druids-avatar-xs {
        width: 20px;
        height: 20px;
    }
    .druids-avatar.druids-avatar-sm {
        width: 24px;
        height: 24px;
    }
    .druids-avatar.druids-avatar-md {
        width: 28px;
        height: 28px;
    }
    .druids-avatar.druids-avatar-lg {
        width: 36px;
        height: 36px;
    }
    .druids-avatar.druids-avatar-xl {
        width: 44px;
        height: 44px;
    }
    .druids-avatar.druids-avatar-xxl {
        width: 104px;
        height: 104px;
    }
</style>
