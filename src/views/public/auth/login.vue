<template>
    <main>
        <div class="login-container">
            <div class="sub-container">
                <div class="image-container">
                    <v-lazy-image src="/images/login.svg"></v-lazy-image>
                </div>
            </div>
            <div class="sub-container">
                <div class="login-form">
                    <div class="title">
                        <h1>Welcome to {{ logoFirst }}<span>{{ lastTitle }}</span></h1>
                    </div>
                    <div class="sub-title">
                        <p>Login your account</p>
                    </div>
                    <form @submit.prevent="logIn">
                        <div class="wrap-input">
                            <div class="form-input-container">
                                <label for="">Email</label>
                                <div class="input">
                                    <input type="text" v-model="loginData.email" placeholder="Sample@gmail.com">
                                    <i class="fa-solid fa-envelope"></i>
                                </div>
                                <div class="error-input" v-show="errorMessage.email"><img src="/images/alert-circle.svg"
                                        alt="">
                                    <p>{{ errorMessage.email }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="wrap-input">
                            <div class="form-input-container">
                                <label for="">Password</label>
                                <div class="input">
                                    <input type="password" v-model="loginData.password" placeholder="e-g5Abc-z">
                                    <i class="fa-solid fa-eye-slash"></i>
                                </div>
                                <div class="error-input" v-show="errorMessage.password"><img src="/images/alert-circle.svg"
                                        alt="">
                                    <p>{{ errorMessage.password }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="wrap-button">
                            <button v-bind:disabled="statusSubmit" :class="statusSubmit ? 'disabledCursor' : ''">
                                <span>Login</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <transition name="slide-fade">
            <loadingCompoent v-if="statusSubmit">
                <p>{{ loadingMessage }}</p>
            </loadingCompoent>
        </transition>
        <transition name="slide-fade">
            <successPopup v-if="successMessage">
                <p class="successmessage">{{ successMessage }}</p>
            </successPopup>
        </transition>
    </main>
</template>
<script>
import VLazyImage from "v-lazy-image";
import axiosIntance from '../../../composable/axios.comp.js'
import loadingCompoent from '../../../components/essentials/loadingCompoent.vue'
import successPopup from '../../../components/essentials/successPopup.vue'
export default{
    data(){
        return{
            logo: 'FilDish',
            loginData: {
                email: '',
                password: ''
            },
            statusSubmit: false,
            errorMessage: {},
            loadingMessage: '',
            successMessage: ''
        }
    },
    components:{
        loadingCompoent, successPopup, VLazyImage
    },
    computed: {
        logoFirst(){
            return this.logo.substring(0, 3)
        },
        lastTitle(){
            return this.logo.substring(3)
        },
    },
    methods: {
        async logIn(){
            this.statusSubmit = !this.statusSubmit
            this.loadingMessage = 'Processing..'
            const data = {
                email: this.loginData.email,
                password: this.loginData.password
            };
            try {
                const config = {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                };
                const response = await axiosIntance.post('/api/auth/login', data, config)
                const res = await response.data
                console.log(res)
                localStorage.setItem("token", res.data);
                localStorage.setItem("user", JSON.stringify(res.user));
                setTimeout(() => {
                    this.statusSubmit = !this.statusSubmit
                    this.successMessage = 'Successful'
                    setTimeout(() => {
                        this.loadingMessage = ''
                        this.errorMessage = {}
                        this.$router.push('/admin')
                        setTimeout(() => {
                            this.successMessage = ''
                        }, 3000)
                    }, 1000)
                }, 900)
            } catch (error) {
                setTimeout(() => {
                    this.statusSubmit = !this.statusSubmit
                    setTimeout(() => {
                        this.loadingMessage = ''
                        this.errorMessage = error.response.data
                    }, 1000)
                }, 900)
            }
        }
    }
}
</script>
<style scoped>
.login-container{
    width: 100%;
    display: flex;
    height: 100vh;
    flex-direction: row;
}
.login-container > *{
    height: 100vh;
}
.login-container > :nth-child(1){
    width: 60%;
    position: relative;
    background-image: linear-gradient(to top, var(--main-color-white), var(--main-color-white),  var(--main-color-white), var(--transparent-color-3));
}
.login-container > :nth-child(1) > .image-container{
    width: 100%;
    height: 100vh;
    /* background: red; */
    text-align: center;
    position: relative;
}
.login-container > :nth-child(1) > .image-container > img{
    width: 650px;
    height: 650px;
    object-fit: scale-down;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
}
.login-container > :nth-child(2){
    width: 40%;
    height: 100vh;
    display: grid;
    margin: 0;
    place-items: center;
    background-image: linear-gradient(to bottom, var(--main-color-white), var(--main-color-white),  var(--main-color-white), var(--transparent-color-3));
}
.login-container > :nth-child(2) >.login-form{
    width: 70%;
}
.login-container > :nth-child(2) >.login-form > .title{
    margin: 2em 0 5px 0;
}
.login-container > :nth-child(2) >.login-form > .title > h1{
    font-size: var(--subtitle-wide-default-font-size);
    letter-spacing: 4px;
    color: var(--fourth-color-black);
    font-weight: 800;
    cursor: pointer;
    font-family: 'Pacifico', cursive !important;
}
.login-container > :nth-child(2) >.login-form > .title > h1 span{
    color: var(--main-color-yellow) !important;
    font-family: 'Pacifico', cursive !important;
}
.login-container > :nth-child(2) >.login-form > .sub-title{
    margin: 0px 0 3em 0;
}
.login-container > :nth-child(2) >.login-form > .sub-title > p{
    font-size: var( --mobile-default-font-size);
    letter-spacing: 1px;
    color: #747474;
}
.login-container > :nth-child(2) >.login-form > form{
    width: 100%;
}
.login-container > :nth-child(2) >.login-form > form > .wrap-input{
    width: 100%;
    margin-bottom: 30px;
}
.login-container > :nth-child(2) >.login-form > form > .wrap-input > .form-input-container{
    width: 100%;
    margin-bottom: 1em;
}
.login-container > :nth-child(2) >.login-form > form > .wrap-input > .form-input-container > label{
    font-size: var( --wide-default-font-size);
    letter-spacing: 1.2px;
    color: var(--third-color-black);
    line-height: 1.5;
    text-align: center;
}
.login-container > :nth-child(2) >.login-form > form > .wrap-input > .form-input-container > .input{
    width: 100%;
    margin-top: 10px;
    position: relative;
}
.login-container > :nth-child(2) >.login-form > form > .wrap-input > .form-input-container > .input > input{
    width: 100%;
    font-size: var(--wide-default-font-size);
    padding: 15px;
    border-radius: 7px;
    border: solid rgba(0, 0, 0, 0.2) 0.5px;
    color: rgba(24, 24, 24, 0.5);
    outline: none;
    letter-spacing: 1.5px;
    transition: all 0.5s ease-out;
    transition: all 0.5 ease-out;
}
.login-container > :nth-child(2) >.login-form > form > .wrap-input > .form-input-container > .input > input:focus{
    box-shadow: rgba(212, 117, 39, 0.3) 0px 0px 0px 1px, rgba(197, 106, 32, 0.3) 0px 0px 0px 1px;
    color: var(--main-color-yellow);
    border: solid rgba(197, 106, 32, 0.3) 1.5px;
}
.login-container > :nth-child(2) >.login-form > form > .wrap-input > .form-input-container > .input > i{
    position: absolute;
    right: 1em;
    top: .8em;
    font-size: 20px;
    color: rgba(27, 31, 35, 0.3) 
}
.login-container > :nth-child(2) >.login-form > form > .wrap-button{
    width: 100%;
    margin-top: 35px;
    margin-bottom: 25px;
}
.login-container > :nth-child(2) >.login-form > form > .wrap-button > button{
    background: var(--main-color-yellow);
    border: none;
    padding: 15px 19px;
    border-radius: 50px;
    width: 50%;
    font-size: var(--wide-default-font-size);
    cursor: pointer;
    letter-spacing: 1.7px;
    color: var(--main-color-white);
    transition: all 0.5s ease-out;
}
.login-container > :nth-child(2) >.login-form > form > .wrap-button > button:hover{
    background: var(--third-color-yellow);
    transform: translateY(-5px);
    color: var(--fourth-color-black);
}
.v-lazy-image {
        background: #eee;
        background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
        background-size: 200% 100%;
        border-radius: 50%;
        animation: 1.5s shadow-effect linear infinite;
    }
    .v-lazy-image-loaded {
        border-radius: 0 !important;
        background: none !important;
        animation:  blur-effect 2s normal forwards ease-in-out !important;
    }
    @media screen and (max-width: 1300px){
        .login-container > :nth-child(1){
            width: 50%;
        }
        .login-container > :nth-child(1) > .image-container > img{
            width: 500px;
            height: 500px;
        }
        .login-container > :nth-child(2){
            width: 50%;
        }
    }
    @media screen and (max-width: 1100px){
        .login-container > :nth-child(1) > .image-container > img{
            width: 400px;
            height: 400px;
        }
    }
    @media screen and (max-width: 900px){
        .login-container > :nth-child(2) >.login-form > .title > h1{
            font-size: var(--subtitle-ipad-default-font-size);
        }
        .login-container > :nth-child(2) >.login-form > form > .wrap-input > .form-input-container > label{
            font-size: var( --ipad-default-font-size);
        }
        .login-container > :nth-child(2) >.login-form > form > .wrap-button > button{
            padding: 13px 17px;
            font-size: var(--ipad-default-font-size);
            letter-spacing: 1.7px;
        }
        .login-container > :nth-child(2) >.login-form > form > .wrap-input > .form-input-container > .input > input{
            font-size: var(--ipad-default-font-size);
        }
        .login-container{
            flex-direction: column;
        }
        .login-container > :nth-child(1){
            width: 100%;
            height: auto;
            padding-top: 5em;
        }
        .login-container > :nth-child(1) > .image-container > img{
            width: 250px;
            height: 250px;
        }
        .login-container > :nth-child(1) > .image-container{
            height: 250px;
        }
        .login-container > :nth-child(2){
            width: 100%;
            display: grid;
            margin: 0;
            place-items: center;
        }
        .login-container > :nth-child(2) >.login-form > .title{
            margin: 1em 0 5px 0;
        }
        .login-container > :nth-child(2) >.login-form > form > .wrap-button > button{
            margin-bottom: 3em;
        }
        .login-container > :nth-child(2) >.login-form{
            width: 90%;
        }
    }
    @media screen and (max-width: 700px){
        .login-container > :nth-child(2) >.login-form > .title > h1{
            font-size: var(--subtitle-mobile-default-font-size);
        }
        .login-container > :nth-child(2) >.login-form > form > .wrap-input > .form-input-container > label{
            font-size: var( --mobile-default-font-size);
        }
        .login-container > :nth-child(2) >.login-form > form > .wrap-button > button{
            padding: 12px 16px;
            font-size: var(--mobile-default-font-size);
        }
        .login-container > :nth-child(2) >.login-form > form > .wrap-input > .form-input-container > .input > input{
            font-size: var(--mobile-default-font-size);
        }
    }

    @media screen and (max-height: 600px){
        .login-container > :nth-child(1){
            background: none;
        }
        .login-container > :nth-child(1) > .image-container > img{
            height: 250px;
        }
        .login-container > :nth-child(2){
            background: none;
        }
    }


    /* loading  */
    .loading-container > p{
        margin: auto 0;
        font-size: var(--wide-default-font-size);
        letter-spacing: 1.2px;
        color: var(--fourth-color-black);
    }
    .slide-fade-enter-active {
    transition: all 0.3s ease-out;
    }

    .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .slide-fade-enter-from,
    .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
    }
    .disabledCursor{
        cursor: not-allowed !important;
    }
    .error-input{
        margin: 7px 5px;
        display: flex;
        grid-gap: 5px;
        align-items: center;
    }
    .error-input > img{
        width: 20px;
    }
    .error-input > p{
        font-size: var( --mobile-default-font-size);
        letter-spacing: 1px;
        color: darkred;
    }
   
</style>