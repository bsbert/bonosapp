import { createRouter, createWebHistory } from 'vue-router'
import BonoList from '../components/BonoList.vue'
import BonoForm from '../components/BonoForm.vue'
import Register from '../components/Register.vue'
import SignIn from '../components/SignIn.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';

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
  {
    path: '/editbono',
    component: BonoForm,
    props: route => ({ bono: route.query.bono ? JSON.parse(route.query.bono) : null, route: route })
    , meta: { requiresAuth: true }
  },
  { path: '/register', name: 'Register', component: Register, props: route => ({ route: route }) },
  { path: '/sign-in', component: SignIn },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const getCUrrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
        resolve(user);
      },
      reject
    );
  });
};
router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!await getCUrrentUser()) {
      // toast.error("Necesitas iniciar sesión para acceder a esta página");
      alert('Necesitas iniciar sesión para acceder a esta página');
      next(''); // Redirige al inicio de sesión si no está autenticado
    } else {
      next(); // Permite el acceso si está autenticado
    }
  } else {
    next(); // Permite el acceso a rutas que no requieren autenticación
  }
});

export default router
