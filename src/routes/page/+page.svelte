<script>
    import InputText from "../../components/forms/InputText.svelte";
    import Label from "../../components/forms/Label.svelte";
    const value = {
        on:{
            click(){
                console.log('what')
            }
        }
    }
</script>
<Label label={'INPUT'} />
<InputText {...value} onReturn={()=>console.log('why')}/>