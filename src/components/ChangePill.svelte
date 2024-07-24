<script>
    import FlatIcon from "./icons/FlatIcon.svelte";
    import RightDownIcon from "./icons/RightDownIcon.svelte";
    import RightUpIcon from "./icons/RightUpIcon.svelte";
    import StatusPill from "./StatusPill.svelte";

    /*
    * @type {string|number}
    */
    export let value;

    export let isNaked = false;

    export let suffix='';

    export let direction = null;


    $: label = `${value}${suffix}`


    $: icon = direction === 'up' ? RightUpIcon : direction === 'down'? RightDownIcon : direction === 'flat' ? FlatIcon :null


</script>

<StatusPill {label} {isNaked} {icon} iconPosition='right' {...$$restProps}/>