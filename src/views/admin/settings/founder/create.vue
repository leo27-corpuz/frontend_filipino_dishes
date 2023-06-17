<template>
    <article>
        <skeleton v-if="!statusLoad" />
        <template v-else>
            <div class="back">
                <router-link :to="{ name: 'foundersadmin' }"><button><i
                    class="fa-solid fa-angle-left"></i>
                Back</button></router-link>
            </div>
            <div class="form-container">
                <form @submit.prevent="submit">
                    <titleformComponent title="Add Founder Form"></titleformComponent>
                    <inputWrap class="wrap-input merge">
                        <inputsComponent v-for="input in inputs" :input="input" :errormessage="errorData" class="merge-size"></inputsComponent>
                    </inputWrap>
                    <inputWrap class="wrap-textarea">
                        <textareaComponent :textarea="textareas" :errormessage="errorData"></textareaComponent> 
                    </inputWrap>
                    <inputWrap class="wrap-input-file">
                        <inputsFileComponent  :inputFile="inputFiles" :errormessage="errorData"></inputsFileComponent>
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
import inputWrap from '../../../../components/form/input-wrap.vue'
import inputsComponent from '../../../../components/form/inputs.vue'
import buttonsComponent from '../../../../components/form/buttons.vue'
import titleformComponent from '../../../../components/form/titleform.vue'
import textareaComponent from '../../../../components/form/textarea.vue'
import axiosIntance from '../../../../composable/axios.comp.js'
import skeleton from '../../../../components/admin/skeletonLoading/skeleton-form.vue'
import loadingCompoent from '../../../../components/essentials/loadingCompoent.vue'
import successPopup from '../../../../components/essentials/successPopup.vue'
import inputsFileComponent from '../../../../components/form/inputsFile.vue'
export default{
    data(){
        return {
            inputs: [
                {
                    type: 'text',
                    required: true,
                    label: 'Name',
                    placeholder: 'ex. leo corpuz',
                    value: '',
                    title: 'Name'
                },
                {
                    type: 'text',
                    required: true,
                    label: 'Position',
                    placeholder: 'ex. CEO',
                    value: '',
                    title: 'Position'
                },
            ],
            textareas: {
                label: 'Description',
                required: true,
                placeholder: 'Brief Founder Description',
                value: '',
                title: 'Description'
            },
            inputFiles: {
                label: 'Profile (attach Image here)',
                required: true,
                placeholder: 'image here',
                acceptedFile: ['.jpg', '.jpeg', '.png'],
                imagespreviews: '',
                image: '',
                title: 'Profile'
            },
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
    created() {
        setTimeout(() => {
            this.statusLoad = true
        }, 500)
    },
    emits :{
        successEmit: '', 
    },
    components: {
        inputsComponent, buttonsComponent, titleformComponent, skeleton, loadingCompoent, inputWrap, successPopup, inputsFileComponent, textareaComponent
    },
    methods: {
        async submit(){
            this.statusSubmit = !this.statusSubmit
            this.loadingMessage = 'Processing..'
            // if(!this.inputs[0].value || !this.textareas.value || !this.inputs[1].value || !this.inputFiles[0].imagespreviews){
            //    setTimeout(() => {
            //         this.statusSubmit = !this.statusSubmit
            //         setTimeout(() => {
            //             this.errorMessage = ''
            //             this.loadingMessage = ''
            //             this.errorMessage = 'Please Select All Fields'
            //         }, 1000)
            //    }, 900)
            // }
            // else {
                try {
                    const formData = new FormData();
                    formData.append('Name', this.inputs[0].value);
                    formData.append('Position', this.inputs[1].value);
                    formData.append('Description', this.textareas.value.replace(/(?:\r\n|\r|\n)/g, '<br>'))
                    formData.append('Profile', this.inputFiles.image);
                    const config = {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    };
                    const response = await axiosIntance.post('/api/admin/founder', formData, config)
                    let res = await response.data
                    setTimeout(() => {
                        this.statusSubmit = !this.statusSubmit
                        setTimeout(() => {
                            this.errorData = {}
                            this.loadingMessage = ''
                            this.$emit('successEmit', 'Successful')
                            if(this.buttonTitle.status === true){
                               this.inputs[0].value = ''
                                this.inputs[1].value = ''
                                this.textareas.value = ''
                                this.inputFiles.image = ''
                                this.inputFiles.imagespreviews = ''
                                this.buttonTitle.status = false
                                this.buttonTitle2.status = false
                            }else if(this.buttonTitle2.status === true){
                                this.buttonTitle.status = false
                                this.buttonTitle2.status = false
                                this.$router.push({ name: 'founderadminview', params: { founder: res.id } })
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
            // }
        },
        createandanother(){
            this.buttonTitle.status = true
        },
        createonce(){
            this.buttonTitle2.status = true
        }
    }
}
</script>
<style scoped>
    article {
        width: 100% !important;
    }
</style>