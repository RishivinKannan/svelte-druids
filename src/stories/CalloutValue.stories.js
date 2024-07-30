import CalloutValue from '../components/CalloutValue.svelte'



export default {
    title: "druids/CalloutValue",
    component: CalloutValue,
    tags: ["autodocs"],
    args: {
        tagKey: "TagKey",
        tagValue: 'This is the Tagvalue of TagKey'
    },
    argTypes: {
        tagValue: { control: 'object' },
        direction: { control: 'radio', options: ['up', "down"] },
        size: {
            control: { type: "radio" },
            options: ["xs", "sm", "md", "lg"],
        },
        level: {
            control: { type: "select" },
            options: ["default", "success", "warning", "danger"],
        },
    },
    excludeStories: /.*Data$/,
}

export const Default = {
    args: {
        tagValue: 100,
        unit: 'ms'
    }
}