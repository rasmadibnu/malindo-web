<script lang="ts" setup>
import { api } from 'src/boot/axios';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import InputTextField from 'components/form/InputTextField.vue';
import Btn from 'components/ui/Button.vue';
import { required, isEmpty } from 'src/utils/validators';
import { Notify } from 'quasar';

const route = useRoute();

const raw_menus = ref([]);
const menu = ref();
const menus = ref([]);
const loading = ref<boolean>(false);

const permission_id = ref<number | null>(null);
const permission_name = ref('');
const is_edit = ref<boolean>(false);
const permission_dialog = ref<boolean>(false);

const dialog_delete = ref<boolean>(false);

const submit = () => {
  loading.value = true;
  if (!is_edit.value) {
    api
      .post('/permissions', {
        name: permission_name.value,
        menu_id: menu.value.id,
      })
      .then((res) => {
        Notify.create({
          message: 'Permission berhasil ditambah',
          color: 'positive',
        });
        loading.value = false;
        permission_dialog.value = false;
        getMenus();
      })
      .catch((err) => {
        Notify.create({
          message: 'Permission berhasil diubah',
          color: 'positive',
        });
        loading.value = false;
        permission_dialog.value = false;
        getMenus();
      });
  } else {
    api
      .put('/permissions/' + permission_id.value, {
        name: permission_name.value,
        menu_id: menu.value.id,
      })
      .then((res) => {
        Notify.create({
          message: 'Permission berhasil ditambah',
          color: 'positive',
        });
        loading.value = false;
        permission_dialog.value = false;
        getMenus();
      })
      .catch((err) => {
        Notify.create({
          message: 'Permission berhasil diubah',
          color: 'positive',
        });
        loading.value = false;
        permission_dialog.value = false;
        getMenus();
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
  menus.value = [];
  api.get('/menus').then((res) => {
    res.data.data.forEach((menu) => {
      flattenChildren(menu).forEach((child) => {
        menus.value.push(child);
      });
    });

    raw_menus.value = menus.value;
  });
};

function deleteData() {
  loading.value = true;
  api
    .delete('/permissions/' + permission_id.value)
    .then((res) => {
      Notify.create({
        message: 'Permission berhasil dihapus',
        color: 'positive',
      });
      dialog_delete.value = false;
      loading.value = false;
      getMenus();
    })
    .catch((err) => {
      console.log(err);
    });
}

const search = ref('');

watch(search, () => {
  if (!isEmpty(search.value)) {
    menus.value = raw_menus.value.filter(
      (menu) => menu.name.toLowerCase().indexOf(search.value.toLowerCase()) > -1
    );
  } else {
    menus.value = raw_menus.value;
  }
});

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
    <q-card-section class="tw-flex tw-justify-between tw-items-center">
      <div class="tw-text-lg tw-font-semibold">List Menu</div>
      <q-input placeholder="Search Menu" v-model="search" dense filled>
        <template #prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </q-card-section>
    <q-card-section class="tw-grid tw-gap-4 md:tw-grid-cols-2 q-pt-none">
      <div v-for="m in menus" v-bind:key="m.id">
        <q-list bordered separator dense>
          <q-item>
            <q-item-section avatar>
              <q-icon :name="m.icon" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="tw-font-bold">{{ m.name }}</q-item-label>
              <q-item-label caption>{{ m.code }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn
                icon="add"
                round
                text-color="primary"
                size="sm"
                unelevated
                class="tw-shadow-sm"
                dense
                @click="
                  () => {
                    permission_id = null;
                    permission_name = '';
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
                size="sm"
                round
                unelevated
                class="tw-shadow-sm"
                dense
              >
                <q-menu>
                  <q-list dense>
                    <q-item
                      clickable
                      v-ripple
                      @click="
                        () => {
                          is_edit = true;
                          menu = m;
                          permission_id = perm.id;
                          permission_name = perm.name;
                          permission_dialog = true;
                        }
                      "
                    >
                      <q-item-section avatar>
                        <q-icon size="xs" name="eva-edit-2-outline" />
                      </q-item-section>
                      <q-item-section> Edit </q-item-section>
                    </q-item>
                    <q-item
                      clickable
                      v-ripple
                      @click="
                        () => {
                          permission_id = perm.id;
                          permission_name = perm.name;
                          dialog_delete = true;
                        }
                      "
                    >
                      <q-item-section avatar>
                        <q-icon size="xs" name="eva-trash-2-outline" />
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
          <InputTextField
            :rules="[required]"
            toplabel="Nama"
            v-model="permission_name"
          />
        </q-card-section>
        <q-card-section align="center" class="tw-space-x-2">
          <Btn label="Cancel" color="grey-3" text-color="grey" v-close-popup />
          <Btn type="submit" :loading="loading" label="Submit" />
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
  <q-dialog v-model="dialog_delete">
    <q-card style="min-width: 400px" class="tw-p-2">
      <q-card-section>
        <div class="text-h6">Hapus Permission</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        Anda yakin ingin menghapus
        <span class="tw-font-bold">{{ permission_name }}</span
        >?<br />Proses ini tidak dapat dibatalkan
      </q-card-section>
      <q-card-actions align="right">
        <Btn
          label="Cancel"
          color="grey-3"
          text-color="grey"
          @click="
            () => {
              dialog_delete = false;
            }
          "
        />
        <Btn label="Delete" color="red-5" @click="deleteData" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
