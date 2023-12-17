<script lang="ts" setup>
import { ref } from 'vue';
import { required } from 'src/utils/validators.ts';
import BaseTable from 'components/ui/BaseTable.vue';
import InputTextField from 'src/components/form/InputTextField.vue';
import InputNumber from 'src/components/form/InputNumberField.vue';

const columns = ref([
  {
    name: 'name',
    label: 'Nama',
    align: 'left',
    field: 'name',
  },
  {
    name: 'days',
    label: 'Hari',
    align: 'left',
    field: (row) => row.days + ' Hari',
  },
]);
</script>
<template>
  <BaseTable
    colKey="id"
    colInfo="name"
    title="Termin"
    apiUrl="/termins"
    menuCode="termin"
    :columns="columns"
  >
    <template #form="{ payload }">
      <div class="tw-grid md:tw-grid-cols-2 tw-gap-4">
        <InputTextField
          toplabel="Nama"
          :rules="[required]"
          v-model="payload.name"
        />

        <InputNumber
          toplabel="Hari"
          mask="#"
          reverse-fill-mask
          :rules="[required]"
          v-model="payload.days"
        />
      </div>
    </template>
  </BaseTable>
</template>
