<template>
    <header class="header-admin">
        <div class="sub-container">
            <div class="button-burger"> 
                <i class="fa-solid fa-align-left" @click="toggleSiderBar"></i>
            </div>
            <div class="search-container">
                <div class="search">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder="Global Search">
                    <i class="fa-solid fa-xmark"></i>
                </div>
                <div class="search-result">
                    sdas
                </div>
            </div>
        </div>
        <div class="sub-container">
            <div class="admin-info">
                <div class="clickable" @click="showSetting" ref="target1">
                    <i class="fa-solid fa-user"></i>
                    <p>Admin</p>
                    <i class="fa-solid fa-angle-down"></i>
                </div>
               <transition name="slide-fade">
                    <ul class="dropdown"  ref="targetV2" v-show="settingStatus" @click="handleClick">
                        <router-link :to="{name: 'profileadmin'}"><li><i class="fa-regular fa-user"></i> <p>Profile</p></li></router-link>
                        <a @click="logout"><li><i class="fa-solid fa-right-from-bracket"></i> <p>Logout</p></li></a>
                    </ul>
               </transition>
            </div>
        </div>
    </header>
</template>
<script>
export default{
    data(){
        return {
            settingStatus: false
        }
    },
    mounted(){
        document.addEventListener("click", this.handleClick);
    },
    methods: {
        toggleSiderBar(){
            this.$emit('toggleSidebar')
        },
        showSetting(){
            this.settingStatus = !this.settingStatus
        },
        handleClick(){
            const target1 = this.$refs.target1
            const targetV2 = this.$refs.targetV2
            if(targetV2){
                if( !target1.contains(event.target) && !targetV2.contains(event.target)){
                    this.settingStatus = false
                }
            }
        },
        logout(){
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            this.$router.push('/login')
        }
    },
}
</script>
<style scoped>
    .header-admin{
        display: flex;
        justify-content: space-between;
        padding: 15px 60px;
        box-shadow:rgba(0, 0, 0, 0.1) 0px 2px 2px;
        width: calc(100% - 19em);
        margin-left: auto;
        z-index: 100;
        background: var(--main-color-white);
        transition: all 0.8s ease-in-out;
    }
    
    .header-admin > :nth-child(1){
        display: flex;
        flex-direction: row;
        grid-gap: 15px;
    }
    .header-admin > :nth-child(1) > .button-burger{
        cursor: pointer;
        width: auto;
        margin: auto;
        z-index: 97;
        position: relative;
    }
    .header-admin > :nth-child(1) >  .button-burger > i{
        color: var(--fourth-color-black);
        font-size: 20px;
        /* color: var(--third-color-black); */
        color: rgba(24, 24, 24, 0.5);
        width: 45px;
        padding: 13px 11px 10px 11px;
        text-align: center;
        background-image: linear-gradient(to top, var(--main-color-white), var(--main-color-white),  var(--main-color-white), var(--transparent-color-3));
        box-shadow: var(--main-box-shadow);
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.5s ease-out;
    }
    .header-admin > :nth-child(1) >  .button-burger > i:hover{
        background: var(--main-color-yellow);
        color: var(--main-color-white);
    }
    .dropdown{
        position: absolute;
        background: var(--main-color-white);
        display: flex;
        right: 0;
        top: 3em;
        flex-direction: column;
        width: 15em;
        padding: 13px 20px;
        z-index: 100;
        border-radius: 7px;
        box-shadow: var(--main-box-shadow);
    }
    .dropdown > *{
        width: 100%;
        padding: 12px;
        background: var(--main-background-color);
        box-shadow: var(--main-box-shadow);
        margin: 7px 0;
        text-align: left;
        border-radius: 10px;
        transition: all 0.5s ease-out;
        color: rgba(24, 24, 24, 0.5);
        cursor: pointer;
    }
    .dropdown > .active{
        background: var(--admin-secondary-blue-color) !important;
        color: var(--main-color-white) !important;
    }
    .dropdown > *:hover{
        background: var(--admin-secondary-blue-color);
        color: var(--main-color-white);
    }
    .dropdown > * > li{
        display: flex;
    }
    .dropdown > * > li > i{
        font-size: 20px;
    }
    .dropdown > * > li > p{
        font-size: var(--wide-default-font-size);
        letter-spacing: 1.2px;
        margin: auto 10px;
    }
    .header-admin > :nth-child(1) > .search-container{
        margin: auto;
        position: relative;
        width: 27em;
    }
    .header-admin > :nth-child(1) > .search-container > .search{
        width: 100%;
    }
    .header-admin > :nth-child(1) > .search-container > .search > i{
        position: absolute;
        font-size: 17px;
    }
    .header-admin > :nth-child(1) > .search-container > .search > :nth-child(1){
        top: 13px;
        left: 1em;
        color: rgba(24, 24, 24, 0.5);
    }
    .header-admin > :nth-child(1) > .search-container > .search > :nth-child(3){
        top: 13px;
        right: 1em;
        cursor: pointer;
        color: darkred;
        display: none;
    }
    .header-admin > :nth-child(1) > .search-container > .search > input{
        width: 100%;
        font-size: var(--wide-default-font-size);
        padding: 11px 45px;
        border-radius: 50px;
        border: none;
        color: rgba(24, 24, 24, 0.5);
        outline: none;
        letter-spacing: 1.5px;
        transition: all 0.5s ease-out;
        transition: all 0.5 ease-out;
        background: var(--main-background-color);
        box-shadow: var(--main-box-shadow);
    }
    .header-admin > :nth-child(1) > .search-container > .search-result{
        position: absolute;
        margin-top: 0.5em;
        width: 100%;
        display: none;
        height: 20em;
        background: gray;
    }
    .header-admin > :nth-child(2){
        margin: auto 0;
    }
    .header-admin > :nth-child(2) > .admin-info {
        position: relative;
        font-size: 16px;
        color: rgba(24, 24, 24, 0.5);
        padding: 13px 15px 10px 15px;
        text-align: center;
        border-radius: 6px;
        transition: all 0.5s ease-out;
    }
    .header-admin > :nth-child(2) > .admin-info > .clickable {
        cursor: pointer;
    }
    .header-admin > :nth-child(2) > .admin-info > .clickable > *{
        display: inline;
        margin-left: 10px;
    }
    .header-admin > :nth-child(2) > .admin-info > .clickable > :nth-child(1){
        font-size: 18px;
    }
    .slide-fade-enter-active {
        transition: all 0.3s ease-out;
    }

    .slide-fade-leave-active {
        transition: all 0.3s ease-in;
    }

    .slide-fade-enter-from,
    .slide-fade-leave-to {
        transform: translateY(-20px);
        opacity: 0;
    }
</style>