<template>
    <Transition :name="direction" mode="in-out">
        <div class="image-container" v-show="index === visibleSlide">
            <slot></slot>
        </div>
   </Transition>
</template>
<script>
export default{
    props:['index', 'visibleSlide', 'direction'],
}
</script>
<style scoped>

.left-enter-active{
    animation: toLeftInAnimation 1.5s ease-in-out;
    position: absolute;
}
.left-leave-active {
    animation: toLeftOutAnimation 1.5s ease-in-out;
    position: absolute;
}
@keyframes toLeftInAnimation{
    from{ transform: translateX(100%);}
    to{ transform: translateX(0%);}
}
@keyframes toLeftOutAnimation{
    from{ transform: translateX(0);}
    to{ transform: translateX(-100%);}
}


.right-enter-active{
    animation: torightInAnimation 1s ease-in-out;
    position: absolute;
}
.right-leave-active {
    animation: torightOutAnimation 1s ease-in-out;
    position: absolute;
}
@keyframes torightInAnimation{
    from{ transform: translateX(-100%);}
    to{ transform: translateX(0%);}
}
@keyframes torightOutAnimation{
    from{ transform: translateX(0%);}
    to{ transform: translateX(100%);}
}
</style>