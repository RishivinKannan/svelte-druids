import TagList from "../components/TagList.svelte";
import icon from "../components/icon.svelte";

let array = ["how", "wow", "what", "why", "sooooo"];
let items = [];

for (let i = 0; i < 12; i++) {
  items = [...items, ...array];
}

export default {
  title: "druids/TagList",
  component: TagList,
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  args: {
    tags: items,
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg"],
    },
    expandType: {
      control: { type: "select" },
      options: ["popover", "inline"],
    },
  },
};

export const Default = {};

export const TagWithIcon = {
  args: {
    tags: items.map((item) => ({ label: item, icon })),
  },
};
