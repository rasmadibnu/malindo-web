<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { email, required, match } from 'src/utils/validators.ts';
import BaseTable from 'components/ui/BaseTable.vue';
import InputTextField from 'src/components/form/InputTextField.vue';
import InputSelect from 'src/components/form/InputSelect.vue';
import moment from 'moment';
import { api } from 'src/boot/axios';
import { Notify } from 'quasar';

const columns = ref([
  {
    name: 'name',
    label: 'Name',
    align: 'left',
    field: 'name',
  },
  {
    name: 'username',
    label: 'Username',
    align: 'left',
    field: 'username',
  },
  {
    name: 'email',
    label: 'Email',
    align: 'left',
    field: 'email',
  },
  {
    name: 'created_at',
    label: 'Created At',
    align: 'left',
    field: (row) => moment(row.created_at).format('YYYY-MM-DD'),
  },
  {
    name: 'partner',
    label: 'Partner',
    align: 'left',
    field: (row) => row.partner.name,
  },
]);

const columns_roles = [
  {
    name: 'name',
    label: 'Role',
    align: 'left',
    field: 'name',
    sortable: true,
  },
];

const user = ref({});
const loading = ref<boolean>(false);
const role_dialog = ref(false);
const roles = ref([]);
const role_selected = ref([]);
const role_loading = ref(false);

const findUser = (id_user: unknown) => {
  loading.value = true;
  api
    .get('/users/' + id_user)
    .then((res) => {
      user.value = res.data.data;
      role_selected.value = user.value.roles;
      loading.value = false;
    })
    .catch((err) => {
      console.log(err);
      loading.value = false;
    });
};

const getRoles = async () => {
  return api.get('/roles?size-1').then((res) => {
    roles.value = res.data.data.items;
  });
};

const assignRole = () => {
  api
    .post('/users/' + user.value.id + '/assign-role', {
      role_ids: role_selected.value.map((e) => e.id),
    })
    .then((res) => {
      loading.value = false;

      Notify.create({
        message: 'Menu berhasil ditambahkan',
        color: 'positive',
      });
      role_dialog.value = false;
    })
    .catch((err) => {
      loading.value = false;

      console.log(err);
    });
};

onMounted(() => {
  getRoles();
});
</script>
<template>
  <BaseTable
    colKey="id"
    colInfo="name"
    title="User"
    apiUrl="/users"
    :columns="columns"
  >
    <template #prepend-action="{ row }">
      <q-btn
        dense
        unelevated
        size="sm"
        flat
        icon="o_manage_accounts"
        @click="
          () => {
            role_dialog = true;
            findUser(row.id);
          }
        "
      />
    </template>
    <template #form="{ payload }">
      <div class="tw-grid md:tw-grid-cols-2 tw-gap-x-4 tw-gap-y-1">
        <InputTextField
          toplabel="Nama"
          :rules="[required]"
          v-model="payload.name"
        />
        <InputTextField
          :rules="[required]"
          toplabel="Username"
          v-model="payload.username"
        />
        <InputTextField
          :rules="[required]"
          type="password"
          toplabel="Password"
          v-model="payload.password"
        />
        <InputTextField
          :rules="[required, (val) => match(val, payload.password)]"
          type="password"
          toplabel="Konfirmasi Password"
          v-model="payload.konfirmasi_password"
        />
        <InputTextField
          :rules="[required, email]"
          toplabel="E-Mail"
          v-model="payload.email"
        />
        <InputSelect
          :rules="[required]"
          optLabel="name"
          optValue="id"
          map-options
          emit-value
          apiUrl="/partners"
          toplabel="Partner"
          v-model="payload.partner_id"
        />
      </div>
    </template>
  </BaseTable>
  <q-dialog v-model="role_dialog">
    <q-card style="width: 600px">
      <q-card-section class="row items-center">
        <div class="text-h6">Assign Role</div>
        <q-space />
        <q-btn flat round dense v-close-popup>
          <vx-icon iconName="CloseCircle" :size="20" />
        </q-btn>
      </q-card-section>
      <q-card-section class="q-py-none">
        <div class="tw-text-lg tw-mb-4">
          User: <span class="tw-font-semibold">{{ user?.name }}</span>
        </div>
        <q-table
          flat
          :rows="roles"
          :columns="columns_roles"
          v-model:selected="role_selected"
          row-key="id"
          selection="multiple"
          :loading="role_loading"
        >
        </q-table>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Batal" color="negative" no-caps v-close-popup />
        <q-btn flat label="Tambah" no-caps @click="assignRole" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
