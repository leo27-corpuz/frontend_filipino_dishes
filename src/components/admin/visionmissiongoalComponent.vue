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
                    <inputsComponent :inputs="inputVision"></inputsComponent>
                    <textareaComponent :textareas="textareasVision"></textareaComponent>
                    <inputsComponent :inputs="inputMission"></inputsComponent>
                    <textareaComponent :textareas="textareasMission"></textareaComponent>
                    <inputsComponent :inputs="inputGoal"></inputsComponent>
                    <textareaComponent :textareas="textareasGoal"></textareaComponent>
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
            // //vision, mission and goal
            inputVision: [
                {
                    type: 'text',
                    label: 'Vision',
                    required: true,
                    placeholder: 'Title',
                    value: ''
                },
            ],
            textareasVision: [
                {
                    label: 'Description Vision',
                    required: true,
                    placeholder: 'Vision',
                    value: ''
                },
            ],
            inputMission: [
                {
                    type: 'text',
                    label: 'Mission',
                    required: true,
                    placeholder: 'Title',
                    value: ''
                },
            ],
            textareasMission: [
                {
                    label: 'Description Mission',
                    required: true,
                    placeholder: 'Mission',
                    value: ''
                },
            ],
            inputGoal: [
                {
                    type: 'text',
                    label: 'Goal',
                    required: true,
                    placeholder: 'Title',
                    value: ''
                },
            ],
            textareasGoal: [
                {
                    label: 'Description Goal',
                    required: true,
                    placeholder: 'Goal',
                    value: ''
                },
            ],
            statusSubmitVMG: false,
            aboutUsVMGBtn: 'Submit',
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
            this.errorMessage = ''
            this.loadingMessage = 'Processing..'
            try {
                const formData = new FormData();
                formData.append('VisionTitle', this.inputVision[0].value);
                formData.append('VisionDescription', this.textareasVision[0].value.replace(/(?:\r\n|\r|\n)/g, '<br>'));
                formData.append('MissionTitle', this.inputMission[0].value);
                formData.append('MissionDescription', this.textareasMission[0].value.replace(/(?:\r\n|\r|\n)/g, '<br>'));
                formData.append('GoalTitle', this.inputGoal[0].value);
                formData.append('GoalDescription', this.textareasGoal[0].value.replace(/(?:\r\n|\r|\n)/g, '<br>'));
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
                    this.statusSubmitVMG = !this.statusSubmitVMG
                    setTimeout(() => {
                        this.loadingMessage = ''
                        this.errorMessage = error.response.data
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
                    this.inputVision[0].value = res[0].VisionTitle
                    this.textareasVision[0].value = res[0].VisionDescription.replace(/(<br>)/g, '\n')
                    this.inputMission[0].value = res[0].MissionTitle
                    this.textareasMission[0].value = res[0].MissionDescription.replace(/(<br>)/g, '\n')
                    this.inputGoal[0].value = res[0].GoalTitle
                    this.textareasGoal[0].value = res[0].GoalDescription.replace(/(<br>)/g, '\n')
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