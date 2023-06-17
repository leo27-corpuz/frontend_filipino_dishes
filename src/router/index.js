import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    //auth public
    {
      path:'/:catchAll(.*)',
      redirect: '/',
    },
    {
      path: '/',
      name: 'landingpage',
      component: () => import('../views/index.vue'),
    },
    {
      path: '/about-us',
      name: 'aboutus',
      component: () => import('../views/public/aboutus.vue'),
    },
    {
      path: '/dishes',
      name: 'dishes',
      component: () => import('../views/public/dishesmain.vue'),
    },
    {
      path: '/dishes/view/:name',
      name: 'viewdish',
      component: () => import('../views/public/dishes-page/viewdish.vue'),
    },


    //auth admin
    {
      path:'/login',
      name: 'login',
      component: () => import('../views/public/auth/login.vue'),
      meta: {
        guest: true,
      }
    },
    {
      path:'/admin',
      component: () => import('../views/admin/index.vue'),
      props: true,
      meta:{
        requiredAdmin: true
      },
      children: [
        {
          path:'',
          name: 'dashboard',
          component: () => import('../views/admin/dashboard/index.vue'),
          meta: { exact: true } 
        },
        {
          path:'/admin/category',
          name: 'categoryadmin',
          component: () => import('../views/admin/category/index.vue'),
          props: true,
          children: [
            {
              path:'/admin/category/create',
              name: 'categoryadmincreate',
              component: () => import('../views/admin/category/create.vue'),
            },
          ]
        },
        {
          path:'/admin/places',
          name: 'placesadmin',
          component: () => import('../views/admin/places/index.vue'),
        },
        {
          path:'/admin/dishes',
          name: 'dishesadmin',
          component: () => import('../views/admin/dishes/index.vue'),
        },
        {
          path:'/admin/setting/logo',
          name: 'logoadmin',
          component: () => import('../views/admin/settings/logo/index.vue'),
        },
        {
          path:'/admin/setting/landing-page',
          name: 'landingpageadmin',
          component: () => import('../views/admin/settings/landingpage/index.vue'),
        },
        {
          path:'/admin/setting/whoweare',
          name: 'whoweareadmin',
          component: () => import('../views/admin/settings/whoweare.vue'),
        },
        {
          path:'/admin/setting/vision-mission-goal',
          name: 'visionmissiongoaladmin',
          component: () => import('../views/admin/settings/visionmissiongoal.vue'),
        },
        {
          path:'/admin/setting/founders',
          name: 'foundersadmin',
          component: () => import('../views/admin/settings/founder/index.vue'),
          props: true,
          children: [
            {
              path:'/admin/setting/founders/create',
              name: 'founderadmincreate',
              component: () => import('../views/admin/settings/founder/create.vue'),
            },
            {
              path:'/admin/setting/founders/update/:founder',
              name: 'founderadminupdate',
              component: () => import('../views/admin/settings/founder/update.vue'),
              props: true // This enables passing route params as props
            },
            {
              path:'/admin/setting/founders/view/:founder',
              name: 'founderadminview',
              component: () => import('../views/admin/settings/founder/view.vue'),
              props: true // This enables passing route params as props
            }
          ]
        },
        {
          path:'/admin/profile',
          name: 'profileadmin',
          component: () => import('../views/admin/settings/profile.vue'),
        },
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
  if(to.matched.some(record => record.meta.requiredAdmin)){
    token && user && user.type === 1 ? next() :  next('/login')
  }
  else if(to.matched.some(record => record.meta.guest)){
    if(token && user && user.type === 1){
      next({ path: '/admin'})
    }else{
      next()
    }
  }
  else{
    next()
  }
})
router.afterEach(() => {
  NProgress.done()
})
export default router
