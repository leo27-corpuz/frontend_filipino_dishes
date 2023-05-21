<template>
    <div class="wrap-input-file">
        <div class="form-input-file-container" v-for="(inputFile, index) in inputFiles">
            <div class="input-file">
                <label for="">{{ inputFile.label }}<span class="required" v-if="inputFile.required">*</span></label>
                <div class="container-input" @click="uploadFile(index)" @dragover.prevent @dragenter.prevent
                    @dragleave="dragOver = false" @drop="handleDrop(index)">
                    <input type="file" class="file-input" @change="handleFiles(index)" ref="fileInput"
                        :accept="inputFile.acceptedFile" hidden>
                    <div v-if="!inputFile.imagespreviews">
                        <i class="fa-solid fa-cloud-arrow-up"></i>
                        <p>Drag or Browse File to Upload</p>
                    </div>
                    <div v-else>
                        <v-lazy-image :src="inputFile.imagespreviews"></v-lazy-image>
                        <p>Click or Drag To Change</p>
                    </div>
                </div>
                <div class="selected-image" v-if="inputFile.image">
                    <div>
                        <i class="fa-solid fa-file"></i>
                    </div>
                    <div>
                        <p>{{ inputFile.image.name }}</p>
                        <i class="fa-solid fa-trash" @click="deleteImage(index)"></i>
                    </div>
                </div>
                <p>Accepted File Types: {{ inputFile.acceptedFile }} only</p>
            </div>
        </div>
    </div>
</template>
<script>
import VLazyImage from "v-lazy-image";
export default{
    props: {
        inputFiles: Array
    },
    components: {
        VLazyImage
    },
    methods: {
        uploadFile(index){
            this.$refs.fileInput[index].click()
        },
        handleDrop(index){
            event.preventDefault()
            if(this.validateImage(event.dataTransfer.files[0], index)){
                const file = event.dataTransfer.files[0]
                this.inputFiles[index].image = file
                this.inputFiles[index].imagespreviews = URL.createObjectURL(file)
            }
        },
        handleFiles(index) {
            if(this.validateImage(event.target.files[0], index)){
                const file = event.target.files[0]
                this.inputFiles[index].image = file
                this.inputFiles[index].imagespreviews = URL.createObjectURL(file)
            }
        },
        deleteImage(index){
            this.inputFiles[index].image = ''
            this.inputFiles[index].imagespreviews = ''
            this.$refs.fileInput[index].value  = ''
        },
        validateImage(image, index){
            if(image.type.startsWith(`image/`)){
                if(this.inputFiles[index].acceptedFile.includes(`.${image.name.split('.')[1]}`))  return true
                else return false
            }
            else return false
        }
    },
}
</script>
<style scoped>
    .wrap-input-file{
        width: 100%;
    }
    .wrap-input-file > .form-input-file-container{
        width: 100%;
        margin: 20px 0;
    }
    .wrap-input-file > .form-input-file-container > .input-file > label{
        width: 100%;
        color: rgba(24, 24, 24, 0.5);
        margin-left: 2px;
        font-size: var(--mobile-default-font-size);
        letter-spacing: 1.5px;
    }
    .wrap-input-file > .form-input-file-container > .input-file > p{
        width: 100%;
        color: rgba(24, 24, 24, 0.5);
        margin-left: 2px;
        font-size: 12px;
        letter-spacing: 1.5px;
    }
    .wrap-input-file > .form-input-file-container > .input-file > .container-input{
        width: 100%;
        border-radius: 7px;
        margin: 10px 0;
        border-style: dashed;
        border-color: rgba(24, 24, 24, 0.3);
        height: 350px;
        border-width: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .wrap-input-file > .form-input-file-container > .input-file > .container-input > div{
        text-align: center;
    }
    .wrap-input-file > .form-input-file-container > .input-file > .container-input > div > i{
        font-size: 35px;
        color: rgba(24, 24, 24, 0.7);
    }
    .wrap-input-file > .form-input-file-container > .input-file > .container-input > div > p{
        width: 100%;
        color: rgba(24, 24, 24, 0.7);
        margin: 10px 0;
        font-size: var(--mobile-default-font-size);
        letter-spacing: 1.5px;
    }
    .wrap-input-file > .form-input-file-container > .input-file > .container-input > div > img{
        width: 250px;
        height: 250px;
        object-fit: cover;
        border-radius: 8px;
    }
   .selected-image{
        width: 100%;
        padding: 12px 15px;
        display: flex;
        background: var(--admin-main-color);
        justify-content: space-between;
        margin: 10px 0;
        grid-gap: 20px;
        overflow-y: auto;
    }
    .selected-image::-webkit-scrollbar-thumb{
        background-color:var(--main-color-yellow);
        border-radius:2em;
        border:1px solid var(--main-color-yellow);
    }
    .selected-image::-webkit-scrollbar-thumb:hover{
        background-color: var(--main-color-yellow);
        border:1px solid var(--main-color-yellow);
    }
        
    .selected-image::-webkit-scrollbar {
        width: 5px;
        height:5px;
    }
    .selected-image > :nth-child(1){
        margin: auto 0;
    }
    .selected-image > :nth-child(1) > i{
        font-size: 20px;
        color: rgba(24, 24, 24, 0.7);
    }
    .selected-image > :nth-child(2){
        display: flex;
        margin: auto 0;
        grid-gap: 10px;
    }
    .selected-image > :nth-child(2) > p{
        width: 100%;
        color: rgba(24, 24, 24, 0.5);
        margin-left: 2px;
        font-size: 14px;
        letter-spacing: 1.5px;
        white-space: nowrap;
    }
    .selected-image > :nth-child(2) > i{
        font-size: 20px;
        color: rgba(24, 24, 24, 0.7);
        cursor: pointer;
    }
    .v-lazy-image {
        background: #eee;
        background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
        background-size: 200% 100%;
        animation: 1.5s shine linear infinite;
    }
    .v-lazy-image-loaded {
        background: none !important;
        animation:  blur-effect 2s normal forwards ease-in-out !important;
    }
</style>