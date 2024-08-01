<script>
    import InputText from "../../components/forms/InputText.svelte";
    const value = {
        on:{
            click(){
                console.log('what')
            }
        }
    }
</script>
<InputText {...value} onReturn={()=>console.log('why')}/>