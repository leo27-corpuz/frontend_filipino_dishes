<template>
    <div class="wrap-button">
        <button v-bind:disabled="statusSubmit" :class="statusSubmit ? 'disabledCursor' : ''">
            <span>{{buttonTitle}}</span>
        </button>
    </div>
</template>
<script>
export default{
    props: {
        statusSubmit: Boolean,
        buttonTitle: String
    }
}
</script>
<style scoped>
    .wrap-button{
        width: 100%;
        text-align: right;
    }
    .wrap-button > button{
        background: var(--admin-main-blue-color);
        border: none;
        padding: 12px 25px;
        border-radius: 7px;
        width: auto;
        font-size: var(--wide-default-font-size);
        cursor: pointer;
        letter-spacing: 1.7px;
        color: var(--admin-primary-white-color);
        transition: all 0.5s ease-out;
    }
    .wrap-button > button:hover{
        color: var(--main-color-white);
        background: var(--admin-secondary-blue-color);
    }
    .disabledCursor{
        cursor: not-allowed !important;
    }
</style>