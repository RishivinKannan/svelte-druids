import PaginationSummary from '../components/nav/PaginationSummary.svelte'
export default {
    title: "druids/Nav/PaginationSummary",
    component: PaginationSummary,
    tags: ["autodocs"],
    excludeStories: /.*Data$/,
    args: {
        pageStart:1,
        pageEnd:11,
        totalElements:99,
        elementLabel: 'mouse'
    }
};

export const Default = {
};
