import PercentBar from '../components/measures/PercentBar.svelte'

export default {
    title: "druids/Measures/PercentBar",
    component: PercentBar,
    tags: ["autodocs"],
    args: {
        percentage: 60,
    },
    excludeStories: /.*Data$/,
    argTypes: {
        backgroundColor: { control: "color" },
        barColor: { control: "color" },
        outlineColor: { control: "color" },
        valuePosition:{control:'radio',options:['start','end']}
    },
};

export const Default = {};
