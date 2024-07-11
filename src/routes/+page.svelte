<script>
    import Badge from "../components/Badge.svelte";
    import Icon from "../components/icon.svelte";
    import Link from "../components/link.svelte";
    import TagList from "../components/TagList.svelte";

    
    let array = new Array(20).map((item,idx)=> `count:${idx}`)
    let items = array

</script>

<div class='container'>

    <Badge label='watchdog' icon={Icon} iconPosition='right'/>

    <Badge label='watchdog' icon={Icon} iconPosition='left'/>

    <Badge label='watchdog' icon={Icon} iconPosition='right' isBorderless/>
    
    <Badge label='watchdog' icon={Icon} iconPosition='right' isInteractive/>

    <Badge label='watchdog' icon={Icon} iconPosition='right' isInteractive count={20}/>

    <Badge label='watchdog' icon={Icon} iconPosition='right' count={1234} maxCount={2000}/>

    <Badge label='watchdog' icon={Icon} iconPosition='right' count={1234} maxCount={2000} level="warning"/>

    <Badge label='watchdog' icon={Icon} iconPosition='right' count={1234} maxCount={2000} level="danger" hasTooltip/>

    <Badge label='watchdog' icon={Icon} iconPosition='right' size="xs" level="warning"/>
    <Badge label='watchdog' as={Link} compProps={{href:'/yeah!',onClick:(e)=> console.log(e)
    }} icon={Icon} iconPosition='right' size="sm" level="danger"/>

    <Badge label='watchdog' icon={Icon} iconPosition='right' size="lg" title="Badge" as="button" name='button' />


    
    
</div>
<TagList {items} />


<style>
    .container{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 12px;
        padding: 2rem;
    }
</style>