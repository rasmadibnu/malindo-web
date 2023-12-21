<script lang="ts" setup>
import { ref } from 'vue';
import { required } from 'src/utils/validators.ts';
import BaseTable from 'components/ui/BaseTable.vue';
import InputTextField from 'src/components/form/InputTextField.vue';
import InputNumber from 'src/components/form/InputNumberField.vue';
import { formatRupiah } from 'src/utils/format';
import InputSelect from 'src/components/form/InputSelect.vue';

const columns = ref([
  {
    name: 'from',
    label: 'Asal',
    align: 'left',
    field: 'from',
  },
  {
    name: 'to',
    label: 'Tujuan',
    align: 'left',
    field: 'to',
  },
]);

const columnsPriceList = ref([
  {
    name: 'vehicle_type.name',
    label: 'Jenis Kendaraan',
    align: 'left',
    field: (row) => row.vehicle_type.name,
  },
  {
    name: 'lead_time',
    label: 'Lead Time',
    align: 'left',
    field: (row) => row.lead_time,
  },
  {
    name: 'price',
    label: 'Harga',
    align: 'left',
    field: (row) => formatRupiah(row.price),
  },
]);
const paramsPriceList = ref({});
const route = ref({});
const price_dialog = ref<boolean>(false);
const extended_payload = ref();

const changeRoute = (id) => {
  paramsPriceList.value.filters = '["route.id", "' + id + '"]';
  extended_payload.value = {
    route_id: id,
  };
};
</script>
<template>
  <BaseTable
    colKey="id"
    colInfo="to"
    title="Rute"
    apiUrl="/routes"
    menuCode="pricelist"
    :columns="columns"
  >
    <template #prepend-action="{ row }">
      <q-btn
        dense
        unelevated
        size="sm"
        flat
        icon="o_payments"
        @click="
          () => {
            price_dialog = true;
            route = row;
            changeRoute(row.id);
          }
        "
      >
        <q-tooltip anchor="bottom middle" self="top middle">
          Price List
        </q-tooltip>
      </q-btn>
    </template>
    <template #form="{ payload }">
      <div class="tw-grid md:tw-grid-cols-2 tw-gap-4">
        <InputTextField
          toplabel="Asal"
          :rules="[required]"
          v-model="payload.from"
        />
        <InputTextField
          toplabel="Tujuan"
          :rules="[required]"
          v-model="payload.to"
        />
      </div>
    </template>
  </BaseTable>
  <q-dialog v-model="price_dialog">
    <q-card class="tw-p-6" style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6 text-center">
          Price List ({{ route?.from }} - {{ route?.to }})
        </div>
      </q-card-section>
      <BaseTable
        flat
        title="Price List"
        api-url="/price-lists"
        menuCode="pricelist"
        :extPayload="extended_payload"
        :params="paramsPriceList"
        :columns="columnsPriceList"
      >
        <template #breadcrumbs></template>
        <template #form="{ payload }">
          <div class="tw-grid md:tw-grid-cols-2 tw-gap-4">
            <InputSelect
              v-model="payload.vehicle_type_id"
              toplabel="Jenis Kendaraan"
              apiUrl="/vehicle-types"
              opt-label="name"
              opt-value="id"
              map-options
              emit-value
              parentClass="tw-col-span-2"
            />

            <InputNumber
              toplabel="Price"
              mask="#"
              prefix="Rp"
              reverse-fill-mask
              :rules="[required]"
              v-model="payload.price"
            />

            <InputNumber
              toplabel="Lead Time"
              mask="#"
              reverse-fill-mask
              :rules="[required]"
              v-model="payload.lead_time"
            />
          </div>
        </template>
      </BaseTable>
    </q-card>
  </q-dialog>
</template>
