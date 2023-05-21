<template>
    <article>
        <skeletoncard v-if="!statusLoad" />
        <template v-else>
            <div class="title">
                <p>Founders</p>
            </div>
            <div class="add-data">
                <router-link :to="{ name: 'founderadmincreate' }"><button>Add Founder <i
                            class="fa-solid fa-angle-right"></i></button></router-link>
            </div>
            <template v-if="founders.length > 0">
                <div class="founer-list">
                    <div class="card" @click="viewFounder(founder.id)" v-for="founder in founders">
                        <div class="profile">
                            <v-lazy-image :src="`http://127.0.0.1:8000/images/${founder.Profile}`"></v-lazy-image>
                        </div>
                        <div class="information">
                            <h4>{{ founder.Name }}</h4>
                            <p>{{ founder.Position }}</p>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else>
                <nodataComponent :nodataMessage="nodataMessage"></nodataComponent>
            </template>
        </template>
    </article>
</template>
<script>
import VLazyImage from "v-lazy-image";
import skeletoncard from './skeletonLoading/skeleton-card.vue'
import axiosIntance from '../../composable/axios.comp.js'
import nodataComponent from './reusable-forms/nodata.vue'
export default{
    data(){
        return {
            founders: [],
            statusLoad: false,
            nodataMessage: {
                title: 'Hurray!',
                description: 'No Data Prior'
            }
        }
    },
    components: {
        VLazyImage, skeletoncard, nodataComponent
    },
    created(){
        const promisigetFounder = this.getFounderData();
        Promise.all([promisigetFounder]).then(() => {
            setTimeout(() => {
                this.statusLoad = true
            }, 500)
        })
    },
    methods: {
        viewFounder(id){
            this.$router.push({ name: 'founderadminview', params: { founder: id } })
        },
        async getFounderData(){
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                };
                const response = await axiosIntance.get('/api/admin/founder', config)
                const res = await response.data
               if(res.length > 0) this.founders = res

            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style scoped>
    article {
        width: 100% !important;
    }
    .add-data{
        margin-top: 1.5em;
        text-align: right;
    }
    .add-data > a > button{
        background: var(--admin-main-blue-color);
        border: none;
        padding: 12px 15px;
        border-radius: 7px;
        width: auto;
        font-size: var(--wide-default-font-size);
        cursor: pointer;
        letter-spacing: 1.7px;
        color: var(--admin-primary-white-color);
        transition: all 0.5s ease-out;
    }
    .add-data > a > button:hover{
        color: var(--main-color-white);
        background: var(--admin-secondary-blue-color);
    }
    .founer-list{
        margin-top: 4em;
        display: grid;
        justify-content: space-between;
        grid-template-columns: 32% 32% 32%;
        gap: 20px 0;
    }
    .founer-list > *{
        background-image: linear-gradient(to top, var(--main-color-white), var(--main-color-white),  var(--main-color-white), var(--transparent-color-3));
        padding: 70px 20px;
        box-shadow: var(--main-box-shadow);
        border-radius: 15px;
        position: relative;
        cursor: pointer;
    }
    .founer-list > * > .profile{
        width: 90%;
        height: 150px;
        margin: auto;
        text-align: center;
        background: rgba(219, 133, 3, 0.3);
        border-radius: 66% 34% 52% 48% / 70% 56% 44% 30% ;
        position: relative;
    }
    .founer-list > * > .profile > img{
        width: 150px;
        height: 150px;
        object-fit: cover;
        border-radius: 50%;
        left: 50%;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .founer-list > * > .information{
        margin-top: 40px;
        text-align: center;
    }
    .founer-list > * > .information > h4{
        font-size: var( --wide-default-font-size);
        letter-spacing: 1px;
        color: var(--fourth-color-black);
        line-height: 1.3;
        text-align: center;
        font-weight: 700;
        white-space: nowrap;
    }
    .founer-list > * > .information > p{
        font-size: var( --mobile-default-font-size);
        letter-spacing: 1px;
        color: var(--main-color-yellow);
        line-height: 1.3;
        text-align: center;
        margin-top: 10px;
        white-space: nowrap;
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
    
</style>