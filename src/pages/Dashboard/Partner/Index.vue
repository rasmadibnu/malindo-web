<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { email, required } from 'src/utils/validators.ts';
import BaseTable from 'components/ui/BaseTable.vue';
import InputTextField from 'src/components/form/InputTextField.vue';
import InputSelect from 'src/components/form/InputSelect.vue';
import Btn from 'src/components/ui/Button.vue';
import { api } from 'src/boot/axios';
import { Notify } from 'quasar';
import moment from 'moment';
import { formatRupiah } from 'src/utils/format';

const columns = ref([
  {
    name: 'status.name',
    align: 'center',
    label: 'Status',
    slot: true,
  },
  {
    name: 'name',
    label: 'Name',
    align: 'left',
    field: 'name',
    slot: true,
  },
  {
    name: 'pic',
    label: 'PIC',
    align: 'left',
    field: (row) => (row.position ? `${row.pic} (${row.position})` : row.pic),
  },
  {
    name: 'phone_number',
    label: 'No Telp',
    align: 'left',
    field: 'phone_number',
  },
  {
    name: 'email',
    label: 'E-Mail',
    align: 'left',
    field: 'email',
  },
  {
    name: 'contact_via',
    label: 'Dihubungi Melalui',
    align: 'left',
    field: 'contact_via',
  },
  {
    name: 'vehicle_type.name',
    label: 'Jenis Kendaraan',
    align: 'left',
    field: (row) => row?.vehicle_type?.name,
  },
]);
const my_table = ref(null);
const extended_payload = ref();
const loading = ref<boolean>(false);
const data = ref({});
const dialog_detail = ref<boolean>(false);
const dialog_status = ref(false);
const note = ref('');
const status_change = ref({});

const optcall = ['Whatsapp', 'Email', 'Telpon/SMS'];
const optintens = ['0-25', '26-50', '51-75', '76-100', '>100'];
const opttime = [
  'Kurang dari 1 Jam (Segera)',
  '1-4 Jam',
  '4-8 Jam',
  'Satu Hari/Lebih',
];

const statuses = ref([]);

const getStatus = () => {
  statuses.value = [];
  api.get('/partners/status').then((res) => {
    statuses.value = res.data.data;
  });
};

const updateStatus = () => {
  loading.value = true;
  api
    .put('/partners/' + data.value.id, {
      status_id: status_change.value.status_id,
      note: note.value,
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

const addExtendPayload = (is_edit: boolean) => {
  extended_payload.value = [];
  if (!is_edit) {
    extended_payload.value = {
      status_id: 12,
    };
  }
};

const route_dialog = ref<boolean>(false);
const route_columns = ref([
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
const route = ref({});

const price_dialog = ref<boolean>(false);
const price_column = ref([
  {
    name: 'vehicle_type.name',
    label: 'Jenis Kendaraan',
    align: 'left',
    field: (row) => row.vehicle_type.name,
  },
  {
    name: 'price',
    label: 'Harga',
    align: 'left',
    field: (row) => formatRupiah(row.price),
  },
  {
    name: 'special_price',
    label: 'Harga Khusus',
    align: 'left',
    slot: true,
    // field: (row) => formatRupiah(row.price),
  },
]);
const price = ref({});
const price_partner = ref([]);
const price_edit = ref<number>(0);
const setSepecialPrice = (val: any, initialVal: any) => {
  api
    .post('/partner-prices', {
      partner_id: data.value?.id,
      route_id: route.value?.id,
      price_list_id: price.value?.id,
      value: parseInt(val),
    })
    .then((res) => {
      price_edit.value = 0;
      getPricePartner(data.value?.id);
      Notify.create({
        message: 'Harga khusus berhasil disimpan',
        color: 'positive',
      });
    });
};

const getPricePartner = (partner_id: any) => {
  api
    .get(`/partner-prices?size=-1&filters=["partner_id","${partner_id}"]`)
    .then((res) => {
      price_partner.value = res.data.data.items;
    });
};

const checkPricePartner = (price_list_id: any, price: any) => {
  const findIndex = price_partner.value.findIndex(
    (e) => e.price_list_id == price_list_id
  );
  if (findIndex != -1) {
    return price_partner.value[findIndex].value;
  } else {
    return price;
  }
};

onMounted(() => {
  getStatus();
});
</script>
<template>
  <BaseTable
    colKey="id"
    ref="my_table"
    colInfo="name"
    title="Partner"
    apiUrl="/partners"
    menuCode="partner"
    :columns="columns"
    @afterSubmit="getStatus"
    @beforeSubmit="addExtendPayload"
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
    <template #body-cell-name="{ props }">
      <q-td :props="props">
        <q-btn
          flat
          dense
          class="tw-underline"
          :label="props.row.name"
          no-caps
          @click="
            () => {
              data = props.row;
              dialog_detail = true;
            }
          "
        />
      </q-td>
    </template>
    <template #form="{ payload }">
      <div class="md:tw-grid md:tw-grid-cols-2 tw-gap-x-4 tw-gap-y-1">
        <InputTextField
          toplabel="PIC"
          :rules="[required]"
          v-model="payload.pic"
        />
        <InputTextField
          toplabel="Nama Perusahaan"
          :rules="[required]"
          v-model="payload.name"
        />
        <InputTextField
          toplabel="Jabatan"
          :rules="[required]"
          v-model="payload.position"
        />
        <InputTextField
          toplabel="No Telp"
          :rules="[required]"
          mask="#"
          reverse-fill-mask
          v-model="payload.phone_number"
        />
        <InputTextField
          toplabel="E-Mail"
          :rules="[required, email]"
          v-model="payload.email"
        />
        <InputTextField
          toplabel="Adress (Kota)"
          :rules="[required]"
          v-model="payload.address"
        />
        <InputSelect
          toplabel="Dapat dihubungi Melalui"
          :rules="[required]"
          :options="optcall"
          v-model="payload.contacted_via"
        />

        <InputSelect
          toplabel="Jenis Kendaraan (paling sering)"
          :rules="[required]"
          api-url="/vehicle-types"
          opt-label="name"
          opt-value="id"
          map-options
          emit-value
          v-model="payload.vehicle_type_id"
        />
        <InputSelect
          toplabel="Rata-rata pengiriman perbulan"
          :rules="[required]"
          :options="optintens"
          v-model="payload.deliveries_per_month"
        />
        <InputSelect
          :rules="[required]"
          toplabel="Privilege"
          :options="['Retail', 'Company']"
          v-model="payload.privilege"
        />
        <InputSelect
          v-model="payload.long_time"
          parent-class="tw-col-span-2"
          toplabel="Waktu yang dibutuhkan dari melakukan pemesanan"
          :options="opttime"
        />
        <InputTextField
          parentClass="tw-col-span-2"
          toplabel="Note"
          autogrow
          v-model="payload.note"
        />
      </div>
    </template>
    <template #prepend-action="{ row }">
      <q-btn
        dense
        unelevated
        size="sm"
        flat
        icon="o_payments"
        @click="
          () => {
            route_dialog = true;
            data = row;
          }
        "
      >
        <q-tooltip anchor="bottom middle" self="top middle">
          Price List
        </q-tooltip>
      </q-btn>
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
      }
    "
  >
    <q-card class="tw-p-6" style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="text-center text-h6">Detail Data</div>
      </q-card-section>
      <q-card-section>
        <div
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
                    >Tanggal Dibuat</q-item-label
                  >
                  <q-item-label caption>{{
                    moment(data?.created_at).format('YYYY-MM-DD hh:mm:ss')
                  }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="tw-font-bold">Status</q-item-label>
                  <q-item-label caption>
                    <q-badge
                      :label="data?.status?.name"
                      :color="data?.status?.color"
                      :style="{ backgroundColor: data?.status?.color }"
                    />
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="tw-font-bold">PIC</q-item-label>
                  <q-item-label caption>{{
                    data?.position
                      ? `${data?.pic} (${data?.position})`
                      : data.position
                  }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="tw-font-bold"
                    >Nama Perusahaan</q-item-label
                  >
                  <q-item-label caption>{{ data?.name }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="tw-font-bold">No Telp</q-item-label>
                  <q-item-label caption>{{ data?.phone_number }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="tw-font-bold">E-Mail</q-item-label>
                  <q-item-label caption>{{ data?.email }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="tw-font-bold"
                    >Alamat (Kota)</q-item-label
                  >
                  <q-item-label caption>{{ data?.address }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="tw-font-bold">
                    Dapat dihubungi Melalui</q-item-label
                  >
                  <q-item-label caption>{{ data?.contact_via }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label class="tw-font-bold"
                    >Jenis Kendaraan apa yang paling sering
                    dibutuhkan</q-item-label
                  >
                  <q-item-label caption>{{
                    data?.vehicle_type?.name
                  }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="tw-font-bold"
                    >Rata-rata pengiriman perbulan</q-item-label
                  >
                  <q-item-label caption>{{
                    data?.deliveries_per_month
                  }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="tw-font-bold"
                    >Memiliki kebutuhan pengiriman setidaknya untuk 20 alamat
                    perhari</q-item-label
                  >
                  <q-item-label caption>{{
                    data?.is_20_address_per_day ? 'Ya' : 'TIdak'
                  }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="tw-font-bold"
                    >Waktu yang dibutuhkan dari melakukan
                    pemesanan</q-item-label
                  >
                  <q-item-label caption>{{ data?.long_time }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div>
            <div class="tw-font-bold">Note</div>
            <div>
              {{
                data?.note
                  ? data?.updated_by
                    ? data?.note + ' By: ' + data?.updated_by?.name
                    : ''
                  : ''
              }}
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="route_dialog">
    <q-card class="tw-p-6" style="width: 700px; max-width: 80vw">
      <q-card-section class="tw-text-center">
        <div class="text-h6">Rute</div>
      </q-card-section>
      <BaseTable
        flat
        title="Route"
        api-url="/routes"
        menuCode="partner"
        :columns="route_columns"
        :add-btn="false"
      >
        <template #breadcrumbs></template>
        <template #action="{ row }">
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
                getPricePartner(data?.id);
              }
            "
          >
            <q-tooltip anchor="bottom middle" self="top middle">
              Price List
            </q-tooltip>
          </q-btn>
        </template>
      </BaseTable>
    </q-card>
  </q-dialog>
  <q-dialog v-model="price_dialog">
    <q-card class="tw-p-6" style="width: 700px; max-width: 80vw">
      <q-card-section class="tw-flex tw-justify-between tw-text-lg">
        <div>Price List</div>
        <div>{{ data?.name }}</div>
      </q-card-section>
      <BaseTable
        flat
        title="Price List"
        api-url="/price-lists"
        :params="{
          partner_id: data?.id,
        }"
        menuCode="partner"
        :columns="price_column"
        :use-action="false"
        :add-btn="false"
      >
        <template #breadcrumbs></template>
        <template #body-cell-special_price="{ props }">
          <q-td :props="props" class="tw-underline">
            {{ formatRupiah(checkPricePartner(props.row.id, props.row.price)) }}
            <q-popup-edit
              v-model="price_edit"
              title="Edit Harga"
              auto-save
              v-slot="scope"
              @show="
                () => {
                  price = props.row;
                }
              "
              @save="setSepecialPrice"
            >
              <q-input
                v-model="scope.value"
                dense
                mask="#"
                reverse-fill-mask
                autofocus
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-td>
        </template>
        <template #action>
          <q-btn
            dense
            unelevated
            size="sm"
            flat
            icon="o_payments"
            @click="() => {}"
          >
            <q-tooltip anchor="bottom middle" self="top middle">
              Price List
            </q-tooltip>
          </q-btn>
        </template>
      </BaseTable>
    </q-card>
  </q-dialog>
</template>
