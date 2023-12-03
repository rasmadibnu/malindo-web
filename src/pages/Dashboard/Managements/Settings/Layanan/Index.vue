<script lang="ts" setup>
import { ref } from 'vue';
import { required } from 'src/utils/validators.ts';
import BaseTable from 'components/ui/BaseTable.vue';
import InputTextField from 'src/components/form/InputTextField.vue';
import InputSelect from 'src/components/form/InputSelect.vue';

const columns = ref([
  {
    name: 'name',
    label: 'Nama',
    align: 'left',
    field: 'name',
  },
  {
    name: 'code',
    label: 'Kode',
    align: 'left',
    field: 'code',
  },
]);
</script>
<template>
  <BaseTable
    colKey="id"
    colInfo="name"
    title="Layanan"
    apiUrl="/services"
    :search_column="['name', 'code']"
    :columns="columns"
  >
    <template #form="{ payload }">
      <div class="tw-grid tw-grid-cols-2 tw-gap-x-4 tw-gap-y-1">
        <InputTextField
          toplabel="Nama"
          :rules="[required]"
          v-model="payload.name"
        />

        <InputTextField
          toplabel="Kode"
          :rules="[required]"
          v-model="payload.code"
        />
      </div>
    </template>
  </BaseTable>
</template>
