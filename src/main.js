import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue';
import Login from '@/views/Login.vue'; 
import Signup from '@/views/Signup.vue';
import Products from '@/views/Products.vue';
import PageNotFound from '@/views/PageNotFound.vue';
import ProductDetails from '@/views/ProductDetails.vue'
import Home from '@/views/Home.vue'

import { getAuth } from 'firebase/auth';


// const requireGuest = (to, from, next) => {
//   if (getAuth().currentUser) {
//     next('/')
//   } else {
//     next()
//   }
// }

// const requireGuest = (to, from, next) => {
//   if (getAuth().currentUser) {
//     next('/')
//   } else {
//     next()
//   }
// }

const requireGuest = (to, from, next) => {
  if (getAuth().currentUser) {
    next('/products')
  } else {
    next();
  }
}


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import firebase from 'firebase/app'
import 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const router = createRouter({
    history:createWebHistory(),
    routes: [
       {
        path:"/",
        name:"Home",
        component: Home,
       },
       {
        path: '/home',
        redirect: '/'
      },
       {
        path:"/login",
        name:"Login",
        component: Login,
        // meta: {
        //   requiresAuth: true
        // },
        beforeEnter: requireGuest,
       },
       {
        path:"/signup",
        name:"Signup",
        component: Signup,
       },
       {
        path:"/products",
        name:"Products",
        component: Products,
        meta: {
          requiresAuth: true
        }
       },
       {
        path:"/products/:id/:slug",
        name: "ProductDetails",
        component: ProductDetails,
        meta: {
          requiresAuth: true
        }
       },
       {
       path:"/:pathMactch(.*)*",
       name:"NotFound",
       component: PageNotFound
       }
    
    ],
})

// router.beforeEach((to, from, next) => {
//   if(to.matched.some(record => record.meta.requiresAuth)){
//     if(getAuth().currentUser){
//       next();
//     }
//     else {
//       next('/');
//     }
//   }else{
//     next();
//   }
  
// })

router.beforeEach((to, from, next) => {
  const currentUser = getAuth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) {
    next('/login');
  } else if (to.name === 'Products' && !currentUser) {
    next('/');
  } else {
    next();
  }
});








// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOwT47_CEf_8fh5Z9CiEFpzEXcO9AXbAQ",
  authDomain: "altschool-vue-auth.firebaseapp.com",
  projectId: "altschool-vue-auth",
  storageBucket: "altschool-vue-auth.appspot.com",
  messagingSenderId: "241283376177",
  appId: "1:241283376177:web:2d1e2136996643ddd32110"
}; 

// Initialize Firebase
initializeApp(firebaseConfig);


createApp(App)
.use(router)
.mount('#app')


