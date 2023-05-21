<template>
    <main>
        <section>
            <homeComponent />
            <popularDishesComponent/>
            <aboutComponent />
        </section>
    </main>
    <footerComponent/>
</template>
<script>
import { defineAsyncComponent } from 'vue'
import homeComponent from '../components/public/landingpage/homeComponent.vue'
import popularDishesComponent from '../components/public/landingpage/popularDishesComponent.vue'
import aboutComponent from '../components/public/landingpage/aboutComponent.vue'
import footerComponent from '../components/public/footerComponent.vue'
import { showDivComposable, hideAllDiv } from '../composable/scrollEvent'
export default{
    data() {
        return {};
    },
    components: {
        // headerComponent:defineAsyncComponent(() => 
        //     import("../components/public/headerComponent.vue")
        // )
        homeComponent, popularDishesComponent, aboutComponent, footerComponent
    },
    mounted() {
        window.scrollTo({  top: 0 });
        document.title = "FilDish |  Home"
        document.addEventListener('scroll', this.showDiv)
        this.divAvailability()
    },
    unmounted(){
        document.removeEventListener('scroll', this.showDiv)
        this.hideAllComponet()
    },
    methods: {
        showDiv(){
            showDivComposable()
        },
        divAvailability(){
            this.showDiv()
        },
        hideAllComponet(){
            hideAllDiv()
        },
    }
}
</script>
<style>
</style>