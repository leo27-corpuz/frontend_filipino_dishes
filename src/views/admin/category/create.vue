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
                    <inputWrap class="wrap-input merge">
                        <inputsComponent :input="inputs" :errormessage="errorData" class="merge-size"></inputsComponent>
                    </inputWrap>
                    <inputWrap class="wrap-textarea">
                        <textareaComponent :textarea="textareas" :errormessage="errorData"></textareaComponent> 
                    </inputWrap>
                    <inputWrap class="wrap-input-file">
                        <inputsFileComponent v-for="inputFile in inputFiles" :inputFile="inputFile" :errormessage="errorData"></inputsFileComponent>
                    </inputWrap>
                   <div class="btn-create-choice">
                        <buttonsComponent :statusSubmit="statusSubmit" @click="createandanother" :buttonTitle="buttonTitle.title"></buttonsComponent>
                        <buttonsComponent :statusSubmit="statusSubmit" @click="createonce" :buttonTitle="buttonTitle2.title"></buttonsComponent>
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
</template>
<script>
import inputWrap from '../../../components/form/input-wrap.vue'
import inputsComponent from '../../../components/form/inputs.vue'
import buttonsComponent from '../../../components/form/buttons.vue'
import titleformComponent from '../../../components/form/titleform.vue'
import textareaComponent from '../../../components/form/textarea.vue'
import axiosIntance from '../../../composable/axios.comp.js'
import skeleton from '../../../components/admin/skeletonLoading/skeleton-form.vue'
import loadingCompoent from '../../../components/essentials/loadingCompoent.vue'
import successPopup from '../../../components/essentials/successPopup.vue'
import inputsFileComponent from '../../../components/form/inputsFile.vue'
export default {
    data() {
        return {
            inputs: {
                type: 'text',
                required: true,
                label: 'Title',
                placeholder: 'ex. Breakfast',
                value: '',
                title: 'Title'
            },
            textareas: {
                label: 'Description',
                required: true,
                placeholder: 'Brief Category Description',
                value: '',
                title: 'Description'
            },
            inputFiles: [
                {
                    label: 'Main Image (attach Image here)',
                    required: true,
                    placeholder: 'image here',
                    acceptedFile: ['.jpg', '.jpeg', '.png'],
                    imagespreviews: '',
                    image: '',
                    title: 'mainImage'
                },
                {
                    label: 'Sub Main Image (attach Image here)',
                    required: true,
                    placeholder: 'image here',
                    acceptedFile: ['.jpg', '.jpeg', '.png'],
                    imagespreviews: '',
                    image: '',
                    title: 'subMainImage'
                },
                {
                    label: 'Sub Image 1 (attach Image here)',
                    required: true,
                    placeholder: 'image here',
                    acceptedFile: ['.jpg', '.jpeg', '.png'],
                    imagespreviews: '',
                    image: '',
                    title: 'subImage1'
                },
                {
                    label: 'Sub Image 2 (attach Image here)',
                    required: true,
                    placeholder: 'image here',
                    acceptedFile: ['.jpg', '.jpeg', '.png'],
                    imagespreviews: '',
                    image: '',
                    title: 'subImage2'
                },
            ],
            statusSubmit: false,
            buttonTitle: {
                status: false,
                title: 'Create & Add Another'
            },
            buttonTitle2: {
                status: false,
                title: 'Create Once'
            },
            errorData: {},
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
        inputsComponent, buttonsComponent, titleformComponent, skeleton, loadingCompoent, successPopup, textareaComponent, inputsFileComponent, inputWrap
    },
    methods: {
        async submit() {
            this.statusSubmit = !this.statusSubmit
            this.loadingMessage = 'Processing..'
            try {
                const formData = new FormData();
                formData.append('Title', this.inputs.value);
                formData.append('Description', this.textareas.value.replace(/(?:\r\n|\r|\n)/g, '<br>'))
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
                await response.data
                setTimeout(() => {
                    this.statusSubmit = !this.statusSubmit
                    setTimeout(() => {
                        this.errorData = {}
                        this.loadingMessage = ''
                        this.$emit('successEmit', 'Successful')
                        if(this.buttonTitle.status === true){
                            this.inputFiles.forEach(data => {
                                data.image = ''
                                data.imagespreviews = ''
                            });
                            this.inputs.value = ''
                            this.textareas.value = ''
                            this.buttonTitle.status = false
                            this.buttonTitle2.status = false
                        }else if(this.buttonTitle2.status === true){
                            this.buttonTitle.status = false
                            this.buttonTitle2.status = false
                            this.$router.push({ name: 'categoryadmin' })
                        }
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
        createandanother(){
            this.buttonTitle.status = true
        },
        createonce(){
            this.buttonTitle2.status = true
        }
    },
}
</script>
<style scoped>
    article {
        width: 100% !important;
    }
</style>