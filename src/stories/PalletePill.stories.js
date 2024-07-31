
import PalettePill from "../components/pills/PalettePill.svelte";

export default {
    title: "druids/Pills/PalettePill",
    component: PalettePill,
    tags: ["autodocs"],
    excludeStories: /.*Data$/,
    argTypes: {
        colors:{
            control:'object',
        },
        size: {
            control: { type: "radio" },
            options: ["xs", "sm", "md", "lg"],
        },
    }
};

export const Default = {
    args: {
        colors: ["#DC4C39"]
    }
};


export const MultiColors = {
    args: {
        colors: ["#ffffff", "#000000"]
    }
};


export const WithoutBorder = {
    args: {
        colors: ["#DC4C39"],
        size: "lg",
        hasBorder: false
    }
};


export const HasTitle = {
    args: {
        colors: ["#ffffff", "#000000"],
        size: "lg",
        hasBorder: true,
        hasTitle: true
    }
};


