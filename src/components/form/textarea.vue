<template>
    <div class="form-textarea-container">
        <div class="textarea">
            <label for="">{{ textarea.label }}<span class="required" v-if="textarea.required">*</span></label>
            <textarea v-model="textarea.value" :placeholder="textarea.placeholder"></textarea>
        </div>
        <errorMessage v-if="errormessage[textarea.title]" :message="errormessage[textarea.title]"></errorMessage>
    </div>
</template>
<script>
import errorMessage from './error-input.vue'
export default{
    props:{
        textarea: Object,
        errormessage: Object
    },
    components: {
        errorMessage
    }
}
</script>
<style scoped>
    .form-textarea-container{
        width: 100%;
        margin-bottom: 15px;
    }
    .form-textarea-container > .textarea{
        width: 100%;
        position: relative;
    }
    .form-textarea-container > .textarea > textarea{
        width: 100%;
        font-size: var(--wide-default-font-size);
        padding: 15px;
        border-radius: 7px;
        border: solid rgba(0, 0, 0, 0.2) 0.5px;
        color: rgba(24, 24, 24, 0.5);
        outline: none;
        height: 250px;
        resize: none;
        letter-spacing: 1.5px;
        margin-top: 5px;
        transition: all 0.5s ease-out;
        white-space: pre-wrap;
    }
    .form-textarea-container > .textarea > textarea:focus{
        border: solid var(--admin-secondary-blue-color) 0.8px;
        color: var(--admin-secondary-blue-color);
    }
    .form-textarea-container > .textarea > label{
        width: 100%;
        color: rgba(24, 24, 24, 0.5);
        margin-left: 2px;
        font-size: var(--mobile-default-font-size);
        letter-spacing: 1.5px;
    }
</style>