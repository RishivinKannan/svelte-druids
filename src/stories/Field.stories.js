import Field from '../components/forms/Field.svelte'

export default {
    title: "druids/Forms/Field",
    component: Field,
    tags: ["autodocs"],
    args: {
        label:"Label",
    },
    excludeStories: /.*Data$/,
};


export const Default = {}