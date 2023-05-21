<template>
    <article>
        <div class="container-article header-popular-dishes">
            <div class="title show-screen">
                <h3>Popular Filipino Dishes</h3>
            </div>
            <hr class="show-screen">
            <div class="description show-screen">
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos qui nam itaque quo doloremque expedita optio maxime molestias at esse!</p>
            </div>
        </div>
        <div class="container-article body-popular-dishes">
            <div class="list-dishes show-screen" v-for="(dish, index) in popularDishes">
                <router-link to="/dishes">
                    <div class="image">
                        <v-lazy-image :src="dish.img"></v-lazy-image>
                    </div>
                    <div class="title">
                        <p>{{ dish.title }}</p>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="view-more show-screen">
            <router-link to="dishes"><linkButton> View All </linkButton></router-link>
        </div>
    </article>
</template>
<script>
import linkButton from '../../essentials/linkButton.vue'
import VLazyImage from "v-lazy-image";
export default{
    data(){
        return {
            popularDishes: [
                {
                    img: '/images/adobov1.jpg',
                    title: 'Adobo',
                },
                {
                    img: '/images/sinigangv2.jpg',
                    title: 'Sinigang',
                },
                {
                    img: '/images/lumpiav2.jpg',
                    title: 'Lumpia',
                },
                {
                    img: '/images/resisig.jpg',
                    title: 'Sisig',
                },
            ],
        }
    },
    components: {
        linkButton, VLazyImage
    },
    // computed: {
    //     descriptionLimitText(){
    //         this.popularDishes.forEach((data) => {
    //             let splitBySpace = data.description.split(' ').slice(0, 19)
    //             if(data.description.split(' ').length > 19){
    //                 let lastWord = `${splitBySpace[18]}...`
    //                 splitBySpace.pop()
    //                 splitBySpace.push(lastWord)
    //             }
    //             let newDesc = splitBySpace.join(' ')
    //             this.descriptionHoldLimit.push(newDesc)
    //         })
    //         return this.descriptionHoldLimit
    //     }
    // }
}
</script>
<style scoped>
    article{
        margin: 12em auto 0 auto;
    }
    article > :nth-child(1){
        width: 100%;
    }
    article > :nth-child(1) > .title{
        width: 100%;
        position: relative;
        z-index: 99;
    }
    article > :nth-child(1) > .title > h3{
        letter-spacing: 3px;
        font-weight: 800;
        font-size: var(--subtitle-wide-default-font-size);
        color: var(--fourth-color-black);
        text-align: center;
    }
    article > :nth-child(1) > .description{
        width: 75%;
        margin: 1.5em auto 0 auto;
        margin-top: 1.5em;
    }
    article > :nth-child(1) > .description > p{
        font-size: var( --wide-default-font-size);
        letter-spacing: 1.2px;
        color: var(--third-color-black);
        line-height: 1.5;
        text-align: center;
    }
    article > :nth-child(1) > hr{
        border: none;
        height: 0.5px;
        margin: 15px auto;
        border-radius: 20px;
        width: 15em;
        background-color: var(--main-color-yellow);
    }
    article > :nth-child(2){
        width: 100%;
        margin: 4em auto 0 auto;
        display: flex;
        flex-wrap: wrap;
        grid-gap: 30px;
        justify-content: space-around;
        padding: 0;
    }
    article > :nth-child(2) > *{
        /* flex: 1 1 20%; */
        width: 23%;
        background-image: linear-gradient(to bottom, var(--main-color-white), var(--main-color-white),  var(--main-color-white), var(--transparent-color-3));
        border-radius: 15px;
        transition: all 1s ease-in-out;
        position: relative;
        /* perspective: 1000px; */
        cursor: pointer;
        padding: 20px 15px; 
    }
    article > :nth-child(2) > *:hover .image > img{
        transform: scale(1.07);
    }
    article > :nth-child(2) > * > a > .image{
        width: 100%;
        text-align: center;
        height: 220px;
        border-radius: 5px;
        margin: auto;
    }
    article > :nth-child(2) > * > a > .image > img{
        width: 220px; /* set the desired width */
        height: 220px; /* set the desired height */
        object-fit: cover; /* ensure the image fills the container */
        transition: all 0.5s ease-out;
        border-radius: 50%;
    }
    article > :nth-child(2) > * > a > .title {
        width: 100%;
        text-align: center;
        margin-top: 20px;
    }
    
    article > :nth-child(2) > * > a > .title > p{
        letter-spacing: 1.3px;
        line-height: 1.5;
        font-size: var(--wide-default-font-size);
        color: var(--fourth-color-black);
        font-weight: 700;
    }
    .view-more{
        margin-top: 3em;
        width: 100%;
        text-align: center;
    }
    .view-more > a > button{
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
    .view-more > a > button:hover{ 
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
    }
    .v-lazy-image-loaded {
        background: none !important;
        animation:  blur-effect 2s normal forwards ease-in-out !important;
    }
    @media screen and (max-width: 1300px){
        article > :nth-child(2) > *{
        /* flex: 1 1 20%; */
            width:15em;
        }
        article > :nth-child(2) > * > a > .image > img{
            width: 180px; /* set the desired width */
            height: 180px; /* set the desired height */
        }
        article > :nth-child(2) > * > a > .image{
            height: 180px;
        }
    }
    @media screen and (max-width: 1100px){
        article > :nth-child(2) > *{
        /* flex: 1 1 20%; */
            width:47%;
        }
    }
    @media screen and (max-width: 900px){
        article > :nth-child(1) > .title > h3{
            font-size: var(--subtitle-ipad-default-font-size);
        }
        article > :nth-child(1) > .description > p{
            font-size: var( --ipad-default-font-size);
        }
        article > :nth-child(2) > * > a > .title > p{
            font-size: var(--ipad-default-font-size);
        }
        .view-more > a > button{
            padding: 13px 17px;
            font-size: var(--ipad-default-font-size);
            letter-spacing: 1.7px;
        }
    }
    @media screen and (max-width: 700px){
        article > :nth-child(1) > hr{
            width: 10em;
        }
        article > :nth-child(2) > * > a > .title > p{
            font-size: var(--mobile-default-font-size);
        }
        article > :nth-child(1) > .description > p{
            font-size: var( --mobile-default-font-size);
        }
        .view-more > a > button{
            padding: 12px 16px;
            font-size: var(--mobile-default-font-size);
        }
        article > :nth-child(1) > .description{
            width: 100%;
        }
    }
    @media screen and (max-width: 600px){
        article > :nth-child(2) > *{
        /* flex: 1 1 20%; */
            width:100%;
        }
        article > :nth-child(2) > * > a > .image > img{
            width: 150px; /* set the desired width */
            height: 150px; /* set the desired height */
        }
        article > :nth-child(2) > * > a > .image{
            height: 150px;
        }
    }
    @media screen and (max-width: 400px){
        article > :nth-child(2) > * > a > .image > img{
            width: 100px; /* set the desired width */
            height: 100px; /* set the desired height */
        }
        article > :nth-child(2) > * > a > .image{
            height: 100px;
        }
    }
</style>