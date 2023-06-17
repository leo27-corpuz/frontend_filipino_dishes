<template>
    <div class="form-input-container">
        <div class="input">
            <label for="">{{ input.label }}<span class="required" v-if="input.required">*</span></label>
            <input :type="input.type" :placeholder="input.placeholder" v-model="input.value">
        </div>
        <errorMessage v-if="errormessage[input.title]" :message="errormessage[input.title]"></errorMessage>
    </div>
</template>
<script>
import errorMessage from './error-input.vue'
export default{
    props:{
        input: Object,
        errormessage: Object
    },
    components: {
        errorMessage
    }
}
</script>
<style scoped>
    .form-input-container{
        width: 100%;
        margin-bottom: 15px;
    }

    .form-input-container > .input{
        width: 100%;
        position: relative;
    }
    .form-input-container > .input > label{
        width: 100%;
        color: rgba(24, 24, 24, 0.5);
        margin-left: 2px;
        font-size: var(--mobile-default-font-size);
        letter-spacing: 1.5px;
    }
    .form-input-container > .input > input{
        width: 100%;
        font-size: var(--wide-default-font-size);
        padding: 15px;
        margin-top: 5px;
        border-radius: 7px;
        border: solid rgba(0, 0, 0, 0.2) 0.5px;
        color: rgba(24, 24, 24, 0.5);
        outline: none;
        letter-spacing: 1.5px;
        transition: all 0.5s ease-out;
    }
 
    .form-input-container > .input > input:focus{
        border: solid var(--admin-secondary-blue-color) 0.8px;
        color: var(--admin-secondary-blue-color);
    }
    .form-input-container > .input > input:focus::placeholder{
        color: var(--admin-secondary-blue-color);
    }
    .merge-size{
        flex: 1 1 49% !important;
    }
</style>