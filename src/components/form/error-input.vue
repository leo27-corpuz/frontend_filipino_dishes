<template>
   <div class="error-input"><img src="/images/alert-circle.svg" alt=""> <p>{{ message }}</p> </div>
</template>
<script>
export default{
    props:{
        message: String,
    },
}
</script>
<style scoped>
   .error-input{
        margin: 7px 5px;
        display: flex;
        grid-gap: 5px;
        align-items: center;
    }
    .error-input > img{
        width: 20px;
    }
    .error-input > p{
        font-size: var( --mobile-default-font-size);
        letter-spacing: 1px;
        color: darkred;
    }
</style>