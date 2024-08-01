import InputTime from '../components/forms/InputTime.svelte'
import icon from '../components/icon.svelte'
export default {
    title: "druids/Forms/InputTime",
    component: InputTime,
    tags: ["autodocs"],
    args: {
    },
    excludeStories: /.*Data$/,
  };
  
  export const Default = {};

  export const WithIcon ={args:{icon:icon}}

  export const EventHandlers = {
    args:{
      onEscape(){
        console.log('ESC')
      },
      onReturn(){
        console.log('Enter')
      }
    }
  }