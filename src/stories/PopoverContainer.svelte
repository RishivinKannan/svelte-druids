<script>
    export let component;
    export let args;
</script>

<svelte:component this={component} {...args}>
    <button slot="trigger"> Click Me </button>

    <div slot="popper">HI</div>
</svelte:component>
