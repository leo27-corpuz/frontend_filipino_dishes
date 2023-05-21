<template>
    <div class="success-container">
       <img src="/images/system-outline-31-check.gif" alt="">
        <slot></slot>
    </div>
</template>
<style scoped>
    .success-container{
        position: fixed;
        right: 2em;
        top: 3em;
        z-index: 100;
        background:var(--admin-secondary-blue-color);
        padding: 12px 30px 12px 12px; 
        display: flex;
        flex-direction: row;
        grid-gap: 10px;
        border-radius: 7px; 
    }
    .success-container > img{
        width: 25px;
        height: 25px;
    }
</style>