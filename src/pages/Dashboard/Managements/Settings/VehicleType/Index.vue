<script lang="ts" setup>
import { ref } from 'vue';
import { required } from 'src/utils/validators.ts';
import BaseTable from 'components/ui/BaseTable.vue';
import InputTextField from 'src/components/form/InputTextField.vue';
import InputSelect from 'src/components/form/InputSelect.vue';
import InputNumberField from 'src/components/form/InputNumberField.vue';

const columns = ref([
  {
    name: 'name',
    label: 'Nama',
    align: 'left',
    field: 'name',
    sortable: false,
  },
  {
    name: 'unit',
    label: 'Satuan',
    align: 'left',
    field: 'unit',
    sortable: false,
  },
  {
    name: 'from_weight',
    label: 'Berat Minimal',
    align: 'left',
    field: 'from_weight',
    sortable: false,
  },
  {
    name: 'to_weight',
    label: 'Berat Maksimal',
    align: 'left',
    field: 'to_weight',
    sortable: false,
  },
  {
    name: 'size',
    label: 'Ukuran',
    align: 'left',
    field: 'size',
    sortable: false,
  },
]);
</script>
<template>
  <BaseTable
    colKey="id"
    colInfo="name"
    title="Jenis Armada"
    apiUrl="/vehicle-types"
    menuCode="jenis-armada"
    :columns="columns"
  >
    <template #form="{ payload }">
      <div class="md:tw-grid md:tw-grid-cols-2 tw-gap-x-4 tw-space-y-1.5">
        <InputTextField
          toplabel="Nama"
          :rules="[required]"
          v-model="payload.name"
        />
        <InputSelect
          :options="[
            { label: 'Kg', value: 'Kg' },
            { label: 'Ton', value: 'Ton' },
          ]"
          toplabel="Satuan"
          map-options
          emit-value
          v-model="payload.unit"
        />
        <InputNumberField
          toplabel="Berat Minimal"
          v-model="payload.from_weight"
          mask="#"
          reverse-fill-mask
        />
        <InputNumberField
          toplabel="Berat Maksimaal"
          v-model="payload.to_weight"
          mask="#"
          reverse-fill-mask
        />
        <InputTextField
          toplabel="Ukuran"
          hint="P x L x T"
          parentClass="tw-col-span-2"
          v-model="payload.size"
        />
        <InputTextField
          toplabel="Keterangan"
          parentClass="tw-col-span-2"
          v-model="payload.description"
          type="textarea"
        />
      </div>
    </template>
  </BaseTable>
</template>
