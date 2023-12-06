<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import BaseTable from 'components/ui/BaseTable.vue';
import InputTextField from 'src/components/form/InputTextField.vue';
import InputNumberField from 'src/components/form/InputNumberField.vue';
import InputSelect from 'src/components/form/InputSelect.vue';
import Btn from 'src/components/ui/Button.vue';
import { Notify, QTableColumn } from 'quasar';
import { required } from 'src/utils/validators';
import moment from 'moment';
import { api } from 'src/boot/axios';
import { useAuthStore } from 'src/stores/auth';

const auth = useAuthStore();
const columns: QTableColumn = [
  {
    name: 'status.name',
    align: 'center',
    label: 'Status',
    slot: true,
  },
  {
    name: 'no',
    align: 'left',
    label: 'No Transaksi',
    field: 'no',
    sortable: false,
    slot: true,
  },
  {
    name: 'created_at',
    label: 'Tanggal Order',
    align: 'left',
    field: (row) => moment(row.created_at).format('DD-MM-YYYY HH:mm:ss'),
    sortable: false,
  },
  {
    name: 'user.name',
    label: 'Nama Pelanggan',
    align: 'left',
    field: (row) => row.user.name,
    sortable: false,
  },
  {
    name: 'user.partner.name',
    label: 'Partner',
    align: 'left',
    field: (row) => row.user.partner.name,
    sortable: false,
  },
  {
    name: 'payment_scheme',
    label: 'Skema Pembayaran',
    align: 'left',
    field: 'payment_scheme',
    sortable: false,
  },
  {
    name: 'driver.name',
    label: 'Driver',
    align: 'left',
    field: (row) => row.driver.name,
    sortable: false,
  },
  {
    name: 'vehicle.police_no',
    label: 'Armada',
    align: 'left',
    field: (row) => row.vehicle.police_no,
    sortable: false,
  },
  {
    name: 'type_transaction',
    label: 'Jenis Transaksi',
    align: 'left',
    field: 'type_transaction',
    sortable: false,
  },
  {
    name: 'weight',
    label: 'Berat (Kg)',
    align: 'left',
    field: 'weight',
    sortable: false,
  },
  {
    name: 'from',
    label: 'Daerah Asal',
    align: 'left',
    field: 'from',
    sortable: false,
  },
  {
    name: 'to',
    label: 'Daerah Tujuan',
    align: 'left',
    field: 'to',
    sortable: false,
  },
  {
    name: 'price_per_volume',
    label: 'Harga/Kg',
    align: 'left',
    field: 'price_per_volume',
    sortable: false,
  },
  {
    name: 'price_carter',
    label: 'Harga Carter',
    align: 'left',
    field: 'price_carter',
    sortable: false,
  },
];

const my_table = ref(null);
const params = ref({
  sort: '-created_at',
  filters: '["user.name", "Tere"]',
});

const data = ref({});
const dialog_detail = ref<boolean>(false);

const dialog_status = ref(false);
const note = ref('');
const status_change = ref({});

const extended_payload = ref();

const logs = ref([]);
const loading = ref<boolean>(false);
const tab = ref('data');
const statuses = ref([]);

const getStatus = () => {
  statuses.value = [];
  api.get('/orders/status').then((res) => {
    statuses.value = res.data.data;
  });
};

const addExtendPayload = (is_edit: boolean) => {
  extended_payload.value = [];
  if (!is_edit) {
    extended_payload.value = {
      status_id: 1,
      logs: [
        {
          status_id: 1,
          note: '',
          create_user_id: auth?.user?.id,
        },
      ],
    };
  }
};

const updateStatus = () => {
  loading.value = true;
  api
    .put('/orders/' + data.value.id, {
      status_id: status_change.value.status_id,
      logs: [
        {
          transaction_id: data.value.id as number,
          status_id: status_change.value.status_id,
          note: note.value,
          create_user_id: auth?.user?.id,
        },
      ],
    })
    .then((res) => {
      dialog_status.value = false;
      Notify.create({
        message: 'Status berhasil diupdate',
        color: 'positive',
      });
      my_table.value.refresh();
      getStatus();
      loading.value = false;
    })
    .catch((err) => {
      loading.value = false;

      console.log(err);
    });
};

const findLogs = (id) => {
  api
    .get('/logs/' + id)
    .then((res) => {
      logs.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
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
    colInfo="no"
    title="Order"
    apiUrl="/orders"
    menuCode="ord"
    :params="params"
    :search="search"
    @beforeSubmit="addExtendPayload"
    @afterSubmit="getStatus"
    :extPayload="extended_payload"
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
                    data = props.row;
                    status_change = status;
                    dialog_status = true;
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
    <template #body-cell-no="{ props }">
      <q-td :props="props">
        <q-btn
          flat
          dense
          class="tw-underline"
          :label="props.row.no"
          no-caps
          @click="
            () => {
              data = props.row;
              findLogs(props.row.id);
              dialog_detail = true;
            }
          "
        />
      </q-td>
    </template>
    <template #form="{ payload }">
      <div class="md:tw-grid md:tw-grid-cols-2 tw-gap-x-4 tw-gap-y-1.5">
        <InputSelect
          :rules="[required]"
          map-options
          emit-value
          optLabel="name"
          optValue="id"
          toplabel="Nama Pelanggan"
          :apiUrl="'/users'"
          searchKey="name"
          v-model="payload.user_id"
        />
        <InputSelect
          :rules="[required]"
          toplabel="Skema Pembayaran"
          :options="['Cash', 'Tempo']"
          v-model="payload.payment_scheme"
        />
        <InputSelect
          :rules="[required]"
          map-options
          emit-value
          optLabel="name"
          optValue="id"
          toplabel="Driver"
          :apiUrl="'/drivers'"
          searchKey="name"
          v-model="payload.driver_id"
        />
        <InputSelect
          :rules="[required]"
          map-options
          emit-value
          optLabel="police_no"
          optValue="id"
          toplabel="Armada"
          :apiUrl="'/vehicles'"
          searchKey="police_no"
          v-model="payload.vehicle_id"
        />

        <InputTextField
          :rules="[required]"
          toplabel="Asal"
          v-model="payload.from"
        />
        <InputTextField
          :rules="[required]"
          toplabel="Tujuan"
          v-model="payload.to"
        />
        <InputSelect
          :rules="[required]"
          toplabel="Jenis Transaksi"
          parentClass="tw-col-span-2"
          :options="['Volume', 'Carter']"
          v-model="payload.type_transaction"
        />
        <InputNumberField
          :rules="[required]"
          toplabel="Berat"
          suffix="kg"
          mask="#"
          reverse-fill-mask
          unmasked-value
          v-if="payload.type_transaction == 'Volume'"
          v-model="payload.weight"
        />
        <InputNumberField
          :rules="[required]"
          toplabel="Harga / Volume"
          prefix="Rp."
          mask="#"
          reverse-fill-mask
          v-if="payload.type_transaction == 'Volume'"
          v-model="payload.price_per_volume"
        />
        <InputNumberField
          :rules="[required]"
          v-if="payload.type_transaction == 'Carter'"
          toplabel="Harga Carter"
          prefix="Rp."
          mask="#"
          reverse-fill-mask
          parentClass="tw-col-span-2"
          v-model="payload.price_carter"
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
            class="tw-grid md:tw-grid-cols-1 tw-space-x-4 tw-gap-4 q-px-none"
          >
            <div>
              <q-list
                dense
                class="tw-grid tw-grid-cols-2 tw-gap-4 tw-items-start"
              >
                <q-item>
                  <q-item-section>
                    <q-item-label class="tw-font-bold"
                      >Tanggal Order</q-item-label
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
                      >Nama Pelanggan</q-item-label
                    >
                    <q-item-label caption>{{ data?.user?.name }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="tw-font-bold"
                      >Skema Pembayaran</q-item-label
                    >
                    <q-item-label caption>{{
                      data?.payment_scheme
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="tw-font-bold"
                      >Jenis Transaksi</q-item-label
                    >
                    <q-item-label caption>{{
                      data?.type_transaction
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="tw-font-bold">Berat</q-item-label>
                    <q-item-label caption>{{ data?.weight }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="tw-font-bold"
                      >Daerah Asal</q-item-label
                    >
                    <q-item-label caption>{{ data?.from }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="tw-font-bold"
                      >Daerah Tujuan</q-item-label
                    >
                    <q-item-label caption>{{ data?.to }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="tw-font-bold">Harga/Kg</q-item-label>
                    <q-item-label caption>{{
                      data?.price_per_volume
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="tw-font-bold"
                      >Harga Carter</q-item-label
                    >
                    <q-item-label caption>{{
                      data?.price_carter
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
