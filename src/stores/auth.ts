import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token'),
    user: null,
    permissions: [],
    permission: [],
    raw_menus: [],
    menus: [],
  }),
  getters: {
    token_data() {
      const base64Url = this.token ? this.token.split('.')[1] : ' ';
      const base64 = base64Url
        ? base64Url.replace(/-/g, '+').replace(/_/g, '/')
        : '';
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );

      return jsonPayload ? JSON.parse(jsonPayload) : '';
    },
  },
  actions: {
    async getUser() {
      return api
        .get('users/' + this.token_data.id)
        .then((res) => {
          this.user = res.data.data;
        })
        .then((res) => {
          this.setMenus();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    setMenus() {
      this.menus = [];
      const raw_menus: unknown[] = [];
      const menus: unknown[] = [];

      this.user.roles.forEach((role) => {
        role.menus.forEach((menu) => {
          raw_menus.push(menu);
          const findMenu = menus.findIndex((e) => e.id === menu.id);
          if (findMenu == -1) {
            menus.push(menu);
          }
        });
        this.permissions.push(...role.permissions);
      });

      this.raw_menus = raw_menus;

      menus.forEach((item) => {
        if (item.parent_id === 0) {
          // If parent_id is 0, it is a top-level item
          this.menus.push(item);
        } else {
          // Find the parent in the organized data
          const parent = this.menus.find(
            (parentItem) => parentItem.id === item.parent_id
          );

          if (parent) {
            // If the parent is found, append the item to its children
            if (!parent.children) {
              parent.children = [];
            }
            parent.children.push(item);
          }
        }
      });

      this.menus = this.menus.sort((a, b) => a.ord - b.ord);
    },

    checkPermissions(code: number) {
      this.permission = [];
      const menu = this.raw_menus.find((menu) => {
        return menu.code === code;
      });
      if (menu)
        this.permission = this.permissions
          .filter((perm) => {
            return perm.menu_id === menu.id;
          })
          .map((perm) => perm.name);
    },
  },
});
