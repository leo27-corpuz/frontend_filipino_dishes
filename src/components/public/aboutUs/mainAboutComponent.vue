<template>
    <article>
        <div class="container-article">
            <div class="image-container animate__animated animate__pulse">
                <v-lazy-image src="/images/pakbet.png"></v-lazy-image>
            </div>
        </div>
        <div class="container-article">
            <div class="title animate__animated animate__pulse">
                <h4>Abous Us</h4>
            </div>
            <hr class="animate__animated animate__pulse">
            <div class="sub-title animate__animated animate__pulse">
                <h1>Filipino's favorite dishes is about to unleashed!</h1>
            </div>
        </div>
    </article>
</template>
<script>
import VLazyImage from "v-lazy-image";
import linkButton from '../../essentials/linkButton.vue'
export default{
    components: {
        linkButton, VLazyImage
    }
}
</script>
<style scoped>
    article{
        position: relative;
        display: flex;
        grid-gap:60px;
        margin: 7em auto 0 auto;
        z-index: 2;
        align-items: flex-start;
        justify-content: space-between;
    }
    article > :nth-child(1){
        width: 50%;
    }
    article > :nth-child(1) > .image-container{
        width: 550px;
        height: 550px;
        border: none;
        margin: auto;
    }
    article > :nth-child(1) > .image-container > img{
        width: 550px;
        height: 550px;
        margin-bottom: 0;
        object-fit: cover;
    }

    article > :nth-child(2){
        width: 50%;
        margin-top: 10em;
    }
    article > :nth-child(2) > .title{
        width: 100%;
    }
    article > :nth-child(2) > hr{
        border: none;
        height: 0.5px;
        margin: 15px 0;
        border-radius: 20px;
        width: 5em;
        background-color: var(--main-color-yellow);
    }
    article > :nth-child(2) > .title > h4{
        letter-spacing: 3px;
        font-weight: 800;
        font-size: var(--subtitle-ipad-default-font-size);
        color: var(--main-color-yellow);
        white-space: nowrap;
    }
    article > :nth-child(2) > .sub-title{
        width: 100%;
        margin-top: 1.5em;
    }
    article > :nth-child(2) > .sub-title > h1{
        letter-spacing: 2px;
        font-weight: 800;
        font-size: var(--title-ipad-default-font-size);
        color: var(--fourth-color-black);
        line-height: 1.2;
    }
    article > :nth-child(2) > .description{
        width: 100%;
        margin-top: 1.5em;
    }
    article > :nth-child(2) > .description > p{
        font-size: var( --wide-default-font-size);
        letter-spacing: 1.2px;
        color: var(--third-color-black);
        line-height: 1.5;
    }
    article > :nth-child(2) > .buttons{
        width: 100%;
        margin-top: 1.5em;
    }
    article > :nth-child(2) > .buttons > a > button{
        background: var(--main-color-yellow);
        border: none;
        padding: 15px 19px;
        width: auto;
        font-size: var(--wide-default-font-size);
        cursor: pointer;
        letter-spacing: 1.7px;
        color: var(--main-color-white);
        transition: all 0.5s ease-out;
        border-radius: 10% 70% 22% 78% / 80% 10% 20% 20%;
    }
    article > :nth-child(2) > .buttons > a > button:hover{
        background: var(--third-color-yellow);
        transform: translateY(-5px);
        color: var(--fourth-color-black);
    }
    .v-lazy-image {
        background: #eee;
        background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
        border-radius: 5px;
        background-size: 200% 100%;
        animation: 1.5s shine linear infinite;
        border-radius: 50%;
    }
    .v-lazy-image-loaded {
        border-radius: 0 !important;
        background: none !important;
        animation:  blur-effect 2s normal forwards ease-in-out !important;
    }

    @media screen and (max-width: 1300px){
        article{
            margin: 10em auto 0 auto;
        }
        article > :nth-child(2){
            margin-top: 7em;
        }
        article > :nth-child(1) > .image-container{
            width: 500px;
            height: 500px;
        }
        article > :nth-child(1) > .image-container > img{
            width: 500px;
            height: 500px;
        }
    }
    @media screen and (max-width: 1100px){
        article > :nth-child(2) > .sub-title > h1{
            font-size: var(--title-mobile-default-font-size);
        }
        article > :nth-child(2) > .title > h4{
            font-size: var(--subtitle-mobile-default-font-size);
        }
        article > :nth-child(1) > .image-container{
            width: 450px;
            height: 450px;
        }
        article > :nth-child(1) > .image-container > img{
            width: 450px;
            height: 450px;
        }
    }
    @media screen and (max-width: 900px){
        article{
            flex-direction: column;
        }
        article > :nth-child(1){
            width: 100%;
        }
        article > :nth-child(2){
            width: 100%;
            margin-top: -2em;
        }
        article > :nth-child(1) > .image-container{
            width: 400px;
            height: 400px;
        }
        article > :nth-child(1) > .image-container > img{
            width: 400px;
            height: 400px;
        }
    }
    @media screen and (max-width: 700px){
        article > :nth-child(2) > .sub-title > h1{
            font-size: var(--subtitle-ipad-default-font-size);
        }
    }
    @media screen and (max-width: 600px){
        article > :nth-child(1) > .image-container{
            width: 350px;
            height: 350px;
        }
        article > :nth-child(1) > .image-container > img{
            width: 350px;
            height: 350px;
        }
    }
    @media screen and (max-width: 400px){
        article > :nth-child(1) > .image-container{
            width: 100%;
            height: 250px;
        }
        article > :nth-child(1) > .image-container > img{
            width: 100%;
            height: 250px;
        }
    }
</style>