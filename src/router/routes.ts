import { RouteRecordRaw } from 'vue-router';
import { useAuthStore } from 'src/stores/auth';

const requireAuth = (to, from, next) => {
  const token =
    localStorage.getItem('token') == null
      ? null
      : JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
  if (token === null) {
    next('/login');
  }
  const auth = useAuthStore();
  if (auth.user === null) {
    auth.getUser().then((res) => {
      next();
    });
  } else {
    next();
  }
};

const routes: RouteRecordRaw[] = [
  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  // },
  {
    path: '/',
    component: () => import('layouts/Template.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        name: 'home',
      },
      {
        path: 'type',
        component: () => import('pages/Type.vue'),
        name: 'type',
      },
      {
        path: 'form',
        component: () => import('pages/Form.vue'),
        name: 'form',
      },
      {
        path: 'type',
        component: () => import('pages/Type.vue'),
        name: 'type',
      },
    ],
  },

  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: requireAuth,

    children: [
      {
        path: '/dashboard/',
        component: () => import('pages/Dashboard/Index.vue'),
        name: 'dashboard',
      },
      {
        path: 'drivers',
        component: () => import('pages/Dashboard/Driver/Index.vue'),
        name: 'driver-index',
      },
      {
        path: 'order',
        component: () => import('pages/Dashboard/Order/Index.vue'),
        name: 'order-index',
      },

      {
        path: 'partner',
        component: () => import('pages/Dashboard/Partner/Index.vue'),
        name: 'partner-index',
      },

      {
        path: 'armada',
        component: () => import('pages/Dashboard/Vehicle/Index.vue'),
        name: 'armada-index',
      },

      {
        path: 'inbox',
        component: () => import('pages/Dashboard/Inbox/Index.vue'),
        name: 'inbox-index',
      },

      {
        path: 'managements',
        children: [
          {
            path: 'settings',
            name: 'settings',
            children: [
              {
                path: 'layanan',
                component: () =>
                  import(
                    'pages/Dashboard/Managements/Settings/Layanan/Index.vue'
                  ),
                name: 'layanan-index',
              },
              {
                path: 'jenis-armada',
                component: () =>
                  import(
                    'pages/Dashboard/Managements/Settings/VehicleType/Index.vue'
                  ),
                name: 'jenisarmada-index',
              },
              {
                path: 'status',
                component: () =>
                  import(
                    'pages/Dashboard/Managements/Settings/Status/Index.vue'
                  ),
                name: 'status-index',
              },
              {
                path: 'dokumen',
                component: () =>
                  import(
                    'pages/Dashboard/Managements/Settings/Dokumen/Index.vue'
                  ),
                name: 'dokumen-index',
              },
            ],
          },
          {
            path: 'users',
            component: () =>
              import('pages/Dashboard/Managements/User/Index.vue'),
            name: 'user-index',
          },
          {
            path: 'menus',
            component: () =>
              import('pages/Dashboard/Managements/Menu/Index.vue'),
            name: 'menu-index',
          },
          {
            path: 'role-permissions',
            name: 'role-permissions',
            children: [
              {
                path: 'roles',
                component: () =>
                  import('pages/Dashboard/Managements/RolePermission/Role.vue'),
                name: 'role-index',
              },
              {
                path: 'permissions',
                component: () =>
                  import(
                    'pages/Dashboard/Managements/RolePermission/Permission.vue'
                  ),
                name: 'permission-index',
              },
            ],
          },
        ],
      },
    ],
  },

  {
    path: '/driver',
    component: () => import('pages/Driver/Index.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/client',
    component: () => import('pages/Client/Index.vue'),
    beforeEnter: requireAuth,
  },

  {
    path: '/login',
    component: () => import('pages/Auth/Login.vue'),
    name: 'login',
  },
  {
    path: '/register',
    component: () => import('pages/Auth/Register.vue'),
    name: 'register',
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
