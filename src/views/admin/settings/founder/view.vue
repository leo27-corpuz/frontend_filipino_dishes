<template>
    <article>
        <skeleton v-if="!statusLoad"></skeleton>
        <template v-else>
            <transition>
                <div class="deletion-container" v-show="deletionStatus" @click="handleClick">
                    <transition name="bounce">
                        <form @submit.prevent="deleteProcess"  v-show="deletionStatus" ref="form">
                            <deleteForm :deletion="deletion" @cancel="cancel" ></deleteForm>
                        </form>
                    </transition>
                </div>
            </transition>
            <div class="back">
                <router-link :to="{ name: 'foundersadmin' }"><button><i
                    class="fa-solid fa-angle-left"></i>
                Back</button></router-link>
            </div>
            <div class="founder-view-container">
                <div class="founder-col-img">
                    <div class="img">
                        <v-lazy-image :src="`http://127.0.0.1:8000/images/${founderData.Profile}`"></v-lazy-image>
                    </div>
                </div>
                <div class="founder-col">
                    <div class="title">
                        <p>Name: </p>
                    </div>
                    <div class="content">
                        <p>{{ founderData.Name }}</p>
                    </div>
                </div>
                <hr>
                <div class="founder-col">
                    <div class="title">
                        <p>Position: </p>
                    </div>
                    <div class="content">
                        <p>{{ founderData.Position }}</p>
                    </div>
                </div>
                <hr>
                <div class="founder-col">
                    <div class="title">
                        <p>Description: </p>
                    </div>
                    <div class="content">
                        <p v-html="founderData.Description"></p>
                    </div>
                </div>
                <hr>
                <div class="founder-col-btn">
                    <button @click="deletePopup"><i class="fa-solid fa-trash"></i> <span>Delete</span></button>
                    <button @click="updateFounder(founderData.id)"><i class="fa-solid fa-pen"></i> <span>Update</span></button>
                </div>
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
import axiosIntance from '../../../../composable/axios.comp.js'
import VLazyImage from "v-lazy-image";
import skeleton from '../../../../components/admin/skeletonLoading/skeleton-view.vue'
import deleteForm from '../../../../components/form/deletionPopup.vue'
import loadingCompoent from '../../../../components/essentials/loadingCompoent.vue'
import errorList from '../../../../components/essentials/errorList.vue'
export default{
    data() {
        return{
            deletion: {
                title: "You're about to delete this founder data",
                description: "Before deleting the information in the form, please ensure that you have reviewed it thoroughly and confirmed that all the necessary details have been recorded accurately.",
                btnStatus: false,
                idValueToDelete: []
            },
            founderId: this.$route.params.founder,
            founderData: {},
            statusLoad: false,
            deletionStatus: false,
            errorMessage: '',
            loadingMessage: '',
            statusSubmit: false,
            disabledCloseDeleteForm: false
        }
    },
    props: ['founder'],
    emits: {
        successEmit: '', 
    },
    components: {
        VLazyImage, skeleton, deleteForm, errorList, loadingCompoent
    },
    created(){
        const promisigetDataFounder = this.getDataFounder();
        Promise.all([promisigetDataFounder]).then(() => {
            setTimeout(() => {
                this.statusLoad = true
            }, 500)
        })
    },
    mounted(){
        document.addEventListener('click', this.handleClick())
    },
    methods: {
        async getDataFounder(){
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                };
                const response = await axiosIntance.get(`/api/admin/founder/update/${this.founderId}`, config)
                const res = await response.data
                this.founderData = res
            } catch (error) {
                this.$router.push('/admin')
            }
        },
        updateFounder(id){
            this.$router.push({ name: 'founderadminupdate', params: { founder: id } })
        },
        deletePopup(){
            this.deletionStatus = !this.deletionStatus
        },
        cancel(){
            if(this.disabledCloseDeleteForm === false){
                this.deletionStatus = !this.deletionStatus
            }
        },
        handleClick(){
            let form = this.$refs.form
            if(form && this.disabledCloseDeleteForm === false){
                if( !form.contains(event.target)){
                    this.deletionStatus = false
                }
            }
        },
        async deleteProcess(){
            this.deletion.btnStatus = true
            this.deletion.idValueToDelete = this.founderData.id
            this.statusSubmit = !this.statusSubmit
            this.errorMessage = ''
            this.loadingMessage = 'Processing..'
            this.disabledCloseDeleteForm = true
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                };
                const response = await axiosIntance.delete(`/api/admin/founder/delete/${this.deletion.idValueToDelete}`, config)
                let res = await response.data
                if(res){
                    setTimeout(() => {
                        this.statusSubmit = !this.statusSubmit
                        setTimeout(() => {
                            this.errorMessage = ''
                            this.loadingMessage = ''
                            this.$emit('successEmit', 'Successful')
                            this.disabledCloseDeleteForm = false
                            this.$router.push({ name: 'foundersadmin'})
                        }, 1000)
                    }, 900)
                }
            } catch (error) {
                setTimeout(() => {
                    this.statusSubmit = !this.statusSubmit
                    setTimeout(() => {
                        this.loadingMessage = ''
                        this.errorMessage = error.response.data
                        this.disabledCloseDeleteForm = false
                    }, 1000)
                }, 900)
            }
        },
    }
}
</script>
<style scoped>
    article {
        width: 100% !important;
    }
    .founder-view-container{
        width: 100%;
        margin-top: 2em;
        background: var(--main-color-white);
        box-shadow: var(--main-box-shadow);
        border-radius: 10px;
        padding: 20px 30px;
    }
    .founder-col {
        width: 100%;
        display: flex;
        flex-direction: row;
        grid-gap: 10px;
        padding: 15px 10px;
    }
    .founder-col > :nth-child(1){
        width: 20%;
    }
    .founder-col > :nth-child(1) > p{
        font-size: var( --wide-default-font-size);
        letter-spacing: 1.2px;
        color: var(--third-color-black);
        letter-spacing: 1px;
        font-weight: 600;
    }
    .founder-col > :nth-child(2){
        width: 80%;
    }
    .founder-col > :nth-child(2) > p{
        font-size: var( --ipad-default-font-size);
        letter-spacing: 1px;
        color: var(--third-color-black);
        line-height: 1.5;
    }
    .founder-col-img{
        width: 100%;
    }
    .founder-col-img  > .img{
        text-align: center;
        margin: 1em 0 1em 0;
    }
    .founder-col-img > .img > img{
        margin: auto;
        width: 150px;
        height: 150px;
        object-fit: cover;
        border-radius: 50%;
        border: solid 3px var(--admin-secondary-blue-color);
        z-index: 0;
    }
    hr{
        border: none;
        height: 0.5px;
        margin: 15px 0;
        border-radius: 20px;
        width: 100%;
        background-color: var(--transparent-color-4);
    }
    .founder-col-btn {
        width: 100%;
        padding: 15px 0;
        text-align: right;
    }
    .founder-col-btn  > * {
        background: var(--main-background-color);
        box-shadow: var(--main-box-shadow);
        border: none;
        padding: 12px 15px;
        border-radius: 7px;
        width: auto;
        font-size: var(--ipad-default-font-size);
        cursor: pointer;
        font-weight: 600;
        letter-spacing: 1.7px;
        color: var(--admin-secondary-blue-color);
        transition: all 0.5s ease-in-out;
    }
    .founder-col-btn  > *:hover{
        transform: translateY(-2px);
    }
    .founder-col-btn  > :nth-child(1){
        margin-right: 15px;
    }
    .v-lazy-image {
        background: #eee;
        background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
        border-radius: 5px;
        background-size: 200% 100%;
        animation: 1.5s shine linear infinite;
    }
    .v-lazy-image-loaded {
        background: none !important;
        animation:  blur-effect 2s normal forwards ease-in-out !important;
    }
    .v-enter-active,
    .v-leave-active {
        transition: opacity 0.5s ease;
    }

    .v-enter-from,
    .v-leave-to {
        opacity: 0;
    }
    
</style>