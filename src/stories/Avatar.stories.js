import Avatar from "../components/misc/Avatar.svelte";

export default {
    title: "druids/Misc/Avatar",
    component: Avatar,
    tags: ["autodocs"],
    args: {
        src: "https://images.unsplash.com/photo-1517849845537-4d257902454a?h=208&fit=crop&w=208&q=80",
        label: "Dog"
    },
    excludeStories: /.*Data$/,
    argTypes: {
        ringColor: { control: "color" },
        size: {
            control: { type: "radio" },
            options: ["xs", "sm", "md", "lg", 'xl', 'xxl'],
        },
    },
};

export const Default = {
    args: {
        size: "md"
    }
};