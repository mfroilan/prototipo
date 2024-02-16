import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/InicioView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AcercaView.vue')
        },
        {
            path: '/contact',
            name: 'contact',
            component: () => import('../views/ContactoView.vue')
        },
        {
            path: '/cart',
            name: 'cart-detail',
            component: () => import('../views/CarritoDetalleView.vue')
        }
    ]
});

export default router
