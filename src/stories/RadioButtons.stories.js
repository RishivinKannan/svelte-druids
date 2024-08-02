import RadioButtons from '../components/forms/RadioButtons.svelte'
export default {
    title: "druids/Forms/RadioButtons",
    component: RadioButtons,
    tags: ["autodocs"],
    args: {
      options:[{
        label:'max',
        value:'max'
      },{
        label:'min',
        value:'min'
      }]
    },
    excludeStories: /.*Data$/,
  };
  
  export const Default = {};
  