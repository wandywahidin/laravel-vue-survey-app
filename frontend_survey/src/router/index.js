import {createRouter, createWebHistory} from 'vue-router'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Dashboard from '../pages/Dashboard.vue'
import DefaultLayout from '../components/DefaultLayout.vue'
import Surveys from '../components/Surveys.vue'
import AuthLayout from '../components/AuthLayout.vue'
import store from '../store'

const routes = [
    {
        path : '/',
        redirect : 'dashboard',
        component : DefaultLayout,
        meta : {requiresAuth : true},
        children : [
            {path : '/dashboard', name: 'Dashboard', component : Dashboard},
            {path : '/surveys', name: 'Surveys', component : Surveys}
        ]
    },
    {
        path : '/auth',
        redirect : '/login',
        name : 'Auth',
        component : AuthLayout,
        meta : {isGuest : true},
        children : [
            {
                path : '/register',
                name : 'Register',
                component : Register
            },
            {
                path : '/login',
                name : 'Login',
                component : Login
            }
        ]
    },
];

const router = createRouter ({
    history : createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.state.user.token) {
        next({name: 'Login'})
    } else if (store.state.user.token && (to.meta.isGuest)) {
        next({name: 'Dashboard'})
    } else {
        next()
    }
})

export default router