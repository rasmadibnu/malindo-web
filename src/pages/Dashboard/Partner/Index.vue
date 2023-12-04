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
    name: 'privilege',
    label: 'Privilege',
    align: 'left',
    field: 'privilege',
  },
  {
    name: 'description',
    label: 'Description',
    align: 'left',
    field: (row) => row.description,
  },
]);
</script>
<template>
  <BaseTable
    colKey="id"
    colInfo="name"
    title="Partner"
    apiUrl="/partners"
    :search_column="['name', 'privilege', 'description']"
    :columns="columns"
  >
    <template #form="{ payload }">
      <div class="tw-grid tw-grid-cols-2 tw-gap-x-4 tw-gap-y-1">
        <InputTextField
          toplabel="Nama"
          :rules="[required]"
          v-model="payload.name"
        />
        <InputSelect
          :rules="[required]"
          toplabel="Privilege"
          :options="['Retail', 'Company']"
          v-model="payload.privilege"
        />
        <InputTextField
          parentClass="tw-col-span-2"
          toplabel="Description"
          autogrow
          v-model="payload.description"
        />
      </div>
    </template>
  </BaseTable>
</template>
