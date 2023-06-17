<template>
    <article>
        <skeleton v-if="!statusLoad" />
        <template v-else>
            <div class="title">
                <p>VMG</p>
            </div>
            <div class="form-container">
                <form @submit.prevent="submit">
                    <titleformComponent title="Our Vision, Mission and Goal Form"></titleformComponent>
                    <inputWrap class="wrap-input">
                        <inputsComponent :input="inputVision" :errormessage="errorData"></inputsComponent>
                    </inputWrap>
                    <inputWrap class="wrap-textarea">
                        <textareaComponent :textarea="textareasVision" :errormessage="errorData"></textareaComponent> 
                    </inputWrap>
                    <inputWrap class="wrap-input">
                        <inputsComponent :input="inputMission" :errormessage="errorData"></inputsComponent>
                    </inputWrap>
                    <inputWrap class="wrap-textarea">
                        <textareaComponent :textarea="textareasMission" :errormessage="errorData"></textareaComponent> 
                    </inputWrap>
                    <inputWrap class="wrap-input">
                        <inputsComponent :input="inputGoal" :errormessage="errorData"></inputsComponent>
                    </inputWrap>
                    <inputWrap class="wrap-textarea">
                        <textareaComponent :textarea="textareasGoal" :errormessage="errorData"></textareaComponent> 
                    </inputWrap>
                    <buttonsComponent :statusSubmit="statusSubmitVMG" :buttonTitle="aboutUsVMGBtn"></buttonsComponent>
                </form>
            </div>
        </template>
    </article>
    <transition name="slide-fade">
        <loadingCompoent v-if="statusSubmitVMG">
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
import inputsComponent from '../form/inputs.vue'
import buttonsComponent from '../form/buttons.vue'
import titleformComponent from '../form/titleform.vue'
import textareaComponent from '../form/textarea.vue'
import inputsFileComponent from '../form/inputsFile.vue'
import axiosIntance from '../../composable/axios.comp.js'
import skeleton from './skeletonLoading/skeleton-form.vue'
import loadingCompoent from '../essentials/loadingCompoent.vue'
import successPopup from '../essentials/successPopup.vue'
import inputWrap from '../form/input-wrap.vue'
export default{
    data(){
        return {
            // //vision, mission and goal
            inputVision: {
                type: 'text',
                label: 'Vision',
                required: true,
                placeholder: 'Title',
                value: '',
                title: 'VisionTitle'
            },
            textareasVision: {
                label: 'Description Vision',
                required: true,
                placeholder: 'Vision',
                value: '',
                title: 'VisionDescription'
            },
            inputMission: {
                type: 'text',
                label: 'Mission',
                required: true,
                placeholder: 'Title',
                value: '',
                title: 'MissionTitle'
            },
            textareasMission: {
                label: 'Description Mission',
                required: true,
                placeholder: 'Mission',
                value: '',
                title: 'MissionDescription'
            },
            inputGoal: {
                type: 'text',
                label: 'Goal',
                required: true,
                placeholder: 'Title',
                value: '',
                title: 'GoalTitle'
            },
            textareasGoal: {
                label: 'Description Goal',
                required: true,
                placeholder: 'Goal',
                value: '',
                title: 'GoalDescription'
            },
            statusSubmitVMG: false,
            aboutUsVMGBtn: 'Submit',
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
        const promisigetVMG = this.getVMGDdata();
        Promise.all([promisigetVMG]).then(() => {
            setTimeout(() => {
                this.statusLoad = true
            }, 500)
        })
    },
    methods: {
        async submit(){
            this.statusSubmitVMG = !this.statusSubmitVMG
            this.loadingMessage = 'Processing..'
            try {
                const formData = new FormData();
                formData.append('VisionTitle', this.inputVision.value);
                formData.append('VisionDescription', this.textareasVision.value.replace(/(?:\r\n|\r|\n)/g, '<br>'));
                formData.append('MissionTitle', this.inputMission.value);
                formData.append('MissionDescription', this.textareasMission.value.replace(/(?:\r\n|\r|\n)/g, '<br>'));
                formData.append('GoalTitle', this.inputGoal.value);
                formData.append('GoalDescription', this.textareasGoal.value.replace(/(?:\r\n|\r|\n)/g, '<br>'));
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                };
                const response = await axiosIntance.post('/api/admin/visionmissiongoal', formData, config)
                await response.data
                setTimeout(() => {
                    this.statusSubmitVMG = !this.statusSubmitVMG
                    setTimeout(() => {
                        this.errorData = {}
                        this.loadingMessage = ''
                        this.successMessage = 'Successful'
                        setTimeout(() => {
                            this.successMessage = ''
                        }, 3000)
                    }, 1000)
                }, 900)
            } catch (error) {
                setTimeout(() => {
                    this.statusSubmitVMG = !this.statusSubmitVMG
                    setTimeout(() => {
                        this.loadingMessage = ''
                        this.errorData = error.response.data
                    }, 1000)
                }, 900)
            }
        },
        async getVMGDdata(){
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                };
                const response = await axiosIntance.get('/api/admin/visionmissiongoal', config)
                const res = await response.data
                if(res.length > 0){
                    this.inputVision.value = res[0].VisionTitle
                    this.textareasVision.value = res[0].VisionDescription.replace(/(<br>)/g, '\n')
                    this.inputMission.value = res[0].MissionTitle
                    this.textareasMission.value = res[0].MissionDescription.replace(/(<br>)/g, '\n')
                    this.inputGoal.value = res[0].GoalTitle
                    this.textareasGoal.value = res[0].GoalDescription.replace(/(<br>)/g, '\n')
                }
            } catch (error) {
                console.log(error)
            }
        }
    },
}
</script>
<style scopedc>
article {
    width: 100% !important;
}
</style>