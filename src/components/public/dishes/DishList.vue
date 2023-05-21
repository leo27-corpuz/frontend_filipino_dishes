<template>
    <article>
        <div class="header-dishes">
            <div class="header-sidebar animate__animated animate__pulse">
                <div class="categories">
                    <h4>Categories</h4>
                    <ul>
                        <router-link to="dishes"><li>Popular</li></router-link>
                        <router-link to="dishes"><li>Lunch</li></router-link>
                        <router-link to="dishes"><li>Breakfast</li></router-link>
                        <router-link to="dishes"><li>Dinner</li></router-link>
                        <router-link to="dishes"><li>Snacks</li></router-link>
                        <router-link to="dishes"><li>Desert</li></router-link>
                        <router-link to="dishes"><li>Exotic</li></router-link>
                    </ul>
                </div>
            </div>
            <div class="header-images">
                <div class="main-image">
                    <div class="image-wrap animate__animated animate__pulse">
                        <v-lazy-image src="/images/main-image.jpg"></v-lazy-image>
                    </div>
                </div>
                <div class="side-images">
                    <div class="side-main-image">
                        <div class="image-wrap animate__animated animate__pulse">
                            <v-lazy-image src="/images/side-image1.jpg"></v-lazy-image>
                        </div>
                    </div>
                    <div class="side-images-image">
                        <div class="image-wrap animate__animated animate__pulse">
                            <v-lazy-image src="/images/side-image2.jpg"></v-lazy-image>
                        </div>
                        <div class="image-wrap animate__animated animate__pulse">
                            <v-lazy-image src="/images/side-image3.jpg"></v-lazy-image>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="body-dishes">
            <div class="dishes-container">
                <div class="list-dishes show-screen">
                    <router-link :to="{
                        name: 'viewdish',
                        params: { name: 'adobo' }
                    }">
                        <div class="image">
                            <v-lazy-image src="/images/adobov1.jpg"></v-lazy-image>
                        </div>
                        <div class="title">
                            <p>Adobo</p>
                        </div>
                    </router-link>
                </div>
                <div class="list-dishes show-screen">
                    <router-link to="dishes">
                        <div class="image">
                            <v-lazy-image src="/images/sinigangv2.jpg"></v-lazy-image>
                        </div>
                        <div class="title">
                            <p>Sinigang</p>
                        </div>
                    </router-link>
                </div>
                <div class="list-dishes show-screen">
                    <router-link to="dishes">
                        <div class="image">
                            <v-lazy-image src="/images/resisig.jpg"></v-lazy-image>
                        </div>
                        <div class="title">
                            <p>Sisig</p>
                        </div>
                    </router-link>
                </div>
                <div class="list-dishes show-screen">
                    <router-link to="dishes">
                        <div class="image">
                            <v-lazy-image src="/images/lumpiav2.jpg"></v-lazy-image>
                        </div>
                        <div class="title">
                            <p>Lumpia</p>
                        </div>
                    </router-link>
                </div>
                <div class="list-dishes show-screen">
                    <router-link to="dishes">
                        <div class="image">
                            <v-lazy-image src="/images/karekare.jpg"></v-lazy-image>
                        </div>
                        <div class="title">
                            <p>Kare-Kare</p>
                        </div>
                    </router-link>
                </div>
                <div class="list-dishes show-screen">
                    <router-link to="dishes">
                        <div class="image">
                            <v-lazy-image src="/images/lechonpaksiw.jpg"></v-lazy-image>
                        </div>
                        <div class="title">
                            <p>Lechon Paksiw</p>
                        </div>
                    </router-link>
                </div>
                <div class="list-dishes show-screen">
                    <router-link to="dishes">
                        <div class="image">
                            <v-lazy-image src="/images/bikolexpress.jpg"></v-lazy-image>
                        </div>
                        <div class="title">
                            <p>Bicol Express</p>
                        </div>
                    </router-link>
                </div>
                <div class="list-dishes show-screen">
                    <router-link to="dishes">
                        <div class="image">
                            <v-lazy-image src="/images/Tinola.jpg"></v-lazy-image>
                        </div>
                        <div class="title">
                            <p>Tinolang Manok</p>
                        </div>
                    </router-link>
                </div>
                <div class="list-dishes show-screen">
                    <router-link to="dishes">
                        <div class="image">
                            <v-lazy-image src="/images/pakbet.jpg"></v-lazy-image>
                        </div>
                        <div class="title">
                            <p>Pinakbet</p>
                        </div>
                    </router-link>
                </div>
                <div class="list-dishes show-screen">
                    <router-link to="dishes">
                        <div class="image">
                            <v-lazy-image src="/images/dinuguan.jpg"></v-lazy-image>
                        </div>
                        <div class="title">
                            <p>Dinuguan</p>
                        </div>
                    </router-link>
                </div>
                <div class="list-dishes show-screen">
                    <router-link to="dishes">
                        <div class="image">
                            <v-lazy-image src="/images/bulalo.jpg"></v-lazy-image>
                        </div>
                        <div class="title">
                            <p>Bulalo</p>
                        </div>
                    </router-link>
                </div>
            </div>
            <div class="view-more show-screen">
                <router-link to="dishes"><linkButton> Load More </linkButton></router-link>
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
    },
//     data(){
//         return{
//             routePlace: this.$route.params.place,
//             routeType: this.$route.params.type
//         }
//     },
//     watch: {
//     // whenever question changes, this function will run
//         '$route.params.place': function(newVal, oldVal) {
//         // Update the component based on the new value of the "id" parameter
//              this.routePlace = newVal 
//         },
//         '$route.params.type': function(newVal, oldVal) {
//         // Update the component based on the new value of the "id" parameter
//              this.routeType = newVal 
//         }
//   },
}
</script>
<style scoped>
    article{
        padding: 15px 0 !important; 
        margin: 2em auto 0 auto;
    }
    article > .header-dishes{
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    article > .header-dishes > .header-sidebar{
        width: 27%;
        overflow: hidden;
        overflow-y: scroll;
        /* position: absolute; */
        padding: 40px;
        height: 25em;
        border-radius: 5px;
        background-image: linear-gradient(to bottom, var(--main-color-white), var(--main-color-white),  var(--main-color-white), var(--transparent-color-3));
    }
    
    article > .header-dishes > .header-sidebar::-webkit-scrollbar-thumb{
    background-color:var(--main-color-yellow);
    border-radius:2em;
    border:1px solid var(--main-color-yellow);
    }
    article > .header-dishes > .header-sidebar::-webkit-scrollbar-thumb:hover{
        background-color: var(--main-color-yellow);
        border:1px solid var(--main-color-yellow);
    }
        
    article > .header-dishes > .header-sidebar::-webkit-scrollbar {
        width: 7px;
        height:7px;
    }
    article > .header-dishes > .header-sidebar > .categories{
        width: 100%;
    }
    article > .header-dishes > .header-sidebar > .categories > h4{
        letter-spacing: 1.5px;
        font-weight: 800;
        font-size: var(--wide-default-font-size);
        color: var(--fourth-color-black);
        white-space: nowrap;
    }
    article > .header-dishes > .header-sidebar > .categories > ul{
        margin-top: 20px;
    }
    article > .header-dishes > .header-sidebar > .categories > ul > a > li{
        letter-spacing: 2.5px;
        font-size: var(--ipad-default-font-size);
        line-height: 1.5;
        cursor: pointer;
        transition: all 0.5s ease-out;
        color: var(--fourth-color-black);
        white-space: nowrap;
        position: relative;
        width: 100%;
        margin-bottom: 15px;
        border-radius: 7px;
    }
    article > .header-dishes > .header-images{
        width: 71%;
        display: flex;
        flex-direction: row;
        grid-gap: 20px;
        align-items: flex-start;
        height: auto;
    }
    article > .header-dishes > .header-images > *{
        flex: 1 1 40%;
    }
    article > .header-dishes > .header-images > .main-image > .image-wrap > img{
        width: 100% !important;
        height: 25em;
        object-fit: cover;
        border-radius: 5px 0 0 5px;
    }
    /* article > .header-images > .main-image{
        width: 100%;
        background: red;
    } */
    article > .header-dishes > .header-images > .side-images > .side-main-image > .image-wrap > img{
        width: 100%;
        height: 11.9em;
        object-fit: cover;
        border-radius: 0 5px 0 0;
    }
    article > .header-dishes > .header-images > .side-images > .side-images-image{
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        margin-top: 15px;
        grid-gap: 15px;
    }
    article > .header-dishes > .header-images > .side-images > .side-images-image > .image-wrap{
        width: 50%;
    }
    article > .header-dishes > .header-images > .side-images > .side-images-image > .image-wrap > img{
        width: 100%;
        height: 11.9em;
        object-fit: cover;
    }
    article > .header-dishes > .header-images > .side-images > .side-images-image > :nth-child(2) > img{
        border-radius: 0 0 5px 0;
    }
    

    .body-dishes > .dishes-container{
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        grid-gap: 30px;
        justify-content: space-around;
        margin: 4em auto 0 auto;
    }
    .body-dishes > .dishes-container > *{
        width: 23%;
        background-image: linear-gradient(to bottom, var(--main-color-white), var(--main-color-white),  var(--main-color-white), var(--transparent-color-3));
        border-radius: 15px;
        transition: all 1s ease-in-out;
        position: relative;
        /* perspective: 1000px; */
        cursor: pointer;
        padding: 20px 15px; 
    }
    .body-dishes > .dishes-container > * > a > .image{
        width: 100%;
        text-align: center;
        height: 220px;
        border-radius: 5px;
        margin: auto;
    }
    .body-dishes > .dishes-container > * > a > .image > img{
        width: 220px; /* set the desired width */
        height: 220px; /* set the desired height */
        object-fit: cover; /* ensure the image fills the container */
        transition: all 0.5s ease-out;
        border-radius: 50%;
    }
    .body-dishes > .dishes-container > *:hover .image > img{
        transform: scale(1.07);
    }
    .body-dishes > .dishes-container > * > a > .title{
        width: 100%;
        text-align: center;
        margin-top: 20px;
    }
    .body-dishes > .dishes-container > * > a > .title > p{
        letter-spacing: 1.5px;
        font-weight: 600;
        font-size: var(--wide-default-font-size);
        color: var(--fourth-color-black);
        white-space: nowrap;
    }
    .body-dishes > .view-more{
        margin-top: 3em;
        width: 100%;
        text-align: center;
    }
    .body-dishes > .view-more > a > button{
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
    .body-dishes > .view-more > a > button:hover{ 
        background: var(--third-color-yellow);
        transform: translateY(-5px);
        color: var(--fourth-color-black);
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
    @media screen and (max-width: 1300px){
        .body-dishes > .dishes-container > * > a > .image{
            height: 180px;
        }
        .body-dishes > .dishes-container > * > a > .image > img{
            width: 180px; /* set the desired width */
            height: 180px; /* set the desired height */
        }
        .body-dishes > .dishes-container > *{
            width:15em;
        }
    }
    @media screen and (max-width: 1100px){
        .body-dishes > .dishes-container > *{
            width:47%;
        }
    }
    @media screen and (max-width: 900px){
        .body-dishes > .view-more > a > button{
            padding: 13px 17px;
            font-size: var(--ipad-default-font-size);
            letter-spacing: 1.7px;
        }
        article > .header-dishes{
            flex-direction: column;
            margin-top: -2em;
        }
        article > .header-dishes > .header-sidebar{
            width: 100%;
            height: auto;
            padding: 15px;
            margin: 0 0 20px 0;
        }
        article > .header-dishes > .header-sidebar > .categories{
            display: flex;
            height: auto;
            align-items: flex-start;
            grid-gap: 20px;
        }
        article > .header-dishes > .header-sidebar > .categories > ul{
            display: flex;
            height: auto;
            align-items: flex-start;
            grid-gap: 20px;
            width: 100%;
            overflow-x: scroll;
        }
        article > .header-dishes > .header-sidebar > .categories > ul::-webkit-scrollbar-thumb{
            background-color:var(--main-color-yellow);
            border-radius:2em;
            border:1px solid var(--main-color-yellow);
        }
        article > .header-dishes > .header-sidebar > .categories > ul::-webkit-scrollbar-thumb:hover{
            background-color: var(--main-color-yellow);
            border:1px solid var(--main-color-yellow);
        }
            
        article > .header-dishes > .header-sidebar > .categories > ul::-webkit-scrollbar {
            width: 6px;
            height:6px;
        }
        article > .header-dishes > .header-sidebar > .categories > h4{
            margin: auto 0;
            font-size: var(--ipad-default-font-size);
        }
        article > .header-dishes > .header-images{
            width: 100%;
        }
        article > .header-dishes > .header-images > *{
            flex: inherit;
        }
        article > .header-dishes > .header-images > .main-image{
            width: 60%;
        }
        article > .header-dishes > .header-images > .side-images{
            width: 40%
        }
        article > .header-dishes > .header-images > .main-image > .image-wrap > img{
            height: 20em;
        }
        article > .header-dishes > .header-images > .side-images > .side-main-image > .image-wrap > img{
            height: 9.4em;
        }
        article > .header-dishes > .header-images > .side-images > .side-images-image > .image-wrap > img{
            height: 9.4em;
        }
        .body-dishes > .dishes-container > * > a > .title > p{
            font-size: var(--ipad-default-font-size);
        }
    }
    @media screen and (max-width: 700px){
        .body-dishes > .view-more > a > button{
            padding: 12px 16px;
            font-size: var(--mobile-default-font-size);
        }
        article > .header-dishes > .header-sidebar > .categories > h4{
            margin: auto 0;
            font-size: var(--mobile-default-font-size);
        }
        article > .header-dishes > .header-sidebar > .categories > ul > a > li{
            font-size: var(--mobile-default-font-size);
        }
        article > .header-dishes > .header-images{
            flex-direction: column;
        }
        article > .header-dishes > .header-images > .main-image{
            width: 100%;
        }
        article > .header-dishes > .header-images > .side-images{
            width: 100%;
        }
        article > .header-dishes > .header-images > .main-image > .image-wrap > img{
            height: 10em;
            border-radius: 5px 5px 0 0;
            margin-bottom: -0.8em;
        }
        article > .header-dishes > .header-images > .side-images > .side-main-image > .image-wrap > img{
            height: 10em;
            border-radius: 0;
            margin-bottom: -0.5em;
        }
        article > .header-dishes > .header-images > .side-images > .side-images-image > .image-wrap > img{
            height: 10em;
        }
        article > .header-dishes > .header-images > .side-images > .side-images-image > :nth-child(1) > img{
            border-radius: 0 0 0 5px;
        }
        article > .header-dishes > .header-images > .side-images > .side-images-image > :nth-child(2) > img{
            border-radius: 0 0 5px 0;
        }
        .body-dishes > .dishes-container > * > a > .title > p{
            font-size: var(--mobile-default-font-size);
        }
        article > .header-dishes > .header-sidebar > .categories{
            flex-direction: column;
        }
        article > .header-dishes > .header-sidebar > .categories > ul{
            margin-top: 5px;
        }
    }
    @media screen and (max-width: 600px){
        .body-dishes > .dishes-container > *{
            width:100%;
        }
        .body-dishes > .dishes-container > * > a > .image{
            height: 150px;
        }
        .body-dishes > .dishes-container > * > a > .image > img{
            width: 150px; /* set the desired width */
            height: 150px; /* set the desired height */
        }
    }
    @media screen and (max-width: 400px){
        .body-dishes > .dishes-container > * > a > .image{
            height: 100px;
        }
        .body-dishes > .dishes-container > * > a > .image > img{
            width: 100px; /* set the desired width */
            height: 100px; /* set the desired height */
        }
    }
</style>