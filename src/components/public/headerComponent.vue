<template>
    <header>
        <logo class="title animate__animated animate__pulse">
            <template v-slot:mainlogo>
                <a href="/" v-if="logoData.logoLoadingStatus === true"><h1>{{logoFirst}}<span>{{ lastTitle }}</span></h1></a>
                <a v-else><h1><span>Loading...</span></h1></a>
            </template>
        </logo>
        <transition name="slide-fade"  v-if="mobileView">
            <nav class="title mobile" v-show="statusNav" ref="target1" @click="handleClick">  
                <ul>
                        <router-link to="/" @click="viewNav"><li>Home</li></router-link>
                        <router-link to="/about-us" @click="viewNav"><li>About Us</li></router-link>
                        <router-link to="/dishes" :class="path === `/dishes/view/${paramsName}` ? 'active' : ''" @click="viewNav"><li>Dishes</li></router-link>
                </ul>
            </nav>
        </transition>
        <nav class="title wide animate__animated animate__pulse" v-else>  
            <ul>
                    <router-link to="/"><li>Home</li></router-link>
                    <router-link to="/about-us"><li>About Us</li></router-link>
                    <router-link to="/dishes" :class="path === `/dishes/view/${paramsName}` ? 'active' : ''"><li>Dishes</li></router-link>
            </ul>
        </nav>
        <div class="mobile-burder"> 
            <div class="button-burger animate__animated animate__pulse" ref="targetV2" @click="viewNav" :class="statusNav == true ? 'x-close' : ''"> 
                <span></span>
                <span></span>
            </div>
        </div>
    </header>
</template>
<script>
import logo from '../essentials/logo.vue'
import VLazyImage from "v-lazy-image";
import axiosIntance from '../../composable/axios.comp.js'
export default{
    data(){
        return {
            logoData: {
                logoCurrent: 'FilDish',
                logoLoadingStatus: true
            },
            path: this.$route.path,
            paramsName: this.$route.params.name,
            statusNav: false,
            mobileView: false
        }
    },
    computed:{
        logoFirst(){
            return this.logoData.logoCurrent.substring(0, 3)
        },
        lastTitle(){
            return this.logoData.logoCurrent.substring(3)
        },
    },
    watch: {
        '$route.path'(newVal, oldVal) {
            this.path = newVal
        },
        '$route.params.name'(newVal, oldVal) {
            this.paramsName = newVal
        },
    },
    components: {
        logo, VLazyImage
    },
    mounted(){
        document.addEventListener("click", this.handleClick);
        window.addEventListener("resize", this.handleResize)
    },
    created(){
        this.validateScreenSize()
        this.getTheCurrentLogo()
    },
    methods: {
        viewNav(){
            this.statusNav = !this.statusNav
        },
        handleClick(){
            const target1 = this.$refs.target1
            const targetV2 = this.$refs.targetV2
            if(target1 && targetV2){
                if (!targetV2.contains(event.target) && !target1.contains(event.target)) {
                    this.statusNav = false
                }
            }
        },
        handleResize(){
           this.validateScreenSize()
        },
        validateScreenSize(){
            if(window.innerWidth < 900) this.mobileView = true
            else this.mobileView = false
        },
        async getTheCurrentLogo(){
            // try {
            //     const response = await axiosIntance.get('/api/logo')
            //     const res = await response.data
            //     if(res.length > 0)  this.logoData.logoCurrent = res[0].title
            //     else  this.logoData.logoCurrent = 'No Logo'
            //     this.logoData.logoLoadingStatus = true
            // } catch (error) {
            //     console.log(error)
            //     this.logoData.logoLoadingStatus = true
            // }
        }
    }
}
</script>
<style scoped>
    header{
        width: 100%;
        padding: 15px 5%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        grid-gap: 30px;
        position: fixed;
        top: 0;
        z-index: 100;
        background: var(--main-color-white);
    }
    .mobile{
        position: fixed;
        height: 100%;
        background-color: var(--main-color-white);
        right: 0;
        width: 400px;
        padding: 40px;
        top: 0;
        overflow: auto;
        z-index: 100;
    }
    .mobile > ul {
        margin-top: 4em;
        width: 100%;
        position: relative;
    }
    .mobile > ul > a{
        display: inline-block;
        letter-spacing: 2.5px;
        font-size: var(--ipad-default-font-size);
        padding: 10px 15px;
        line-height: 1.5;
        cursor: pointer;
        transition: all 0.5s ease-out;
        color: var(--fourth-color-black);
        position: relative;
        text-align: center;
        width: 100%;
        margin-bottom: 10px;
    }
    .mobile > ul > a:hover{
        color: var(--main-color-yellow);
    }
    .mobile > ul > a:after{
        content: '';
        position: absolute;
        background: var(--main-color-yellow);
        width: 0%;
        height:2px;
        left: 0;
        bottom: 1.5px;
        transition: all 0.5s ease-out;
    }
    .mobile > ul > a:hover:after{
        width: 100%;
    }
    .mobile > ul > .active:after{
        content: '';
        position: absolute;
        background: var(--main-color-yellow);
        width: 100%;
        height:2px;
        left: 0;
        bottom: 1.5px;
    }
    .mobile > ul > .active{
        color: var(--main-color-yellow);
    }
    
    .wide{
        margin-top: auto;
        margin-bottom: auto;
    }
    .wide > ul{
        display: flex;
        flex-direction: row;
        grid-gap: 20px;
    }
    .wide > ul > a{
        letter-spacing: 2.5px;
        font-size: var(--ipad-default-font-size);
        padding: 10px 15px;
        line-height: 1.5;
        cursor: pointer;
        transition: all 0.5s ease-out;
        color: var(--fourth-color-black);
        white-space: nowrap;
        position: relative;
    }
    .wide > ul > a:hover{
        color: var(--main-color-yellow);
    }
    .wide > ul > a:after{
        content: '';
        position: absolute;
        background: var(--main-color-yellow);
        width: 0%;
        height:2px;
        left: 0;
        bottom: 1.5px;
        transition: all 0.5s ease-out;
    }
    .wide > ul > a:hover:after{
        width: 100%;
    }
    .wide > ul > .active:after{
        content: '';
        position: absolute;
        background: var(--main-color-yellow);
        width: 100%;
        height:2px;
        left: 0;
        bottom: 1.5px;
    }
    .wide > ul > .active{
        color: var(--main-color-yellow);
    }
    .logo > a > h1{
        font-size: var(--title-wide-default-font-size);
        letter-spacing: 4px;
        color: var(--third-color-black);
        font-weight: 800;
        cursor: pointer;
        white-space: nowrap;
        font-family: 'Pacifico', cursive !important;
    }
    .logo > a > h1 > span{
        font-family: 'Pacifico', cursive !important;
        color: var(--main-color-yellow) !important;
    }
    img{
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }
    .mobile-burder {
        display: none;
    }
    .mobile-burder > .button-burger {
        cursor: pointer;
        width: auto;
        margin: auto;
        z-index: 100;
        position: relative;
    }
    .mobile-burder > .button-burger > span{
        display: block;
        width: 33px;
        height: 4px;
        margin-bottom: 5px;
        position: relative;
        background: var(--main-color-yellow);
        border-radius: 3px;
        margin: 7px 0;
        transform-origin: 4px 0px;
        transition: all 0.5s ease-out;
    }
    .x-close > :nth-child(1){
        transform: rotate(35deg) translate(-3px, -6px) !important;
    }
    .x-close > :nth-child(2){
        transform: rotate(-36deg) translate(1px, -3px);
    }
    .v-lazy-image {
        background: #eee;
        background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
        background-size: 200% 100%;
        animation: 1.5s shine linear infinite;
    }
    .v-lazy-image-loaded {
        background: none !important;
        animation:  blur-effect 2s normal forwards ease-in-out !important;
    }

    .slide-fade-enter-active {
    transition: all 0.3s ease-out;
    }
    .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .slide-fade-enter-from,
    .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
    }
    @media screen and (max-width: 900px){
        .logo > a > h1{
            font-size: var(--title-ipad-default-font-size);
        }
       
        .mobile-burder {
            display: inherit;
        }
    }
    @media screen and (max-width: 700px){
        .mobile > ul > a{
            font-size: var( --mobile-default-font-size);
        }
    }
    @media screen and (max-width: 600px){
        .mobile{
            width: 100%;
        }
    }
</style>