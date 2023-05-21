<template>
    <article>
        <div class="container-article">
            <div class="title animate__animated animate__pulse">
                <h1>Authentic <span>Filipino</span> Dishes.</h1>
            </div>
            <hr class="animate__animated animate__pulse">
            <div class="description animate__animated animate__pulse">
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat assumenda ipsum vitae, aliquam nisi officia.</p>
            </div>
            <div class="social-media animate__animated animate__pulse">
                <div>
                    <a href="" target="_blank"><i class="fa-brands fa-facebook-f"></i></a>
                </div>
                <div>
                    <a href="https://www.instagram.com/leycorpuzjr/" target="_blank"><i class="fa-brands fa-instagram"></i></a>
                </div>
                <div>
                    <a href="https://www.instagram.com/leycorpuzjr/" target="_blank"><i class="fa-brands fa-tiktok"></i></a>
                </div>
            </div>
            <div class="buttons animate__animated animate__pulse">
                <router-link to="/dishes">
                    <linkButton>
                        Explore Recipes
                    </linkButton>
                </router-link>
            </div>
        </div>
        <div class="container-article animate__animated animate__pulse">
            <div class="image-container">
               <div class="main-image">
                    <v-lazy-image src="/images/adobo.png"/>
               </div>
               <div class="sub-image">
                    <v-lazy-image src="/images/mainbg.png"/>
               </div>
            </div>
        </div>
    </article>
</template>
<script>
import linkButton from '../../essentials/linkButton.vue'
import VLazyImage from "v-lazy-image";
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
        grid-gap:20px;
        overflow: inherit !important;
        margin: 10em auto 0 auto;
        z-index: 2;
        align-items: flex-start;
        justify-content: space-between;
    }
    article > :nth-child(1){
        width: 40%;
        margin-top: 6em;
    }
    article > :nth-child(1) > hr{
        border: none;
        height: 0.5px;
        margin: 15px 0;
        border-radius: 20px;
        width: 15em;
        background-color: var(--main-color-yellow);
    }
    article > :nth-child(1) > .title{
        width: 100%;
        position: relative;
        z-index: 99;
    }
    article > :nth-child(1) > .title > h1{
        letter-spacing: 3px;
        font-weight: 800;
        font-size: var(--title-main-default-font-size);
        color: var(--fourth-color-black);
        white-space: nowrap;
    }
    article > :nth-child(1) > .title > h1 > span{
        color: var(--main-color-yellow) !important;
    }
    article > :nth-child(1) > .description{
        width: 100%;
        margin-top: 1.5em;
    }
    article > :nth-child(1) > .social-media{
        width: 100%;
        margin-top: 1.5em;
        display: flex;
        grid-gap: 10px;
    }
    article > :nth-child(1) > .social-media > * > a{
        font-size: 20px;
        color: var(--mainv2-color-yellow);
        width: 45px;
        /* height: 45px; */
        padding: 13px 11px 10px 11px;
        display: block;
        text-align: center;
        background-image: linear-gradient(to top,  var(--main-color-white), var(--main-color-white),  var(--main-color-white), var(--transparent-color-3));
        box-shadow: var(--main-box-shadow);
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.5s ease-out;
    }
    article > :nth-child(1) > .social-media > * > a:hover{
        background: var(--main-color-yellow);
        color: var(--main-color-white);
        transform: translateY(-5px);
    }
    article > :nth-child(1) > .description > p{
        font-size: var( --wide-default-font-size);
        letter-spacing: 1.2px;
        color: var(--third-color-black);
        line-height: 1.5;
    }
    article > :nth-child(1) > .buttons{
        width: 100%;
        margin-top: 1.5em;
    }
    article > :nth-child(1) > .buttons > a > button{
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
    article > :nth-child(1) > .buttons > a > button:hover{
        background: var(--third-color-yellow);
        transform: translateY(-5px);
        color: var(--fourth-color-black);
    }
    article > :nth-child(2){
        width: 60%;
        margin-top: -3em;
    }
    article > :nth-child(2) > .image-container{
        width: 700px;
        text-align: center;
        height: 570px;
        border: none;
        margin: auto;
        position: relative;
        background-image: linear-gradient(to top, var(--main-color-yellow), var(--secondary-color-yellow), var(--third-color-yellow));
        border-radius: 31% 69% 36% 64% / 64% 36% 64% 36% ;
        /* overflow: hidden; */
    }
    article > :nth-child(2) > .image-container > .main-image {
        width: 100%;
        height: auto;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 98;
    }
    article > :nth-child(2) > .image-container > .main-image > img{
        width: 700px;
        height: 100%;
        object-fit: cover;
    }
    article > :nth-child(2) > .image-container > .sub-image > img{
        width: 200px;
        height: 100%;
        object-fit: cover;
    }
    article > :nth-child(2) > .image-container > .sub-image {
        position: absolute;
        z-index: 99;
        right: 2em;
        bottom: 2em;
    }
    .v-lazy-image-loaded {
        background: none !important;
        animation:  blur-effect 2s normal forwards ease-in-out !important;
    }

    @media screen and (max-width: 1300px){
        article > :nth-child(2){
            margin-top: 1em;
        }
        article > :nth-child(2) > .image-container{
            height: 480px;
            width: 600px;
        }
        article > :nth-child(2) > .image-container > .main-image > img{
            width: 600px;
        }
        article > :nth-child(2) > .image-container > .sub-image > img{
            width: 170px;
        }
    }
    @media screen and (max-width: 1100px){
        article > :nth-child(1) > .title > h1{
            font-size: var(--title-wide-default-font-size);
        }
        article > :nth-child(2){
            margin-top: 3em;
        }
        article > :nth-child(2) > .image-container{
            height: 400px;
            width: 450px;
        }
        article > :nth-child(2) > .image-container > .main-image > img{
            width: 500px;
        }
        article > :nth-child(2) > .image-container > .sub-image > img{
            width: 130px;
        }
    }
    @media screen and (max-width: 900px){
        article{
            flex-direction: column;
        }
        article > :nth-child(1){
            width: 100%;
            margin-top: 5em;
            order: 2;
        }
        article > :nth-child(1) > .title > h1{
            font-size: var(--title-ipad-default-font-size);
            white-space: inherit;
        }
        article > :nth-child(1) > .description > p{
            font-size: var( --ipad-default-font-size);
        }
        article > :nth-child(1) > hr{
            height: 0.5px;
            margin: 20px 0
        }
        article > :nth-child(1) > .social-media > * > a{
            font-size: 18px;
            width: 40px;
            padding: 11px 11px 8px 11px;
        }
        article > :nth-child(1) > .buttons > a > button{
            padding: 13px 17px;
            font-size: var(--ipad-default-font-size);
            letter-spacing: 1.7px;
        }

        article > :nth-child(2){
            width: 100%;
            margin-top: -2em;
            order: 1;
        }
        article > :nth-child(2) > .image-container{
            height: 350px;
            width: 400px;
        }
        article > :nth-child(2) > .image-container > .main-image > img{
            width: 450px;
        }
        article > :nth-child(2) > .image-container > .sub-image > img{
            width: 110px;
        }
    }
    @media screen and (max-width: 700px){
        article > :nth-child(1) > hr{
            width: 10em;
        }
        article > :nth-child(1) > .title > h1{
            font-size: var(--title-mobile-default-font-size);
        }
        article > :nth-child(1) > .description > p{
            font-size: var( --mobile-default-font-size);
        }
        article > :nth-child(1) > .social-media > * > a{
            font-size: 17px;
            width: 37px;
            padding: 10px 9px 7px 10px;
        }
        article > :nth-child(1) > .buttons > a > button{
            padding: 12px 16px;
            font-size: var(--mobile-default-font-size);
        }
        article > :nth-child(2) > .image-container{
            height: 300px;
            width: 350px;
        }
        article > :nth-child(2) > .image-container > .main-image > img{
            width: 400px;
        }
        article > :nth-child(2) > .image-container > .sub-image > img{
            width: 80px;
        }
    }
    @media screen and (max-width: 600px){
        article > :nth-child(2) > .image-container{
            height: 300px;
            width: 100%;
        }
        article > :nth-child(2) > .image-container > .main-image > img{
            width: 350px;
        }
        article > :nth-child(2) > .image-container > .sub-image > img{
            width: 80px;
        }
    }
    @media screen and (max-width: 400px){
        article > :nth-child(2) > .image-container{
            height: 250px;
            width: 100%;
        }
        article > :nth-child(2) > .image-container > .main-image > img{
            width: 100%;
        }
        article > :nth-child(2) > .image-container > .sub-image > img{
            width: 60px;
        }
        article > :nth-child(1) > .buttons {
            padding: 3px;
        }
        article > :nth-child(1) > .buttons > a > button{
            width: 100%;
        }
    }
</style>