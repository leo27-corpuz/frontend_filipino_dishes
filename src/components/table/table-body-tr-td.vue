<template>
   <td class="table-elipses">{{ tdData }}</td>
</template>
<script>
export default{
    props: {
        tdData: {
            type: [String, Number, Array],
            required: true
        }
    }
}
</script>
<style scoped>
td {
    padding: 20px;
    color: rgba(24, 24, 24, 0.5);
    font-size: var(--mobile-default-font-size);
    letter-spacing: 1px;
    position: relative;
}

.table-elipses {
    max-width: 22em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

</style>