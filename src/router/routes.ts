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
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
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
        path: 'pajak-stnk',
        component: () => import('pages/Dashboard/Pajak-STNK/Index.vue'),
        name: 'pajak-index',
      },
      {
        path: 'bpkb',
        component: () => import('pages/Dashboard/BPKB/Index.vue'),
        name: 'bpkb-index',
      },
      {
        path: 'faktur',
        component: () => import('pages/Dashboard/Faktur/Index.vue'),
        name: 'faktur-index',
      },
      {
        path: 'kalkulator',
        component: () => import('pages/Dashboard/Simulasi-Biaya/Index.vue'),
        name: 'kalkulator-index',
      },

      {
        path: 'cek-pajak',
        component: () => import('pages/Dashboard/Cek-Pajak/Index.vue'),
        name: 'cek-pajak',
      },
      {
        path: 'managements',
        children: [
          {
            path: 'settings',
            name: 'settings',
            children: [
              {
                path: 'partner',
                component: () =>
                  import(
                    'pages/Dashboard/Managements/Settings/Partner/Index.vue'
                  ),
                name: 'partner-index',
              },
              {
                path: 'layanan',
                component: () =>
                  import(
                    'pages/Dashboard/Managements/Settings/Layanan/Index.vue'
                  ),
                name: 'layanan-index',
              },
              {
                path: 'jenis-layanan',
                component: () =>
                  import(
                    'pages/Dashboard/Managements/Settings/Jenis-Layanan/Index.vue'
                  ),
                name: 'jenislayanan-index',
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

  { path: '/login', component: () => import('pages/Auth/Login.vue') },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
