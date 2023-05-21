<template>
    <main>
        <section>
            <Wiewdishcomponent />
        </section>
    </main>
    <footerComponent/>
</template>
<script>
import Wiewdishcomponent from '../../../components/public/dishes/Wiewdishcomponent.vue'
import footerComponent from '../../../components/public/footerComponent.vue'
import { showDivComposable, hideAllDiv } from '../../../composable/scrollEvent'
export default{
    components: {
        Wiewdishcomponent, footerComponent
    },
    mounted(){
        window.scrollTo({  top: 0 });
        document.title = "FilDish | adobo"
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