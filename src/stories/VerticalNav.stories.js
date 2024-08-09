
import VerticalNav from "../components/nav/VerticalNav.svelte";
import CloseIcon from '../components/icons/CloseIcon.svelte'

let options = [
    {
        label: "Palette1",
        icon: CloseIcon
    },
    {
        label: "Palette2",
        subLabel: "no_palette",
    },
    {
        label: "Palette3",
        isActive:true,
        onClick:()=>alert('clicked')
    }
]
export default {
    title: "druids/Nav/VerticalNav",
    component: VerticalNav,
    tags: ["autodocs"],
    excludeStories: /.*Data$/,
    args: {
        items: options,
    }
};

export const Default = {
};

