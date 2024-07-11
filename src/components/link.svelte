<script>
    export let href;
    export let onClick =()=>{}
</script>


<a {href} on:click={onClick} style="all: unset;">
    <slot></slot>
</a>