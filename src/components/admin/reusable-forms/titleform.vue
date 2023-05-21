<template>
    <div class="title">
        <p>{{ title }}</p>
    </div>
</template>
<script>
export default{
    props: {
        title: String,
    }
}
</script>
<style scoped>
    .title > p{
        font-size: var(--subtitle-wide-default-font-size);
        color: var(--fourth-color-black);
        letter-spacing: 1px;
    }
    .title{
        margin-bottom: 1.5em;
        text-align: center;
    }
</style>