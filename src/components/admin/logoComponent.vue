<template>
    <article>
        <skeleton v-if="!statusLoad"/>
        <template v-else>
            <div class="title">
                <p>Logo</p>
            </div>
            <div class="current-logo">
                <h1>{{ logoData.logoCurrent }}</h1>
            </div>
            <!-- <formComponent></formComponent> -->
            <div class="form-container">
                <form @submit.prevent="submit">
                    <titleformComponent title="Logo Form"></titleformComponent>
                    <inputsComponent :inputs="inputs"></inputsComponent>
                    <buttonsComponent :statusSubmit="statusSubmit" :buttonTitle="buttonTitle"></buttonsComponent>
                </form>
            </div>
        </template>
    </article>
    <transition name="slide-fade">
        <loadingCompoent v-if="statusSubmit">
            <p>{{ loadingMessage }}</p>
        </loadingCompoent>
    </transition>
    <transition name="slide-fade">
        <errorList v-if="errorMessage">
            <p class="errormessage">{{ errorMessage }}</p>
        </errorList>
    </transition>
    <transition name="slide-fade">
        <successPopup v-if="successMessage">
            <p class="successmessage">{{ successMessage }}</p>
        </successPopup>
    </transition>
</template>
<script>
import inputsComponent from './reusable-forms/inputs.vue'
import buttonsComponent from './reusable-forms/buttons.vue'
import titleformComponent from './reusable-forms/titleform.vue'
import axiosIntance from '../../composable/axios.comp.js'
import skeleton from './skeletonLoading/skeleton-form.vue'
import loadingCompoent from '../essentials/loadingCompoent.vue'
import errorList from '../essentials/errorList.vue'
import successPopup from '../essentials/successPopup.vue'
export default{
    emits :{
        changeLogo: null, 
    },
    data(){
        return {
            statusLoad: false,
            logoData: {
                logoCurrent: '',
            },
            inputs: [
                {
                    type: 'text',
                    required: true,
                    label: 'Logo',
                    placeholder: 'Upload Title Logo',
                    value: ''
                },
            ],
            statusSubmit: false,
            buttonTitle: 'Submit',
            errorMessage: '',
            loadingMessage: '',
            successMessage: '',
        }
    },
    components: {
        inputsComponent, buttonsComponent, titleformComponent, skeleton, loadingCompoent, errorList, successPopup
    },
    created(){
        const getTheCurrentLogo = this.getTheCurrentLogo()
        Promise.all([getTheCurrentLogo]).then(() => {
            setTimeout(() => {
                this.statusLoad = true
            }, 500)
        })
    },
    methods: {
        async submit(){
            this.statusSubmit = !this.statusSubmit
            this.errorMessage = ''
            this.loadingMessage = 'Processing..'
            const data = {
                title: this.inputs[0].value
            };
            try {
                const config = {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                };
                const response = await axiosIntance.post('/api/admin/logo', data, config)
                const res = await response.data
                setTimeout(() => {
                    setTimeout(() => {
                        this.loadingMessage = ''
                        this.errorMessage = ''
                        this.statusSubmit = !this.statusSubmit
                        this.$emit('changeLogo', res);
                        this.logoData.logoCurrent = res
                        this.successMessage = 'Successful'
                        setTimeout(() => {
                            this.successMessage = ''
                        }, 3000)
                    }, 1000)
                }, 900)
            } catch (error) {
                console.log(error)
                setTimeout(() => {
                    this.statusSubmit = !this.statusSubmit
                    setTimeout(() => {
                        this.loadingMessage = ''
                        this.errorMessage = error.response.data.error
                    }, 1000)
                }, 900)
            }
        },
        async getTheCurrentLogo(){
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                };
                const response = await axiosIntance.get('/api/admin/logo', config)
                const res = await response.data
                if(res.length > 0){
                    this.logoData.logoCurrent = res[0].title
                    this.inputs[0].value = res[0].title
                }
                else{
                    this.logoData.logoCurrent = 'No Logo'
                }
            } catch (error) {
                console.log(error)
            }
        }
    },
}
</script>
<style>
    article{
        width: 100% !important;
    }
    article > .current-logo{
        margin: 3em 0;
        text-align: center;
    }
    article > .current-logo > h1{
        font-size: var(--title-main-default-font-size);
        letter-spacing: 4px;
        color: var(--main-color-yellow);
        font-family: 'Pacifico', cursive !important;
        font-weight: 800;
        white-space: nowrap;
    }
  
</style>