<template>
    <main>
        <section>
            <!-- article here  -->
            <mainAboutComponent />
            <whoareweComponent />
            <companygoalComponet />
            <founderInformation />
        </section>
    </main>
    <footerComponent/>
</template>
<script>
import { defineAsyncComponent } from 'vue'
import mainAboutComponent from '../../components/public/aboutUs/mainAboutComponent.vue'
import whoareweComponent from '../../components/public/aboutUs/whoareweComponent.vue'
import companygoalComponet from '../../components/public/aboutUs/companygoalComponet.vue'
import founderInformation from '../../components/public/aboutUs/founderInformation.vue'
import footerComponent from '../../components/public/footerComponent.vue'
import { showDivComposable, hideAllDiv } from '../../composable/scrollEvent'
export default{
    data() {
        return {};
    },
    components: {
        // headerComponent:defineAsyncComponent(() => 
        //     import("../components/public/headerComponent.vue")
        // )
        mainAboutComponent, whoareweComponent, companygoalComponet, founderInformation, footerComponent
    },
    mounted() {
        window.scrollTo({  top: 0 });
        document.title = "FilDish | About Us"
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
        }
    }
}
</script>
<style>
</style>