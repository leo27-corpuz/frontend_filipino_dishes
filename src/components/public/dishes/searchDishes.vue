<template>
    <div class="search animate__animated animate__pulse">
       <form action="">
            <div class="search-wrap">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder="search here">
                <i class="fa-solid fa-xmark"></i>
            </div>
       </form>
    </div>
</template>
<script>
</script>
<style scoped>
    .search {
        margin-top: 1em;
        width: 90%;
        margin: 1em auto;
    }
    .search > form > .search-wrap{
        width: 30em;
        padding: 2px 10px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 0px 8px 2px;
        position: relative;
        border-radius: 50px;
    }
    .search > form > .search-wrap > :nth-child(1){
        position: absolute;
        top: 14px;
        left: 1.1em;
        font-size: 16px;
        color: var(--mainv2-color-yellow);
    }
    .search > form > .search-wrap > :nth-child(3){
        position: absolute;
        top: 14px;
        right: 1.1em;
        font-size: 16px;
        color: darkred;
        cursor: pointer;
        display: none;
    }
    .search > form > .search-wrap > input{
        width: 100%;
        border: none;
        outline: none;
        padding: 12px 30px;
        background: transparent;
        font-size: var(--mobile-default-font-size);
        color: var(--third-color-black);
        letter-spacing: 1.2px;
    }
    @media screen and (max-width: 700px){
        .search > form > .search-wrap{
            width: 100%;
        }
    }
</style>