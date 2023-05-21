<template>
    <article>
        <skeleton v-if="!statusLoad"/>
        <template v-else>
            <div class="title">
                <p>Landing Page</p>
            </div>
            <div class="form-container">
                <form @submit.prevent="submit">
                    <titleformComponent title="Home Page Form"></titleformComponent>
                    <inputsComponent :inputs="inputs"></inputsComponent>
                    <textareaComponent :textareas="textareas"></textareaComponent>
                    <inputsFileComponent :inputFiles="inputFiles"></inputsFileComponent>
                    <inputsComponent :inputs="inputsPopularDishes"></inputsComponent>
                    <textareaComponent :textareas="textareasPopularDishes"></textareaComponent>
                    <buttonsComponent :statusSubmit="statusSubmit" :buttonTitle="buttonHomePage"></buttonsComponent>
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
                    label: 'Title',
                    required: true,
                    placeholder: 'Title of the Homepage',
                    value: ''
                },
            ],
            textareas: [
                {
                    label: 'Description',
                    required: true,
                    placeholder: 'Description of the Homepage',
                    value: ''
                },
            ],
            inputFiles: [
                {
                    label: 'Main Image (attach Image here)',
                    required: true,
                    placeholder: 'image here',
                    acceptedFile: ['.jpg', '.jpeg', '.png'],
                    imagespreviews: '',
                    image: ''
                },
                {
                    label: 'Sub Image (attach Image here)',
                    required: true,
                    placeholder: 'image here',
                    acceptedFile: ['.jpg', '.jpeg', '.png'],
                    imagespreviews: '',
                    image: ''
                }
            ],
            inputsPopularDishes: [
                {
                    type: 'text',
                    required: true,
                    label: 'Title',
                    placeholder: 'Popular Filipino Dishes',
                    value: ''
                },
            ],
            textareasPopularDishes: [
                {
                    label: 'Description',
                    required: true,
                    placeholder: 'Description of the Popular Filipino Dishes',
                    value: ''
                },
            ],
            statusSubmit: false,
            buttonHomePage: 'Submit',
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
        const promisigetDataLanding = this.getLandingPageData();
        Promise.all([promisigetDataLanding]).then(() => {
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
            if(!this.inputFiles[0].imagespreviews || !this.inputFiles[1].imagespreviews || !this.inputs[0].value || !this.textareas[0].value || !this.inputsPopularDishes[0].value || !this.textareasPopularDishes[0].value){
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
                    formData.append('mainTitle', this.inputs[0].value);
                    formData.append('mainDescription', this.textareas[0].value.replace(/(?:\r\n|\r|\n)/g, '<br>'));
                    formData.append('mainImage', this.inputFiles[0].image);
                    formData.append('subImage', this.inputFiles[1].image);
                    formData.append('popularDishesTitle', this.inputsPopularDishes[0].value);
                    formData.append('popularDishesDescription', this.textareasPopularDishes[0].value.replace(/(?:\r\n|\r|\n)/g, '<br>'));
                    const config = {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    };
                    const response = await axiosIntance.post('/api/admin/landingpage', formData, config)
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
                            this.loadingMessage = ''
                            this.errorMessage = error.response.data
                        }, 1000)
                    }, 900)
                }
            }
        },
        async getLandingPageData(){
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                };
                const response = await axiosIntance.get('/api/admin/landingpage', config)
                const res = await response.data
                if(res.length > 0){
                    this.inputs[0].value = res[0].mainTitle
                    this.textareas[0].value = res[0].mainDescription.replace(/(<br>)/g, '\n')
                    this.inputsPopularDishes[0].value = res[0].popularDishesTitle
                    this.textareasPopularDishes[0].value = res[0].popularDishesDescription.replace(/(<br>)/g, '\n')
                    if(res[0].mainImage != null) this.inputFiles[0].imagespreviews = `http://127.0.0.1:8000/images/${res[0].mainImage}`
                    if(res[0].subImage != null)  this.inputFiles[1].imagespreviews = `http://127.0.0.1:8000/images/${res[0].subImage}`
                }
            } catch (error) {
                console.log(error)
            }
        },
    }
}
</script>
<style scoped>
    article{
        width: 100% !important;
    }
</style>