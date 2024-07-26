
import HttpRequestBar from "../components/HttpRequestBar.svelte";

export default {
  title: "druids/HttpRequestBar",
  component: HttpRequestBar,
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  args:{
    statusCode: 200,
    method:'GET',
    url:'https://google.com'
  },
  argTypes:{
    statusCode:{
        control:{type:'number'}
    },
  }
};

export const Default = {
  args: {
    url: "https://druids.datadoghq.com/components/misc/HttpRequestBar"
  }
};

export const WithQueries = {
  args: {
    statusCode: 200,
    method: "GET",
    url: "https://google.com",
    queryParams:{
      "q": "higoogle"
    }
  }
};

export const WithFullWidth = {
  args: {
    statusCode: 200,
    method: "GET",
    url: "https://druids.datadoghq.com/components/misc/HttpRequestBar",
    queryParams:{
      "q": "higoogle"
    },
    isFullWidth:true
  }
};

