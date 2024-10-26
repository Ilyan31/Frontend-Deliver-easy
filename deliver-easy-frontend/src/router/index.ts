import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Deliveries from '../views/Deliveries.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/deliveries', component: Deliveries },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;