<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import BaseTable from 'components/ui/BaseTable.vue';
import InputTextField from 'src/components/form/InputTextField.vue';
import InputSelect from 'src/components/form/InputSelect.vue';
import Btn from 'src/components/ui/Button.vue';
import { QTableColumn } from 'quasar';
import { required } from 'src/utils/validators';
import moment from 'moment';

const columns: QTableColumn = [
  {
    name: 'code',
    align: 'left',
    label: 'Kode',
    field: 'no',
    sortable: false,
  },
  {
    name: 'name',
    align: 'left',
    label: 'Nama',
    field: 'name',
    sortable: false,
  },

  {
    name: 'id_number',
    align: 'left',
    label: 'No KTP',
    field: 'id_number',
    sortable: false,
  },
  {
    name: 'license_type',
    align: 'left',
    label: 'Kategori SIM',
    field: 'license_category',
    sortable: false,
  },
  {
    name: 'license_number',
    align: 'left',
    label: 'No SIM',
    field: 'license_number',
    sortable: false,
  },
  {
    name: 'position',
    align: 'left',
    label: 'Posisi',
    field: 'position',
    sortable: false,
  },
  {
    name: 'city',
    align: 'left',
    label: 'Kota',
    field: 'city',
    sortable: false,
  },
  {
    name: 'regency',
    align: 'left',
    label: 'Kecamatan',
    field: 'regency',
    sortable: false,
  },
  {
    name: 'district',
    align: 'left',
    label: 'Kelurahan',
    field: 'district',
    sortable: false,
  },
  {
    name: 'post_code',
    align: 'left',
    label: 'Kode Pos',
    field: 'post_code',
    sortable: false,
  },
  {
    name: 'created_at',
    label: 'Created At',
    align: 'left',
    field: (row) => moment(row.created_at).format('DD-MM-YYYY HH:mm:ss'),
    sortable: false,
  },
];

const params = ref({
  sort: '-created_at',
});
</script>
<template>
  <BaseTable
    ref="my_table"
    :columns="columns"
    colKey="id"
    colInfo="no"
    title="Driver"
    apiUrl="/drivers"
    :params="params"
  >
    <template #form="{ payload }">
      <div class="tw-grid tw-grid-cols-6 tw-gap-x-4 tw-gap-y-1.5">
        <InputTextField
          :rules="[required]"
          parentClass="tw-col-span-6"
          toplabel="Nama"
          v-model="payload.name"
        />
        <InputSelect
          :rules="[required]"
          toplabel="Jabatan"
          parentClass="tw-col-span-3"
          :options="['Tetap', 'Lepas']"
          v-model="payload.position"
        />
        <InputTextField
          :rules="[required]"
          parentClass="tw-col-span-3"
          toplabel="No KTP"
          mask="#"
          reverse-fill-mask
          v-model="payload.id_number"
        />
        <InputSelect
          :rules="[required]"
          parentClass="tw-col-span-3"
          :options="['A', 'B1', 'B2', 'C', 'D', 'Internasional']"
          toplabel="Kategori SIM"
          v-model="payload.license_category"
        />
        <InputTextField
          :rules="[required]"
          parentClass="tw-col-span-3"
          toplabel="No SIM"
          mask="#"
          reverse-fill-mask
          v-model="payload.license_number"
        />
        <InputTextField
          parentClass="tw-col-span-6"
          toplabel="Alamat"
          v-model="payload.address"
        />
        <InputTextField
          parentClass="tw-col-span-3"
          toplabel="Kota"
          v-model="payload.city"
        />
        <InputTextField
          toplabel="Kecamatan"
          parentClass="tw-col-span-3"
          v-model="payload.regency"
        />
        <InputTextField
          toplabel="Kelurahan"
          parentClass="tw-col-span-3"
          v-model="payload.district"
        />

        <InputTextField
          parentClass="tw-col-span-3"
          toplabel="Kode Pos"
          mask="#"
          reverse-fill-mask
          v-model="payload.post_code"
        />
      </div>
    </template>
  </BaseTable>
  <q-dialog
    v-model="dialog_status"
    @hide="
      () => {
        data = {};
        status_change = {};
        note = '';
      }
    "
  >
    <q-card class="tw-p-6" style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="text-center text-h6">Update Status</div>
      </q-card-section>

      <q-form @submit.prevent="updateStatus">
        <q-card-section class="q-pb-none">
          <InputTextField autofocus toplabel="Note" v-model="note" />
        </q-card-section>
        <q-card-actions align="between" class="tw-gap-4">
          <div>
            <q-badge
              :label="data.status.name"
              :color="data.status.color"
              :style="{ backgroundColor: data.status.color }"
            />
            <q-avatar>
              <q-icon name="arrow_right_alt" />
            </q-avatar>
            <q-badge
              :label="status_change.name"
              :color="status_change.color"
              :style="{ backgroundColor: status_change.color }"
            />
          </div>
          <Btn label="Update" type="submit" :loading="loading" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
  <q-dialog
    v-model="dialog_detail"
    @hide="
      () => {
        data = {};
        logs = [];
      }
    "
  >
    <q-card class="tw-p-6" style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="text-center text-h6">Detail Data</div>
      </q-card-section>
      <q-card-section>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="data" label="Data" />
          <q-tab name="history" label="History" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel
            name="data"
            class="tw-grid md:tw-grid-cols-2 md:tw-space-x-8 tw-space-x-4 tw-gap-4 md:tw-gap-0 q-px-none"
          >
            <div>
              <q-list
                dense
                class="tw-grid tw-grid-cols-2 tw-gap-4 tw-items-start"
              >
                <q-item>
                  <q-item-section>
                    <q-item-label class="tw-font-bold"
                      >Tgl Input Data</q-item-label
                    >
                    <q-item-label caption>{{
                      moment(data?.created_at).format('YYYY-MM-DD hh:mm:ss')
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="tw-font-bold"
                      >No Transaksi</q-item-label
                    >
                    <q-item-label caption>{{ data?.no }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="tw-font-bold"
                      >Jenis Layanan</q-item-label
                    >
                    <q-item-label caption>{{
                      data?.service_type?.name
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="tw-font-bold">Produk</q-item-label>
                    <q-item-label caption>{{ data?.product }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="tw-font-bold">Unit</q-item-label>
                    <q-item-label caption>{{ data?.unit }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="tw-font-bold">A/N BPKB</q-item-label>
                    <q-item-label caption>{{ data?.bpkb_name }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="tw-font-bold">No BPKB</q-item-label>
                    <q-item-label caption>{{ data?.bpkb_no }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="tw-font-bold">No Mesin</q-item-label>
                    <q-item-label caption>{{ data?.machine_no }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="tw-font-bold">No Rangka</q-item-label>
                    <q-item-label caption>{{ data?.chassis_no }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="tw-font-bold">No Polisi</q-item-label>
                    <q-item-label caption>{{
                      data?.police_no_old
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
            <div>
              <div class="tw-font-bold">Keterangan</div>
              <div>{{ data?.description }}</div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="history">
            <q-timeline color="secondary" layout="loose">
              <q-timeline-entry
                v-for="log in logs"
                v-bind:key="log.id"
                :color="log.status.color"
              >
                <template v-slot:subtitle>
                  {{ moment(log.created_at).format('MM-DD-YYYY hh:mm:ss') }}
                  <br />
                  <span class="tw-capitalize">
                    {{ log.created_by.name }}
                  </span>
                </template>
                <template v-slot:title>
                  <q-badge
                    rounded
                    :label="log.status.name"
                    :color="log.status.color"
                    :style="{ backgroundColor: log.status.color }"
                  />
                </template>
                {{ log.note }}
              </q-timeline-entry>
            </q-timeline>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
