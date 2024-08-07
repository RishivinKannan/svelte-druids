
import PaletteSelect from "../components/forms/PaletteSelect.svelte";

let options = [
    {
        label: "Palette1",
        palette: {
            colors: ["#ffffff", "#000000"],
            size: "lg",
            hasTitle: true
        }
    },
    {
        label: "Palette2",
        palette: {
            colors: ["#000000", "#ffffff","#000000"],
            size: "lg",
            hasTitle: true
        }
    },
    {
        label: "Palette3",
        palette: { colors: ["#DC4C39"] }
    }
]
export default {
    title: "druids/Forms/PaletteSelect",
    component: PaletteSelect,
    tags: ["autodocs"],
    excludeStories: /.*Data$/,
    args: {
        paletteColors: options,
        selectedPalette: options[2]
    }
};

export const Default = {
};


