<template>
    <template v-for="navigator in navigators">
        <router-link :to="{name: navigator.name}"><i :class="navigator.icon"></i> <p>{{navigator.title}}</p></router-link>
    </template>
</template>
<script>
export default{
    props: {
        navigators: Array
    }
}
</script>
<style scoped>
    .active{
        color: var(--main-color-white);
        background: var(--admin-secondary-blue-color);
    }
</style>