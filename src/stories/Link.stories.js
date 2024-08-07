import Link from '../components/nav/Link.svelte'


export default {
  title: "druids/Nav/Link",
  component: Link,
  tags: ["autodocs"],
  args: {
    href: "/Link",
    label:'Link'
  },
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["xs", "sm", "md", "lg"],
    },
    linkType: {
      control: { type: "select" },
      options: ["default","plain", "color-on-hover", "no-classname"],
    },
  }
};

export const Default = {}