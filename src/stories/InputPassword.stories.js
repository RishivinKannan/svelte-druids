import InputPassword from '../components/forms/InputPassword.svelte'
import icon from '../components/icon.svelte'
export default {
    title: "druids/Forms/InputPassword",
    component: InputPassword,
    tags: ["autodocs"],
    args: {
    },
    excludeStories: /.*Data$/,
  };
  
  export const Default = {};

  export const WithIcon ={args:{icon:icon}}

