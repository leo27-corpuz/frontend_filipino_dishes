<template>
    <article>
        <div class="container-article">
            <div class="title show-screen">
                <h3>Who we are</h3>
            </div>
            <hr class="show-screen">
            <div class="contents">
                <div class="sideimage show-screen">
                    <v-lazy-image src="/images/image.jpeg"></v-lazy-image>
                </div>
                <div class="description">
                    <p class="show-screen">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, neque. Sequi, culpa suscipit placeat porro quos laudantium similique consectetur hic unde ut deleniti omnis provident numquam quidem ratione consequuntur? Numquam magnam in, inventore eius esse dicta fuga unde recusandae veritatis animi a corrupti consequuntur fugit minus, amet dolor! Quasi, laudantium.
                    </p>
                    <p class="show-screen">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, neque. Sequi, culpa suscipit placeat porro quos laudantium similique consectetur hic unde ut deleniti omnis provident numquam quidem ratione consequuntur? Numquam magnam in, inventore eius esse dicta fuga unde recusandae veritatis animi a corrupti consequuntur fugit minus, amet dolor! Quasi, laudantium! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, consequuntur?
                    </p>
                    <p class="show-screen">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, neque. Sequi, culpa suscipit placeat porro quos laudantium similique consectetur hic unde ut deleniti omnis provident numquam quidem ratione consequuntur? Numquam magnam in, inventore eius esse dicta fuga unde recusandae veritatis animi a corrupti consequuntur fugit minus, amet dolor! Quasi, laudantium.
                    </p>
                    <p class="show-screen">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, neque. Sequi, culpa suscipit placeat porro quos laudantium similique consectetur Lorem ipsum dolor sit amet.
                    </p>
                </div>
            </div>
        </div>
    </article>
</template>
<script>
import VLazyImage from "v-lazy-image";
export default{
    components: {
        VLazyImage
    }
}
</script>
<style scoped>
    article{
        margin: 7em auto 0 auto;
    }
    article >  .container-article > .title{
        width: 100%;
    }
    article > .container-article > .title > h3{
        letter-spacing: 3px;
        font-weight: 800;
        font-size: var(--subtitle-wide-default-font-size);
        color: var(--fourth-color-black);
        text-align: center;
    }
   
    article >  .container-article > .contents > .sideimage > img{
        width: 300px;
        height: 300px;
        object-fit: cover;
        border-radius: 50%;
        float: left;
        margin-right: 30px;
        margin-bottom: 5px;
        shape-outside: circle(50%);
    }
    article >  .container-article > .contents > .description{
        width: 100%;
        margin-top: 1.5em;
    }
    article >  .container-article > .contents > .description > p{
        font-size: var( --wide-default-font-size);
        letter-spacing: 1.2px;
        color: var(--third-color-black);
        line-height: 1.5;
        margin-bottom: 20px;
    }
    hr{
        border: none;
        height: 0.5px;
        margin: 20px auto;
        border-radius: 20px;
        width: 12em;
        background-color: var(--main-color-yellow);
    }
    .v-lazy-image {
        background: #eee;
        background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
        border-radius: 5px;
        background-size: 200% 100%;
        animation: 1.5s shine linear infinite;
    }
    .v-lazy-image-loaded {
        background: none !important;
        animation:  blur-effect 2s normal forwards ease-in-out !important;
    }
    @media screen and (max-width: 1300px){
        article >  .container-article > .contents > .sideimage > img{
            width: 250px;
            height: 250px;
        }
    }
    @media screen and (max-width: 1100px){
        article > .container-article > .title > h3{
            font-size: var(--title-ipad-default-font-size);
        }
    }
    @media screen and (max-width: 900px){
        article >  .container-article > .contents > .description > p{
            font-size: var( --ipad-default-font-size);
        }
        article >  .container-article > .contents > .sideimage > img{
            width: 200px;
            height: 200px;
        }
    }
    @media screen and (max-width: 700px){
        hr{
            width: 7em;
        }
        article >  .container-article > .contents > .description > p{
            font-size: var( --mobile-default-font-size);
        }
        article >  .container-article > .contents > .sideimage > img{
            width: 200px;
            height: 200px;
        }
        article > .container-article > .title > h3{
            font-size: var(--title-mobile-default-font-size);
        }
    }
    @media screen and (max-width: 600px){
        article >  .container-article > .contents > .sideimage > img{
            width: 150px;
            height: 150px;
        }
    }
    @media screen and (max-width: 400px){
        article >  .container-article > .contents > .sideimage > img{
            width: 120px;
            height: 120px;
        }
    }
</style>