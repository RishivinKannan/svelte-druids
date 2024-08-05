
import Slider from '../components/forms/Slider.svelte'

export default {
    title: "druids/Forms/Slider",
    component: Slider,
    tags: ["autodocs"],
    args: {
        value: 50,
    },
    excludeStories: /.*Data$/,
};

export const Default = {};
export const Marks = {
    args:{
        step:null,
        marks:{
            0:'MIN',
            10:'10',
            20:'20',
            50:'50',
            60:'60',
            100:'MAX'
        }
    }
};

export const MinMaxRange = {
    args:{
        value:[20,60],
        onChange(e,value){
            console.log(value)
        }
    }
}