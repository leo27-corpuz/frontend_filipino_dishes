<template>
    <div class="table-header">
        <div class="table-title">
            <p>{{ tableHeader.title }}</p>
        </div>
        <div class="sidebarNav">
            <div class="actions">
                <button><i class="fa-solid fa-play"></i> Action</button>
                <div class="action-list">
                  
                </div>
            </div>
            <div class="sorting-div">
                <button @click="viewPerPage" ref="div1">
                    <span>Row Per Page</span>
                    <i class="fa-solid fa-angle-down"></i>
                </button>
                <transition name="slide-fade">
                    <div class="list-perpage" v-show="perpageShow" ref="div2">
                        <template v-for="limit in tableHeader.perPage">
                            <router-link :to="generateRoute(limit.limit)"
                            :class="currentLimit == limit.limit ? 'activeNav' : ''"><div :class="currentLimit == limit.limit ? 'selected' : ''">{{ limit.limit }}</div></router-link>
                        </template>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    props: {
        tableHeader: Object,
        pageName: String,
        currentLimit: Number,
        currentPage: Number,
        SortedQuery: Object,
        SearchQuery: Object
    },
    data(){
        return {
            perpageShow: false
        }
    },
    mounted(){
        document.addEventListener('click', this.handelCloseEvent)
    },
    methods: {
        viewPerPage(){
            this.perpageShow = !this.perpageShow
        },
        handelCloseEvent(){
            let div1 = this.$refs.div1
            let div2 = this.$refs.div2
            if(div1 && div2){
                if(!div1.contains(event.target) && !div2.contains(event.target)){
                    this.perpageShow = false
                }
            }
        },
        generateRoute(limit){
            return {name: this.pageName, query: {...this.SearchQuery, page: this.currentPage, ...this.SortedQuery,  limit: limit,}}
        },
    }
}
</script>
<style scoped>
    .table-header{
        width: 100%;
        background: var(--main-color-white);
        padding: 15px 30px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        position: relative;
        border: solid rgba(170, 170, 170, 0.4) 0.5px;
        border-radius: 5px 5px 0 0;
    }
    .table-header > * {
        margin: auto 0;
    }
    .table-header > .table-title > p{
        font-size: var( --wide-default-font-size);
        letter-spacing: 1.2px;
        color: var(--fourth-color-black);
        line-height: 1.7;
        color: rgba(24, 24, 24, 0.5);
        font-weight: 600;
    }
    .sidebarNav{
        display: flex;
        align-items: flex-start;
        grid-gap: 20px;
    }
    .sidebarNav > .actions {
        position: relative;
    }
    .sidebarNav > .actions  > button{
        font-size: var(--wide-default-font-size);
        color: rgba(24, 24, 24, 0.5);
        letter-spacing: 1px;
        padding: 8px 30px;
        border: none;
        cursor: pointer;
        width: auto;
        box-shadow: var(--main-box-shadow);
        border-radius: 12px;
        background: var(--main-background-color);
    }
    .sidebarNav > .actions  > button i{
        margin: 5px 2px 0 0;
    }
    .sidebarNav > .actions  > .action-list{
        position: absolute;
        display: none;
        width: 100%;
    }
    .sidebarNav > .sorting-div{
        position: relative;
    }
    .sidebarNav > .sorting-div > .list-perpage {
        position: absolute;
        padding: 10px;
        background: var(--main-color-white);
        margin-top: 5px;
        width: 100%;
        z-index: 90;
        border-radius: 12px;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
    .sidebarNav > .sorting-div > .list-perpage  > a > div{
        width: 100%;
        margin: 5px 0 10px 0;
        font-size: var(--ipad-default-font-size);
        color: rgba(24, 24, 24, 0.5);
        letter-spacing: 1px;
        padding: 8px;
        border: none;
        cursor: pointer;
        box-shadow: var(--main-box-shadow);
        border-radius: 12px;
        background: var(--main-background-color);
        transition: all 0.5s ease-out;
        font-weight: 600;
    }
    .selected{
        color: var(--main-color-white) !important;
        background: var(--admin-secondary-blue-color) !important;
    }
    .activeNav{
        pointer-events: none !important; 
        font-weight: 100 !important;
    }
    .sidebarNav > .sorting-div > .list-perpage  > a > div:hover{
        color: var(--main-color-white);
        background: var(--admin-secondary-blue-color);
    }
    .sidebarNav > .sorting-div > button{
        font-size: var(--wide-default-font-size);
        color: rgba(24, 24, 24, 0.5);
        letter-spacing: 1px;
        padding: 8px;
        border: none;
        cursor: pointer;
        width: 10em;
        box-shadow: var(--main-box-shadow);
        border-radius: 12px;
        background: var(--main-background-color);
    }
    .sidebarNav > .sorting-div > button > i{
        margin: 5px 0 0 5px;
    }

    .slide-fade-enter-active {
        transition: all 0.3s ease-out;
    }

    .slide-fade-leave-active {
        transition: all 0.3s ease-in;
    }

    .slide-fade-enter-from,
    .slide-fade-leave-to {
        transform: translateY(-20px);
        opacity: 0;
    }
</style>