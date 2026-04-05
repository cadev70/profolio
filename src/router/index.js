import { createRouter, createWebHistory } from 'vue-router'
import { NAV_ROUTES } from '../utils/constants'

const routes = [
    {
        path: NAV_ROUTES.HOME,
        name: 'Home',
        component: () => import('../views/HomeView.vue'),
        meta: { title: 'Home' }
    },
    {
        path: NAV_ROUTES.PROJECTS,
        name: 'Projects',
        component: () => import('../views/ProjectsView.vue'),
        meta: { title: 'Projects' }
    },
    {
        path: NAV_ROUTES.ABOUT,
        name: 'About',
        component: () => import('../views/AboutView.vue'),
        meta: { title: 'About' }
    },
    {
        path: NAV_ROUTES.CONTACT,
        name: 'Contact',
        component: () => import('../views/ContactView.vue'),
        meta: { title: 'Contact' }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: NAV_ROUTES.HOME
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, _from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        if (to.hash) {
            return { el: to.hash, behavior: 'smooth' }
        }
        return { top: 0, behavior: 'smooth' }
    }
})

router.beforeEach((to, _from, next) => {
    const title = to.meta.title
    document.title = title ? `${title} | Carly Tang - Frontend Developer` : 'Carly Tang - Frontend Developer'
    next()
})

export default router
