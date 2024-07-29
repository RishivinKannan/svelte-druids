<script context="module">
    import Tooltip from "../components/Tooltip.svelte";

    export const meta = {
        title: "druids/Tooltip",
        component: Tooltip,
        tags: ["autodocs"],

        excludeStories: /.*Data$/,
    };
</script>

<script>
    import { Template, Story } from "@storybook/addon-svelte-csf";
</script>

<Template let:args>
    <Tooltip {...args}>
        <button>Hover me</button>
    </Tooltip>
</Template>

<Story name="Default" args={{ content: "I am Tooltip" }} />
