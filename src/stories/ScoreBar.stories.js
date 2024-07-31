import ScoreBar from '../components/measures/ScoreBar.svelte'

export default {
    title: "druids/Measures/ScoreBar",
    component: ScoreBar,
    tags: ["autodocs"],
    args: {
       value:1,
    },
    excludeStories: /.*Data$/,
};

export const Default = {};