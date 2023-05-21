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
                <form @submit.prevent="update">
                    <titleformComponent title="Update Founder Form"></titleformComponent>
                    <inputsComponent :inputs="inputs" class="merge"></inputsComponent>
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
import axiosIntance from '../../../composable/axios.comp.js'
import textareaComponent from '../reusable-forms/textarea.vue'
import skeleton from '../skeletonLoading/skeleton-form.vue'
import loadingCompoent from '../../essentials/loadingCompoent.vue'
import errorList from '../../essentials/errorList.vue'
import successPopup from '../../essentials/successPopup.vue'
import inputsFileComponent from '../reusable-forms/inputsFile.vue'
export default {
    props: ['founder'],
    data() {
        return {
            founderId: this.$route.params.founder,
            inputs: [
                {
                    type: 'text',
                    required: true,
                    label: 'Name',
                    placeholder: 'ex. leo corpuz',
                    value: ''
                },
                {
                    type: 'text',
                    required: true,
                    label: 'Position',
                    placeholder: 'ex. CEO',
                    value: ''
                },
            ],
            textareas: [
                {
                    label: 'Description',
                    required: true,
                    placeholder: 'Brief Founder Description',
                    value: ''
                },
            ],
            inputFiles: [
                {
                    label: 'Profile (attach Image here)',
                    required: true,
                    placeholder: 'image here',
                    acceptedFile: ['.jpg', '.jpeg', '.png'],
                    imagespreviews: '',
                    image: ''
                },
            ],
            statusSubmit: false,
            buttonTitle: 'Update',
            errorMessage: '',
            loadingMessage: '',
            statusLoad: false,
        }
    },
    emits: {
        successEmit: '',
    },
    components: {
        inputsComponent, buttonsComponent, titleformComponent, skeleton, loadingCompoent, textareaComponent, errorList, successPopup, inputsFileComponent
    },
    created() {
        const promisigetDataFounder = this.getDataFounder();
        Promise.all([promisigetDataFounder]).then(() => {
            setTimeout(() => {
                this.statusLoad = true
            }, 500)
        })
    },
    methods: {
        async getDataFounder() {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                };
                const response = await axiosIntance.get(`/api/admin/founder/update/${this.founderId}`, config)
                const res = await response.data
                this.inputs[0].value = res.Name
                this.inputs[1].value = res.Position
                this.textareas[0].value = res.Description.replace(/(<br>)/g, '\n')
                this.inputFiles[0].imagespreviews = `http://127.0.0.1:8000/images/${res.Profile}`
            } catch (error) {
                this.$router.push('/admin')
            }
        },
        async update() {
            this.statusSubmit = !this.statusSubmit
            this.errorMessage = ''
            this.loadingMessage = 'Processing..'
            if (!this.inputs[0].value || !this.textareas[0].value || !this.inputs[1].value || !this.inputFiles[0].imagespreviews) {
                setTimeout(() => {
                    this.statusSubmit = !this.statusSubmit
                    setTimeout(() => {
                        this.errorMessage = ''
                        this.loadingMessage = ''
                        this.errorMessage = 'Please Select All Fields'
                    }, 1000)
                }, 900)
            }
            else {
                try {
                    const formData = new FormData();
                    formData.append('id', this.founderId);
                    formData.append('Name', this.inputs[0].value);
                    formData.append('Description', this.textareas[0].value.replace(/(?:\r\n|\r|\n)/g, '<br>'))
                    formData.append('Position', this.inputs[1].value);
                    formData.append('Profile', this.inputFiles[0].image);
                    const config = {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    };
                    const response = await axiosIntance.put('/api/admin/founder/update', formData, config)
                    let res = await response.data
                    setTimeout(() => {
                        this.statusSubmit = !this.statusSubmit
                        setTimeout(() => {
                            this.errorMessage = ''
                            this.loadingMessage = ''
                            this.$emit('successEmit', 'Successful')
                            this.$router.push({ name: 'founderadminview', params: { founder: res.id } })
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
        }
    }
}
</script>
<style scoped>
    article {
        width: 100% !important;
    }
</style>