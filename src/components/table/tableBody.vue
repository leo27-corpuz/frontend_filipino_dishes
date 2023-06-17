<template>
    <tbody>
        <slot></slot>
    </tbody>
</template>

<style scoped>
    tbody{
        width: 100%;
        text-align: left;
        border-left: solid rgba(170, 170, 170, 0.4) 0.5px;
        border-right: solid rgba(170, 170, 170, 0.4) 0.5px;
        overflow-y: auto;
    }
</style>