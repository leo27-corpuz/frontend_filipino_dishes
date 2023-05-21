<template>
    <article>
        <div class="container-article">
            <div class="title show-screen">
                <h3>Founders</h3>
            </div>
            <hr class="show-screen">
            <div class="description">
              <p class="show-screen">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, voluptates dolore nobis obcaecati quaerat doloribus raciis ipsum? Delectus tempora veniam aliquam id ea beatae quaerat, praesentium mollitia fugit soluta dolor provident voluptatibus!</p>
            </div>
        </div>
        <div class="container-article founer-list">
            <div class="card show-screen">
                <div class="profile">
                    <v-lazy-image src="/images/pro2.jpg"></v-lazy-image>
                </div>
                <div class="information">
                    <h4>Eliana Demara</h4>
                    <p>CEO & Founder</p>
                </div>
            </div>
            <div class="card show-screen">
                <div class="profile">
                    <v-lazy-image src="/images/pro.jpg"></v-lazy-image>
                </div>
                <div class="information">
                    <h4>Kai Nova</h4>
                    <p>President & Co-founder</p>
                </div>
            </div>
            <div class="card show-screen">
                <div class="profile">
                    <v-lazy-image src="/images/founderexample.png"></v-lazy-image>
                </div>
                <div class="information">
                    <h4>Luca Dwaine</h4>
                    <p>Co-founder</p>
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
    article >  .container-article > .description{
        width: 100%;
        margin-top: 1.5em;
    }
    article >  .container-article > .description > p{
        font-size: var( --wide-default-font-size);
        letter-spacing: 1.2px;
        color: var(--third-color-black);
        line-height: 1.5;
        margin-bottom: 20px;
        text-align: center;
    }
    hr{
        border: none;
        height: 0.5px;
        margin: 20px auto;
        border-radius: 20px;
        width: 12em;
        background-color: var(--main-color-yellow);
    }
    .founer-list{
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        grid-gap: 25px;
        margin-top: 4em;
    }
    .founer-list > *{
        width: 30%;
        background-image: linear-gradient(to top, var(--main-color-white), var(--main-color-white),  var(--main-color-white), var(--transparent-color-3));
        padding: 70px 20px;
        box-shadow: var(--main-box-shadow);
        border-radius: 15px;
    }
    .founer-list > * > .profile{
        width: 70%;
        height: 150px;
        margin: auto;
        text-align: center;
        background: rgba(219, 133, 3, 0.3);
        border-radius: 66% 34% 52% 48% / 70% 56% 44% 30% ;
        position: relative;
    }
    .founer-list > * > .profile > img{
        width: 200px;
        height: 200px;
        object-fit: cover;
        border-radius: 50%;
        left: 50%;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .founer-list > * > .information{
        margin-top: 40px;
        text-align: center;
    }
    .founer-list > * > .information > h4{
        font-size: var( --wide-default-font-size);
        letter-spacing: 1px;
        color: var(--fourth-color-black);
        line-height: 1.3;
        text-align: center;
        font-weight: 700;
        white-space: nowrap;
    }
    .founer-list > * > .information > p{
        font-size: var( --mobile-default-font-size);
        letter-spacing: 1px;
        color: var(--main-color-yellow);
        line-height: 1.3;
        text-align: center;
        margin-top: 10px;
        white-space: nowrap;
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
        .founer-list > *{
            width:20em;
        }
        .founer-list > * > .profile{
            width: 100%;
            height: 130px; 
        }
        .founer-list > * > .profile > img{
            width: 180px; /* set the desired width */
            height: 180px; /* set the desired height */
        }
    }
    @media screen and (max-width: 1100px){
        .founer-list > *{
            width:30%;
        }
    }
    @media screen and (max-width: 900px){
        article > .container-article > .title > h3{
            font-size: var(--subtitle-ipad-default-font-size);
        }
        article >  .container-article > .description > p{
            font-size: var( --ipad-default-font-size);
        }
        .founer-list > * > .information > h4{
            font-size: var( --ipad-default-font-size);
        }
    }
    @media screen and (max-width: 700px){
        .founer-list > *{
            width:100%;
        }
        article > .container-article > .title > h3{
            font-size: var(--subtitle-mobile-default-font-size);
        }
        article >  .container-article > .description > p{
            font-size: var( --mobile-default-font-size);
        }
        .founer-list > * > .information > h4{
            font-size: var( --mobile-default-font-size);
        }
    }
    @media screen and (max-width: 600px){
        .founer-list > * > .profile{
            height: 100px; 
        }
        .founer-list > * > .profile > img{
            width: 150px; /* set the desired width */
            height: 150px; /* set the desired height */
        }
    }
    @media screen and (max-width: 400px){
        .founer-list > * > .profile{
            height: 50px; 
        }
        .founer-list > * > .profile > img{
            width: 100px; /* set the desired width */
            height: 100px; /* set the desired height */
        }
    }
</style>