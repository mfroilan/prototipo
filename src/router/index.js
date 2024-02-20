import {createRouter, createWebHistory} from 'vue-router'
import ProductoView from '../views/InicioView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: ProductoView
        },
        {
            path: '/add',
            name: 'add',
            component: () => import('../views/RegistrarProductoView.vue')
        },
        {
            path: '/cart',
            name: 'cart-detail',
            component: () => import('../views/CarritoDetalleView.vue')
        },
        {
            path: '/image',
            name: 'upload-image',
            component: () => import('../views/AgregarImagenProductoView.vue')
        }
    ]
});

export default router
