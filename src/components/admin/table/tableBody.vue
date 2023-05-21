<template>
    <tbody>
        <tr v-for="data in tableDataBody">
            <td>
                <label class="container">
                    <input type="checkbox">
                    <span class="checkmark"></span>
                </label>
            </td>
            <td>{{ data.id }}</td>
            <td>{{ data.Title }}</td>
            <td class="table-elipses" v-html="data.Description"></td>
            <td class="actions">
                    <div class="list-action">
                        <div>
                            <i class="fa-solid fa-trash" @click="DeleteData(data.id)"></i>
                            <div class="tip">
                                Delete
                            </div>
                        </div>
                        <div>
                            <i class="fa-solid fa-pen-to-square" @click="UpateData(data.id)"></i>
                            <div class="tip">
                                Update
                            </div>
                        </div>
                        <div>
                            <i class="fa-solid fa-eye" @click="ViewData(data.id)"></i>
                            <div class="tip">
                                view
                            </div>
                        </div>
                    </div>
                </td>
        </tr>
    </tbody>
</template>
<script>
export default{
    props: {
        tableDataBody: Array,
    },
    methods: {
        DeleteData(id){
            this.$emit('DeleteData', id)
        },
        UpdateData(id){
            console.log(id)
        },
        ViewData(id){
            console.log(id)
        }
    }
}
</script>
<style scoped>
    tbody{
        width: 100%;
        text-align: left;
        border-left: solid rgba(170, 170, 170, 0.4) 0.5px;
        border-right: solid rgba(170, 170, 170, 0.4) 0.5px;
        overflow-y: auto;
    }
    tbody > tr td{
        padding: 20px;
        color: rgba(24, 24, 24, 0.5);
        font-size: var(--mobile-default-font-size);
        letter-spacing: 1px;
        position: relative;
        border-bottom: solid rgba(170, 170, 170, 0.4) 0.5px;
    }
    tbody > tr .table-elipses{
        max-width: 22em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .actions{
        position: relative;
    }
    .actions > .list-action{
        display: flex;
        grid-gap: 15px;
        justify-content: center;
    }
    .actions > .list-action > div {
        margin: auto 0;
        position: relative;
    }
    .actions > .list-action > div > i{
        font-size: 20px;
        border-radius: 50%;
        cursor: pointer;
        color: rgba(185, 185, 185, 0.8);
        transition: all 0.5s ease-out;
    }
    .actions > .list-action > div > .tip{
        position: absolute;
        top: -33px;
        right: 0;
        background: var(--admin-secondary-blue-color);
        color: rgba(185, 185, 185, 0.8);
        padding: 7px 15px;
        border-radius: 10px;
        display: none;
        transition: all 0.5s ease-out;
        font-size: var(--mobile-default-font-size);
    }
    .actions > .list-action > div:hover .tip{
        display: inherit;
    }
    .actions > .list-action > div > i:hover{
        color: var(--admin-secondary-blue-color);
    }

    input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }
    .container{
        position: relative;
        top: -12px;
    }
    .checkmark {
        position: absolute;
        height: 22px;
        width: 22px;
        background: var(--admin-main-color);
        box-shadow: var(--main-box-shadow);
        border-radius: 6px;
        cursor: pointer;
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