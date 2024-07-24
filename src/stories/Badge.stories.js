import Badge from "../components/Badge.svelte";
import icon from "../components/icon.svelte";

export default {
  title: "druids/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    label: "Badge",
  },
  excludeStories: /.*Data$/,
  argTypes: {
    backgroundColor: { control: "color" },
    textColor: { control: "color" },
    borderColor: { control: "color" },
    iconPosition: {
      control: { type: "select" },
      options: ["left", "right"],
    },
    size: {
      control: { type: "radio" },
      options: ["xs", "sm", "md", "lg"],
    },
    level: {
      control: { type: "select" },
      options: ["default", "warning", "danger"],
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
