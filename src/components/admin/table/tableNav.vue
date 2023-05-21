<template>
    <thead>
        <tr>
            <th class="checkbox">
                <label class="container">
                    <input type="checkbox">
                    <span class="checkmark"></span>
                </label>
            </th>
            <th v-for="tableNavData in tableNavDatas">
                <span>{{ tableNavData.title}}</span>
                <div class="table_sorted" v-if="tableNavData.tableSort">
                    <div>
                        <router-link :to="sortAsc(tableNavData.tableSort, 'asc')"><i class="fa-solid fa-angle-up"></i></router-link>
                    </div>
                    <div>
                        <router-link :to="sortDesc(tableNavData.tableSort, 'desc')"><i class="fa-solid fa-angle-down"></i></router-link>
                    </div>
                </div>
            </th>
            <th></th>
        </tr>
    </thead>
</template>
<script>
export default{
    props: {
        tableNavDatas: Array,
        pageName: String,
        currentPage: Number,
        LimitQuery: Object,
        SearchQuery: Object
    },
    methods: {
        sortAsc(name, sort){
            return {name: this.pageName, query: {...this.SearchQuery, page: this.currentPage, [name]: sort, ...this.LimitQuery,}}
        },
        sortDesc(name, sort){
            return {name: this.pageName, query: {...this.SearchQuery, page: this.currentPage, [name]: sort, ...this.LimitQuery,}}
        }
    }
}
</script>
<style scoped>
    thead{
        width: 100%;
        text-align: left;
        background: var(--main-background-color);
        border-bottom: solid rgba(170, 170, 170, 0.4) 0.5px;
        border-left: solid rgba(170, 170, 170, 0.4) 0.5px;
        border-right: solid rgba(170, 170, 170, 0.4) 0.5px;
    }
    thead > tr > th{
        vertical-align: top;
        white-space: nowrap;
        padding: 20px;
        color: rgba(24, 24, 24, 0.5);
        font-size: var(--mobile-default-font-size);
        letter-spacing: 1px;
        position: relative;
    }
    thead > tr > th > .table_sorted{
        display: inline-block;
        top: 15px;
        margin-left: 8px;
        position: absolute;
    }
    thead > tr > th > .table_sorted > :nth-child(1){
        margin-bottom: -6px;
    }
    thead > tr > th > .table_sorted > div > a{
        font-size: 12px;
        color: rgba(24, 24, 24, 0.5);
    }

    input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }
    .checkmark {
        position: absolute;
        height: 22px;
        width: 22px;
        background-image: linear-gradient(to top, var(--main-color-white), var(--main-color-white),  var(--main-color-white), var(--transparent-color-3));
        box-shadow: var(--main-box-shadow);
        border-radius: 6px;
        cursor: pointer;
        margin: auto;
    }
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }
    .container input:checked ~ .checkmark:after {
        display: block;
    }
    .checkmark:after {
        left: 7.7px;
        top: 4px;
        width: 4.5px;
        height: 8.5px;
        border: solid var(--main-color-yellow);
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
</style>