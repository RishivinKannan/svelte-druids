import ChangePill from '../components/pills/ChangePill.svelte'
export default {
  title: "druids/Pills/ChangePill",
  component:ChangePill,
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  args:{
    value:"200",
    suffix:'%'
  },
  argTypes:{
    value:{
        control:{type:'number'},
    },
    direction:{
        control:{type:'radio'},
        options:['up','down','flat']
    },
    restProps:{
        description: 'Props inherit from StatusPill'
    }
  }
};

export const Default = {
};

export const Up = {
  args: {
    value: 300,
    suffix: "",
    direction: "up"
  }
};

export const Down = {
  args: {
    value: 300,
    suffix: "",
    direction: "down"
  }
};

export const Flat = {
  args: {
    value: 300,
    suffix: "",
    direction: "flat"
  }
};

export const Suffix = {
  args: {
    value: 300,
    suffix: "%",
    direction: "flat"
  }
};

