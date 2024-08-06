import Select from '../components/forms/Select.svelte'
export default {
    title: "druids/Forms/Select",
    component: Select,
    tags: ["autodocs"],
    args: {
        options: [{
            value: 10,
            label: 'TEN'
        }, {
            value: 20,
            label: 'TWENTY'
        }]
    },
    excludeStories: /.*Data$/,
};

export const Default = {};
