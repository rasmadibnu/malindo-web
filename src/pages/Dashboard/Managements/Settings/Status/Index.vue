<script lang="ts" setup>
import { ref } from 'vue';
import { required } from 'src/utils/validators.ts';
import BaseTable from 'components/ui/BaseTable.vue';
import InputTextField from 'src/components/form/InputTextField.vue';

const columns = ref([
  {
    name: 'name',
    label: 'Name',
    align: 'left',
    field: 'name',
    slot: true,
  },
  {
    name: 'scope',
    label: 'Scope',
    align: 'left',
    field: 'scope',
  },
  {
    name: 'code',
    label: 'Code',
    align: 'left',
    field: 'code',
  },
  {
    name: 'color',
    label: 'Color',
    align: 'left',
    field: 'color',
  },
  {
    name: 'icon',
    label: 'Icon',
    align: 'left',
    field: 'icon',
    slot: true,
  },
]);
</script>
<template>
  <BaseTable
    colKey="id"
    colInfo="name"
    title="Status"
    apiUrl="/statuses"
    :search_column="['name', 'color', 'icon']"
    :columns="columns"
  >
    <template #body-cell-icon="{ props }">
      <q-td :props="props">
        <q-icon :name="props.row.icon" size="sm" />
      </q-td>
    </template>
    <template #body-cell-name="{ props }">
      <q-td :props="props">
        <q-badge
          :label="props.row.name"
          :color="props.row.color"
          :style="{ backgroundColor: props.row.color }"
        />
      </q-td>
    </template>
    <template #form="{ payload }">
      <div class="md:tw-grid md:tw-grid-cols-2 tw-gap-x-4 tw-space-y-1.5">
        <InputTextField
          parentClass="tw-col-span-2"
          toplabel="Nama"
          :rules="[required]"
          v-model="payload.name"
        />
        <InputTextField
          :rules="[required]"
          toplabel="Scope"
          v-model="payload.scope"
        />
        <InputTextField
          :rules="[required]"
          toplabel="Code"
          v-model="payload.code"
        />
        <InputTextField toplabel="Color" v-model="payload.color">
          <template v-slot:append>
            <q-icon name="colorize" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-color v-model="payload.color" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </InputTextField>
        <InputTextField toplabel="Icon" v-model="payload.icon" />
      </div>
    </template>
  </BaseTable>
</template>
