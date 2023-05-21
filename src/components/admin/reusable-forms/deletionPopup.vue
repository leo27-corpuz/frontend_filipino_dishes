<template>
    <div class="delete-form">
        <div class="icon-deletion">
            <img src="/images/system-solid-39-trash.gif" alt="">
        </div>
        <div class="title">
            <p>{{ deletion.title }}</p>
        </div>
        <div class="description">
            <p>{{ deletion.description }}</p>
        </div>
        <div class="footer-btn">
            <button type="button" v-bind:disabled="deletion.btnStatus" :class="deletion.btnStatus ? 'disabledCursor' : ''" @click="cancel">Cancel</button>
            <button type="submit" v-bind:disabled="deletion.btnStatus"  :class="deletion.btnStatus ? 'disabledCursor' : ''">Delete</button>
        </div>
    </div>
</template>
<script>
import buttonsComponent from './buttons.vue'
export default{
    data(){
        return {
            statusSubmit: false,
            buttonHomePage: 'Submit',
        }
    },
    props: {
        deletion: Object
    },
    components: {
        buttonsComponent
    },
    methods: {
        cancel(){
            this.$emit('cancel')
        }
    }
}
</script>
<style scoped>
    .delete-form{
        width: 35em;
        padding: 30px 40px;
        background: var(--main-color-white);
        box-shadow: var(--main-box-shadow);
        border-radius: 7px;
        position: relative;
    }
    .delete-form > .icon-deletion{
        text-align: center;
    }
    .delete-form > .icon-deletion > img{
        width: 120px;
        height: 120px;
    }
    .delete-form > .title{
        width: 100%;
        margin: 15px 0;
        text-align: center;
    }
    .delete-form > .title > p{
        padding: 0 5px;
        font-size: var(--wide-default-font-size);
        letter-spacing: 1.5px;
        color: var(--admin-main-blue-color);
        font-weight: 800;
    }
    .delete-form > .description{
        width: 100%;
        margin: 15px 0 70px 0;
        text-align: center;
    }
    .delete-form > .description > p{
        padding: 0 5px;
        font-size: var(--mobile-default-font-size);
        letter-spacing: 1.5px;
        color: var(--transparent-color-2);
    }
    .delete-form > .footer-btn{
        position: absolute;
        padding: 10px 20px;
        width: 100%;
        left: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        grid-gap: 10px;
        margin-bottom: 10px;
    }
    .delete-form > .footer-btn > button {
        width: 100%;
        border: none;
        padding: 12px 25px;
        border-radius: 7px;
        font-size: var(--wide-default-font-size);
        cursor: pointer;
        letter-spacing: 1.7px;
        transition: all 0.5s ease-out;
    }
    .delete-form > .footer-btn > :nth-child(2){
        color: var(--admin-primary-white-color);
        background: var(--admin-main-blue-color);
    }
    .delete-form > .footer-btn > :nth-child(2):hover{
        color: var(--main-color-white);
        background: var(--admin-secondary-blue-color);
        transform: translateY(-2px);
    }
    .disabledCursor{
        cursor: not-allowed !important;
    }
</style>