<template>
    <section>
        <article>
            <skeleton v-if="!statusLoad" />
            <template v-else>
                <div class="title">
                    <p>Landing Page</p>
                </div>
                <div class="form-container">
                    <form @submit.prevent="submit">
                        <titleformComponent title="Home Page Form"></titleformComponent>
                        <inputWrap class="wrap-input">
                            <inputsComponent :input="inputs" :errormessage="errorData"></inputsComponent>
                        </inputWrap>
                        <inputWrap class="wrap-textarea">
                            <textareaComponent :textarea="textareas" :errormessage="errorData"></textareaComponent>
                        </inputWrap>
                        <inputWrap class="wrap-input-file">
                            <inputsFileComponent v-for="inputFile in inputFiles" :inputFile="inputFile"
                                :errormessage="errorData"></inputsFileComponent>
                        </inputWrap>
                        <inputWrap class="wrap-input">
                            <inputsComponent :input="inputsPopularDishes" :errormessage="errorData"></inputsComponent>
                        </inputWrap>
                        <inputWrap class="wrap-textarea">
                            <textareaComponent :textarea="textareasPopularDishes" :errormessage="errorData">
                            </textareaComponent>
                        </inputWrap>
                        <div class="btn-create-choice">
                            <buttonsComponent :statusSubmit="statusSubmit" :buttonTitle="buttonHomePage"></buttonsComponent>
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
        <transition name="slide-fade">
            <successPopup v-if="successMessage">
                <p class="successmessage">{{ successMessage }}</p>
            </successPopup>
        </transition>
    </section>
</template>
<script>
import inputWrap from '../../../../components/form/input-wrap.vue'
import inputsComponent from '../../../../components/form/inputs.vue'
import buttonsComponent from '../../../../components/form/buttons.vue'
import titleformComponent from '../../../../components/form/titleform.vue'
import textareaComponent from '../../../../components/form/textarea.vue'
import inputsFileComponent from '../../../../components/form/inputsFile.vue'
import axiosIntance from '../../../../composable/axios.comp.js'
import skeleton from '../../../../components/admin/skeletonLoading/skeleton-form.vue'
import loadingCompoent from '../../../../components/essentials/loadingCompoent.vue'
import successPopup from '../../../../components/essentials/successPopup.vue'
export default{
    data(){
        return {
            inputs: {
                type: 'text',
                label: 'Title',
                required: true,
                placeholder: 'Title of the Homepage',
                value: '',
                title: 'mainTitle'
            },
            textareas: {
                label: 'Description',
                required: true,
                placeholder: 'Description of the Homepage',
                value: '',
                title: 'popularDishesTitle'
            },
            inputFiles: [
                {
                    label: 'Main Image (attach Image here)',
                    required: true,
                    placeholder: 'image here',
                    acceptedFile: ['.jpg', '.jpeg', '.png'],
                    imagespreviews: '',
                    image: '',
                    title: 'mainImage',
                },
                {
                    label: 'Sub Image (attach Image here)',
                    required: true,
                    placeholder: 'image here',
                    acceptedFile: ['.jpg', '.jpeg', '.png'],
                    imagespreviews: '',
                    image: '',
                    title: 'subImage'
                }
            ],
            inputsPopularDishes: {
                type: 'text',
                required: true,
                label: 'Title',
                placeholder: 'Popular Filipino Dishes',
                value: '',
                title: 'mainDescription'
            },
            textareasPopularDishes: {
                label: 'Description',
                required: true,
                placeholder: 'Description of the Popular Filipino Dishes',
                value: '',
                title: 'popularDishesDescription'
            },
            statusSubmit: false,
            buttonHomePage: 'Submit',
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
            this.loadingMessage = 'Processing..'
            // let errorMessage = {};
            // let objectData = {
            //     mainImage: this.inputFiles[0].imagespreviews,
            //     subImage: this.inputFiles[1].imagespreviews,
            //     mainTitle: this.inputs.value,
            //     popularDishesTitle: this.textareas.value,
            //     mainDescription: this.inputsPopularDishes.value,
            //     popularDishesDescription: this.textareasPopularDishes.value
            // }
            // for (let key in objectData) {
            //     if(objectData[key] === ''){
            //         errorMessage[key] = `${key} is required`;
            //     }
            // }
            // if(Object.entries(errorMessage).length !== 0){
            //    setTimeout(() => {
            //         this.statusSubmit = !this.statusSubmit
            //         setTimeout(() => {
            //             this.loadingMessage = ''
            //             this.errorData = errorMessage
            //         }, 1000)
            //    }, 900)
            // }
            // else{
                try {
                    const formData = new FormData();
                    formData.append('mainTitle', this.inputs.value);
                    formData.append('mainDescription', this.textareas.value.replace(/(?:\r\n|\r|\n)/g, '<br>'));
                    formData.append('mainImage', this.inputFiles[0].image);
                    formData.append('subImage', this.inputFiles[1].image);
                    formData.append('popularDishesTitle', this.inputsPopularDishes.value);
                    formData.append('popularDishesDescription', this.textareasPopularDishes.value.replace(/(?:\r\n|\r|\n)/g, '<br>'));
                    const config = {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    };
                    const response = await axiosIntance.post('/api/admin/landingpage', formData, config)
                    let res = await response.data
                    setTimeout(() => {
                        this.statusSubmit = !this.statusSubmit
                        setTimeout(() => {
                            this.errorData = {}
                            this.loadingMessage = ''
                            this.successMessage = 'Successful'
                            this.inputs.value = res.mainTitle
                            this.textareas.value = res.mainDescription.replace(/(<br>)/g, '\n')
                            this.inputsPopularDishes.value = res.popularDishesTitle
                            this.textareasPopularDishes.value = res.popularDishesDescription.replace(/(<br>)/g, '\n')
                            if(res.mainImage != null) {
                                this.inputFiles[0].imagespreviews = `http://127.0.0.1:8000/images/${res.mainImage}`
                                this.inputFiles[0].image = {
                                    name: res.mainImage
                                }
                            }
                            if(res.subImage != null)  {
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
                            this.loadingMessage = ''
                            this.errorData = error.response.data
                        }, 1000)
                    }, 900)
                }
            // }
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
                    this.inputs.value = res[0].mainTitle
                    this.textareas.value = res[0].mainDescription.replace(/(<br>)/g, '\n')
                    this.inputsPopularDishes.value = res[0].popularDishesTitle
                    this.textareasPopularDishes.value = res[0].popularDishesDescription.replace(/(<br>)/g, '\n')
                    if(res[0].mainImage != null) {
                        this.inputFiles[0].imagespreviews = `http://127.0.0.1:8000/images/${res[0].mainImage}`
                        this.inputFiles[0].image = {
                            name: res[0].mainImage
                        }
                    }
                    if(res[0].subImage != null)  {
                        this.inputFiles[1].imagespreviews = `http://127.0.0.1:8000/images/${res[0].subImage}`
                        this.inputFiles[1].image = {
                            name: res[0].subImage
                        }
                    }
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