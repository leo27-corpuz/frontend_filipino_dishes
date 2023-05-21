<template>
    <section>
        <logoComponent @changeLogo="onchangeLogo"/>
    </section>
</template>
<script>
import logoComponent from '../../../components/admin/logoComponent.vue'
export default{
    emits :{
        changeLogo: null, 
    },
    components: {
        logoComponent
    },
    methods: {
        onchangeLogo(payload) {
            // Handle the event here
            this.$emit('changeLogo', payload);
        }
    }
}
</script>