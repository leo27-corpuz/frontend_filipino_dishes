<template>
    <article>
        <div class="container-article">
            <div class="container">
                <div class="title show-screen">
                    <h4>Our Vision</h4>
                </div>
                <div class="description show-screen">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, voluptates dolore nobis obcaecati quaerat doloribus raciis ipsum? Delectus tempora veniam aliquam id ea beatae quaerat, praesentium mollitia fugit soluta dolor provident voluptatibus!</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam esse amet qui nihil veritatis rerum ut fugiat placeat distinctio mio, modi quo soluta. Perferendis ad numquam recusandae voluptatem alias praesentium aliquid sequi mollitia quidem enim!</p>
                </div>
            </div>
            <div class="container">
                <div class="title show-screen">
                    <h4>Our Mission</h4>
                </div>
                <div class="description show-screen">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, voluptates dolore nobis obcaecati quaerat doloribus raciis ipsum? Delectus tempora veniam aliquam id ea beatae quaerat, praesentium mollitia fugit soluta dolor provident voluptatibus!</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam esse amet qui nihil veritatis rerum ut fugiat placeat distinctio mio, modi quo soluta. Perferendis ad numquam recusandae voluptatem alias praesentium aliquid sequi mollitia quidem enim!</p>
                </div>
            </div>
            <div class="container">
                <div class="title show-screen">
                    <h4>Our Goal</h4>
                </div>
                <div class="description show-screen">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, voluptates dolore nobis obcaecati quaerat doloribus raciis ipsum? Delectus tempora veniam aliquam id ea beatae quaerat, praesentium mollitia fugit soluta dolor provident voluptatibus!</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam esse amet qui nihil veritatis rerum ut fugiat placeat distinctio mio, modi quo soluta. Perferendis ad numquam recusandae voluptatem alias praesentium aliquid sequi mollitia quidem enim!</p>
                </div>
            </div>
        </div>
    </article>
</template>
<script>
</script>
<style scoped>
    article{
        margin: 7em auto 0 auto;
    }
    article >  .container-article > .container{
        margin-bottom: 2.5em;
    }
    article >  .container-article > .container > .title{
        width: 100%;
    }
    article > .container-article > .container > .title > h4{
        letter-spacing: 3px;
        font-weight: 800;
        font-size: var(--subtitle-ipad-default-font-size);
        color: var(--fourth-color-black);
    }
    article >  .container-article > .container > .description{
        width: 100%;
        margin-top: 1em;
        padding: 30px;
        background-image: linear-gradient(to bottom, var(--main-color-white), var(--transparent-color-3));
        border-radius: 15px;
    }
    article >  .container-article > .container > .description > p{
        font-size: var( --wide-default-font-size);
        letter-spacing: 1.2px;
        color: var(--third-color-black);
        line-height: 1.5;
        margin-bottom: 20px;
    }
    @media screen and (max-width: 900px){
        article > .container-article > .container > .title > h4{
            font-size: var(--subtitle-ipad-default-font-size);
        }
        article >  .container-article > .container > .description > p{
            font-size: var( --ipad-default-font-size);
        }
        article >  .container-article > .container > .description{
            padding: 25px 25px;
        }
    }
    @media screen and (max-width: 700px){
        article > .container-article > .container > .title > h4{
            font-size: var(--subtitle-mobile-default-font-size);
        }
        article >  .container-article > .container > .description > p{
            font-size: var( --mobile-default-font-size);
        }
    }
</style>