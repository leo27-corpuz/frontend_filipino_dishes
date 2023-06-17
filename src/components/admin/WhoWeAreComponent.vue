<template>
    <article>
        <skeleton v-if="!statusLoad" />
        <template v-else>
            <div class="title">
                <p>Who We Are</p>
            </div>
            <div class="form-container">
                <form @submit.prevent="submit">
                    <titleformComponent title="About us (Who We Are Form)"></titleformComponent>
                    <inputWrap class="wrap-input">
                        <inputsComponent :input="inputs" :errormessage="errorData"></inputsComponent>
                    </inputWrap>
                    <inputWrap class="wrap-textarea">
                        <textareaComponent :textarea="textareas" :errormessage="errorData"></textareaComponent> 
                    </inputWrap>
                    <inputWrap class="wrap-input-file">
                        <inputsFileComponent v-for="inputFile in inputFiles" :inputFile="inputFile" :errormessage="errorData"></inputsFileComponent>
                    </inputWrap>
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
        <successPopup v-if="successMessage">
            <p class="successmessage">{{ successMessage }}</p>
        </successPopup>
    </transition>
</template>
<script>
import inputWrap from '../form/input-wrap.vue'
import inputsComponent from '../form/inputs.vue'
import buttonsComponent from '../form/buttons.vue'
import titleformComponent from '../form/titleform.vue'
import textareaComponent from '../form/textarea.vue'
import inputsFileComponent from '../form/inputsFile.vue'
import axiosIntance from '../../composable/axios.comp.js'
import skeleton from './skeletonLoading/skeleton-form.vue'
import loadingCompoent from '../essentials/loadingCompoent.vue'
import successPopup from '../essentials/successPopup.vue'
export default{
    data(){
        return {
            inputs: {
                type: 'text',
                label: 'About Us Title',
                required: true,
                placeholder: 'Title',
                value: '',
                title: 'title'
            },
            textareas: {
                label: 'Description',
                required: true,
                placeholder: 'Who we are',
                value: '',
                title: 'description'
            },
            inputFiles: [
                {
                    label: 'Main Image about us(who we are) (attach Image here)',
                    required: true,
                    placeholder: 'image here',
                    acceptedFile: ['.jpg', '.jpeg', '.png'],
                    imagespreviews: '',
                    image: '',
                    title: 'mainImage'
                },
                {
                    label: 'Sub Image about us(who we are) (attach Image here)',
                    required: true,
                    placeholder: 'image here',
                    acceptedFile: ['.jpg', '.jpeg', '.png'],
                    imagespreviews: '',
                    image: '',
                    title: 'subImage'
                },
            ],
            statusSubmit: false,
            buttonTitle: 'Submit',
            errorData: {},
            loadingMessage: '',
            statusLoad: false,
            successMessage: ''
        }
    },
    components: {
        inputsComponent, buttonsComponent, titleformComponent, textareaComponent, inputsFileComponent, skeleton, loadingCompoent, successPopup, inputWrap
    },
    created(){
        const promisigetDataWhoWeAre = this.getWhoWeAreData();
        Promise.all([promisigetDataWhoWeAre]).then(() => {
            setTimeout(() => {
                this.statusLoad = true
            }, 500)
        })
    },
    methods: {
        async submit(){
            this.statusSubmit = !this.statusSubmit
            this.loadingMessage = 'Processing..'
            // if(this.statusSubmit){
            //    setTimeout(() => {
            //         this.statusSubmit = !this.statusSubmit
            //         setTimeout(() => {
            //             this.errorMessage = ''
            //             this.loadingMessage = ''
            //             this.errorMessage = 'Please Select All Fields'
            //         }, 1000)
            //    }, 900)
            // }
            // else{
                try {
                    const formData = new FormData();
                    formData.append('title', this.inputs.value);
                    formData.append('description', this.textareas.value.replace(/(?:\r\n|\r|\n)/g, '<br>'));
                    formData.append('mainImage', this.inputFiles[0].image);
                    formData.append('subImage', this.inputFiles[1].image);
                    const config = {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    };
                    const response = await axiosIntance.post('/api/admin/whoweare', formData, config)
                    let res = await response.data
                    setTimeout(() => {
                        this.statusSubmit = !this.statusSubmit
                        setTimeout(() => {
                            this.errorData = {}
                            this.loadingMessage = ''
                            this.successMessage = 'Successful'
                            this.inputs.value = res.title
                            this.textareas.value = res.description.replace(/(<br>)/g, '\n')
                            if(res.mainImage != null){
                                this.inputFiles[0].imagespreviews = `http://127.0.0.1:8000/images/${res.mainImage}`
                                this.inputFiles[0].image = {
                                    name: res.mainImage
                                }
                            }
                            if(res.subImage != null){
                                this.inputFiles[1].imagespreviews = `http://127.0.0.1:8000/images/${res.subImage}`
                                this.inputFiles[1].image = {
                                    name: res.subImage
                                }
                            }
                            setTimeout(() => {
                                this.successMessage = ''
                            }, 3000)
                        }, 1000)
                    }, 900)
                } catch (error) {
                    setTimeout(() => {
                        this.statusSubmit = !this.statusSubmit
                        setTimeout(() => {
                            this.errorData = error.response.data
                            this.loadingMessage = ''
                        }, 1000)
                    }, 900)
                }
            // }
        },
        async getWhoWeAreData(){
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                };
                const response = await axiosIntance.get('/api/admin/whoweare', config)
                const res = await response.data
                if(res.length > 0){
                    this.inputs.value = res[0].title
                    this.textareas.value = res[0].description.replace(/(<br>)/g, '\n')
                    if(res[0].mainImage != null){
                        this.inputFiles[0].imagespreviews = `http://127.0.0.1:8000/images/${res[0].mainImage}`
                        this.inputFiles[0].image = {
                            name: res[0].mainImage
                        }
                    }
                    if(res[0].subImage != null){
                        this.inputFiles[1].imagespreviews = `http://127.0.0.1:8000/images/${res[0].subImage}`
                        this.inputFiles[1].image = {
                            name: res[0].subImage
                        }
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>
<style scoped>
article {
    width: 100% !important;
}
</style>