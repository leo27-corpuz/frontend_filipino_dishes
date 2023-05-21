<template>
    <div class="article">
        <div class="images-slider-container">
            <div class="arrow-left">
                <i class="fa-solid fa-angle-left" @click="toLeft()"></i>
            </div>
            <div class="carousel-slider animate__animated animate__pulse">
                <carousel-slide v-for="(image, index) in dishCarouselImages"
                :index="index"
                :visibleSlide="visibleSlide"
                :direction="direction"
                >
                    <v-lazy-image :src="image"></v-lazy-image>
                </carousel-slide>
            </div>
            <div class="arrow-right">
                <i class="fa-solid fa-angle-right" @click="toRight(visibleSlide)"></i>
            </div>
        </div>
        <div class="slider-indicator">
            <template v-for="(image, index) in dishCarouselImages" >
                <div class="indicator animate__animated animate__pulse" 
                :class="[
                    index === visibleSlide ? 'active-indicator': '', 
                    index+1 === maxIndicator && maxIndicator < getTotalImage ? 'moreindicator' : '',
                    index === lessIndicator ? 'lessindactor' : '']" 
                v-if="index < maxIndicator && counterIndicator <= index"></div>
            </template>
        </div>
    </div>
    <article>
        <div class="dish-information">
            <div class="title show-screen">
                <h3>Adobo</h3>
            </div>
            <hr class="show-screen">
            <div class="description show-screen">
                <p class="show-screen">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, neque. Sequi, culpa suscipit placeat porro quos laudantium similique consectetur hic unde ut deleniti omnis provident numquam quidem ratione consequuntur? Numquam magnam in, inventore eius esse dicta fuga unde recusandae veritatis animi a corrupti consequuntur fugit minus, ametdolor! Quasi, laudantium. Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, itaque. Laboriosam nulla, hic corrupti nam laudantium voluptatibus dicta dignissimos, minus blanditiis maxime fugiat aspernatur perspiciatis natus debitis, unde sint pariatur officia quo soluta odio libero quod quia deleniti! Corrupti dolores corporis, hic possimus dolore iste nihil accusantium nemo inventore itaque?
                </p>
            </div>
        </div>
        <div class="ingredients-container">
            <div class="title show-screen">
                <h3>Ingredients</h3>
            </div>
            <div class="ingredients-list">
                <div class="ingredient show-screen">
                    <div class="ingredient-image">
                        <v-lazy-image src="/images/oil.jpg"></v-lazy-image>
                    </div>
                    <div class="ingredient-title">
                        <p>2 tbsp canola oil</p>
                    </div>
                </div>
                <div class="ingredient show-screen">
                    <div class="ingredient-image">
                        <v-lazy-image src="/images/garliccrush.jpg"></v-lazy-image>
                    </div>
                    <div class="ingredient-title">
                        <p>6 cloves garlic crushed</p>
                    </div>
                </div>
                <div class="ingredient show-screen">
                    <div class="ingredient-image">
                        <v-lazy-image src="/images/sliceonion.jpg"></v-lazy-image>
                    </div>
                    <div class="ingredient-title">
                        <p>1 pc onion, sliced</p>
                    </div>
                </div>
                <div class="ingredient show-screen">
                    <div class="ingredient-image">
                        <v-lazy-image src="/images/chicken.jpg"></v-lazy-image>
                    </div>
                    <div class="ingredient-title">
                        <p>1 kilogram chicken cut ups</p>
                    </div>
                </div>
                <div class="ingredient show-screen">
                    <div class="ingredient-image">
                        <v-lazy-image src="/images/vinigar.jpg"></v-lazy-image>
                    </div>
                    <div class="ingredient-title">
                        <p>2 tbsp vinegar</p>
                    </div>
                </div>
                <div class="ingredient show-screen">
                    <div class="ingredient-image">
                        <v-lazy-image src="/images/soysause.jpg"></v-lazy-image>
                    </div>
                    <div class="ingredient-title">
                        <p>1/4 cup soy sauce</p>
                    </div>
                </div>
                <div class="ingredient show-screen">
                    <div class="ingredient-image">
                        <v-lazy-image src="/images/water.jpg"></v-lazy-image>
                    </div>
                    <div class="ingredient-title">
                        <p>1 cup water</p>
                    </div>
                </div>
                <div class="ingredient show-screen">
                    <div class="ingredient-image">
                        <v-lazy-image src="/images/leaves.jpg"></v-lazy-image>
                    </div>
                    <div class="ingredient-title">
                        <p>2 pcs bay leaves</p>
                    </div>
                </div>
                <div class="ingredient show-screen">
                    <div class="ingredient-image">
                        <v-lazy-image src="/images/peppercorns.jpg"></v-lazy-image>
                    </div>
                    <div class="ingredient-title">
                        <p>1 tsp whole black peppercorns, slightly crushed</p>
                    </div>
                </div>
                <div class="ingredient show-screen">
                    <div class="ingredient-image">
                        <v-lazy-image src="/images/knor.jpg"></v-lazy-image>
                    </div>
                    <div class="ingredient-title">
                        <p>2 pc Knorr chicken cubes</p>
                    </div>
                </div>
                <div class="ingredient show-screen">
                    <div class="ingredient-image">
                        <v-lazy-image src="/images/sugar.jpg"></v-lazy-image>
                    </div>
                    <div class="ingredient-title">
                        <p>1 tsp brown sugar packed</p>
                    </div>
                </div>
                <div class="ingredient show-screen">
                    <div class="ingredient-image">
                        <v-lazy-image src="/images/gula.jpeg"></v-lazy-image>
                    </div>
                    <div class="ingredient-title">
                        <p>Option: 1 cup kale or spinach</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="how-to-cook-container">
            <div class="title">
                <h3 class="show-screen">How to Cook</h3>
            </div>
            <div class="process-list">
                <div class="process show-screen">
                    <div class="title">
                        <i class="fa-solid fa-circle"></i> <h4>Step 1</h4>
                    </div>
                    <div class="description">
                        <p>Heat oil in pan and sauté garlic and onions. Then add chicken to the pan and sear on all sides, until you have a little browning in the chicken skin.</p>
                    </div>
                </div>
                <div class="process show-screen">
                    <div class="title">
                        <i class="fa-solid fa-circle"></i> <h4>Step 2</h4>
                    </div>
                    <div class="description">
                        <p>Pour in vinegar, soy sauce and water. Add bay leaves, pepper and Knorr Chicken Cubes. Bring to a boil over high heat then reduce heat to simmer, but do not cover the pan. Continue to simmer for 10 mins.</p>
                    </div>
                </div>
                <div class="process show-screen">
                    <div class="title">
                        <i class="fa-solid fa-circle"></i> <h4>Step 3</h4>
                    </div>
                    <div class="description">
                        <p>Remove chicken pieces from sauce and fry in another pan until nicely browned.</p>
                    </div>
                </div>
                <div class="process show-screen">
                    <div class="title">
                        <i class="fa-solid fa-circle"></i> <h4>Step 4</h4>
                    </div>
                    <div class="description">
                        <p>Put back fried chicken pieces into sauce. Add sugar and let simmer again for another 10 minutes or until sauce has thickened. Serve warm.</p>
                    </div>
                </div>
            </div>
        </div>
    </article>
</template>
<script>
import carouselSlide from '../../essentials/carouselImage.vue'
import VLazyImage from "v-lazy-image";
export default{
    data(){
        return {
            dishCarouselImages: ['/images/adobov1.jpg', '/images/adobov2.jpg', '/images/adobov3.jpg', '/images/adobov4.jpeg', '/images/adobov5.jpg', '/images/adobov6.jpg'],
            visibleSlide: 0,
            timeoutId: '',
            maxIndicator: 5,
            lessIndicator: null,
            counterIndicator: 0,
            direction: 'left'
        }
    },
    components:{
        carouselSlide, VLazyImage
    },
    computed:{
        getTotalImage(){
            return this.dishCarouselImages.length
        },
    },
    mounted(){
        this.autoCarousel()
    },
    methods: {
        autoCarousel(){
            setTimeout(() => {
                this.toRightFunctionality()
            }, 3000)
            this.timeoutId = setTimeout(() => {
                this.autoCarousel();
            }, 3000);
        },
        toRight(){
            clearTimeout(this.timeoutId);
            this.toRightFunctionality()
        },

        toLeft(){
            this.direction = 'right'
            clearTimeout(this.timeoutId);
            // if the visible slide  greater than 0 visible slide will decrement
            if(this.visibleSlide > 0) {
                this.visibleSlide--
                if(this.maxIndicator > 5){
                    if (this.lessIndicator === this.visibleSlide) {
                        this.maxIndicator--
                        this.counterIndicator--
                        this.lessIndicator--
                    }
                    if (this.lessIndicator === 0) {
                        this.lessIndicator = null
                    }
                }
            }
            else{
                //if not the visible get the value of total images
                this.visibleSlide = this.dishCarouselImages.length - 1
                this.maxIndicator = this.dishCarouselImages.length + 1
                this.counterIndicator = this.dishCarouselImages.length - 4
                this.lessIndicator = this.dishCarouselImages.length - 4
            }
        },
        toRightFunctionality(){
            this.direction = 'left'
            //if the visibible slide less than the total images the visible slide will increment
            if(this.visibleSlide < this.dishCarouselImages.length-1) {
                this.visibleSlide++
            }
            else{
                //if not back to default
                this.visibleSlide = 0
                this.maxIndicator = 5
                this.counterIndicator = 0
                this.lessIndicator = null
            }

            //if the visible is equal to the max indicator it increment the maxindicator and counterIndicator
            if(this.visibleSlide+1 === this.maxIndicator){
                this.maxIndicator++
                this.counterIndicator++
            }

            //if maxindicator greater than 5 the lessindicator will increment
            (this.maxIndicator > 5) ? this.lessIndicator++ : ''
        }
    }
}
</script>
<style scoped>
    .article{
        overflow: hidden;
    }
    .article > .images-slider-container{
        width: 100%;
        margin-top: 7em;
        position: relative;
        user-select: none;
    }
    .article > .images-slider-container > .carousel-slider{
        width: 100%;
        position: relative;
        height: 500px;
    }
    .article > .images-slider-container > .carousel-slider > .image-container{
        width: 100%;
        position: absolute;
    }
    .article > .images-slider-container > .carousel-slider > .image-container >img{
        width: 100%;
        height: 550px;
        object-fit: cover;
    }
    .article > .images-slider-container > .arrow-left > i,
    .article > .images-slider-container > .arrow-right > i{
        height: 40px;
        top: 50%;
        text-align: center;
        line-height: 40px;
        background: var(--transparent-color-1);
        border-radius: 5px;
        width: 40px;
        font-size: 20px;
        cursor: pointer;
        color: var(--third-color-yellow);
        position: absolute;
        transform: translateY(-50%);
        z-index: 99;
        transition: all 0.5s ease-out;
    }
    .article > .images-slider-container > .arrow-left > i{
        left: 0.5em;
    }
    .article > .images-slider-container > .arrow-right > i{
        right: 0.5em;
    }
    .article > .images-slider-container > .arrow-left > i:hover,
    .article > .images-slider-container > .arrow-right > i:hover{
        background: var(--transparent-color-2);
        color: var(--main-color-yellow);
    }
    .article > .slider-indicator{
        display: flex;
        justify-content: center;
        grid-gap: 10px;
        margin-top: 5em;
        width: 100%;
    }
    .article > .slider-indicator > .indicator{
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: var(--transparent-color-4);
        margin: auto 0 auto 0;
        transition: all 0.5s ease-in-out;
    }
    .article > .slider-indicator > .active-indicator{
        width: 30px !important;
        border-radius: 5px !important;
        background: var(--secondary-color-yellow) !important;
    }
    .moreindicator, .lessindactor{
        width: 9px !important;
        height: 9px !important;
    }
    article{
        margin: 5em auto 0 auto;
    }
    article > .dish-information{
        width: 100%;
        margin-bottom: 5em;
    }
    article > .dish-information > .title{
        width: 100%;
    }
    article > .dish-information > .title > h3{
        letter-spacing: 3px;
        font-weight: 800;
        font-size: var(--subtitle-wide-default-font-size);
        color: var(--fourth-color-black);
        text-align: center;
    }
    article > .dish-information > .description{
        width: 100%;
    }
    article > .dish-information > .description > p{
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
    article > .ingredients-container{
        width: 100%;
        margin-bottom: 5em;
    }
    article > .ingredients-container > .title{
        width: 100%;
        margin-bottom: 2em;
    }
    article > .ingredients-container > .title > h3{
        letter-spacing: 3px;
        font-weight: 800;
        font-size: var(--subtitle-wide-default-font-size);
        color: var(--fourth-color-black);
    }
    article > .ingredients-container > .ingredients-list{
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        grid-gap: 30px;
        justify-content: space-around;
        margin: 4em auto 0 auto;
    }
    article > .ingredients-container > .ingredients-list > .ingredient{
        width: 23%;
        background-image: linear-gradient(to bottom, var(--main-color-white), var(--main-color-white),  var(--main-color-white), var(--transparent-color-3));
        border-radius: 15px;
        transition: all 1s ease-in-out;
        position: relative;
        /* perspective: 1000px; */
        cursor: pointer;
        padding: 20px 15px; 
    }
    article > .ingredients-container > .ingredients-list > .ingredient > .ingredient-image{
        width: 100%;
        text-align: center;
        height: 150px;
        border-radius: 5px;
        margin: auto;
    }
    article > .ingredients-container > .ingredients-list > .ingredient > .ingredient-image > img{
        width: 150px; /* set the desired width */
        height: 150px; /* set the desired height */
        object-fit: cover; /* ensure the image fills the container */
        transition: all 0.5s ease-out;
        border-radius: 50%;
        box-shadow: var(--main-box-shadow);
    }
       article > .ingredients-container > .ingredients-list > .ingredient > .ingredient-title{
        width: 100%;
        text-align: center;
        margin-top: 20px;
    }
       article > .ingredients-container > .ingredients-list > .ingredient > .ingredient-title > p{
        letter-spacing: 1.3px;
        line-height: 1.5;
        font-size: var(--wide-default-font-size);
        color: var(--fourth-color-black);
    }
    article .how-to-cook-container{
        width: 100%;
        margin-top: 8em;
    }
    article > .how-to-cook-container > .title{
        width: 100%;
        margin-bottom: 2em;
    }
    article > .how-to-cook-container > .title > h3{
        letter-spacing: 3px;
        font-weight: 800;
        font-size: var(--subtitle-wide-default-font-size);
        color: var(--fourth-color-black);
    }
    article > .how-to-cook-container > .process-list{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        grid-gap: 15px;
        justify-content: space-around;
    }
    article > .how-to-cook-container > .process-list > .process{
        width: 48%;
        margin-bottom: 2.5em;
        background-image: linear-gradient(to bottom, var(--main-color-white), var(--main-color-white),  var(--main-color-white), var(--transparent-color-3));
        border-radius: 20px;
    }
    article > .how-to-cook-container > .process-list > .process > .title{
        width: 100%;
        display: flex;
        grid-gap: 10px;
        margin-bottom: 10px;
    }
    article > .how-to-cook-container > .process-list > .process > .title > i{
        font-size: 25px;
        color: var(--mainv2-color-yellow);
    }
    article > .how-to-cook-container > .process-list > .process > .title > h4{
        letter-spacing: 1.5px;
        font-weight: 800;
        font-size: var(--wide-default-font-size);
        color: var(--mainv2-color-yellow);
        white-space: nowrap;
    }
    article > .how-to-cook-container > .process-list > .process > .description{
        width: 100%;
        margin-left: auto;
        padding: 15px 30px;
    }
    article > .how-to-cook-container > .process-list > .process > .description > p{
        font-size: var( --wide-default-font-size);
        letter-spacing: 1.2px;
        color: var(--third-color-black);
        line-height: 1.5;
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
        .article > .images-slider-container > .carousel-slider > .image-container >img{
            height: 450px;
        }
        .article > .images-slider-container > .carousel-slider{
            height: 400px;
        }
        article > .ingredients-container > .ingredients-list > .ingredient{
            width:15em;
        }
        /* article > .ingredients-container > .ingredients-list > .ingredient > .ingredient-image{
            height: 150px;
        }
        article > .ingredients-container > .ingredients-list > .ingredient > .ingredient-image > img{
            width: 150px; 
            height: 150px; 
        } */
    }
    @media screen and (max-width: 1100px){
        article > .ingredients-container > .ingredients-list > .ingredient{
            width:47%;
        }
    }
    @media screen and (max-width: 900px){
        .article > .images-slider-container > .carousel-slider > .image-container >img{
            height: 350px;
        }
        .article > .images-slider-container > .carousel-slider{
            height: 300px;
        }
        article > .dish-information > .title > h3{
            font-size: var(--subtitle-ipad-default-font-size);
        }
        article > .ingredients-container > .title > h3{
            font-size: var(--subtitle-ipad-default-font-size);
        }
        article > .how-to-cook-container > .title > h3{
            font-size: var(--subtitle-ipad-default-font-size);
        }
        article > .dish-information > .description > p{
            font-size: var( --ipad-default-font-size);
        }
        article > .ingredients-container > .ingredients-list > .ingredient > .ingredient-title > p{
            font-size: var( --ipad-default-font-size);
        }
        article > .how-to-cook-container > .process-list > .process > .title > h4{
            font-size: var(--ipad-default-font-size);
        }
        article > .how-to-cook-container > .process-list > .process > .description > p{
            font-size: var(--ipad-default-font-size);
        }
        article > .how-to-cook-container > .process-list > .process > .title > i{
            font-size: 23px;
        }
        hr{
            width: 7em;
        }
    }   
    @media screen and (max-width: 700px){
        article > .how-to-cook-container > .process-list > .process{
            width: 100%;
        }
        .article > .images-slider-container > .carousel-slider > .image-container >img{
            height: 300px;
        }
        .article > .images-slider-container > .carousel-slider{
            height: 250px;
        }
        article > .dish-information > .title > h3{
            font-size: var(--subtitle-mobile-default-font-size);
        }
        article > .how-to-cook-container > .title > h3{
            font-size: var(--subtitle-mobile-default-font-size);
        }
        article > .ingredients-container > .title > h3{
            font-size: var(--subtitle-mobile-default-font-size);
        }
        article > .dish-information > .description > p{
            font-size: var( --mobile-default-font-size);
        }
        article > .ingredients-container > .ingredients-list > .ingredient > .ingredient-title > p{
            font-size: var( --mobile-default-font-size);
        }
        article > .how-to-cook-container > .process-list > .process > .title > h4{
            font-size: var(--mobile-default-font-size);
        }
        article > .how-to-cook-container > .process-list > .process > .description > p{
            font-size: var(--mobile-default-font-size);
        }
        article > .how-to-cook-container > .process-list > .process > .title > i{
            font-size: 21px;
        }
    }
    @media screen and (max-width: 600px){
        article > .ingredients-container > .ingredients-list > .ingredient{
            width:100%;
        }
        article > .ingredients-container > .ingredients-list > .ingredient > .ingredient-image{
            height: 130px;
        }
        article > .ingredients-container > .ingredients-list > .ingredient > .ingredient-image > img{
            width: 130px; 
            height: 130px; 
        }
    }
    @media screen and (max-width: 400px){
        article > .ingredients-container > .ingredients-list > .ingredient > .ingredient-image{
            height: 100px;
        }
        article > .ingredients-container > .ingredients-list > .ingredient > .ingredient-image > img{
            width: 100px; 
            height: 100px; 
        }
    }
</style>