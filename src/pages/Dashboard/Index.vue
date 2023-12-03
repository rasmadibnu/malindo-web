<script lang="ts" setup>
import BaseTable from 'components/ui/BaseTable.vue';
import InputTextField from 'src/components/form/InputTextField.vue';
import { QTableColumn } from 'quasar';
const columns: QTableColumn = [
  {
    name: 'created_at',
    label: 'Tgl Input Data',
    align: 'left',
    field: 'created_at',
    sortable: true,
  },
  {
    name: 'no_transaction',
    align: 'center',
    label: 'No Transaksi',
    field: 'no_transaction',
    sortable: true,
  },
  { name: 'produk', label: 'Produk', field: 'produk', sortable: true },
  { name: 'layanan', label: 'Layanan', field: 'layanan' },
  { name: 'jenis', label: 'Jenis Layanan', field: 'jenis' },
  { name: 'oldpol', label: 'No Polisi Lama', field: 'oldpol' },
  { name: 'newpol', label: 'No Polisi Baru', field: 'newpol' },
  { name: 'stnkname', label: 'Nama STNK', field: 'stnkname' },
  { name: 'bpkbname', label: 'Nama BPKB', field: 'bpkbname' },
  { name: 'status', label: 'Status', field: 'status' },
  { name: 'ket', label: 'Keterangan', field: 'ket' },
  {
    name: 'calcium',
    label: 'Calcium (%)',
    field: 'calcium',
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: 'iron',
    label: 'Iron (%)',
    field: 'iron',
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
];

const rows = [
  {
    created_at: 'adwadwww',
    no_transaction: 'Frozen Yogurt',
    produk: 'R2',
    layanan: 'PAJAK & STNK',
    jenis: 'Perpanjangan',
  },
  {
    created_at: 'adwadwww',
    no_transaction: 'Ice cream sandwich',
    produk: 'R4',
    layanan: 'Faktur',
    jenis: 'Cek faktu',
  },
  {
    created_at: 'adwadwww',
    no_transaction: 'Eclair',
    produk: 'R2',
    layanan: 'PAJAK & STNK',
    jenis: 'Bayar Pajak',
  },
  {
    created_at: 'adwadwww',
    no_transaction: 'Cupcake',
    produk: 'R2',
    layanan: 'BPKB',
    jenis: 'Blokir',
  },
  {
    created_at: 'adwadwww',
    no_transaction: 'Gingerbread',
    produk: 'R2',
    layanan: 'PAJAK & STNK',
    jenis: 'Bayar Pajak',
  },
  {
    created_at: 'adwadwww',
    no_transaction: 'Jelly bean',
    produk: 'R2',
    layanan: 'BPKB',
    jenis: 'Blokir BPKB',
  },
  {
    ncreated_at: 'adwadwww',
    no_transaction: 'Lollipop',
    produk: 'R2',
    layanan: 'PAJAK & STNK',
    jenis: 'Perpanjangan',
  },
  {
    created_at: 'adwadwww',
    no_transaction: 'Honeycomb',
    produk: 'R2',
    layanan: 'PAJAK & STNK',
    jenis: 'Perpanjangan',
  },
  {
    created_at: 'adwadwww',
    no_transaction: 'Donut',
    produk: 'R4',
    layanan: 'BPKB',
    jenis: 'Blokir',
  },
  {
    created_at: 'adwadwww',
    no_transaction: 'KitKat',
    produk: 'R4',
    layanan: 'BPKB',
    jenis: 'Blokir',
  },
];
</script>
<template>
  <div class="tw-grid tw-grid-cols-2 tw-gap-4">
    <q-card class="tw-shadow-md">
      <q-card-section class="tw-grid tw-grid-cols-11">
        <div class="tw-col-span-5 tw-space-y-1">
          <div class="tw-flex tw-items-center tw-gap-1">
            <div class="tw-text-2xl">350 data</div>
            <q-icon name="star" size="sm" color="primary" />
          </div>
          <div class="tw-font-semibold">Total 187 users</div>
          <div>Top Layanan</div>
        </div>
        <div class="tw-col-span-1 tw-flex tw-justify-center">
          <q-separator vertical inset />
        </div>

        <div class="tw-col-span-5">
          <div class="tw-grid tw-grid-cols-4">
            <div class="tw-col-span-1">Pajak & STNK</div>
            <div class="tw-col-span-2 tw-flex tw-items-center">
              <q-linear-progress
                class="tw-shadow-md"
                rounded
                size="md"
                :value="0.7"
                color="primary"
              />
            </div>
            <div class="tw-col-span-1 tw-text-right">124</div>
          </div>
          <div class="tw-grid tw-grid-cols-4">
            <div class="tw-col-span-1">BPKB</div>
            <div class="tw-col-span-2 tw-flex tw-items-center">
              <q-linear-progress
                class="tw-shadow-md"
                rounded
                size="md"
                :value="0.4"
                color="primary"
              />
            </div>
            <div class="tw-col-span-1 tw-text-right">40</div>
          </div>
          <div class="tw-grid tw-grid-cols-4">
            <div class="tw-col-span-1">Faktur</div>
            <div class="tw-col-span-2 tw-flex tw-items-center">
              <q-linear-progress
                class="tw-shadow-md"
                rounded
                size="md"
                :value="0.3"
                color="primary"
              />
            </div>
            <div class="tw-col-span-1 tw-text-right">12</div>
          </div>
          <div class="tw-grid tw-grid-cols-4">
            <div class="tw-col-span-1">Absah</div>
            <div class="tw-col-span-2 tw-flex tw-items-center">
              <q-linear-progress
                class="tw-shadow-md"
                rounded
                size="md"
                :value="0.2"
                color="primary"
              />
            </div>
            <div class="tw-col-span-1 tw-text-right">7</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card class="tw-shadow-md">
      <q-card-section class="tw-grid tw-grid-cols-11">
        <div class="tw-col-span-5 tw-space-y-1">
          <div class="tw-flex tw-items-center tw-gap-1">
            <div class="tw-text-2xl">350 data</div>
            <q-icon name="star" size="sm" color="primary" />
          </div>
          <div class="tw-font-semibold">Total 187 users</div>
          <div>Top Layanan</div>
        </div>
        <div class="tw-col-span-1 tw-flex tw-justify-center">
          <q-separator vertical inset />
        </div>

        <div class="tw-col-span-5">
          <div class="tw-grid tw-grid-cols-4">
            <div class="tw-col-span-1">Pajak & STNK</div>
            <div class="tw-col-span-2 tw-flex tw-items-center">
              <q-linear-progress
                class="tw-shadow-md"
                rounded
                size="md"
                :value="0.7"
                color="primary"
              />
            </div>
            <div class="tw-col-span-1 tw-text-right">124</div>
          </div>
          <div class="tw-grid tw-grid-cols-4">
            <div class="tw-col-span-1">BPKB</div>
            <div class="tw-col-span-2 tw-flex tw-items-center">
              <q-linear-progress
                class="tw-shadow-md"
                rounded
                size="md"
                :value="0.4"
                color="primary"
              />
            </div>
            <div class="tw-col-span-1 tw-text-right">40</div>
          </div>
          <div class="tw-grid tw-grid-cols-4">
            <div class="tw-col-span-1">Faktur</div>
            <div class="tw-col-span-2 tw-flex tw-items-center">
              <q-linear-progress
                class="tw-shadow-md"
                rounded
                size="md"
                :value="0.3"
                color="primary"
              />
            </div>
            <div class="tw-col-span-1 tw-text-right">12</div>
          </div>
          <div class="tw-grid tw-grid-cols-4">
            <div class="tw-col-span-1">Absah</div>
            <div class="tw-col-span-2 tw-flex tw-items-center">
              <q-linear-progress
                class="tw-shadow-md"
                rounded
                size="md"
                :value="0.2"
                color="primary"
              />
            </div>
            <div class="tw-col-span-1 tw-text-right">7</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card class="tw-col-span-2 tw-shadow-md">
      <q-card-section
        class="tw-grid md:tw-grid-cols-4 md:tw-divide-x-[1px] tw-gap-4"
      >
        <div class="tw-flex tw-justify-between">
          <div>
            <div class="tw-text-lg">34</div>
            <div class="tw-text-xs">New</div>
          </div>
          <div>
            <q-avatar class="tw-bg-blue-300" size="md" rounded>
              <q-icon name="o_shopping_cart" color="white" />
            </q-avatar>
          </div>
        </div>
        <div class="tw-flex tw-justify-between md:tw-pl-3">
          <div>
            <div class="tw-text-lg">10</div>
            <div class="tw-text-xs">In Progress</div>
          </div>
          <div>
            <q-avatar class="tw-bg-green-300" size="md" rounded>
              <q-icon name="cached" color="white" />
            </q-avatar>
          </div>
        </div>
        <div class="tw-flex tw-justify-between md:tw-pl-3">
          <div>
            <div class="tw-text-lg">2</div>
            <div class="tw-text-xs">Return</div>
          </div>
          <div>
            <q-avatar class="tw-bg-red-300" size="md" rounded>
              <q-icon name="undo" color="white" />
            </q-avatar>
          </div>
        </div>
        <div class="tw-flex tw-justify-between md:tw-pl-3">
          <div>
            <div class="tw-text-lg">106</div>
            <div class="tw-text-xs">Succes</div>
          </div>
          <div>
            <q-avatar class="tw-bg-yellow-300" size="md" rounded>
              <q-icon name="verified" color="white" />
            </q-avatar>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <BaseTable :columns="columns" :rows="rows">
      <template #form>
        <div class="tw-grid tw-grid-cols-2 tw-gap-4 tw">
          <InputTextField toplabel="Produk" />
          <InputTextField toplabel="Layanan" />
          <InputTextField toplabel="No Polisi Baru" />
          <InputTextField toplabel="No Polisi Lama" />
          <InputTextField toplabel="Nama STNK" />
          <InputTextField toplabel="Nama BPKB" />
          <InputTextField toplabel="Unit" parentClass="tw-col-span-2" />
        </div>
      </template>
    </BaseTable>
  </div>
</template>
<style scoped>
:deep(.input-box .q-field__control),
:deep(.input-box .q-field__marginal) {
  height: 36px;
}
</style>
