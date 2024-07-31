import CalloutTag from '../components/pills/CalloutTag.svelte'
import Icon from '../components/icon.svelte';


export default {
    title: "druids/Pills/CalloutTag",
    component: CalloutTag,
    tags: ["autodocs"],
    args: {
        tagKey: "TagKey",
        tagValue:'This is the Tagvalue of TagKey'
    },
    argTypes:{
        tagValue:{control:'object'}
    },
    excludeStories: /.*Data$/,
}

export const Default = {
    args: {
        infoMessage: ""    }
}

export const TagValueArray = {
    args: {
        tagValue: ["One", "Two", "Three"]
    }
};

export const WithInfo = {
    args: {
        infoMessage: "There is a bug in this  feature."
    }
};

export const WithIcon = {
    args: {
        icon:Icon,
        iconProps:{width:2}
    }
};

export const WithLogo = {
    args: {
        logo:Icon,
        logoProps:{width:2}
    }
};