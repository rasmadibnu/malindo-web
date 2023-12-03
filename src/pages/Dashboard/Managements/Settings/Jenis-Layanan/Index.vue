<script lang="ts" setup>
import { ref } from 'vue';
import { required } from 'src/utils/validators.ts';
import BaseTable from 'components/ui/BaseTable.vue';
import InputTextField from 'src/components/form/InputTextField.vue';
import InputSelect from 'src/components/form/InputSelect.vue';

const columns = ref([
  {
    name: 'name',
    label: 'Name',
    align: 'left',
    field: 'name',
  },
  {
    name: 'code',
    label: 'Kode',
    align: 'left',
    field: 'code',
  },
  {
    name: 'service.name',
    label: 'Service',
    align: 'left',
    field: (row) => row.service.name,
  },
]);
</script>
<template>
  <BaseTable
    colKey="id"
    colInfo="name"
    title="Jenis Layanan"
    apiUrl="/service-types"
    :columns="columns"
  >
    <template #form="{ payload }">
      <div class="tw-grid tw-grid-cols-2 tw-gap-x-4 tw-gap-y-4">
        <InputSelect
          :rules="[required]"
          map-options
          parentClass="tw-col-span-2"
          emit-value
          optLabel="name"
          optValue="id"
          toplabel="Layanan"
          apiUrl="/services"
          searchKey="name"
          v-model="payload.service_id"
        />
        <InputTextField
          toplabel="Nama"
          :rules="[required]"
          v-model="payload.name"
        />
        <InputTextField
          :rules="[required]"
          toplabel="Code"
          v-model="payload.code"
        />
      </div>
    </template>
  </BaseTable>
</template>
