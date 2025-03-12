import { createRouter, createWebHistory } from 'vue-router'
const TabsView = () => import('../views/tabs/TabsView.vue')
import HomeView from '../views/home/HomeView.vue'
import OrderView from '../views/order/OrderView.vue'
import MeView from '../views/me/MeView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			redirect: '/home',
		},
		{
			path: '/tabs',
			name: 'tabs',
			component: TabsView,
			children: [
				{
					name: 'home',
					path: '/home',
					component: HomeView,
				},
				{
					name: 'order',
					path: '/order',
					component: OrderView,
				},
				{
					name: 'me',
					path: '/me',
					component: MeView,
				},
			],
		},
	],
})

export default router
