<script lang="ts" setup>
import moment from 'moment';
import { api } from 'src/boot/axios';
import { formatRupiah } from 'src/utils/format';
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const is_paylater = ref<boolean>(false);
const due_date = ref<string>('');
const termin = ref<string>('');
const total = computed<number>(() => {
  return formatRupiah(
    selected.value.reduce((a, b) => {
      return a + parseInt(b.price);
    }, 0)
  );
});

const selected = ref([]);
const order_dialog = ref<boolean>(false);

const columns_order: QTableColumn = [
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
    align: 'right',
    field: (row) => formatRupiah(row.price),
    sortable: false,
  },
];

const columns_order_selected: QTableColumn = [
  {
    name: 'no',
    align: 'left',
    label: 'No Transaksi',
    field: 'no',
    sortable: false,
    slot: true,
  },
  {
    name: 'user.name',
    label: 'Nama Pelanggan',
    align: 'left',
    field: (row) => row.user.name + ' - ' + row.user.partner.name,
    sortable: false,
  },
  {
    name: 'price',
    label: 'Biaya',
    align: 'right',
    field: (row) => formatRupiah(row.price),
    sortable: false,
  },
];
const loading_termin = ref<boolean>(false);
const onTerminChange = (value) => {
  loading_termin.value = true;
  api.get('/termins/' + value).then((res) => {
    if (res.data.data.days == 0) {
      due_date.value = moment().format('YYYY/MM/DD');
    } else {
      due_date.value = moment()
        .add(res.data.data.days, 'days')
        .format('YYYY/MM/DD');
    }
    loading_termin.value = false;
  });
};
</script>
<template>
  <q-breadcrumbs class="tw-mb-4">
    <template
      v-for="(pathd, index) in route.fullPath.split('/').filter((e) => {
        return e != '';
      })"
      v-bind:key="pathd"
    >
      <q-breadcrumbs-el
        v-if="
          route.matched.some(({ path }) => {
            if (index == 0) {
              return true;
            } else {
              return path == `/dashboard/${pathd}`;
            }
          })
        "
        class="tw-capitalize tw-text-lg tw-font-semibold"
        :label="pathd.replace('-', ' ')"
        :to="pathd == 'dashboard' ? '/dashboard' : `/dashboard/${pathd}`"
      />

      <q-breadcrumbs-el
        v-else
        class="tw-capitalize tw-text-lg tw-text-[#4B465C] tw-font-semibold"
        :label="pathd.replace('-', ' ')"
      />
    </template>
  </q-breadcrumbs>
  <q-card class="tw-p-6">
    <q-card-section>
      <div class="text-center text-h6">Add Invoice</div>
    </q-card-section>
    <q-card-section>
      <div class="tw-flex tw-justify-end">
        <q-toggle v-model="is_paylater" label="Bayar Nanti" />
      </div>

      <div class="tw-grid md:tw-grid-cols-2 tw-gap-4">
        <InputSelect
          v-if="is_paylater"
          v-model="termin"
          toplabel="Termin"
          api-url="/termins"
          opt-label="name"
          opt-value="id"
          search-key="name"
          map-options
          emit-value
          @update:model-value="onTerminChange"
        />
        <InputDate
          v-if="is_paylater"
          v-model="due_date"
          toplabel="Jatuh Tempo"
          :btn-state="termin == 1"
        />
        <InputSelect
          toplabel="Metode Pembayran"
          :options="['Cash', 'Transfer']"
        />
        <InputTextField toplabel="Note" />
        <q-table
          title="Orders"
          bordered
          flat
          class="tw-col-span-2"
          :rows="selected"
          :columns="columns_order_selected"
          :pagination="{
            rowsPerPage: 0,
          }"
          hide-bottom
        >
          <template #top-right>
            <q-btn
              flat
              label="Add Order"
              no-caps
              dense
              color="primary"
              @click="
                () => {
                  order_dialog = true;
                }
              "
            />
          </template>
        </q-table>
        <div></div>
        <div>
          <q-list>
            <q-item>
              <q-item-section> Total </q-item-section>
              <q-item-section class="text-primary" side>
                {{ total }}
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </q-card-section>
  </q-card>
  <q-dialog v-model="order_dialog" full-width>
    <q-card class="tw-p-6">
      <q-card-section>
        <div class="text-h6 text-center">List Order</div>
      </q-card-section>
      <BaseTable
        :useIndex="false"
        selection="multiple"
        v-model:selected="selected"
        :columns="columns_order"
        api-url="/orders"
      >
        <template #breadcrumbs></template>
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
      </BaseTable>
      <q-card-section align="center" class="tw-space-x-2">
        <Btn
          label="Cancel"
          color="grey-3"
          text-color="grey"
          @click="
            () => {
              order_dialog = false;
            }
          "
        />
        <Btn
          type="submit"
          label="Tambah"
          @click="
            () => {
              order_dialog = false;
            }
          "
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
