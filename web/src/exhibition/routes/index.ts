import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: () => import('../views/home.vue') },
        { path: '/list', component: () => import('../views/list.vue') },
        { path: '/show', component: () => import('../views/show.vue') }
    ]
})


export default router