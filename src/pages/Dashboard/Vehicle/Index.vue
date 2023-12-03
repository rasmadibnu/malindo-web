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
    name: 'no_polisi',
    align: 'left',
    label: 'Nomor Polisi',
    field: 'no_polisi',
    sortable: false,
  },
  {
    name: 'merek',
    align: 'left',
    label: 'Merek',
    field: 'merek',
    sortable: false,
    slot: true,
  },

  {
    name: 'type_kendaraan',
    align: 'left',
    label: 'Type Kendaraan',
    field: 'type_kendaraan',
    sortable: false,
  },
  {
    name: 'daya_angkut',
    align: 'left',
    label: 'Daya Angkut',
    field: 'daya_angkut',
    sortable: false,
  },
  {
    name: 'tahun_kendaraan',
    align: 'left',
    label: 'Tahun Kendaraan',
    field: 'tahun_kendaraan',
    sortable: false,
  },
  {
    name: 'nama_bpkb',
    align: 'left',
    label: 'A/N BPKB',
    field: 'nama_bpkb',
    sortable: false,
  },
  {
    name: 'tgl_pajak',
    align: 'left',
    label: 'Tgl Pajak',
    field: 'tgl_pajak',
    sortable: false,
  },
  {
    name: 'tgl_stnk',
    align: 'left',
    label: 'Tgl STNK',
    field: 'tgl_stnk',
    sortable: false,
  },
  {
    name: 'odo_meter',
    align: 'left',
    label: 'ODO Meter',
    field: 'odo_meter',
    sortable: false,
  },
  {
    name: 'jenis_kepemilikan',
    align: 'left',
    label: 'Jenis Kepemilikan',
    field: 'jenis_kepemilikan',
    sortable: false,
  },
  {
    name: 'skema_keuntungan',
    align: 'left',
    label: 'Skema Keuntungan',
    field: 'skema_keuntungan',
    sortable: false,
  },
  {
    name: 'ket',
    align: 'left',
    label: 'Keterangan',
    field: 'ket',
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
    title="Vehicle"
    apiUrl="/drivers"
    :params="params"
  >
    <template #form="{ payload }">
      <div class="tw-grid tw-grid-cols-2 tw-gap-x-4 tw-gap-y-1.5">
        <InputSelect
          :rules="[required]"
          toplabel="Nomor Polisi"
          :options="[
            'B9010GDA',
            'B9137MZ',
            'B9345TEH',
            'B9347TEH',
            'B9404UYU',
            'B9455JA',
            'B9927NDB',
            'DC8079AR',
            'DC8352AU',
            'DC8996AS',
            'DC8997AS',
            'DD8030XX',
            'DD8031XX',
            'DD8036XX',
            'DD8128RT',
            'DD8183UD',
            'DD8184UD',
            'DD8220YD',
            'DD8303RA',
            'DD8332RT',
            'DD8373RT',
            'DD8422ME',
            'DD8446KN',
            'DD8475SW',
            'DD8503EH',
            'DD8574HD',
            'DD8605CB',
            'DD8649EH',
            'DD8711MQ',
            'DD8738KY',
            'DD8741DG',
            'DD8853UC',
            'DD8886MN',
            'DD8902KE',
            'DD8931UC',
            'DD8943KW',
            'DD9573XV',
            'DD9825BU',
            'DM8111D',
            'DN8480YU',
            'DN8666AP',
            'DP8911DG',
            'DW8049CE',
            'L9165UX',
            'L9743CD',
          ]"
          v-model="payload.no_polisi"
        />

        <InputSelect
          :rules="[required]"
          :options="[
            'FAW',
            'FAW CA1310',
            'FUSO',
            'HINO',
            'HINO DUTRO EURO 4',
            'HINO FG235JK',
            'HINO FM8JNID  EGJ',
            'IZUSU NKR 71',
            'MITSUBISHI CANTER',
            'MITSUBISHI FUSO',
            'MITSUBISHI FUSO FM 517 HS',
            'MITSUBISHI FUSO FN 527 ML (6X4) M/T',
            'MITSUBISHI FUSO FN 527 MS (6X4) M/T',
            'MITSUBISHI FUSO FV 517',
            'NISSAN',
            'NISSAN CKA 12',
            'NISSAN CWA 260',
            'NISSAN CWA 260 MX TRONTON',
            'NISSAN CWM 432',
            'NISSAN PKD 211',
            'QUESTER',
            'UD TRUCKS NISSAN CWA 260',
          ]"
          toplabel="Merek"
        />
        <InputSelect
          :rules="[required]"
          toplabel="Type Kendaraan"
          :options="['CDD', '6 Roda', '10 Roda', '12 Roda']"
          v-model="payload.type_kendaraan"
        />
        <InputSelect
          :rules="[required]"
          toplabel="Daya Angkut"
          :options="[8, 15, 30, 45]"
          v-model="payload.daya_angkut"
        />
        <InputSelect
          :rules="[required]"
          toplabel="Tahun Kendaraan"
          :options="[8, 15, 30, 45]"
          v-model="payload.daya_angkut"
        />
        <InputTextField
          :rules="[required]"
          toplabel="A/N BPKB"
          v-model="payload.nama_bpkb"
        />
        <InputTextField
          :rules="[required]"
          toplabel="Tgl Pajak"
          v-model="payload.tgl_pajak"
        />
        <InputTextField
          :rules="[required]"
          toplabel="Tgl STNK"
          v-model="payload.tgl_stnk"
        />
        <InputTextField
          :rules="[required]"
          toplabel="Tgl STNK"
          v-model="payload.tgl_stnk"
        />
        <InputTextField
          :rules="[required]"
          toplabel="Unit"
          parentClass="tw-col-span-2"
          v-model="payload.unit"
        />
        <InputTextField
          :rules="[required]"
          mask="####"
          toplabel="Tahun Kendaraan"
          v-model="payload.asset_year"
        />
        <InputTextField
          :rules="[required]"
          toplabel="No Mesin"
          v-model="payload.machine_no"
        />
        <InputTextField
          :rules="[required]"
          toplabel="No Rangka"
          v-model="payload.chassis_no"
        />
        <InputTextField
          :rules="[required]"
          toplabel="No Plat"
          v-model="payload.police_no_old"
        />
        <InputTextField
          parentClass="tw-col-span-2"
          type="textarea"
          toplabel="Keterangan"
          v-model="payload.description"
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
