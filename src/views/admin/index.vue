<template>
    <headerComponent @toggleSidebar="toggleSidebar" :siderBarStatus="siderBarStatus" :class="!siderBarStatus ? 'fullpage' : ''"/>
    <transition name="slide-fade">
        <sidebarNav v-show="siderBarStatus" :newLogo="newLogo"/>
    </transition>
    <main class="main-admin" :class="!siderBarStatus ? 'fullpage' : ''">
        <RouterView :siderBarStatus="siderBarStatus" @changeLogo="onchangeLogo"/>
    </main>
</template>
<script>
import { RouterLink, RouterView } from 'vue-router'
import headerComponent from '../../components/admin/header.vue'
import sidebarNav from '../../components/admin/sidebarNav.vue'
export default{
    props: ['founder'],
    data(){
        return{
            siderBarStatus: true,
            newLogo: ''
        }
    },
    components: {
        headerComponent, sidebarNav
    },
    mounted(){
        this.changeBackgrounBody()
    },
    unmounted() {
        this.backtoNormalColor()
    },
    methods: {
        changeBackgrounBody(){
            let body = document.querySelector('body');
            body.style.background = '#EEF1F4'
        },
        backtoNormalColor(){
            let body = document.querySelector('body');
            body.style.background = 'white'
        },
        toggleSidebar(){
            this.siderBarStatus = !this.siderBarStatus
        },
        onchangeLogo(payload) {
            // Handle the event here
            this.newLogo = payload
        }
    },
}
</script>
<style scoped>
    .slide-fade-enter-active {
        transition: all 0.8s ease-in-out;
    }

    .slide-fade-leave-active {
        transition: all 0.8s ease-in-out;
    }

    .slide-fade-enter-from,
    .slide-fade-leave-to {
        left: -20%;
        opacity: 0;
    }
    .fullpage{
        width: 100%;
    }
</style>