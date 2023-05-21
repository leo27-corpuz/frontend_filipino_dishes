<template>
    <div class="search">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input :type="searchData.type" :placeholder="searchData.placeholder" v-model="searchData.value">
        <i class="fa-solid fa-xmark" v-if="searchData.value" @click="deleteSearch"></i>
    </div>
</template>
<script>
export default{
    props:{
        searchData: Object,
    },
    methods: {
        deleteSearch(){
            this.$emit('deleteSearch');
        }
    }
}
</script>
<style scoped>
    .search{
        position: relative;
        width: 30em;
    }
    .search > input{
        width: 100%;
        font-size: var(--wide-default-font-size);
        padding: 11px 45px;
        border-radius: 50px;
        border: none;
        color: rgba(24, 24, 24, 0.5);
        outline: none;
        letter-spacing: 1.5px;
        transition: all 0.5s ease-out;
        transition: all 0.5 ease-out;
        background: var(--main-color-white);
        border: solid rgba(126, 126, 126, 0.2) 0.5px;
    }
    .search > input:focus{
        border: solid rgba(6, 7, 71, 0.7) 0.5px;
        color: var(--admin-secondary-blue-color);
    }
    .search > i{
        position: absolute;
        font-size: 17px;
    }
    .search > :nth-child(1){
        top: 11px;
        left: 1em;
        color: rgba(24, 24, 24, 0.5);
    }
    .search > :nth-child(3){
        top: 13px;
        right: 1em;
        cursor: pointer;
        color: darkred;
    }
</style>