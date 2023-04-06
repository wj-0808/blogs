import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/login', name: 'Login', component: () => import('../views/login.vue') },
        {
            path: '/', name: 'Index', component: () => import('../views/index.vue'), redirect: (to) => '/articleList',
            children: [
                { path: '/articleList', name: 'articleList', component: () => import('../views/articleList.vue') },
                { path: '/article', name: 'article', component: () => import('../views/article.vue') },
                { path: '/category', name: 'category', component: () => import('../views/category.vue') },
                { path: '/workList', name: 'workList', component: () => import('../views/workList.vue') },
                { path: '/work', name: 'work', component: () => import('../views/work.vue') },
            ]
        },
    ]
})

// 路由守卫
router.beforeEach(async (to, from) => {
    let inLogin = sessionStorage.getItem('token');
    if (
        // 检查用户是否已登录
        !inLogin &&
        // ❗️ 避免无限重定向
        to.name !== 'Login'
    ) {
        // 将用户重定向到登录页面
        return { name: 'Login' }
    }
    if (inLogin && to.name == 'Login') return { name: 'Index' }
})
export default router