
import TableNew, { renderComponent } from "../components/Table.svelte"
import Tag from "../components/pills/Tag.svelte";
import StatusPill from "../components/pills/StatusPill.svelte"

const data = [
  { foo: "Winter", bar: 30, baz: true },
  { foo: "Spring", bar: 63, baz: false },
  { foo: "Summer", bar: 92, baz: true },
  { foo: "Fall", bar: 72 },
];

const columns = [
  {
    header:'',
    accessorKey: "baz",
    cell: (info) => renderComponent(StatusPill, {
      level: info.getValue() !== undefined ? info.getValue() ? 'success' : 'danger' : 'warning',
    }),
    maxSize:5,
  },
  {
    header: "Season",
    accessorKey: "foo",
    render: ({ value }) => {
      return renderComponent(Tag, { label: value });
    },
  },
  {
    header: "Avg. temp",
    accessorKey: "bar",
  },
];

export default {
  title: "druids/Table",
  component: TableNew,
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  args: {
    data,
    columns,
  },
};

export const Default = {}

export const withMenuAndDropdown = {
  args: {
    menu: true,
    dropdown: true,
    resizeable: true,
  },
};


export const withLocalstorage ={
  args:{
    ...withMenuAndDropdown.args,
    localStorageKey:'withLocalstorageTable'
  }
}

export const WithPaginaton = {
  args: {
    data: [{
      "foo": "Winter",
      "bar": 30,
      "baz": true
    }, {
      "foo": "Spring",
      "bar": 63,
      "baz": false
    }, {
      "foo": "Summer",
      "bar": 92,
      "baz": true
    }, {
      "foo": "Fall",
      "bar": 72
    }],
    columns:[{
      "header": "",
      "accessorKey": "baz",
      "maxSize": 5
    }, {
      "header": "Season",
      "accessorKey": "foo"
    }, {
      "header": "Avg. temp",
      "accessorKey": "bar"
    }],
    menu:true,
    dropdown: true,
    resizeable: true,
    pagination: true,
    initialPageSize: 5
  }
};
