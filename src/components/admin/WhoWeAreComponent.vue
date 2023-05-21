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
                    <inputsComponent :inputs="inputs"></inputsComponent>
                    <textareaComponent :textareas="textareas"></textareaComponent>
                    <inputsFileComponent :inputFiles="inputFiles"></inputsFileComponent>
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
import textareaComponent from './reusable-forms/textarea.vue'
import inputsFileComponent from './reusable-forms/inputsFile.vue'
import axiosIntance from '../../composable/axios.comp.js'
import skeleton from './skeletonLoading/skeleton-form.vue'
import loadingCompoent from '../essentials/loadingCompoent.vue'
import errorList from '../essentials/errorList.vue'
import successPopup from '../essentials/successPopup.vue'
export default{
    data(){
        return {
            inputs: [
                {
                    type: 'text',
                    label: 'About Us Title',
                    required: true,
                    placeholder: 'Title',
                    value: ''
                },
            ],
            textareas: [
                {
                    label: 'Description',
                    required: true,
                    placeholder: 'Who we are',
                    value: ''
                },
            ],
            inputFiles: [
                {
                    label: 'Main Image about us(who we are) (attach Image here)',
                    required: true,
                    placeholder: 'image here',
                    acceptedFile: ['.jpg', '.jpeg', '.png'],
                    imagespreviews: '',
                    image: ''
                },
                {
                    label: 'Sub Image about us(who we are) (attach Image here)',
                    required: true,
                    placeholder: 'image here',
                    acceptedFile: ['.jpg', '.jpeg', '.png'],
                    imagespreviews: '',
                    image: ''
                },
            ],
            statusSubmit: false,
            buttonTitle: 'Submit',
            errorMessage: '',
            loadingMessage: '',
            statusLoad: false,
            successMessage: ''
        }
    },
    components: {
        inputsComponent, buttonsComponent, titleformComponent, textareaComponent, inputsFileComponent, skeleton, loadingCompoent, errorList, successPopup
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
            this.errorMessage = ''
            this.loadingMessage = 'Processing..'
            if(!this.inputFiles[0].imagespreviews || !this.inputFiles[1].imagespreviews || !this.inputs[0].value || !this.textareas[0].value){
               setTimeout(() => {
                    this.statusSubmit = !this.statusSubmit
                    setTimeout(() => {
                        this.errorMessage = ''
                        this.loadingMessage = ''
                        this.errorMessage = 'Please Select All Fields'
                    }, 1000)
               }, 900)
            }
            else{
                try {
                    const formData = new FormData();
                    formData.append('title', this.inputs[0].value);
                    formData.append('description', this.textareas[0].value.replace(/(?:\r\n|\r|\n)/g, '<br>'));
                    formData.append('mainImage', this.inputFiles[0].image);
                    formData.append('subImage', this.inputFiles[1].image);
                    const config = {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    };
                    const response = await axiosIntance.post('/api/admin/whoweare', formData, config)
                    await response.data
                    setTimeout(() => {
                        this.statusSubmit = !this.statusSubmit
                        setTimeout(() => {
                            this.errorMessage = ''
                            this.loadingMessage = ''
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
                            this.errorMessage = ''
                            this.loadingMessage = ''
                            this.errorMessage = error.response.data
                        }, 1000)
                    }, 900)
                }
            }
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
                    this.inputs[0].value = res[0].title
                    this.textareas[0].value = res[0].description.replace(/(<br>)/g, '\n')
                    if(res[0].mainImage != null) this.inputFiles[0].imagespreviews = `http://127.0.0.1:8000/images/${res[0].mainImage}`
                    if(res[0].subImage != null)  this.inputFiles[1].imagespreviews = `http://127.0.0.1:8000/images/${res[0].subImage}`
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