<template>
    <div class="no-data-found">
       <div class="image">
            <img src="/images/system-outline-55-error.gif" alt="">
       </div>
       <div class="body">
            <div class="title">
                <p>{{ nodataMessage.title }}</p>
            </div>
            <div class="description">
                <p>{{ nodataMessage.description }}</p>
            </div>
            <slot></slot>
       </div>
    </div>
</template>
<script>
export default{
    props: {
        nodataMessage: Object
    }
}
</script>
<style scoped>
    .no-data-found{
        text-align: center;
        background: var(--main-color-white);
        padding: 30px;
        width: 100%;
        margin: 5em auto;
        border-radius: 20px;
    }
    .no-data-found > .image{
        width: 100%;
        margin-bottom: 2em;
    }
    .no-data-found > .image > img{
        width: 150px;
        height: 150px;
    }
    .no-data-found > .body > .title{
        width: 100%;
    }
    .no-data-found > .body > .title > p{
        letter-spacing: 3px;
        font-weight: 800;
        font-size: 20px;
        color: var(--admin-secondary-blue-color);
        white-space: nowrap;
    }
    .no-data-found > .body > .description{
        margin: 1em 0;
    }
    .no-data-found > .body > .description > p{
        font-size: var(--mobile-default-font-size);
        letter-spacing: 1.5px;
        color: var(--transparent-color-2);
    }
</style>