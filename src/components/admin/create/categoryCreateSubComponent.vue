<template>
    <article>
        <skeleton v-if="!statusLoad" />
        <template v-else>
            <div class="back">
                <router-link :to="{ name: 'categoryadmin' }"><button><i class="fa-solid fa-angle-left"></i>
                        Back</button></router-link>
            </div>
            <div class="form-container">
                <form @submit.prevent="submit">
                    <titleformComponent title="Add Category Form"></titleformComponent>
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
</template>
<script>
import inputsComponent from '../reusable-forms/inputs.vue'
import buttonsComponent from '../reusable-forms/buttons.vue'
import titleformComponent from '../reusable-forms/titleform.vue'
import textareaComponent from '../reusable-forms/textarea.vue'
import axiosIntance from '../../../composable/axios.comp.js'
import skeleton from '../skeletonLoading/skeleton-form.vue'
import loadingCompoent from '../../essentials/loadingCompoent.vue'
import errorList from '../../essentials/errorList.vue'
import successPopup from '../../essentials/successPopup.vue'
import inputsFileComponent from '../reusable-forms/inputsFile.vue'
export default {
    data() {
        return {
            inputs: [
                {
                    type: 'text',
                    required: true,
                    label: 'Title',
                    placeholder: 'ex. Breakfast',
                    value: ''
                },
            ],
            textareas: [
                {
                    label: 'Description',
                    required: true,
                    placeholder: 'Brief Category Description',
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
                    label: 'Sub Main Image (attach Image here)',
                    required: true,
                    placeholder: 'image here',
                    acceptedFile: ['.jpg', '.jpeg', '.png'],
                    imagespreviews: '',
                    image: ''
                },
                {
                    label: 'Sub Image 1 (attach Image here)',
                    required: true,
                    placeholder: 'image here',
                    acceptedFile: ['.jpg', '.jpeg', '.png'],
                    imagespreviews: '',
                    image: ''
                },
                {
                    label: 'Sub Image 2 (attach Image here)',
                    required: true,
                    placeholder: 'image here',
                    acceptedFile: ['.jpg', '.jpeg', '.png'],
                    imagespreviews: '',
                    image: ''
                },
            ],
            statusSubmit: false,
            buttonTitle: 'Create Category',
            errorMessage: '',
            loadingMessage: '',
            statusLoad: false,
        }
    },
    emits: {
        successEmit: '',
    },
    created() {
        setTimeout(() => {
            this.statusLoad = true
        }, 500)
    },
    components: {
        inputsComponent, buttonsComponent, titleformComponent, skeleton, loadingCompoent, errorList, successPopup, textareaComponent, inputsFileComponent
    },
    methods: {
        async submit() {
            this.statusSubmit = !this.statusSubmit
            this.errorMessage = ''
            this.loadingMessage = 'Processing..'
            try {
                const formData = new FormData();
                formData.append('Title', this.inputs[0].value);
                formData.append('Description', this.textareas[0].value.replace(/(?:\r\n|\r|\n)/g, '<br>'))
                formData.append('mainImage', this.inputFiles[0].image);
                formData.append('subMainImage', this.inputFiles[1].image);
                formData.append('subImage1', this.inputFiles[2].image);
                formData.append('subImage2', this.inputFiles[3].image);
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data'
                    }
                };
                const response = await axiosIntance.post('/api/admin/category', formData, config)
                let res = await response.data
                setTimeout(() => {
                    this.statusSubmit = !this.statusSubmit
                    setTimeout(() => {
                        this.errorMessage = ''
                        this.loadingMessage = ''
                        this.$emit('successEmit', 'Successful')
                        this.$router.push({ name: 'categoryadmin' })
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
}
</script>
<style scoped>
    article {
        width: 100% !important;
    }
</style>