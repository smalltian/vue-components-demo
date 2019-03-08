import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    },
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: { title: "首页", noCache: true }
        },
        {
            path: '/about',
            name: 'about',
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
            meta: { title: "关于", noCache: true }
        },
        {
            path: '/cropperimg',
            name: 'cropperimg',
            component: () => import('./views/cropperImg/Index.vue'),
            meta: { title: '图片裁剪', noCache: true }
        },
        {
            path: '/calendar',
            name: 'calendar',
            component: () => import('./views/calendar/Index.vue'),
            meta: { title: '日历', noCache: true }
        },
        {
            path: '/rule',
            name: 'rule',
            component: () => import('./views/rule/Index.vue'),
            meta: { title: '横屏刻度尺', noCache: true }
        },
        {
            path: '/ruler2',
            name: 'ruler2',
            component: () => import('./views/rule/ruler2.vue'),
            meta: { title: '竖屏刻度尺', noCache: true }
        },
        {
            path: '/scroll/index',
            name: 'scrollindex',
            component: () => import('./views/scroll/Index.vue'),
            meta: { title: '上拉加载，下拉刷新', noCache: true }
        },
        {
            path: '/scroll/category',
            name: 'scrollcategory',
            component: () => import('./views/scroll/category.vue'),
            meta: { title: '分类scroll', noCache: true }
        }
    ]
})
