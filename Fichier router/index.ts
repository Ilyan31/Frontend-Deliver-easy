import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Deliveries from '../views/Deliveries.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/deliveries', component: Deliveries },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;