
import FormatNumber from '../components/measures/FormatNumber.svelte'

export default {
    title: "druids/Measures/FormatNumber",
    component: FormatNumber,
    tags: ["autodocs"],
    args: {
        value: 100000,
    },
    argTypes: {
        maxDecimal: {
            control: 'radio',
            options: ['undefined', 0, 1, 2]
        }
    },
    excludeStories: /.*Data$/,
};

export const Default = {};