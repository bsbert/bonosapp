import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BonoList from '../components/BonoList.vue'
import EditBono from '../components/BonoForm.vue'
const routes = [
  {
    path: '/',
    name: 'bonolist',
    component: BonoList
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/bonolist',
    name: 'BonoList',
    component: BonoList
  },
  {
    path: '/editbono',
    name: 'EditBono',
    component: EditBono
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
