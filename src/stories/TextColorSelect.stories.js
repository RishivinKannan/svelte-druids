
import TextColorSelect from "../components/forms/TextColorSelect.svelte";

let options = [
    {
        label: "TextColor1",
        textColorProps: {
            textColor: "white",
            backgroundColor: "blue",
            size: "lg",
        }
    },
    {
        label: "TextColor2",
        textColorProps: {
            textColor: "white",
            backgroundColor: "red",
            size: "lg",
        }
    },
]
export default {
    title: "druids/Forms/TextColorSelect",
    component: TextColorSelect,
    tags: ["autodocs"],
    excludeStories: /.*Data$/,
    args: {
        textColorOptions: options,
        selectedTextColor: options[1]
    }
};

export const Default = {
};


