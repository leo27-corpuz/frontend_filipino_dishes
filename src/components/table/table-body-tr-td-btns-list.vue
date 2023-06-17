<template>
    <div class="btn-table">
        <i :class="icon"></i>
        <div class="tip">
            {{ tip }}
        </div>
    </div>
</template>
<script>
export default{
    props: {
        icon: String,
        tip: String
    }
}
</script>
<style scoped>

.btn-table {
    margin: auto 0;
    position: relative;
}

.btn-table >i {
    font-size: 20px;
    border-radius: 50%;
    cursor: pointer;
    color: rgba(185, 185, 185, 0.8);
    transition: all 0.5s ease-out;
}

.btn-table >.tip {
    position: absolute;
    top: -33px;
    right: 0;
    background: var(--admin-secondary-blue-color);
    color: rgba(185, 185, 185, 0.8);
    padding: 7px 15px;
    border-radius: 10px;
    display: none;
    transition: all 0.5s ease-out;
    font-size: var(--mobile-default-font-size);
}

.btn-table:hover .tip {
    display: inherit;
}

.btn-table>i:hover {
    color: var(--admin-secondary-blue-color);
}</style>