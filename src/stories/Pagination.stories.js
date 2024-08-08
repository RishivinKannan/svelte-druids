import Pagination from '../components/nav/Pagination.svelte'
export default {
    title: "druids/Nav/Pagination",
    component: Pagination,
    tags: ["autodocs"],
    excludeStories: /.*Data$/,
    args: {
        currentPage:1,
        totalPages:11,
        onChange:(num)=>{console.log(num)}
    }
};

export const Default = {
};
