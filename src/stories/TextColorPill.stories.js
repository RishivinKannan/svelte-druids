import TextColorPill from "../components/TextColorPill.svelte";

export default {
    title: "druids/Pills/TextColorPill",
    component:TextColorPill,
    tags: ["autodocs"],
    excludeStories: /.*Data$/,
};

export const Default = {
    args: {
        textColor: "white",
        backgroundColor: "blue"
    }
};

