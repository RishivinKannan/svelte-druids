<script context="module">
    import Popover from "../components/Popover.svelte";

    export const meta = {
        title: "druids/Popover",
        component: Popover,
        tags: ["autodocs"],
        argTypes: {
            placement: {
                control: { type: "select" },
                options: [
                    "auto",
                    "auto-start",
                    "auto-end",
                    "top",
                    "top-start",
                    "top-end",
                    "bottom",
                    "bottom-start",
                    "bottom-end",
                    "right",
                    "right-start",
                    "right-end",
                    "left",
                    "left-start",
                    "left-end",
                ],
            },
            strategy: {
                control: { type: "select" },
                options: ["absolute", "inline"],
            },
            popperOffset: {
                control: { type: "object" },
            },
        },
        excludeStories: /.*Data$/,
    };
</script>

<script>
    import { Template, Story } from "@storybook/addon-svelte-csf";
    import PopoverMenuItem from "../components/PopoverMenuItem.svelte";
    import PopoverMenuSection from "../components/PopoverMenuSection.svelte";
    import SearchIcon from "../components/icons/SearchIcon.svelte";
</script>

<Template let:args>
    <Popover {...args} isPadded={false}>
        <button slot="trigger"> Click Me</button>

        <div style="" slot="popper">
            <PopoverMenuSection header="TOP" separator="below">
                <PopoverMenuItem label="Action" />
                <PopoverMenuItem label="Action with Icon" icon={SearchIcon} />
                <PopoverMenuItem label="Action" />
            </PopoverMenuSection>
        </div>
    </Popover>
</Template>

<Story name="default" />
