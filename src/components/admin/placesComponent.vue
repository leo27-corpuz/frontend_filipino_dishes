<template>
    <article>
        <template v-if="!statusLoad">
            <skeletonTableHeaders></skeletonTableHeaders>
            <skeletonTable></skeletonTable>
        </template>
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
            <div class="title">
                <p>Places</p>
            </div>
            <div class="search-table">
                <form @submit.prevent="SearchForm">
                    <searchTable :searchData="searchData" v-debounce:1000ms="SearchFunction" @deleteSearch="deleteSearch">
                    </searchTable>
                </form>
                <div class="add-data">
                    <router-link :to="{ name: 'categoryadmincreate' }"><button>Add Place <i
                                class="fa-solid fa-angle-right"></i></button></router-link>
                </div>
            </div>
            <nodataComponent v-if="pagination.totalPages < 1 && tableDataBody.length == 0" :nodataMessage="nodataMessage2">
            </nodataComponent>
            <nodataComponent v-else-if="statusForNodataPrior" :nodataMessage="nodataMessage">
                <br>
                <router-link :to="{name: 'placesadmin', query: {page: 1}}" class="backtopage1">Back To Page 1</router-link>
            </nodataComponent>
            <div class="main-table" v-else>
                <skeletonTable v-if="!statusTableLoad"></skeletonTable>
                <template v-else>
                    <tableHeader :SearchQuery="SearchQuery.search == '' ? {} : SearchQuery" :tableHeader="tableHeader"
                        :pageName="pageName" :currentPage="pagination.currentPage"
                        :currentLimit="pagination.pageLimitColumn"
                        :SortedQuery="SortedQuery == '' ? {} : SortedQuery"></tableHeader>
                    <table class="table">
                        <tableNav :SearchQuery="SearchQuery.search == '' ? {} : SearchQuery" :tableNavDatas="tableNavDatas"
                            :pageName="pageName" :LimitQuery="LimitQuery.limit == '' ? {} : LimitQuery"
                            :currentPage="pagination.currentPage">
                        </tableNav>
                        <tableBody>
                            <tablebodytr v-for="tableData in tableDataBody">
                                <tablebodytrtdcheckbtn></tablebodytrtdcheckbtn>
                                <tablebodytrtd v-for="data in tableData" :tdData="data"></tablebodytrtd>
                                <tablebodytrydbtns>
                                    <tablebodytrydvtbslist icon="fa-solid fa-trash" tip="Delete" @click="DeleteData(tableData.id)"></tablebodytrydvtbslist>
                                    <tablebodytrydvtbslist icon="fa-solid fa-pen-to-square" tip="Update" @click="UpateData(tableData.id)"></tablebodytrydvtbslist>
                                    <tablebodytrydvtbslist icon="fa-solid fa-eye" tip="View" @click="ViewData(tableData.id)"></tablebodytrydvtbslist>
                                </tablebodytrydbtns>
                            </tablebodytr>
                        </tableBody>
                    </table>
                    <tableFooter :SearchQuery="SearchQuery.search == '' ? {} : SearchQuery" :pagination="pagination"
                        :pageName="pageName" :LimitQuery="LimitQuery.limit == '' ? {} : LimitQuery"
                        :SortedQuery="SortedQuery == '' ? {} : SortedQuery"></tableFooter>
                </template>
            </div>
        </template>
    </article> 
</template>
<script>
import skeletonTable from './skeletonLoading/skeleton-table.vue'
import skeletonTableHeaders from './skeletonLoading/skeleton-table-headers.vue'
import axios from 'axios';
import axiosIntance from '../../composable/axios.comp.js'
import searchTable from '../table/search_table.vue'
import nodataComponent from '../form/nodata.vue'
import tableHeader from '../table/tableHeader.vue'
import tableNav from '../table/tableNav.vue'
import tableBody from '../table/tableBody.vue'
import tablebodytr from '../table/table-body-tr.vue'
import tablebodytrtd from '../table/table-body-tr-td.vue'
import tablebodytrtdcheckbtn from '../table/table-body-tr-td-checkbtn.vue'
import tablebodytrydbtns from '../table/table-body-tr-td-btns.vue'
import tablebodytrydvtbslist from '../table/table-body-tr-td-btns-list.vue'
import tableFooter from '../table/tableFooter.vue'
import deleteForm from '../form/deletionPopup.vue'
export default{
    data(){
        return {
            requestSource: null,
            pageName: 'placesadmin',
            statusLoad: false,
            statusTableLoad: false,
            tableDataBody:[],
            searchData: {
                placeholder: 'Search Place',
                value: this.$route.query.search,
                type: 'text'
            },
            pagination: {
                currentPage: 1,
                totalPages: 0,
                pageLimitView: 0,
                counterPageLimitView: 0,
                totolEntries: 0,
                lowetLimit: 0,
                pageLimitColumn: 0,
                higherLimit: 0,
            },
            nodataMessage2: {
                title: 'Ops!',
                description: 'No Data Available In Category Table, You Must Add One'
            },
            statusForNodataPrior: false,
            nodataMessage: {
                title: 'Ops!',
                description: 'No Data Prior Uppon Request'
            },
            tableHeader: {
                title: 'Place Table',
                perPage: [
                    {limit: 5},
                    {limit: 10},
                    {limit: 20},
                    {limit: 30},
                    {limit: 40},
                    {limit: 50},
                ]
            },
            SortedQuery:{},
            SearchQuery: {
                search: '',
            },
            tableNavDatas: [
                {
                    title: 'ID',
                    tableSort: 'id'
                },
                {
                    title: 'Title',
                    tableSort: 'title'
                },
                {
                    title: 'Description',
                },
                {
                    title: 'Date Created'
                }
            ],
            LimitQuery: {
                limit: '',
            },
            deletion: {
                title: "You're about to delete this Place",
                description: "Before deleting the information in the form, please ensure that you have reviewed it thoroughly and confirmed that all the necessary details have been recorded accurately.",
                btnStatus: false,
                idValueToDelete: []
            },
            deletionStatus: false,
            disabledCloseDeleteForm: false,
            loadingMessage: '',
            statusSubmit: false,
            errorMessage: '',
        }
    },
    components: {
        skeletonTable, skeletonTableHeaders, searchTable, nodataComponent, tableHeader, tableNav, tableBody, tablebodytr, tablebodytrtd, tablebodytrtdcheckbtn, tablebodytrydbtns, tablebodytrydvtbslist, tableFooter, deleteForm
    },
    created(){
        const promisigetPlaces = this.getPlacesData();
        Promise.all([promisigetPlaces]).then(() => {
            setTimeout(() => {
                this.statusLoad = true
                this.statusTableLoad = true
            }, 2000)
        })
    },
    watch: {
        $route(to, from) {
            this.statusTableLoad = false
            if (to.fullPath !== from.fullPath) {
                if (this.requestSource) {
                    this.requestSource.cancel("URL parameters changed, cancelling Axios request.");
                }
                this.getPlacesData()
            }
        },
        '$route.query.page'(newval, oldVal){
            if(newval > this.pagination.totalPages){
                this.statusForNodataPrior = true
            }else{
                this.statusForNodataPrior = false
            }
            if(newval < 1){
                this.statusForNodataPrior = true
            }
        },
        '$route.query.limit'(newval, oldVal){
            this.LimitQuery.limit = newval
        },
        '$route.query.id'(newval, oldVal){
            this.SortedQuery = { id: newval }
        },
        '$route.query.title'(newval, oldVal){
            this.SortedQuery = { title: newval }
        },
        '$route.query.search'(newval, oldVal){
            this.SearchQuery.search = newval
        },
    },
    mounted(){
        this.LimitQuery.limit = this.$route.query.limit || ''
        if(this.$route.query.id && this.$route.query.title){
            this.$router.push({name: this.pageName})
        }
        else if(this.$route.query.id){
            this.SortedQuery = { id: this.$route.query.id }
        }
        else{
            this.SortedQuery = { title: this.$route.query.title }
        }
        this.SearchQuery.search = this.$route.query.search || ''
        document.addEventListener('click', this.handleClick())
    },
    methods: {
        async getPlacesData(){
            this.requestSource = axios.CancelToken.source();
            try {
                const config = {
                    cancelToken: this.requestSource.token,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    }
                };
                const fullpath = this.$route.fullPath
                let newPath = fullpath.split('?')
                let path = ''
                if(newPath[1]){
                    path = `/api/admin/places?${newPath[1]}` 
                }
                else {
                    path = '/api/admin/places'
                }
                const response = await axiosIntance.get(path, config)
                const res = await response.data
                this.tableDataBody = res.PlaceData.rows
                this.pagination.currentPage = res.currentPage
                this.pagination.totalPages = res.totalPages
                this.pagination.pageLimitView = res.pageLimit
                this.pagination.counterPageLimitView = res.counterPageLimit
                this.pagination.totolEntries = res.totalCount
                this.pagination.lowetLimit = (this.pagination.currentPage - 1) * res.pageLimitColumn + 1
                this.pagination.pageLimitColumn = res.pageLimitColumn
                this.pagination.higherLimit = Math.min(this.pagination.currentPage * res.pageLimitColumn, res.totalCount)
                this.validatePages(this.pagination.currentPage, this.$route.query.page, this.pagination.totalPages)
                setTimeout(() => {
                    this.statusTableLoad = true
                }, 500)
            } catch (error) {
                this.$router.push({ name: 'placesadmin' })
                console.log(error)
            }
        },
        validatePages(currentPage, querypage, totalPages){
            if(currentPage > querypage || querypage > totalPages){
                this.statusForNodataPrior = true
            }
        }, 
        SearchForm(){
            this.SearchFunction()
        },
        SearchFunction(){
            if(this.searchData.value)  this.$router.push({name: 'placesadmin',  query: { search: this.searchData.value }});
            else this.$router.push({name: 'placesadmin'});
        },
        deleteSearch(){
            this.searchData.value = ''
            this.$router.push({name: 'placesadmin'});
        },
        handleClick(){
            let form = this.$refs.form
            if(form && this.disabledCloseDeleteForm === false){
                if(!form.contains(event.target)){
                    this.deletionStatus = false
                }
            }
        },
        DeleteData(id){
            this.deletionStatus = !this.deletionStatus
            this.deletion.idValueToDelete.push(id)
        },
        async deleteProcess(){

        },
        cancel(){
            if(this.disabledCloseDeleteForm === false){
                this.deletionStatus = !this.deletionStatus
                this.deletion.idValueToDelete = []
            }
        },
        UpateData(id){
            // this.$router.push({})
            console.log(id)
        },
        ViewData(id){
            // this.$router.push({})
            console.log(id)
        }
    }
}
</script>
<style scoped>
  article{
        width: 100%;
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
    .v-enter-active,
    .v-leave-active {
        transition: opacity 0.5s ease;
    }

    .v-enter-from,
    .v-leave-to {
        opacity: 0;
    }
</style>