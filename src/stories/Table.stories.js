import Table, { createRender } from "../components/Table.svelte";
import Tag from "../components/Tag.svelte";

import { readable } from "svelte/store";
const data = readable([
  { foo: "Winter", bar: 30, baz: true },
  { foo: "Spring", bar: 63, baz: false },
  { foo: "Summer", bar: 92, baz: true },
  { foo: "Fall", bar: 72 },
]);

const columns = [
  {
    header: "Season",
    accessor: "foo",
    cell: (item, state) => {
      return createRender(Tag, { label: item.value });
    },
  },
  {
    header: "Avg. temp",
    accessor: "bar",
  },
  {
    header: "Baz",
    accessor: "baz",
  },
];

export default {
  title: "druids/Table",
  component: Table,
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
  args: {
    data,
    columns,
    resizeable: true,
  },
};

export const Default = {};
