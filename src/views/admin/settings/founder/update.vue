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
</template>
<script>
import inputWrap from '../../../../components/form/input-wrap.vue'
import inputsComponent from '../../../../components/form/inputs.vue'
import buttonsComponent from '../../../../components/form/buttons.vue'
import titleformComponent from '../../../../components/form/titleform.vue'
import axiosIntance from '../../../../composable/axios.comp.js'
import textareaComponent from '../../../../components/form/textarea.vue'
import skeleton from '../../../../components/admin/skeletonLoading/skeleton-form.vue'
import loadingCompoent from '../../../../components/essentials/loadingCompoent.vue'
import successPopup from '../../../../components/essentials/successPopup.vue'
import inputsFileComponent from '../../../../components/form/inputsFile.vue'
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
            buttonTitle: 'Update',
            errorData: {},
            loadingMessage: '',
            statusLoad: false,
        }
    },
    emits: {
        successEmit: '',
    },
    components: {
        inputsComponent, buttonsComponent, titleformComponent, skeleton, loadingCompoent, textareaComponent, successPopup, inputsFileComponent, inputWrap
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
                this.textareas.value = res.Description.replace(/(<br>)/g, '\n')
                this.inputFiles.imagespreviews = `http://127.0.0.1:8000/images/${res.Profile}`
                this.inputFiles.image = {
                    name: res.Profile
                }
            } catch (error) {
                this.$router.push('/admin')
            }
        },
        async update() {
            this.statusSubmit = !this.statusSubmit
            this.loadingMessage = 'Processing..'
            // if (!this.inputs[0].value || !this.textareas[0].value || !this.inputs[1].value || !this.inputFiles[0].imagespreviews) {
            //     setTimeout(() => {
            //         this.statusSubmit = !this.statusSubmit
            //         setTimeout(() => {
            //             this.errorMessage = ''
            //             this.loadingMessage = ''
            //             this.errorMessage = 'Please Select All Fields'
            //         }, 1000)
            //     }, 900)
            // }
            // else {
                try {
                    const formData = new FormData();
                    formData.append('id', this.founderId);
                    formData.append('Name', this.inputs[0].value);
                    formData.append('Description', this.textareas.value.replace(/(?:\r\n|\r|\n)/g, '<br>'))
                    formData.append('Position', this.inputs[1].value);
                    formData.append('Profile', this.inputFiles.image);
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
                            this.errorData = {}
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
                            this.errorData = error.response.data
                        }, 1000)
                    }, 900)
                }
            }
        // }
    }
}
</script>
<style scoped>
    article {
        width: 100% !important;
    }
</style>