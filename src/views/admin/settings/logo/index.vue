<template>
    <section>
        <article>
            <skeleton v-if="!statusLoad" />
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
                        <inputWrap class="wrap-input">
                            <inputsComponent :input="inputs" :errormessage="errorData"></inputsComponent>
                        </inputWrap>
                        <div class="btn-create-choice">
                            <buttonsComponent :statusSubmit="statusSubmit" :buttonTitle="buttonTitle"></buttonsComponent>
                        </div>
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
            <successPopup v-if="successMessage">
                <p class="successmessage">{{ successMessage }}</p>
            </successPopup>
        </transition>
    </section>
</template>
<script>
import inputsComponent from '../../../../components/form/inputs.vue'
import inputWrap from '../../../../components/form/input-wrap.vue'
import buttonsComponent from '../../../../components/form/buttons.vue'
import titleformComponent from '../../../../components/form/titleform.vue'
import axiosIntance from '../../../../composable/axios.comp.js'
import skeleton from '../../../../components/admin/skeletonLoading/skeleton-form.vue'
import loadingCompoent from '../../../../components/essentials/loadingCompoent.vue'
import successPopup from '../../../../components/essentials/successPopup.vue'
export default{
    data(){
        return {
            statusLoad: false,
            logoData: {
                logoCurrent: '',
            },
            inputs: {
                type: 'text',
                required: true,
                label: 'Logo',
                placeholder: 'Upload Title Logo',
                value: '',
                title: 'title'
            },
            statusSubmit: false,
            buttonTitle: 'Submit',
            errorData: {},
            loadingMessage: '',
            successMessage: '',
        }
    },
    emits :{
        changeLogo: null, 
    },
    components: {
        inputsComponent, buttonsComponent, titleformComponent, skeleton, loadingCompoent, successPopup, inputWrap
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
            this.loadingMessage = 'Processing..'
            const data = {
                title: this.inputs.value
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
                        this.errorData = {}
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
                setTimeout(() => {
                    this.statusSubmit = !this.statusSubmit
                    setTimeout(() => {
                        this.loadingMessage = ''
                        this.errorData = error.response.data
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
                    this.inputs.value = res[0].title
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