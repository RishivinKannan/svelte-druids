import Button from '../components/forms/Button.svelte'


export default {
  title: "druids/Forms/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    label: "Button",
  },
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["xs", "sm", "md", "lg"],
    },
    level: {
      control: { type: "select" },
      options: ["default","success", "warning", "danger"],
    },
  }
};

export const Default = {}