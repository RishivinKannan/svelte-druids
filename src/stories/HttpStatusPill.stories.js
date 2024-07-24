
import HttpStatusPill from "../components/HttpStatusPill.svelte";

export default {
  title: "druids/HttpStatusPill",
  component: HttpStatusPill,
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  args:{
    statusCode: 200
  },
  argTypes:{
    statusCode:{
        control:{type:'number'}
    },
    restProps:{
        description: 'Props inherit from StatusPill'
    }
  }
};

export const Default = {
};


export const WithDescription = {
    args:{
        hasTextDescription:true,
    }
};