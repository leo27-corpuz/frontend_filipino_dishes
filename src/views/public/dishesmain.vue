<template>
    <main>
        <placeListDish />
        <searchDishes />
        <section>
            <DishList />
        </section>
    </main>
    <footerComponent/>
</template>
<script>
import { defineAsyncComponent } from 'vue'
import DishList from '../../components/public/dishes/DishList.vue'
import searchDishes from '../../components/public/dishes/searchDishes.vue'
import placeListDish from '../../components/public/dishes/placeListDish.vue'
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
         DishList, placeListDish, searchDishes, footerComponent
    },
    mounted(){
        window.scrollTo({  top: 0 });
        document.title = "FilDish | Dishes"
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
