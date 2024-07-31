import StatusPill from "../components/pills/StatusPill.svelte";
import icon from "../components/icon.svelte";

export default {
  title: "druids/Pills/StatusPill",
  component: StatusPill,
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  argTypes: {
    iconPosition: {
      control: { type: "select" },
      options: ["left", "right"],
    },
    title:{
      control:{type:"text"}
    },
    size: {
      control: { type: "radio" },
      options: ["xs", "sm", "md", "lg"],
    },
    level: {
      control: { type: "select" },
      options: ["default","success","warning", "danger"],
    },
  },
};

export const Default = {
    args:{
        label:'Status'
    }
};


export const circle ={
 args:{
   isCircle:true,
   level: "default",
 }
}

export const WithIcon = {
  args: {
    ...Default.args,
    icon: icon,
  },
};

export const WithoutLabel = {
  args: {
    level: "default",
  }
};

export const Success = {
  args: {
    label: "Status",
    level: "success"
  }
};

export const Warning = {
  args: {
    label: "Status",
    level: "warning"
  }
};

export const Danger = {
  args: {
    label: "Status",
    level: "danger"
  }
};

export const DangerSoft = {
  args: {
    ...Danger.args,
    isSoft: true
  }
};

export const WarningSoft = {
  args: {
    ...Warning.args,
    isSoft: true
  }
};

export const SuccessSoft = {
  args: {
    ...Success.args,
    isSoft: true
  }
};

export const FullWidth = {
  args: {
    label: "Status",
    level: "success",
    isSoft: true,
    isFullWidth: true
  }
};

export const Count = {
  args: {
    label: "Status",
    level: "warning",
    isSoft: true,
    count: 9
  }
};

export const WithTitle = {
  args: {
    label: "Status",
    level: "warning",
    isSoft: true,
    count: 9,
    title: "Status"
  }
};

export const Clickable = {
  args: {
    label: "Status",
    level: "warning",
    isSoft: true,
    count: 9,
    title: "Status",
    clickable: true
  }
};

export const ClickableWithFunction = {
    args:{
        ...Clickable.args,
        clickable: ()=>alert('clickable')
    }
}