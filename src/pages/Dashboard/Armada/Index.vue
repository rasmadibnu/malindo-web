<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import BaseTable from 'components/ui/BaseTable.vue';
import InputTextField from 'src/components/form/InputTextField.vue';
import InputSelect from 'src/components/form/InputSelect.vue';
import InputDate from 'src/components/form/InputDate.vue';
import Btn from 'src/components/ui/Button.vue';
import { QTableColumn } from 'quasar';
import { required } from 'src/utils/validators';
import moment from 'moment';

const columns: QTableColumn = [
  {
    name: 'police_no',
    align: 'left',
    label: 'Nomor Polisi',
    field: 'police_no',
    sortable: false,
  },
  {
    name: 'brand',
    align: 'left',
    label: 'Merek',
    field: 'brand',
    sortable: false,
  },

  {
    name: 'type',
    align: 'left',
    label: 'Type',
    field: 'type',
    sortable: false,
  },
  {
    name: 'carrying_capacity',
    align: 'left',
    label: 'Daya Angkut',
    field: 'carrying_capacity',
    sortable: false,
  },
  {
    name: 'year',
    align: 'left',
    label: 'Tahun Kendaraan',
    field: 'year',
    sortable: false,
  },
  {
    name: 'bpkb_name',
    align: 'left',
    label: 'A/N BPKB',
    field: 'bpkb_name',
    sortable: false,
  },
  {
    name: 'tax_date',
    align: 'left',
    label: 'Tanggal Pajak',
    field: 'tax_date',
    sortable: false,
  },
  {
    name: 'registration_date',
    align: 'left',
    label: 'Tanggal STNK',
    field: 'registration_date',
    sortable: false,
  },
  {
    name: 'odometer',
    align: 'left',
    label: 'ODO Meter',
    field: 'odometer',
    sortable: false,
  },
  {
    name: 'ownership_type',
    align: 'left',
    label: 'Jenis Kepemilikan',
    field: 'ownership_type',
    sortable: false,
  },
  // {
  //   name: 'skema_keuntungan',
  //   align: 'left',
  //   label: 'Skema Keuntungan',
  //   field: 'skema_keuntungan',
  //   sortable: false,
  // },
  // {
  //   name: 'ket',
  //   align: 'left',
  //   label: 'Keterangan',
  //   field: 'ket',
  //   sortable: false,
  // },
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
    colInfo="police_no"
    title="Armada"
    apiUrl="/vehicles"
    :params="params"
  >
    <template #form="{ payload }">
      <div class="tw-grid tw-grid-cols-2 tw-gap-x-4 tw-gap-y-1.5">
        <InputTextField
          :rules="[required]"
          toplabel="Nomor Polisi"
          v-model="payload.police_no"
        />

        <InputTextField
          :rules="[required]"
          v-model="payload.brand"
          toplabel="Merek"
        />
        <InputSelect
          :rules="[required]"
          toplabel="Type Kendaraan"
          :options="['CDD', '6 Roda', '10 Roda', '12 Roda']"
          v-model="payload.type"
        />
        <InputSelect
          :rules="[required]"
          toplabel="Daya Angkut"
          :options="['8', '15', '30', '45']"
          v-model="payload.carrying_capacity"
        />
        <InputTextField
          :rules="[required]"
          toplabel="A/N BPKB"
          v-model="payload.bpkb_name"
        />
        <InputDate
          :rules="[required]"
          toplabel="Tanggal Pajak"
          v-model="payload.tax_date"
        />
        <InputDate
          :rules="[required]"
          toplabel="Tanggal STNK"
          v-model="payload.registration_date"
        />
        <InputTextField
          :rules="[required]"
          toplabel="Tahun Kendaraan"
          mask="#"
          reverse-fill-mask
          maxlength="4"
          v-model="payload.year"
        />
        <InputTextField
          :rules="[required]"
          toplabel="Odometer"
          mask="#"
          reverse-fill-mask
          v-model="payload.odometer"
        />
        <InputSelect
          :rules="[required]"
          toplabel="Jenis Kepemilikan"
          :options="['Milik Sendiri', 'Mitra', 'Titipan']"
          v-model="payload.ownership_type"
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
