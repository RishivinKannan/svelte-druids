<script>
    import Badge from '../components/pills/Badge.svelte'
    import Table from '../components/Table.svelte';
</script>

<Table
  data={[{"foo":"Winter","bar":30,"baz":true},{"foo":"Spring","bar":63,"baz":false},{"foo":"Summer","bar":92,"baz":true},{"foo":"Fall","bar":72}]}
  columns={[{"header":"","accessorKey":"baz","maxSize":5},{"header":"Season","accessorKey":"foo"},{"header":"Avg. temp","accessorKey":"bar"}]}
  menu
  dropdown
  resizeable
  pagination/>


<style>

</style>