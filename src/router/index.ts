import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import DashboardView from '@/views/DashboardView.vue';
import ClientsView from '@/views/ClientsView.vue';
import DeliveriesView from '@/views/DeliveriesView.vue';
import EmployeView from '@/views/EmployeView.vue'; // Import du composant EmployeView

const isAuthenticated = () => {
  // Vérifiez si le token est présent dans le localStorage
  return !!localStorage.getItem('token');
};

const routes = [
  { path: '/', name: 'Login', component: LoginView },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: '/clients',
    name: 'Clients',
    component: ClientsView,
    meta: { requiresAuth: true },
  },
  {
    path: '/deliveries',
    name: 'Deliveries',
    component: DeliveriesView,
    meta: { requiresAuth: true },
  },
  {
    path: '/employes', // Modification pour correspondre à votre exigence
    name: 'Employe',
    component: EmployeView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard pour protéger les routes
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/'); // Redirige vers la page de connexion
  } else {
    next();
  }
});

export default router;