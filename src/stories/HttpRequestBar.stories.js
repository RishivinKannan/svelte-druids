
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
    url: "https://google.com",
    queryParams:{
      "q": "higoogle"
    },
    isFullWidth:true
  }
};

