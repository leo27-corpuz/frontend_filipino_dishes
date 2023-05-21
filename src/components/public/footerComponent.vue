<template>
    <footer>
        <div class="header-footer show-screen">
            <logo>
                <template v-slot:mainlogo>
                    <a href="/"><h1>{{logoFirst}}<span>{{ lastTitle }}</span></h1></a>
                </template>
            </logo>
        </div>
        <div class="body-footer show-screen">
            <div class="quick-links ">
                <p>Quick Links</p>
                <ul>
                    <router-link to="/"><li>Home</li></router-link>
                    <router-link to="/about-us"><li>About Us</li></router-link>
                    <router-link to="/dishes"><li>Dishes</li></router-link>
                </ul>
            </div>
            <div class="categories">
                <p>Categories</p>
                <ul>
                    <router-link to="/"><li>Lunch</li></router-link>
                    <router-link to="/about-us"><li>Breakfast</li></router-link>
                    <router-link to="/dishes"><li>Dinner</li></router-link>
                    <router-link to="/dishes"><li>Street Food</li></router-link>
                    <router-link to="/dishes"><li>Exotic</li></router-link>
                </ul>
            </div>
            <div class="socia-media">
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
        </div>
        <hr class="show-screen">
        <div class="footer-footer show-screen">
            <div class="copyright">
                <p>&copy; FilDish 2023 by Leo Corpuz</p>
            </div>
        </div>
    </footer>
</template>
<script>
import logo from '../essentials/logo.vue'
export default{
    data(){
        return {
            logo: 'FilDish'
        }
    },
    computed:{
        logoFirst(){
            return this.logo.substring(0, 3)
        },
        lastTitle(){
            return this.logo.substring(3)
        },
    },
    components: {
        logo
    }
}
</script>
<style scoped>
    footer{
        width: 100%;
        padding: 4em 5% 9em 5%;
        /* background: var(--main-box-shadow); */
        background-image: linear-gradient(to bottom, var(--main-color-white), var(--transparent-color-3));
    }
    footer > .header-footer{
        width: 100%;
        text-align: center;
    }
    .logo > a > h1{
        font-size: var(--title-wide-default-font-size);
        letter-spacing: 4px;
        color: var(--third-color-black);
        font-weight: 800;
        cursor: pointer;
        white-space: nowrap;
        font-family: 'Pacifico', cursive !important;
    }
    .logo > a > h1 > span{
        font-family: 'Pacifico', cursive !important;
        color: var(--main-color-yellow) !important;
    }
    .body-footer{
        margin-top: 3em;
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: row;
        grid-gap: 150px;
        align-items: flex-start;
    }
    .body-footer > *{
        padding: 10px 15px;
    }
    .body-footer > * > p{
        font-size: var( --wide-default-font-size);
        letter-spacing: 1.2px;
        color: var(--third-color-black);
        line-height: 1.7;
        font-weight: 700;
        color: var(--main-color-yellow);
    }
    .body-footer > * > ul > a{
        letter-spacing: 1.5px;
        font-size: var(--ipad-default-font-size);
        line-height: 1.7;
        cursor: pointer;
        transition: all 0.5s ease-out;
        color: var(--fourth-color-black);
        white-space: nowrap;
    }
    .body-footer > * > ul > a:hover{
        color: var(--main-color-yellow);
    }
    .body-footer > .socia-media{
        display: flex;
        flex-direction: row;
        grid-gap: 15px;
    }
    .body-footer > .socia-media > div > a{
        font-size: 20px;
        color: var(--mainv2-color-yellow);
        width: 45px;
        padding: 13px 11px 10px 11px;
        display: block;
        text-align: center;
        background-image: linear-gradient(to top, var(--main-color-white), var(--main-color-white),  var(--main-color-white), var(--transparent-color-3));
        box-shadow: var(--main-box-shadow);
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.5s ease-out;
    }
    .body-footer > .socia-media > div > a:hover{
        background: var(--main-color-yellow);
        color: var(--main-color-white);
        transform: translateY(-5px);
    }
    footer > hr{
        border: none;
        height: 0.5px;
        margin: 30px auto;
        border-radius: 50%;
        width: 30%;
        background: var(--main-color-yellow);
    }
    .footer-footer{
        text-align: center;
    }
    .footer-footer > .copyright > p{
        font-size: var( --wide-default-font-size);
        letter-spacing: 1.2px;
        color: var(--third-color-black);
        line-height: 1.5;
    }

    @media screen and (max-width: 900px){
        .logo > a > h1{
            font-size: var(--title-ipad-default-font-size);
        }
        .footer-footer > .copyright > p{
            font-size: var( --ipad-default-font-size);
        }
        .body-footer > .socia-media > div > a{
            font-size: 18px;
            width: 40px;
            padding: 11px 11px 8px 11px;
        }
        .body-footer > * > p{
            font-size: var( --ipad-default-font-size);
        }
        .body-footer{
            grid-gap: 80px;
        }
    }
    @media screen and (max-width: 700px){
        .logo > a > h1{
            font-size: var(--title-mobile-default-font-size);
        }
        .footer-footer > .copyright > p{
            font-size: var( --mobile-default-font-size);
        }
        .body-footer > .socia-media > div > a{
            font-size: 17px;
            width: 37px;
            padding: 10px 9px 7px 10px;
        }
        .body-footer > * > p{
            font-size: var( --mobile-default-font-size);
        }
        .body-footer{
            grid-gap: 20px;
        }
        .body-footer > * > ul > a{
            font-size: var(--mobile-default-font-size);
        }
    }
    @media screen and (max-width: 600px){
        .body-footer{
            flex-direction: column;
        }
        .body-footer > *{
            width: 100%;
            text-align: center;
        }
        .body-footer > .socia-media{
            justify-content: center;
        }
    }
</style>