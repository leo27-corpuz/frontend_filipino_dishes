<template>
    <td>
        <label class="container">
            <input type="checkbox">
            <span class="checkmark"></span>
        </label>
    </td>
</template>
<style scoped>
    td {
        padding: 20px;
    }
    input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    .container {
        position: relative;
        top: -12px;
    }

    .checkmark {
        position: absolute;
        height: 22px;
        width: 22px;
        background: var(--admin-main-color);
        box-shadow: var(--main-box-shadow);
        border-radius: 6px;
        cursor: pointer;
    }

    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    .container input:checked~.checkmark:after {
        display: block;
    }

    .checkmark:after {
        left: 7.7px;
        top: 4px;
        width: 4.5px;
        height: 8.5px;
        border: solid var(--main-color-yellow);
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
</style>