import NumberPercentbar from '../components/measures/NumberPercentbar.svelte'

export default {
    title: "druids/Measures/NumberPercentbar",
    component: NumberPercentbar,
    tags: ["autodocs"],
    args: {
        value: 8000,
        percentage:80,
    },
    argTypes:{
        maxDecimal:{
            control:'radio',
            options:['undefined',0,1,2]
        },
        restProps:{description:'you can pass FormatNumber props as restProps'}
    },
    excludeStories: /.*Data$/,
};

export const Default = {};