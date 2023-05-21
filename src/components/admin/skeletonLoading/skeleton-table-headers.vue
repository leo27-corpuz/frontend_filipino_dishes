<template>
    <div class="skeleton-table-header">
        <div class="head">
            <div class="skel1"></div>
            <div class="skel2"></div>
            <div class="skel3"></div>
        </div>
    </div>
</template>
<style scoped>
    .skeleton-table-header{
        width: 100%;
    }
    .skeleton-table-header > .head{
        width: 100%;
    }
    .skeleton-table-header > .head > .skel1{
        width: 20em;
        height: 40px;
        background: #e9e9e9;
        background: linear-gradient(110deg, #e9e9e9 8%, rgb(243, 243, 243) 18%, #e9e9e9 33%);
        background-size: 200% 100%;
        animation: 1.5s shine-skeleton linear infinite;
        margin-bottom: 30px;
        border-radius: 7px;
    }
    .skeleton-table-header > .head > .skel2{
        width: 10em;
        height: 40px;
        float: right;
        background: #e9e9e9;
        background: linear-gradient(110deg, #e9e9e9 8%, rgb(243, 243, 243) 18%, #e9e9e9 33%);
        background-size: 200% 100%;
        animation: 1.5s shine-skeleton linear infinite;
        margin-bottom: 30px;
        border-radius: 7px;
    }
    .skeleton-table-header > .head > .skel3{
        width: 30em;
        height: 40px;
        background: #e9e9e9;
        background: linear-gradient(110deg, #e9e9e9 8%, rgb(243, 243, 243) 18%, #e9e9e9 33%);
        background-size: 200% 100%;
        animation: 1.5s shine-skeleton linear infinite;
        margin-bottom: 30px;
        border-radius: 7px;
    }
    @keyframes shine-skeleton {
        to {
            background-position-x: -200%;
        }
    }
</style>