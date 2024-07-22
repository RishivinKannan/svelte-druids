<script context="module">
    import OverflowList from "../components/OverflowList.svelte";

    export const meta = {
        title: "druids/OverflowList",
        component: OverflowList,
        tags: ["autodocs"],
        argTypes: {},
        excludeStories: /.*Data$/,
    };
</script>

<script>
    import { Template, Story } from "@storybook/addon-svelte-csf";
    import Badge from "../components/Badge.svelte";
</script>

<Template let:args>
    <OverflowList {...args}>
        {#each Array(30).fill("Badge") as el, idx}
            <Badge label="Badge-{idx}" />
            
        {/each}
    </OverflowList>
</Template>

<Story name="default" args={{}} />
