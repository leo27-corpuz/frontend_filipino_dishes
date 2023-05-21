<template>
    <div class="skeleton-table">
        <!-- <div class="head"></div> -->
        <div class="skeletongbody"></div>
        <!-- <div class="footer"></div> -->
    </div>
</template>
<style scoped>
    .skeleton-table{
        width: 100%;
    }
    .skeleton-table > * {
        width: 100%;
        background: #e9e9e9;
        background: linear-gradient(110deg, #e9e9e9 8%, rgb(243, 243, 243) 18%, #e9e9e9 33%);
        background-size: 200% 100%;
        animation: 1.5s shine-skeleton linear infinite;
        border-radius: 7px;
        height: 250px;
    }
    /* .skeleton-table > .head{
        height: 60px;
    } */
    /* .skeleton-table > .body{
        margin-top: 10px;
        height: 300px;
    } */
    /* .skeleton-table > .footer{
        margin-top: 10px;
        height: 50px;
    } */
    @keyframes shine-skeleton {
        to {
            background-position-x: -200%;
        }
    }
</style>