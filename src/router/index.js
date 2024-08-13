import Vue from 'vue'
import Router from 'vue-router'
import VueRouter from "vue-router";

Vue.use(Router)

const mainRouter = [
    {
        path: '/',
        name: 'integratedManager',
        component: () => import('../views/integratedManager/index.vue')  // 使用箭头函数返回组件
    },
]

const router = new VueRouter({
    routes: mainRouter,
    mode: 'history',
})

export default router
