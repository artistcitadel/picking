import Vue from 'vue';
import VueRouter from 'vue-router';
// import UserRoutes from './user';
import AuthenticationMiddleware from './middleware/authentication';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/login/LoginBox'),
    meta: {
      authenticated: false,
    },
  },
  {
    path: '/order_list',
    name: 'order_list',
    component: () => import('@/views/Index.vue'),
    meta: {
      authenticated: true,
    },
  },
  {
    path: '/tot_assign/:id',
    name: 'tot',
    component: () => import('@/components/picking/totAssign.vue'),
    meta: {
      authenticated: true,
    },
  },
  {
    path: '/picking/:id',
    name: 'picking',
    component: () => import('@/components/picking/picking.vue'),
    meta: {
      authenticated: true,
    },
  },
  {
    path: '/manual_picking',
    name: 'manual_picking',
    component: () => import('@/components/alter/ManualPick.vue'),
    meta: {
      authenticated: true,
    },
  },
  {
    path: '/book_list',
    name: 'book_list',
    component: () => import('@/components/picking/BookList.vue'),
    meta: {
      authenticated: true,
    },
  },
  {
    path: '/inspection_list',
    name: 'inspection_list',
    component: () => import('@/components/alter/InspectionList.vue'),
    meta: {
      authenticated: true,
    },
  },
  {
    path: '/event_list',
    name: 'event_list',
    component: () => import('@/components/alter/EventList.vue'),
    meta: {
      authenticated: true,
    },
  },
  {
      path: '/jangman_list',
      name: 'jangman_list',
      component: () => import('@/components/alter/JangmanList.vue'),
      meta: {
        authenticated: true,
      },
  },

  // ...UserRoutes,
  {
    path: '*',
    component: () => import('@/views/NotFound'),
    meta: {
      authenticated: false,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(AuthenticationMiddleware);

export default router;
