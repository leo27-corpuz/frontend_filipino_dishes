<template>
    <nav>
        <div class="title">
            <h2>Dishes</h2>
        </div>
        <ul class="animate__animated animate__pulse">
            <router-link :to="{
                params: { place: 'ilocano'},
            }"><li>Ilocano</li></router-link>
            <router-link :to="{
                params: { place: 'cebuano'}
            }"><li>Cebuano</li></router-link>
            <router-link :to="{
                params: { place: 'ilongo'}
            }"><li>Ilongo</li></router-link>
            <router-link :to="{
                params: { place: 'kapampangan'}
            }"><li>Kapampangan</li></router-link>
        </ul>
        <div class="dropdown">
                <button @click="toggleShow" ref="target">
                    <span>
                        Other
                    </span>
                    <div class="line1" :class="toggleOther ? 'rotateline1' : ''"></div>
                    <div class="line2" :class="toggleOther ? 'rotateline2' : ''"></div>
                </button>
                <Transition name="fade">
                    <ul v-show="toggleOther" @click="handleClick" ref="target2">
                        <router-link to="/dishes"><li>More</li></router-link>
                        <router-link to="/dishes"><li>More</li></router-link>
                        <router-link to="/dishes"><li>More</li></router-link>
                        <router-link to="/dishes"><li>More</li></router-link>
                        <router-link to="/dishes"><li>More</li></router-link>
                        <router-link to="/dishes"><li>More</li></router-link>
                        <router-link to="/dishes"><li>More</li></router-link>
                        <router-link to="/dishes"><li>More</li></router-link>
                        <router-link to="/dishes"><li>More</li></router-link>
                        <router-link to="/dishes"><li>More</li></router-link>
                        <router-link to="/dishes"><li>More</li></router-link>
                        <router-link to="/dishes"><li>More</li></router-link>
                    </ul>
                </Transition>
        </div>
    </nav>
</template>
<script>
export default{
    data(){
        return {
            toggleOther: false
        }
    },
    mounted(){
        document.addEventListener("click", this.handleClick);
    },
    unmounted(){
        document.removeEventListener("click", this.handleClick);
    },
    methods:{
        toggleShow(){
            this.toggleOther = !this.toggleOther
        },
        handleClick(event){
            const target1 = this.$refs.target
            const target2 = this.$refs.target2
            if(target1 && target2){
                if (!target1.contains(event.target) && !target2.contains(event.target)) {
                    this.toggleOther = false
                }
            }
        }
    }
}
</script>
<style scoped>
    nav{
        padding: 10px 0;
        margin: 120px auto 0 auto;
        width: 90%;
        background: var(--main-color-white);
        position: relative;
        z-index: 82;
        display: flex;
        grid-gap: 20px;
    }
    nav > ul{
        display: flex;
        flex-direction: row;
        grid-gap: 30px;
        margin-top: auto;
        margin-bottom: auto;
        padding: 15px 0;
        overflow-y: scroll;
    }
    nav > ul::-webkit-scrollbar-thumb{
    background-color:var(--main-color-yellow);
    border-radius:2em;
    border:1px solid var(--main-color-yellow);
    }
    nav > ul::-webkit-scrollbar-thumb:hover{
        background-color: var(--main-color-yellow);
        border:1px solid var(--main-color-yellow);
    }
        
    nav > ul::-webkit-scrollbar {
        width: 6px;
        height:6px;
    }
    nav > .title{
        margin-top: auto;
        margin-bottom: auto;
    }
    nav > .title > h2{
        letter-spacing: 0;
        font-weight: 600;
        font-size: var(--title-ipad-default-font-size);
        color: var(--fourth-color-black);
        white-space: nowrap;
    }
    nav > ul > a{
        letter-spacing: 2.5px;
        font-size: var(--ipad-default-font-size);
        padding: 10px 0;
        line-height: 1.5;
        cursor: pointer;
        transition: all 0.5s ease-out;
        color: var(--fourth-color-black);
        white-space: nowrap;
        position: relative;
    }
    nav > ul > a:hover{
        color: var(--main-color-yellow);
    }
    nav > ul > a:after{
        content: '';
        position: absolute;
        background: var(--main-color-yellow);
        width: 0%;
        height:2px;
        left: 0;
        bottom: 1.5px;
        transition: all 0.5s ease-out;
    }
    nav > ul > a:hover:after{
        width: 100%;
    }
    nav > ul > .active:after{
        content: '';
        position: absolute;
        background: var(--main-color-yellow);
        width: 100%;
        height:2px;
        left: 0;
        bottom: 1.5px;
    }
    .active{
        color: var(--main-color-yellow);
    }
    .dropdown  {
        position: relative;
        margin: auto 0;
    }
    .dropdown > button{
        border: none;
        background: var(--main-color-white);
        letter-spacing: 2.5px;
        font-size: var(--ipad-default-font-size);
        padding: 10px 0;
        line-height: 1.5;
        cursor: pointer;
        transition: all 0.5s ease-out;
        color: var(--fourth-color-black);
        white-space: nowrap;
        display: flex;
    }
    .dropdown > button > span{
        margin-right: 5px;
    }

    .dropdown > button .line1{
        width: 8px;
        height: 2px;
        background: var(--fourth-color-black);
        transform: rotate(45deg);
        transition: all 0.5s ease-out;
        margin-top: 10px;
        margin-left: 0px;
    }
    .rotateline1{
        transform: rotate(-45deg) !important;
    }
    .rotateline2{
        transform: rotate(45deg) !important;
    }
    .dropdown > button .line2{
        width: 8px;
        height: 2px;
        margin-top: 10px;
        margin-left: -3px;
        background: var(--fourth-color-black);
        transform: rotate(-45deg);
        transition: all 0.5s ease-out;
    }
    .dropdown > ul{
        position: absolute;
        width: 250px;
        right: 0;
        height: 200px;
        padding: 15px 10px;
        border-radius: 15px;
        overflow-y: auto;
        /* background-image: linear-gradient(to bottom, var(--main-color-white), var(--transparent-color-3)); */
        background: var(--main-color-white);
    }
    .dropdown > ul::-webkit-scrollbar-thumb{
        background-color:var(--main-color-yellow);
        border-radius:2em;
        border:1px solid var(--main-color-yellow);
    }
    .dropdown > ul::-webkit-scrollbar-thumb:hover{
        background-color: var(--main-color-yellow);
        border:1px solid var(--main-color-yellow);
    }
        
    .dropdown > ul::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }
    .dropdown > ul > a > li{
        letter-spacing: 2.5px;
        font-size: var(--ipad-default-font-size);
        padding: 10px 15px;
        line-height: 1.5;
        cursor: pointer;
        transition: all 0.5s ease-out;
        color: var(--fourth-color-black);
        white-space: nowrap;
        position: relative;
        width: 100%;
        margin-bottom: 10px;
        border-radius: 7px;
    }
    .dropdown > ul > a > li:hover{
        background: var(--main-color-yellow);
        color: var(--main-color-white);
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
    @media screen and (max-width: 900px){
        nav > .title > h2{
            font-size: var(--title-mobile-default-font-size);
        }
    }
    @media screen and (max-width: 700px){
        nav > ul > a{
            font-size: var(--mobile-default-font-size);
        }
        nav > ul{
            margin-top: -1em;
        }
        .dropdown > button{
            border: none;
            font-size: var(--mobile-default-font-size);
        }
        .dropdown > ul > a > li{
            font-size: var(--mobile-default-font-size);
        }
        nav{
            flex-direction: column;
        }
        .dropdown > ul{
            left: 0;
        }
    }
</style>