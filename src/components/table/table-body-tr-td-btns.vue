<template>
    <td class="actions">
        <div class="list-action">
            <slot></slot>
        </div>
    </td>
</template>
<style scoped>
.actions {
    position: relative;
}
td {
    padding: 20px;
}
.actions>.list-action {
    display: flex;
    grid-gap: 15px;
    justify-content: center;
}
</style>