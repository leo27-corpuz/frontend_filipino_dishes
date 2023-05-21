<template>
    <div class="error-container">
        <img src="/images/system-outline-55-error2.gif" alt=""><slot></slot>
    </div>
</template>
<style scoped>
    .error-container{
        position: fixed;
        right: 2em;
        top: 3em;
        z-index: 100;
        background: darkred;
        padding: 12px 30px 12px 12px; 
        display: flex;
        flex-direction: row;
        grid-gap: 10px;
        border-radius: 7px; 
    }
    .error-container > img{
        width: 25px;
        height: 25px;
    }
</style>