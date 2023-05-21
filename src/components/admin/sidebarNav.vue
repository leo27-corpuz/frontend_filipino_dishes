<template>
    <nav class="sidebar">
        <logo class="title">
            <template v-slot:mainlogo>
                <a href="/admin" v-if="logoData.logoLoadingStatus === true"><h1>{{logoFirst}}<span>{{ lastTitle }}</span></h1></a>
                <a v-else><h1><span>Loading...</span></h1></a>
            </template>
        </logo>
        <div class="body-siderbar">
            <div class="per-branch">
                <div class="main">
                    <p>Resources</p>
                    <router-link :to="{name: 'dashboard'}"><i class="fa-solid fa-house"></i> <p>Dashboard</p></router-link>
                    <sidebarNavChild :navigators="navigatorsResource"></sidebarNavChild>
                </div>
                <div class="setting">
                    <p>Settings</p>
                    <sidebarNavChild :navigators="navigatorsSetting"></sidebarNavChild>
                </div>
            </div>
        </div>
    </nav>
</template>
<script>
import logo from '../essentials/logo.vue'
import axiosIntance from '../../composable/axios.comp.js'
import sidebarNavChild from './navBarChildren/sidebarNavChild.vue'
export default{
    props: {
        newLogo: String
    },
    data(){
        return {
            logoData: {
                logoCurrent: '',
                logoLoadingStatus: false
            },
            navigatorsResource: [
                {
                    name: 'categoryadmin',
                    icon: 'fa-solid fa-list',
                    title: 'Category'
                },
                {
                    name: 'placesadmin',
                    icon: 'fa-solid fa-location-dot',
                    title: 'Places'
                },
                {
                    name: 'dishesadmin',
                    icon: 'fa-solid fa-bowl-food',
                    title: 'Dishes'
                }
            ],
            navigatorsSetting: [
            {
                    name: 'logoadmin',
                    icon: 'fa-solid fa-font-awesome',
                    title: 'Logo'
                },
                {
                    name: 'landingpageadmin',
                    icon: 'fa-solid fa-layer-group',
                    title: 'Landing Page'
                },
                {
                    name: 'whoweareadmin',
                    icon: 'fa-solid fa-question',
                    title: 'Who We Are'
                },
                {
                    name: 'visionmissiongoaladmin',
                    icon: 'fa-solid fa-shield-halved',
                    title: 'Vision, Mission And ...'
                },
                {
                    name: 'foundersadmin',
                    icon: 'fa-solid fa-user-tie',
                    title: 'Founders'
                }
            ]
        }
    },
    watch:{
        newLogo(newValue){
            this.logoData.logoCurrent = newValue
        },
    },
    components:{ 
        logo, sidebarNavChild
    },
    created(){
        this.getTheCurrentLogo()
    },
    computed:{
        logoFirst(){
            return this.logoData.logoCurrent.substring(0, 3)
        },
        lastTitle(){
            let newString = this.logoData.logoCurrent.substring(3)
            return newString.charAt(0).toLocaleUpperCase() + newString.slice(1,)
        },
    },
    methods: {
        async getTheCurrentLogo(){
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                };
                const response = await axiosIntance.get('/api/admin/logo', config)
                const res = await response.data
                if(res.length > 0)  this.logoData.logoCurrent = res[0].title
                else  this.logoData.logoCurrent = 'No Logo'
                this.logoData.logoLoadingStatus = true
            } catch (error) {
                console.log(error)
                this.logoData.logoLoadingStatus = true
            }
        }
    }
}
</script>
<style scoped>
    .sidebar{
        position: fixed;
        top: 0;
        left: 0;
        width: 19em;
        height: 100%;
        background: var(--admin-main-blue-color);
        z-index: 99;
        overflow-y: auto;
    }
    .sidebar::-webkit-scrollbar-thumb{
        background-color:var(--main-color-yellow);
        border-radius:2em;
        border:1px solid var(--main-color-yellow);
    }
    .sidebar::-webkit-scrollbar-thumb:hover{
        background-color: var(--main-color-yellow);
        border:1px solid var(--main-color-yellow);
    }
        
    .sidebar::-webkit-scrollbar {
        width: 7px;
        height:7px;
    }
    .sidebar > .logo{
        width: 100%;
        text-align: center;
        margin: 2em 0 0 0;
    }
    .sidebar >  .logo > a > h1{
        font-size: var(--title-ipad-default-font-size);
        letter-spacing: 4px;
        color: var(--main-color-white);
        font-weight: 800;
        cursor: pointer;
        white-space: nowrap;
    }
    .sidebar > .logo > a > h1 > span{
        font-family: 'Pacifico', cursive !important;
        color: var(--main-color-yellow) !important;
    }
    .sidebar > .body-siderbar{
        width: 100%;
        padding: 30px 0;
    }
    .sidebar > .body-siderbar > .per-branch{
        width: 100%;
    }
    .sidebar > .body-siderbar > .per-branch > div{
        width: 92%;
        margin: auto auto 30px auto;
    }
    .sidebar > .body-siderbar > .per-branch > div > .router-link-exact-active{
        color: var(--main-color-white);
        background: var(--admin-secondary-blue-color);
    }
    .sidebar > .body-siderbar > * > div > p{
        margin: 5px 0 17px 0;
        padding: 0 5px;
        font-size: 15px;
        letter-spacing: 1.5px;
        color: var(--admin-primary-white-color);
        font-weight: 600;
    }
</style>