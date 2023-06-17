<template>
    <section>
        <article v-if="path === '/admin/category'">
            <template v-if="!statusLoad">
                <skeletonTableHeaders></skeletonTableHeaders>
                <skeletonTable></skeletonTable>
            </template>
            <template v-else>
                <transition>
                    <div class="deletion-container" v-show="deletionStatus" @click="handleClick">
                        <transition name="bounce">
                            <form @submit.prevent="deleteProcess" v-show="deletionStatus" ref="form">
                                <deleteForm :deletion="deletion" @cancel="cancel"></deleteForm>
                            </form>
                        </transition>
                    </div>
                </transition>
                <div class="title">
                    <p>Category</p>
                </div>
                <div class="search-table">
                    <form @submit.prevent="SearchForm">
                        <searchTable :searchData="searchData" v-debounce:1000ms="SearchFunction"
                            @deleteSearch="deleteSearch">
                        </searchTable>
                    </form>
                    <div class="add-data">
                        <router-link :to="{ name: 'categoryadmincreate' }"><button>Add Category <i
                                    class="fa-solid fa-angle-right"></i></button></router-link>
                    </div>
                </div>
                <nodataComponent v-if="pagination.totalPages < 1 && tableDataBody.length == 0"
                    :nodataMessage="nodataMessage2">
                </nodataComponent>
                <nodataComponent v-else-if="statusForNodataPrior" :nodataMessage="nodataMessage">
                    <br>
                    <router-link :to="{ name: 'categoryadmin', query: { page: 1 } }" class="backtopage1">Back To Page
                        1</router-link>
                </nodataComponent>
                <div class="main-table" v-else>
                    <skeletonTable v-if="!statusTableLoad"></skeletonTable>
                    <template v-else>
                        <tableHeader :SearchQuery="SearchQuery.search == '' ? {} : SearchQuery" :tableHeader="tableHeader"
                            :pageName="pageName" :currentPage="pagination.currentPage"
                            :currentLimit="pagination.pageLimitColumn" :SortedQuery="SortedQuery == '' ? {} : SortedQuery">
                        </tableHeader>
                        <table class="table">
                            <tableNav :SearchQuery="SearchQuery.search == '' ? {} : SearchQuery"
                                :tableNavDatas="tableNavDatas" :pageName="pageName"
                                :LimitQuery="LimitQuery.limit == '' ? {} : LimitQuery"
                                :currentPage="pagination.currentPage">
                            </tableNav>
                            <tableBody>
                                <tablebodytr v-for="tableData in tableDataBody">
                                    <tablebodytrtdcheckbtn></tablebodytrtdcheckbtn>
                                    <tablebodytrtd v-for="data in tableData" :tdData="data"></tablebodytrtd>
                                    <tablebodytrydbtns>
                                        <tablebodytrydvtbslist icon="fa-solid fa-trash" tip="Delete"
                                            @click="DeleteData(tableData.id)"></tablebodytrydvtbslist>
                                        <tablebodytrydvtbslist icon="fa-solid fa-pen-to-square" tip="Update"
                                            @click="UpateData(tableData.id)"></tablebodytrydvtbslist>
                                        <tablebodytrydvtbslist icon="fa-solid fa-eye" tip="View"
                                            @click="ViewData(tableData.id)"></tablebodytrydvtbslist>
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
        <router-view v-else @successEmit="successEmit"></router-view>
        <transition name="slide-fade">
            <successPopup v-if="successMessage">
                <p class="successmessage">{{ successMessage }}</p>
            </successPopup>
        </transition>
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
    </section>
</template>
<script>
import successPopup from '../../../components/essentials/successPopup.vue'
import loadingCompoent from '../../../components/essentials/loadingCompoent.vue'
import errorList from '../../../components/essentials/errorList.vue'
import deleteForm from '../../../components/form/deletionPopup.vue'
import searchTable from '../../../components/table/search_table.vue'
import tableNav from '../../../components/table/tableNav.vue'
import tableHeader from '../../../components/table/tableHeader.vue'
import tableBody from '../../../components/table/tableBody.vue'
import tablebodytr from '../../../components/table/table-body-tr.vue'
import tablebodytrtd from '../../../components/table/table-body-tr-td.vue'
import tablebodytrtdcheckbtn from '../../../components/table/table-body-tr-td-checkbtn.vue'
import tablebodytrydbtns from '../../../components/table/table-body-tr-td-btns.vue'
import tablebodytrydvtbslist from '../../../components/table/table-body-tr-td-btns-list.vue'
import tableFooter from '../../../components/table/tableFooter.vue'
import axiosIntance from '../../../composable/axios.comp.js'
import skeletonTable from '../../../components/admin/skeletonLoading/skeleton-table.vue'
import skeletonTableHeaders from '../../../components/admin/skeletonLoading/skeleton-table-headers.vue'
import nodataComponent from '../../../components/form/nodata.vue'
import axios from 'axios';
export default{
    data(){
        return {
            path: this.$route.path,
            successMessage: '',
            pageName: 'categoryadmin',
            searchData: {
                placeholder: 'Search Category',
                value: this.$route.query.search,
                type: 'text'
            },
            tableHeader: {
                title: 'Category Table',
                perPage: [
                    {limit: 5},
                    {limit: 10},
                    {limit: 20},
                    {limit: 30},
                    {limit: 40},
                    {limit: 50},
                ]
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
            tableDataBody:[],
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
            statusLoad: false,
            fullPath: this.$route.fullPath,
            statusTableLoad: false,
            statusForNodataPrior: false,
            nodataMessage: {
                title: 'Ops!',
                description: 'No Data Prior Uppon Request'
            },
            nodataMessage2: {
                title: 'Ops!',
                description: 'No Data Available In Category Table, You Must Add One'
            },
            requestSource: null,
            LimitQuery: {
                limit: this.$route.query.limit || '',
            },
            SortedQuery:{},
            SearchQuery: {
                search: this.$route.query.search || '',
            },
            deletion: {
                title: "You're about to delete this Category",
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
        successPopup, searchTable, tableNav, tableHeader, tableBody, tableFooter, skeletonTable, skeletonTableHeaders, nodataComponent, deleteForm, loadingCompoent, errorList, tablebodytr, tablebodytrtd, tablebodytrtdcheckbtn, tablebodytrydbtns, tablebodytrydvtbslist
    },
    watch: {
        '$route.path'(newVal, oldVal) {
            this.path = newVal
        },
        $route(to, from) {
            this.statusTableLoad = false
            if (to.fullPath !== from.fullPath) {
                if(this.requestSource) this.requestSource.cancel("URL parameters changed, cancelling Axios request.");
                if(to.path == '/admin/category') this.getCategoryData()
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
        this.SortedQuery = { title: this.$route.query.title }
        this.SortedQuery = { id: this.$route.query.id }
    },
    created(){
        const promisigetCategory = this.getCategoryData();
        Promise.all([promisigetCategory]).then(() => {
            setTimeout(() => {
                this.statusLoad = true
                this.statusTableLoad = true
            }, 2000)
        })
    },
    methods: {
        async getCategoryData(){
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
                    path = `/api/admin/category?${newPath[1]}` 
                }
                else {
                    path = '/api/admin/category'
                }
                const response = await axiosIntance.get(path, config)
                const res = await response.data
                this.tableDataBody = res.categoryData.rows
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
                this.requestSource = null
            } catch (error) {
                this.$router.push({ name: 'categoryadmin' })
                console.log(error)
            }
        },
        validatePages(currentPage, querypage, totalPages){
            if(currentPage > querypage || querypage > totalPages){
                // this.$router.push({ name: 'categoryadmin' })
                this.statusForNodataPrior = true
            }
        }, 
        SearchFunction(){
            if(this.searchData.value)  this.$router.push({name: 'categoryadmin',  query: { search: this.searchData.value }});
            else this.$router.push({name: 'categoryadmin'});
        },
        deleteSearch(){
            this.searchData.value = ''
            this.$router.push({name: 'categoryadmin'});
        },
        SearchForm(){
            this.SearchFunction()
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
        cancel(){
            if(this.disabledCloseDeleteForm === false){
                this.deletionStatus = !this.deletionStatus
                this.deletion.idValueToDelete = []
            }
        },
        async deleteProcess(){
            this.deletion.btnStatus = true
            this.statusSubmit = !this.statusSubmit
            this.loadingMessage = 'Processing..'
            this.errorMessage = ''
            this.disabledCloseDeleteForm = true
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                };
                const response = await axiosIntance.delete(`/api/admin/category/delete/${this.deletion.idValueToDelete}`, config)
                let res = await response.data
                if (res) {
                    setTimeout(() => {
                        this.getCategoryData()
                        setTimeout(() => {
                            this.errorMessage = ''
                            this.successMessage = 'Successful'
                            this.loadingMessage = ''
                            this.disabledCloseDeleteForm = false,
                            this.statusSubmit = !this.statusSubmit
                            this.deletionStatus = !this.deletionStatus
                            this.deletion.idValueToDelete = [],
                            this.deletion.btnStatus = false
                            setTimeout(() => {
                                this.successMessage = ''
                            }, 3000)
                        }, 1000)
                    }, 900)
                }
            } catch (error) {
                setTimeout(() => {
                    this.statusSubmit = !this.statusSubmit
                    setTimeout(() => {
                        this.loadingMessage = ''
                        this.errorMessage = error.response.data
                        this.disabledCloseDeleteForm = false,
                        this.deletion.btnStatus = false
                    }, 1000)
                }, 900)
            }
        },
        UpateData(id){
            // this.$router.push({})
            console.log(id)
        },
        ViewData(id){
            // this.$router.push({})
            console.log(id)
        },
        successEmit(payload){
            this.successMessage = payload
            setTimeout(() => {
                this.successMessage = ''
            }, 3000)
            console.log('emit')
        }
    }
}
</script>
<style scoped>
    article{
        width: 100%;
    }
</style>