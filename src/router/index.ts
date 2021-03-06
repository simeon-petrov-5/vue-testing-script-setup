import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/examples/ExampleMain.vue')
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
