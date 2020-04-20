import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/home/Home'
import AdminPage from '../components/admin/AdminPage'
import ArticleByCategory from '../components/articles/ArticleByCategory'
import Article from '../components/articles/Article'
import Auth from '../components/auth/Auth'
import { userKey } from '@/global'

Vue.use(VueRouter)

const routes = [{
    name: 'Home',
    path: '/',
    component: Home,
    meta: {}
}, {
    name: 'AdminPage',
    path: '/admin',
    component: AdminPage,
    meta: { requiresAdmin: true }
}, {
    name: 'ArticleByCategory',
    path: '/categories/:id/articles',
    component: ArticleByCategory,
    meta: {}
}, {
    name: 'Article',
    path: '/article/:id',
    component: Article,
    meta: {}
}, {
    name: 'Auth',
    path: '/auth',
    component: Auth,
    meta: {}
}]


const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)

    if (to.matched.some(record => record.meta.requiresAdmin)) {
        const user = JSON.parse(json)
        user && user.admin ? next() : next({ name: 'Home' })
    } else {
        if (json || to.name === 'Auth') {
            next()
        } else {
            next({ name: 'Auth' })
        }
    }
})

export default router