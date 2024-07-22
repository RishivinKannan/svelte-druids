
import TableNew,{renderComponent} from "../components/Table.svelte"
import Tag from "../components/Tag.svelte";

const data = [
  { foo: "Winter", bar: 30, baz: true },
  { foo: "Spring", bar: 63, baz: false },
  { foo: "Summer", bar: 92, baz: true },
  { foo: "Fall", bar: 72 },
];

const columns = [
  {
    header: "Season",
    accessorKey: "foo",
    cell: (item) => {
      return renderComponent(Tag, { label: item.getValue() });
    },
  },
  {
    header: "Avg. temp",
    accessorKey: "bar",
  },
  {
    header: "Baz",
    accessorKey: "baz",
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
    resizeable: true,
  },
};

export const withMenuAndDropdown = {
  args: {
    menu: true,
    dropdown: true,
    resizeable: true,
  },
};
