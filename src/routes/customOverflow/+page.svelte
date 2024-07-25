<script>
    import Badge from "../../components/Badge.svelte";
    import CalloutTag from "../../components/CalloutTag.svelte";
import CustomOverFlowList from "../../components/CustomOverFlowList.svelte";
    import Icon from "../../components/icon.svelte";

    import StatusPill from "../../components/StatusPill.svelte";

    const propsValue = [
        {
            label:'badge',
            size:'md'
        }
    ]

    let props=[];

    for (let i = 0; i < 8; i++) {
        props = [...props, ...propsValue];
    }

    let highlight;

</script>
<CustomOverFlowList  {props} comp={Badge} accessorKey='label'/>



<div>

    <CalloutTag tagKey='Clicking me will' tagValue={['Create the components']}/>
</div>