<template>
     <div class="table-footer">
        <div class="show-entries">
            <p>Showing {{ pagination.lowetLimit }} to {{ pagination.higherLimit }} of {{ pagination.totolEntries }} entries</p>
        </div>
        <div class="pagination">
            <button class="previous" @click="previous(pagination.currentPage)" v-bind:disabled="pagination.currentPage === 1" :class="pagination.currentPage === 1 ? 'disabled' : ''">
                <p><i class="fa-solid fa-angle-left"></i> Previous</p>
            </button>
            <div class="pages">
                <router-link 
                    :to="{name: 'categoryadmin',  query: { page: 1 }}"
                    v-if="pagination.currentPage >= 4"
                    class="fistLast"
                    >First</router-link>
                <template v-for="(page, index) in pagination.totalPages">
                    <router-link 
                        :to="generateRoute(page)"
                        :class="pagination.currentPage == page ? 'activepage' : ''"
                        v-if="pagination.pageLimitView > index && pagination.counterPageLimitView <= index"
                        >{{ page }}</router-link>
                </template>
                <router-link 
                    :to="{name: 'categoryadmin',  query: { page: pagination.totalPages }}"
                    class="fistLast"
                    v-if="pagination.pageLimitView < pagination.totalPages"
                    >Last</router-link>
            </div>
            <button class="next" @click="next(pagination.currentPage)" v-bind:disabled="pagination.currentPage === pagination.totalPages" :class="pagination.currentPage === pagination.totalPages ? 'disabled' : ''">
                <p>Next <i class="fa-solid fa-angle-right"></i></p>
            </button>
        </div>
    </div>
</template>
<script>
export default{
    props:{
        pagination: Object,
        pageName: String,
        LimitQuery: Object,
        SortedQuery: Object,
        SearchQuery: Object
    },
    methods: {
        previous(currentpage){
            this.$router.push({name: this.pageName, query: {...this.SearchQuery, page: currentpage-1, ...this.LimitQuery, ...this.SortedQuery}})
        },
        next(currentpage){
            this.$router.push({name: this.pageName, query: {...this.SearchQuery, page: currentpage+1, ...this.LimitQuery, ...this.SortedQuery}})
        },
        generateRoute(page, pageName){
            return {name: pageName, query: { ...this.SearchQuery, page: page, ...this.LimitQuery, ...this.SortedQuery}}
        },
    }
}
</script>
<style scoped>
    .table-footer{
        width: 100%;
        background: var(--main-color-white);
        padding: 15px 30px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        position: relative;
        grid-gap: 50px;
        border-bottom: solid rgba(170, 170, 170, 0.4) 0.5px;
        border-left: solid rgba(170, 170, 170, 0.4) 0.5px;
        border-right: solid rgba(170, 170, 170, 0.4) 0.5px;
        border-radius: 5px 5px 0 0;
    }
    .table-footer > .show-entries{
        margin: auto 0;
    }
    .table-footer > .show-entries > p{
        font-size: var( --mobile-default-font-size);
        letter-spacing: 1.2px;
        color: var(--third-color-black);
        line-height: 1.5;
        white-space: nowrap;
    }
    .table-footer > .pagination{
        display: flex;
        align-items: flex-start;
        grid-gap: 10px;
    }
    .table-footer > .pagination > .previous, .table-footer > .pagination > .next{
        font-size: var(--mobile-default-font-size);
        color: rgba(24, 24, 24, 0.5);
        letter-spacing: 1px;
        padding: 8px 12px;
        border: none;
        cursor: pointer;
        width: auto;
        box-shadow: var(--main-box-shadow);
        border-radius: 12px;
        background: var(--main-background-color);
        transition: all 0.5s ease-out;
        white-space: nowrap;
        font-weight: 600;
    }
    .table-footer > .pagination > .previous:hover, .table-footer > .pagination > .next:hover{
        color: var(--main-color-white);
        background: var(--admin-secondary-blue-color);
    }
    .table-footer > .pagination > .pages{
        display: flex;
        grid-gap: 5px;
    }
    .table-footer > .pagination > .pages > a{
        font-size: var(--mobile-default-font-size);
        color: rgba(24, 24, 24, 0.5);
        letter-spacing: 1px;
        padding: 8px;
        border: none;
        cursor: pointer;
        width: 35px;
        text-align: center;
        transition: all 0.5s ease-out;
        box-shadow: var(--main-box-shadow);
        border-radius: 50%;
        background: var(--main-background-color);
        font-weight: 600;
    }
    .table-footer > .pagination > .pages > a:hover{
        color: var(--main-color-white);
        background: var(--admin-secondary-blue-color);
    }
    .activepage{
        color: var(--main-color-white) !important;
        background: var(--admin-secondary-blue-color) !important;
        pointer-events: none !important; 
        font-weight: 100 !important;
    }
    .fistLast{
        width: auto !important;
        border-radius: 12px !important;
    }
    .disabled{
        cursor: not-allowed !important;
        pointer-events: none !important;
        color: var(--transparent-color-5) !important;
        font-weight: 100 !important;
    }
</style>