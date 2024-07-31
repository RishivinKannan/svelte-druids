import Badge from '../components/pills/Badge.svelte';
import CustomOverflowList from '../components/CustomOverFlowList.svelte'

let array = [
  {
    label: 'badge',
    size: 'md'
  }
]
let props = [];

for (let i = 0; i < 24; i++) {
  props = [...props, ...array];
}
let arrayDiff = [{ label: "large", size: 'lg' }, { label: "medium", size: 'md' }, { label: 'small', size: 'sm' }, { label: "xsmall", size: 'xs' }]

let propsDiffValue=[]

for (let i = 0; i < 12; i++) {
  propsDiffValue = [...propsDiffValue, ...arrayDiff];
}

export default {
  title: "druids/CustomOverflowList",
  component: CustomOverflowList,
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  args: {
    comp: Badge,
    props,
    accessorKey: 'label'
  },
};

export const Default = {};

export const lines = {
  args: {
    lines: 2
  }
}


export const MaxCount = {
  args: {
    maxCount: 4,
  },
};


export const diffProps = {
  args: {
    props: propsDiffValue
  }
}