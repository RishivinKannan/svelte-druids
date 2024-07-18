import Tag from "../components/Tag.svelte";
import icon from "../components/icon.svelte";

export default {
  title: "druids/Tag",
  component: Tag,
  tags: ["autodocs"],
  args: {
    label: "Tag:tag",
  },
  excludeStories: /.*Data$/,
  argTypes: {
    backgroundColor: { control: "color" },
    textColor: { control: "color" },
    iconColor: { control: "color" },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg"],
    },
  },
};

export const Default = {};

export const WithIcon = {
  args: {
    ...Default.args,
    icon: icon,
  },
};

export const clickable = {
  args: {
    ...Default.args,
    onClick: () => alert("Clickable"),
  },
};

export const deletable = {
  args: {
    ...Default.args,
    onDelete: () => alert("Deletable"),
  },
};

export const clickableWithDeletable = {
  args: {
    ...clickable.args,
    onDelete: () => alert("Clickable"),
  },
};
