<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Notify } from 'quasar';
import { required } from 'src/utils/validators.ts';
import BaseTable from 'components/ui/BaseTable.vue';
import InputTextField from 'src/components/form/InputTextField.vue';
import Btn from 'src/components/ui/Button.vue';
import moment from 'moment';
import { api } from 'src/boot/axios';

const columns = ref([
  {
    name: 'name',
    label: 'Name',
    align: 'left',
    field: 'name',
  },
  {
    name: 'description',
    label: 'Description',
    align: 'left',
    field: 'description',
  },
  {
    name: 'created_at',
    label: 'Created At',
    align: 'left',
    field: (row) => moment(row.created_at).format('YYYY-MM-DD hh:mm:ss'),
  },
]);

const role = ref({});
const menu_dialog = ref<boolean>(false);
const menus = ref([]);
const menus_ticked = ref([]);
const loading = ref<boolean>(false);

const assignMenu = () => {
  loading.value = true;
  api
    .post('/roles/' + role.value.id + '/assign-menu', {
      menu_ids: menus_ticked.value,
    })
    .then((res) => {
      loading.value = false;

      Notify.create({
        message: 'Menu berhasil ditambahkan',
        color: 'positive',
      });
      menu_dialog.value = false;
    })
    .catch((err) => {
      loading.value = false;

      console.log(err);
    });
};

const getMenu = async () => {
  return api.get('/menus').then((res) => {
    menus.value = res.data.data;
  });
};

const findRole = (id_role: unknown) => {
  loading.value = true;
  api
    .get('/roles/' + id_role)
    .then((res) => {
      role.value = res.data.data;
      menus_ticked.value = role.value.menus.map((menu) => menu.id);
      loading.value = false;
    })
    .catch((err) => {
      console.log(err);
      loading.value = false;
    });
};

onMounted(() => {
  getMenu();
});
</script>
<template>
  <BaseTable
    colKey="id"
    colInfo="name"
    title="Role"
    apiUrl="/roles"
    :columns="columns"
  >
    <template #prepend-action="{ row }">
      <q-btn
        dense
        unelevated
        size="sm"
        flat
        icon="eva-menu-2-outline"
        @click="
          () => {
            menu_dialog = true;
            findRole(row.id);
          }
        "
      />
    </template>
    <template #form="{ payload }">
      <div class="tw-grid tw-grid-cols-1 tw-gap-x-4 tw-gap-y-1">
        <InputTextField
          toplabel="Nama"
          :rules="[required]"
          v-model="payload.name"
        />
        <InputTextField
          type="textarea"
          toplabel="Description"
          v-model="payload.description"
        />
      </div>
    </template>
  </BaseTable>
  <q-dialog v-model="menu_dialog">
    <q-card style="min-width: 600px" class="tw-p-6">
      <q-card-section>
        <div class="text-h6 text-center">Assign Menu</div>
      </q-card-section>
      <q-card-section class="q-py-none">
        <div class="tw-text-lg tw-">
          Role: <span class="tw-font-semibold">{{ role?.name }}</span>
        </div>
        <q-separator class="tw-my-2" />
        <q-tree
          :nodes="menus"
          v-model:ticked="menus_ticked"
          node-key="id"
          label-key="name"
          children-key="children"
          default-expand-all
          tickStrategy="strict"
        />
      </q-card-section>
      <q-card-section align="center" class="tw-space-x-2">
        <Btn label="Cancel" color="grey-3" text-color="grey" v-close-popup />
        <Btn @click="assignMenu" :loading="loading" label="Submit" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
