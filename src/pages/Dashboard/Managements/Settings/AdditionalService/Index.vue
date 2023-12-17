<script lang="ts" setup>
import { ref } from 'vue';
import { required } from 'src/utils/validators.ts';
import BaseTable from 'components/ui/BaseTable.vue';
import InputTextField from 'src/components/form/InputTextField.vue';
import InputNumberField from 'src/components/form/InputNumberField.vue';
import { formatRupiah } from 'src/utils/format';

const columns = ref([
  {
    name: 'name',
    label: 'Nama',
    align: 'left',
    field: 'name',
  },
  {
    name: 'estimation_charge',
    label: 'Estimasi Biaya',
    align: 'left',
    field: (row) => formatRupiah(row.estimation_charge),
  },
]);
</script>
<template>
  <BaseTable
    colKey="id"
    colInfo="name"
    title="Layanan Tambahan"
    apiUrl="/additional-services"
    menuCode="layanan-tambahan"
    :columns="columns"
  >
    <template #form="{ payload }">
      <div class="tw-grid md:tw-grid-cols-2 tw-gap-4">
        <InputTextField
          toplabel="Nama"
          :rules="[required]"
          v-model="payload.name"
        />

        <InputNumberField
          toplabel="Estimasi Biaya"
          :rules="[required]"
          mask="#"
          prefix="Rp."
          reverseFillMask
          v-model="payload.estimation_charge"
        />
      </div>
    </template>
  </BaseTable>
</template>
