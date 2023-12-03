<script lang="ts" setup>
import { api } from 'src/boot/axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import InputTextField from 'components/form/InputTextField.vue';
import Btn from 'components/ui/Button.vue';
import { required } from 'src/utils/validators';
import { Notify } from 'quasar';

const route = useRoute();

const menu = ref();
const menus = ref([]);
const loading = ref<boolean>(false);
const permission = ref({
  name: '',
});
const is_edit = ref<boolean>(false);
const permission_dialog = ref<boolean>(false);

const submit = () => {
  console.log(menu.value);
  loading.value = true;
  if (!is_edit.value) {
    api
      .post('/permissions', { ...permission.value, menu_id: menu.value.id })
      .then((res) => {
        Notify.create({
          message: 'Permission berhasil ditambah',
          color: 'positive',
        });
        loading.value = false;
        permission_dialog.value = false;
        getMenu();
      });
  }
};

function flattenChildren(node, result = []) {
  result.push(node);

  if (node.children) {
    for (const child of node.children) {
      flattenChildren(child, result);
    }
  }

  return result;
}

const getMenus = () => {
  api.get('/menus').then((res) => {
    res.data.data.forEach((menu) => {
      flattenChildren(menu).forEach((child) => {
        menus.value.push(child);
      });
    });
  });
};

onMounted(() => {
  getMenus();
});
</script>
<template>
  <q-breadcrumbs class="tw-mb-4">
    <template
      v-for="pathd in route.fullPath.split('/').filter((e) => {
        return e != '';
      })"
      v-bind:key="pathd"
    >
      <q-breadcrumbs-el
        v-if="
          route.matched.some(({ path }) => {
            return path == `/${pathd}`;
          })
        "
        class="tw-capitalize tw-text-lg tw-font-semibold"
        :label="pathd.replace('-', ' ')"
        :to="`/${pathd}`"
      />

      <q-breadcrumbs-el
        v-else
        class="tw-capitalize tw-text-lg tw-text-[#4B465C] tw-font-semibold"
        :label="pathd.replace('-', ' ')"
      />
    </template>
  </q-breadcrumbs>
  <q-card class="tw-shadow-md">
    <q-card-section class="tw-grid tw-gap-4 md:tw-grid-cols-2">
      <div v-for="m in menus" v-bind:key="m.id">
        <q-list bordered separator>
          <q-item>
            <q-item-section class="tw-font-bold">{{ m.name }}</q-item-section>
            <q-item-section side>
              <q-btn
                icon="add"
                round
                color="primary"
                unelevated
                class="tw-shadow-sm"
                dense
                @click="
                  () => {
                    menu = m;
                    is_edit = false;
                    permission_dialog = true;
                  }
                "
              />
            </q-item-section>
          </q-item>
          <q-item v-for="perm in m.permissions" v-bind:key="perm.id">
            <q-item-section>
              {{ perm.name }}
            </q-item-section>
            <q-item-section side>
              <q-btn
                icon="o_more_vert"
                flat
                round
                unelevated
                class="tw-shadow-sm"
                dense
              >
                <q-menu>
                  <q-list>
                    <q-item
                      clickable
                      v-ripple
                      @click="
                        () => {
                          is_edit = true;
                          menu = m;
                          permission.name = perm.name;
                          permission_dialog = true;
                        }
                      "
                    >
                      <q-item-section avatar>
                        <q-icon name="eva-edit-2-outline" />
                      </q-item-section>
                      <q-item-section> Edit </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                      <q-item-section avatar>
                        <q-icon name="eva-trash-2-outline" />
                      </q-item-section>
                      <q-item-section> Delete </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-card-section>
  </q-card>
  <q-dialog v-model="permission_dialog">
    <q-card style="width: 400px" class="tw-p-6">
      <q-card-section>
        <div class="text-h6 text-center">
          {{ is_edit ? 'Edit' : 'Add' }} Permission
        </div>
      </q-card-section>
      <q-form @submit.prevent="submit">
        <q-card-section>
          <InputTextField toplabel="Nama" v-model="permission.name" />
        </q-card-section>
        <q-card-section align="center" class="tw-space-x-2">
          <Btn label="Cancel" color="grey-3" text-color="grey" v-close-popup />
          <Btn type="submit" :loading="loading" label="Submit" />
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>
