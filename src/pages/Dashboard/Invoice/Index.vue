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
import { api } from 'src/boot/axios';

const columns: QTableColumn = [
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

const my_table = ref(null);
const statuses = ref([]);

const getStatus = () => {
  statuses.value = [];
  api.get('/invoices/status').then((res) => {
    statuses.value = res.data.data;
  });
};

const extended_payload = ref();

const addExtendPayload = (is_edit: boolean) => {
  extended_payload.value = [];
  if (!is_edit) {
    extended_payload.value = {
      status_id: 5,
    };
  }
};

onMounted(() => {
  getStatus();
});
</script>
<template>
  <BaseTable
    ref="my_table"
    :columns="columns"
    colKey="id"
    colInfo="police_no"
    title="Invoice"
    menuCode="vehicle"
    apiUrl="/invoices"
    @beforeSubmit="addExtendPayload"
    :params="params"
  >
    <template #top>
      <div
        class="tw-grid tw-gap-6"
        :class="
          statuses.length <= 4
            ? 'md:tw-grid-cols-' + statuses.length
            : 'md:tw-grid-cols-4'
        "
      >
        <q-card
          class="tw-shadow-md tw-cursor-pointer"
          v-for="status in statuses.sort((a, b) => a.id - b.id)"
          v-bind:key="status.id"
          @click="my_table.updateSearch(status.name)"
        >
          <q-card-section v-if="statuses.length > 0">
            <div class="tw-flex tw-justify-between">
              <div>
                <div class="tw-text-lg">
                  {{ status.count }}
                </div>
                <div class="tw-text-xs">
                  {{ status.name }}
                </div>
              </div>
              <div>
                <q-avatar :color="status.color" rounded>
                  <q-icon :name="status.icon" color="white" size="md" />
                </q-avatar>
              </div>
            </div>
          </q-card-section>
          <q-card-section v-else>
            <div class="tw-flex tw-justify-between">
              <div>
                <q-skeleton type="text" style="width: 20px" />
                <q-skeleton type="text" style="width: 60px" />
              </div>
              <div>
                <q-skeleton size="50px" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </template>
    <template v-slot:[`body-cell-status.name`]="{ props }">
      <q-td :props="props">
        <q-btn
          size="sm"
          unelevated
          :label="props.row.status.name"
          no-caps
          :color="props.row.status.color"
        >
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item
                v-for="status in statuses"
                v-bind:key="status.id"
                clickable
                v-close-popup
                dense
                @click="
                  () => {
                    // data = props.row;
                    // status_change = status;
                    // dialog_status = true;
                  }
                "
              >
                <q-item-section>
                  <q-badge
                    :label="status.name"
                    :color="status.color"
                    :style="{ backgroundColor: status.color }"
                  />
                </q-item-section>
              </q-item>
              <q-separator />
            </q-list>
          </q-menu>
        </q-btn>
      </q-td>
    </template>
    <template #form="{ payload }">
      <div class="tw-grid md:tw-grid-cols-2 tw-gap-x-4 tw-space-y-1.5">
        <InputSelect
          :rules="[required]"
          toplabel="Daya Angkut"
          :options="['8', '15', '30', '45']"
          v-model="payload.carrying_capacity"
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