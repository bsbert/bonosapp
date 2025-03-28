import { createRouter, createWebHistory } from 'vue-router'
import BonoList from '../components/BonoList.vue'
import BonoForm from '../components/BonoForm.vue'
import Register from '../components/Register.vue'
import SignIn from '../components/SignIn.vue'
const routes = [

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  { path: '/', name: 'bonolist', component: BonoList },
  { path: '/bonolist', name: 'BonoList', component: BonoList },
  { path: '/editbono', component: BonoForm, props: route => ({ bono: route.query.bono ? JSON.parse(route.query.bono) : null, route: route }) },
  { path: '/register', name: 'Register', component: Register, props: route => ({ route: route }) },
  { path: '/sign-in', component: SignIn },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
