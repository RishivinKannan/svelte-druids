import TimePill from '../components/TimePill.svelte'
import Icon from "../components/icon.svelte";



export default {
    title: "druids/TimePill",
    component: TimePill,
    tags: ["autodocs"],
    excludeStories: /.*Data$/,
    args: {
        msPeriod: 30000
    },
    argTypes: {

        size: {
            control: { type: "radio" },
            options: ["sm", "md"],
        },
        level: {
            control: { type: "select" },
            options: ["default", "success"],
        },
    },
};

export const Default = {
};

export const FullWidth = {
    args: {
        isFullWidth: true
    }
};

export const WithIconLabel = {
    args:{
        iconLabel:Icon
    }
}

export const Medium = {
    args: {
        size: "md"
    }
};

export const Success = {
    args: {
        size: "md",
        level: "success"
    }
};

export const WithTextLabel = {
    args: {
        msPeriod: 30000,
        textLabel: "100millisecond"
    }
};