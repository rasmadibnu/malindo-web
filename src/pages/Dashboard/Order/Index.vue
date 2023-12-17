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
import { formatRupiah } from 'src/utils/format';
const slide = ref(1);
const right = ref([]);
const auth = useAuthStore();
const columns: QTableColumn = [
  {
    name: 'status.name',
    align: 'center',
    label: 'Status',
    slot: true,
  },
  // {
  //   name: 'no',
  //   align: 'left',
  //   label: 'No Transaksi',
  //   field: 'no',
  //   sortable: false,
  //   slot: true,
  // },
  {
    name: 'created_at',
    label: 'Tanggal Order',
    align: 'left',
    slot: true,
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
    name: 'from',
    label: 'Rute',
    align: 'left',
    sortable: false,
    slot: true,
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
  // {
  //   name: 'user.partner.name',
  //   label: 'Partner',
  //   align: 'left',
  //   field: (row) => row.user.partner.name,
  //   sortable: false,
  // },
  // {
  //   name: 'payment_scheme',
  //   label: 'Pembayaran',
  //   align: 'left',
  //   field: 'payment_scheme',
  //   sortable: false,
  // },

  // {
  //   name: 'type_transaction',
  //   label: 'Jenis Transaksi',
  //   align: 'left',
  //   field: 'type_transaction',
  //   sortable: false,
  // },
  // {
  //   name: 'weight',
  //   label: 'Berat (Kg)',
  //   align: 'left',
  //   field: 'weight',
  //   sortable: false,
  // },

  // {
  //   name: 'price_per_volume',
  //   label: 'Harga/Kg',
  //   align: 'left',
  //   field: (row) => formatRupiah(row.price_per_volume),
  //   sortable: false,
  // },
  // {
  //   name: 'price_carter',
  //   label: 'Harga Carter',
  //   align: 'left',
  //   field: (row) => formatRupiah(row.price_carter),
  //   sortable: false,
  // },
  {
    name: 'price',
    label: 'Biaya',
    align: 'left',
    field: (row) => formatRupiah(row.price),
    sortable: false,
  },
];

const my_table = ref(null);
const params = ref({
  sort: '-created_at',
});
const usersUrl = '/users?filters=["partner_id","!=","0"]';
const driverUrl = '/drivers?filters=["status.code","=","driver-ready"]';
const vehicleUrl = '/vehicles?filters=["status.code","=","vehicle-ready"]';

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
    menuCode="order"
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
    <template #body-cell-created_at="{ props }">
      <q-td :props="props">
        <p class="tw-text-xs">
          {{ moment(props.row.created_at).format('HH:MM') }}
        </p>
        {{ moment(props.row.created_at).format('DD MMM YYYY') }}
      </q-td>
    </template>
    <template #body-cell-from="{ props }">
      <q-td :props="props">
        {{ props.row.from }}

        <q-icon name="arrow_right_alt" />

        {{ props.row.to }}
      </q-td>
    </template>
    <template v-slot:[`body-cell-status.name`]="{ props }">
      <q-td :props="props">
        <q-btn
          outline
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
        <br />
        <q-btn
          size="xs"
          flat
          dense
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
    <!-- <template #body-cell-no="{ props }">
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
    </template> -->
    <template #form="{ payload }">
      <div class="tw-gap-x-4 tw-gap-y-1.5">
        <InputSelect
          :rules="[required]"
          map-options
          emit-value
          optLabel="name"
          optValue="id"
          toplabel="Nama Pelanggan"
          :apiUrl="usersUrl"
          searchKey="name"
          v-model="payload.user_id"
        />
        <q-timeline color="secondary">
          <q-timeline-entry
            ><InputTextField
              :rules="[required]"
              toplabel="Asal"
              v-model="payload.from"
            />
          </q-timeline-entry>

          <q-timeline-entry icon="location_on"
            ><InputTextField
              :rules="[required]"
              toplabel="Tujuan"
              v-model="payload.to"
            />
          </q-timeline-entry>
        </q-timeline>
        <!-- <InputTextField
          :rules="[required]"
          toplabel="Asal"
          v-model="payload.from"
        />
        <InputTextField
          :rules="[required]"
          toplabel="Tujuan"
          v-model="payload.to"
        /> -->

        <!-- <InputSelect
          :rules="[required]"
          map-options
          emit-value
          optLabel="name"
          optValue="id"
          toplabel="Driver"
          :apiUrl="driverUrl"
          searchKey="name"
          v-model="payload.driver_id"
        /> -->
        <InputSelect
          toplabel="Jenis Kendaraan"
          :rules="[required]"
          api-url="/vehicle-types"
          opt-label="name"
          opt-value="id"
          map-options
          emit-value
          v-model="payload.vehicle_type_id"
        />

        <div class="tw-grid tw-grid-cols-3">
          <q-card v-ripple class="my-box cursor-pointer q-hoverable">
            <span class="q-focus-helper"></span>
            <q-img src="~assets/Cddbox2.png">
              <div class="absolute-bottom tw-text-center">
                <!-- <div class="text-h6">FUSO BOX</div> -->
                <div class="text-subtitle2">
                  Berat Maksimal 8000 kg <br />Batas Ukuran (PxLxT): 570cm x
                  250cm x 250cm
                </div>
              </div>
            </q-img>
          </q-card>

          <q-avatar square size="100px">
            <q-img src="~assets/Cddbox1.png">
              <div class="absolute-bottom tw-text-center">
                <!-- <div class="text-h6">FUSO BOX</div> -->
                <!-- <div class="text-subtitle2">
                  Berat Maksimal 8000 kg <br />Batas Ukuran (PxLxT): 570cm x
                  250cm x 250cm
                </div> -->
              </div>
            </q-img>
          </q-avatar>
          <q-avatar square size="100px">
            <q-img src="~assets/Fuso Box.png">
              <div class="absolute-bottom tw-text-center">
                <!-- <div class="text-h6">FUSO BOX</div> -->
                <!-- <div class="text-subtitle2">
                  Berat Maksimal 8000 kg <br />Batas Ukuran (PxLxT): 570cm x
                  250cm x 250cm
                </div> -->
              </div>
            </q-img>
          </q-avatar>
          <q-avatar square size="100px">
            <q-img src="~assets/Tronton Box.png">
              <div class="absolute-bottom tw-text-center">
                <!-- <div class="text-h6">FUSO BOX</div> -->
                <!-- <div class="text-subtitle2">
                  Berat Maksimal 8000 kg <br />Batas Ukuran (PxLxT): 570cm x
                  250cm x 250cm
                </div> -->
              </div>
            </q-img>
          </q-avatar>
          <q-avatar square size="100px">
            <q-img src="~assets/Truck Tronton.png">
              <div class="absolute-bottom tw-text-center">
                <!-- <div class="text-h6">FUSO BOX</div> -->
                <!-- <div class="text-subtitle2">
                  Berat Maksimal 8000 kg <br />Batas Ukuran (PxLxT): 570cm x
                  250cm x 250cm
                </div> -->
              </div>
            </q-img>
          </q-avatar>
        </div>
        <q-item-label class="tw-font-bold">Layanan Tambahan</q-item-label>
        <div class="tw-grid tw-grid-cols-1">
          <q-checkbox v-model="right" val="tol" label="Tol" />
          <q-checkbox v-model="right" val="helper" label="Helper" />
          <q-checkbox v-model="right" val="lain" label="Lain-Lain" />
        </div>
        <q-item-label class="tw-font-bold">Pembayaran</q-item-label>
        <div class="tw-grid tw-grid-cols-1">
          <q-checkbox v-model="right" val="cash" label="Cash" />
          <q-checkbox v-model="right" val="trf" label="Transfer" />
        </div>
        <!-- <InputSelect
          :rules="[required]"
          toplabel="Pembayaran"
          :options="['Cash', 'Transfer']"
          v-model="payload.payment_scheme"
        /> -->
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
    position="right"
  >
    <q-card style="width: 500px; max-width: 80vw">
      <q-card-section class="tw-flex tw-justify-between">
        <div>
          <q-badge
            :label="data?.status?.name"
            :color="data?.status?.color"
            :style="{ backgroundColor: data?.status?.color }"
          />
          <q-item-label caption>{{ data?.no }}</q-item-label>
        </div>
        <div class="text-xs">
          {{ moment(data?.created_at).format('YYYY-MM-DD hh:mm:ss') }}
        </div>
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
            class="tw-grid md:tw-grid-cols-1 tw-space-x-4 tw-gap-4"
          >
            <div class="tw-grid tw-grid-cols-2 tw-gap-4">
              <div>
                <q-item-label class="tw-font-bold">Rute</q-item-label>
                <q-timeline color="secondary">
                  <q-timeline-entry :subtitle="data?.from"> </q-timeline-entry>

                  <q-timeline-entry :subtitle="data?.to" icon="location_on">
                  </q-timeline-entry>
                </q-timeline>
              </div>
              <q-list dense>
                <q-item>
                  <q-item-section>
                    <q-item-label class="tw-font-bold">Pengirim</q-item-label>
                    <q-item-label caption>{{ data?.user?.name }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="tw-font-bold">Armada</q-item-label>
                    <q-item-label caption
                      ><p>{{ data?.vehicle?.police_no }}</p>
                      {{ data?.vehicle?.brand }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="tw-font-bold"
                      >Layanan Tambahan</q-item-label
                    >
                    <q-item-label caption
                      >{{ data?.type_transaction }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              <q-item-label class="tw-font-bold"> Biaya </q-item-label>

              <div class="tw-col-span-2">
                <q-expansion-item
                  dense
                  header-class="q-pa-none tw-font-bold"
                  dense-toggle
                  switch-toggle-side
                >
                  <template #header>
                    <q-item-section> Total Biaya </q-item-section>
                    <q-item-section side>
                      {{ formatRupiah(data?.price) }}
                    </q-item-section>
                  </template>
                  <q-list dense>
                    <q-item>
                      <q-item-section> Biaya Pengiriman </q-item-section>
                      <q-item-section side>
                        {{ formatRupiah(data?.price) }}
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section> Biaya Helper </q-item-section>
                      <q-item-section side>
                        {{ formatRupiah(data?.price) }}
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>PPN </q-item-section>
                      <q-item-section side>
                        {{ formatRupiah(data?.price) }}
                      </q-item-section>
                    </q-item>
                  </q-list>
                  <q-separator />
                </q-expansion-item>
              </div>
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
