<template>
    <div class="skeleton-form">
        <div class="head">
            <div class="skel1"></div>
        </div>
        <div class="body">
            <div class="skel2"></div>
            <div class="skel3"></div>
            <div class="skel4"></div>
            <br>
            <div class="skel5"></div>
            <div class="skel6"></div>
            <br>
            <div class="skel3"></div>
            <div class="skel4"></div>
            <div class="skel7"></div>
        </div>
    </div>
</template>
<style scoped>
    .skeleton-form{
        width: 100%;
    }
    
    .skeleton-form > .head{
        width: 100%;
    }
    
    .skeleton-form > .head > .skel1{
        width: 20em;
        height: 35px;
        background: #e9e9e9;
        background: linear-gradient(110deg, #e9e9e9 8%, rgb(243, 243, 243) 18%, #e9e9e9 33%);
        background-size: 200% 100%;
        animation: 1.5s shine-skeleton linear infinite;
        margin-bottom: 30px;
        border-radius: 7px;
    }
    .skeleton-form > .body {
        width: 100%;
        margin-top: 3em;
        background: var(--main-color-white);
        padding: 30px;
        border-radius: 10px;
    }
    .skeleton-form > .body > *{
        background: #e9e9e9;
        background: linear-gradient(110deg, #e9e9e9 8%, rgb(243, 243, 243) 18%, #e9e9e9 33%);
        background-size: 200% 100%;
        animation: 1.5s shine-skeleton linear infinite;
        border-radius: 7px;
    }
    .skeleton-form > .body > .skel2 {
        width: 20em;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 30px;
        height: 35px;
    }
    .skeleton-form > .body > .skel3 {
        width: 5em;
        height: 20px;
    }
    .skeleton-form > .body > .skel4 {
        width: 100%;
        height: 40px;
        margin: 10px 0;
    }
    .skeleton-form > .body > .skel5 {
        width: 5em;
        height: 20px;
    }
    .skeleton-form > .body > .skel6 {
        width: 100%;
        height: 100px;
        margin: 10px 0;
    }
    .skeleton-form > .body > .skel7 {
        width: 10em;
        height: 40px;
        margin: 15px 0 0 auto;
    }
    @keyframes shine-skeleton {
        to {
            background-position-x: -200%;
        }
    }
</style>