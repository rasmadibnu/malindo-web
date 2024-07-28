<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import BaseTable from 'components/ui/BaseTable.vue';
import InputTextField from 'src/components/form/InputTextField.vue';
import InputDate from 'src/components/form/InputDate.vue';
import InputSelect from 'src/components/form/InputSelect.vue';
import Btn from 'src/components/ui/Button.vue';
import { Notify, QTableColumn } from 'quasar';
import { required, isEmpty } from 'src/utils/validators';
import moment from 'moment';
import { api } from 'src/boot/axios';
import { useAuthStore } from 'src/stores/auth';
import { formatRupiah } from 'src/utils/format';

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
    name: 'delivery_date',
    label: 'Tanggal Pengiriman',
    align: 'left',
    field: (row) => moment(row.delivery_date).format('YYYY-MM-DD'),
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
const driverUrl = '/drivers?filters=["status.code","=","driver-ready"]';
const vehicleUrl = '/vehicles?filters=["status.code","=","vehicle-ready"]';

const data = ref({});
const dialog_detail = ref<boolean>(false);

const dialog_status = ref(false);
const note = ref('');
const status_change = ref({});

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

const form_dialog = ref<boolean>(false);
const is_edit = ref<boolean>(false);

const user_id = ref<number | null>(null);
const delivery_date = ref<string | null>('');
const vehicle_type = ref(null);
const payment_method = ref(null);
const from = ref<string | null>(null);
const to = ref(null);
const extended_payload = ref();
const storeData = () => {
  loading.value = true;
  if (!is_edit.value) {
    api
      .post('/orders', {
        user_id: user_id.value,
        delivery_date: delivery_date.value,
        price: parseInt(vehicle_type.value?.price),
        total: total.value,
        to: to.value?.label,
        route_id: vehicle_type.value?.route_id,
        payment_method: payment_method.value,
        price_list_id: vehicle_type.value?.id,
        vehicle_type_id: vehicle_type.value?.vehicle_type.id,
        status_id: 1,
        order_additional_services: additional_service_selected.value.map(
          (e) => {
            return {
              additional_service_id: e.id,
              value: parseInt(e.estimation_charge),
            };
          }
        ),
        logs: [
          {
            status_id: 1,
            note: '',
            create_user_id: auth?.user?.id,
          },
        ],
      })
      .then((res) => {
        Notify.create({
          message: 'Order berhasil ditambahkan',
          color: 'positive',
        });
        form_dialog.value = false;
        loading.value = false;
        my_table.value.refresh();
        reset();
      });
  }
};

const reset = () => {
  vehicle_type.value = null;
  from.value = null;
  to.value = null;
  user_id.value = null;
  payment_method.value = null;
  delivery_date.value = null;
  additional_service_selected.value = [];
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

const user = ref({});
const loading_user = ref<boolean>(false);
const partner = ref({});
const getUser = (user_id: any) => {
  loading_user.value = true;
  return api.get('/users/' + user_id).then((res) => {
    user.value = res.data.data;
    partner.value = res.data.data.partner;
    loading_user.value = false;
  });
};

const vehicle_types = ref([]);
const expanded = ref([]);
const getPriceList = (val: any) => {
  api
    .get(`/price-lists?size=-1&fitlers=["route_id", "${val.value}"]`)
    .then((res) => {
      vehicle_types.value = res.data.data.items;
    });
};

const setVehicle = (val: any) => {
  if (!isEmpty(user.value.id)) {
    vehicle_type.value = val;
  } else {
    Notify.create({
      message: 'Pilih pelanggan terlebih dahulu!',
      color: 'negative',
    });
  }
};

const additional_service = ref([]);
const additional_service_selected = ref([]);
const getAdditionalService = () => {
  api.get('/additional-services?size=-1').then((res) => {
    additional_service.value = res.data.data.items;
  });
};

const checkPrice = (vehicle_type_id: any) => {
  const findIndex = partner.value.partner_prices.findIndex(
    (e) => e.price_list_id == vehicle_type_id
  );
  if (findIndex != -1) {
    return partner.value.partner_prices[findIndex].value;
  } else {
    return vehicle_type.value?.price;
  }
};

const total = computed<number>(() => {
  return (
    additional_service_selected.value.reduce((a, b) => {
      return a + parseInt(b.estimation_charge);
    }, 0) + parseInt(checkPrice(vehicle_type.value?.id))
  );
});

onMounted(() => {
  getStatus();
  getAdditionalService();
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
        {{ props.row?.route?.from }}

        <q-icon name="arrow_right_alt" />

        {{ props.row?.route?.to }}
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
    <template #addButton>
      <Btn
        v-if="auth.permission.includes('Create')"
        icon="add"
        label="Add"
        @click="
          () => {
            is_edit = false;
            form_dialog = true;
          }
        "
      />
    </template>
    <template #actionEdit="{ row }">
      <q-btn
        dense
        unelevated
        size="sm"
        flat
        icon="eva-edit-2-outline"
        @click="
          () => {
            is_edit = true;
            form_dialog = true;
            user_id = row.user_id;
            delivery_date = row.delivery_date;
            from = row.route.from;
            to = row.route_id;
            getPriceList(row.route_id);
            getUser(row.user_id).then((res) => {
              setVehicle(row.price_list);
            });
            additional_service_selected = row.order_additional_services;
          }
        "
      >
        <q-tooltip anchor="bottom middle" self="top middle"> Edit </q-tooltip>
      </q-btn>
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
  </BaseTable>
  <q-dialog v-model="form_dialog">
    <q-card style="width: 600px" class="tw-p-6">
      <q-card-section>
        <div class="text-h6 text-center">
          {{ is_edit ? 'Edit' : 'Add' }} Order
        </div>
      </q-card-section>
      <q-form @submit.prevent="storeData">
        <q-card-section>
          <div class="tw-gap-x-4 tw-gap-y-1.5">
            <InputSelect
              :rules="[required]"
              map-options
              emit-value
              optLabel="name"
              :loading="loading_user"
              optValue="id"
              toplabel="Nama Pelanggan"
              :apiUrl="'/users'"
              :params="{
                filters:
                  '[&quot;partner_id&quot;,&quot;!=&quot;,&quot;0&quot;]',
              }"
              searchKey="name"
              @update:model-value="getUser"
              v-model="user_id"
            >
              <template #option="{ scope }">
                <q-item v-bind="scope.itemProps">
                  <q-item-section>
                    <q-item-label>{{ scope.opt.label }}</q-item-label>
                    <q-item-label caption>{{
                      scope.opt.partner?.name
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </InputSelect>
            <InputDate
              :rules="[required]"
              toplabel="Tanggal Pengiriman"
              mask="YYYY-MM-DD"
              v-model="delivery_date"
            />
            <q-timeline color="primary">
              <q-timeline-entry
                ><InputSelect
                  :rules="[required]"
                  api-url="/routes"
                  opt-label="from"
                  opt-value="from"
                  map-options
                  emit-value
                  toplabel="Asal"
                  v-model="from"
                />
              </q-timeline-entry>

              <q-timeline-entry icon="location_on"
                ><InputSelect
                  :rules="[required]"
                  :api-url="`/routes?filters=[&quot;from&quot;,&quot;${from}&quot;]`"
                  opt-label="to"
                  opt-value="id"
                  toplabel="Tujuan"
                  map-options
                  emit-value
                  @update:model-value="getPriceList"
                  v-model="to"
                />
              </q-timeline-entry>
            </q-timeline>

            <template v-if="!isEmpty(to)">
              <div class="tw-font-medium tw-mb-2">Jenis Kendaraan</div>
              <div class="tw-grid tw-mb-4 tw-grid-cols-3 tw-gap-4">
                <template
                  v-for="vehicle in vehicle_types"
                  v-bind:key="vehicle.id"
                >
                  <div>
                    <q-card
                      bordered
                      flat
                      v-ripple
                      class="my-box cursor-pointer q-hoverable"
                      :class="
                        vehicle_type?.id == vehicle.id
                          ? 'tw-border-2  tw-border-primary'
                          : ''
                      "
                      @click="setVehicle(vehicle)"
                    >
                      <q-img src="~assets/Cddbox2.png" />
                      <q-card-section
                        class="tw-flex tw-items-center tw-justify-between q-pr-xs q-pb-none"
                      >
                        <div class="tw-font-bold">
                          {{ vehicle.vehicle_type?.name }}
                        </div>
                        <q-btn
                          color="grey"
                          round
                          flat
                          dense
                          :icon="
                            expanded[vehicle.id]
                              ? 'keyboard_arrow_up'
                              : 'keyboard_arrow_down'
                          "
                          @click="expanded[vehicle.id] = !expanded[vehicle.id]"
                        />
                      </q-card-section>
                      <q-slide-transition>
                        <div v-show="expanded[vehicle.id]">
                          <q-separator />
                          <q-card-section class="text-subtitle2">
                            Berat:
                            {{ vehicle.vehicle_type?.from_weight }} -
                            {{ vehicle.vehicle_type?.to_weight }} ({{
                              vehicle.vehicle_type?.unit
                            }}) <br />
                            Ukuran: {{ vehicle.vehicle_type?.size }} <br />
                          </q-card-section>
                        </div>
                      </q-slide-transition>
                    </q-card>
                  </div>
                </template>
              </div>
            </template>
            <template v-if="vehicle_type">
              <div v-if="partner?.privilege == 'Retail'">
                <div class="tw-font-meidum">Metode Pembayaran</div>
                <div class="tw-flex tw-gap-4">
                  <q-radio v-model="payment_method" val="Cash" label="Cash" />
                  <q-radio
                    v-model="payment_method"
                    val="Transfer"
                    label="Transfer"
                  />
                </div>
              </div>
              <div class="tw-my-4">
                <q-item-label class="tw-font-meidum"
                  >Layanan Tambahan</q-item-label
                >
                <div class="tw-grid tw-grid-cols-1 tw-mt-2">
                  <tempalte
                    v-for="additional in additional_service"
                    v-bind:key="additional.id"
                  >
                    <div class="tw-flex tw-items-center tw-justify-between">
                      <q-checkbox
                        v-model="additional_service_selected"
                        :val="additional"
                        :label="additional.name"
                      />
                      <div class="tw-text-primary">
                        +{{ formatRupiah(additional?.estimation_charge) }}
                      </div>
                    </div>
                  </tempalte>
                </div>
              </div>
              <div class="tw-my-4 tw-flex tw-justify-between">
                <q-item-label class="tw-font-meidum">Total</q-item-label>
                <div class="tw-text-primary">{{ formatRupiah(total) }}</div>
              </div>
            </template>
          </div>
        </q-card-section>
        <q-card-section align="center" class="tw-space-x-2">
          <Btn label="Cancel" color="grey-3" text-color="grey" v-close-popup />
          <Btn type="submit" :loading="loading" label="Submit" />
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
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
          <template v-if="status_change?.code == 'process'">
            <InputTextField autofocus toplabel="Note" v-model="note" />
          </template>
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
