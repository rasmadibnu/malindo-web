inbox
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import BaseTable from 'components/ui/BaseTable.vue';
import InputTextField from 'src/components/form/InputTextField.vue';
import Btn from 'src/components/ui/Button.vue';
import { Notify, QTableColumn } from 'quasar';
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
    name: 'name',
    align: 'left',
    label: 'Nama',
    field: 'name',
    sortable: false,
  },
  {
    name: 'need',
    align: 'left',
    label: 'Kebutuhan',
    field: 'need',
    sortable: false,
  },
  {
    name: 'phone_number',
    align: 'left',
    label: 'No Handphone',
    field: 'phone_number',
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
    name: 'updated_by.name',
    label: 'Di-Update Oleh',
    align: 'left',
    field: (row) => row.updated_by.name,
    sortable: false,
  },
];

const my_table = ref(null);
const params = ref({
  sort: '-created_at',
});

const data = ref({});
const dialog_detail = ref<boolean>(false);

const dialog_status = ref(false);
const note = ref('');
const status_change = ref({});

const extended_payload = ref();

const loading = ref<boolean>(false);
const statuses = ref([]);

const getStatus = () => {
  statuses.value = [];
  api.get('/inbox/status').then((res) => {
    statuses.value = res.data.data;
  });
};

const updateStatus = () => {
  loading.value = true;
  api
    .put('/inbox/' + data.value.id, {
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
    title="Inbox"
    apiUrl="/inbox"
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
    <template #action="{ row }">
      <q-btn
        dense
        unelevated
        size="sm"
        flat
        icon="eva-more-horizontal-outline"
        @click="
          () => {
            data = row;
            dialog_detail = true;
          }
        "
      >
        <q-tooltip anchor="bottom middle" self="top middle"> Detail </q-tooltip>
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
        logs = [];
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
                    >Tanggal Order</q-item-label
                  >
                  <q-item-label caption>{{
                    moment(data?.created_at).format('YYYY-MM-DD hh:mm:ss')
                  }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="tw-font-bold">Nama</q-item-label>
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
                  <q-item-label class="tw-font-bold">Kota</q-item-label>
                  <q-item-label caption>{{ data?.city }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item class="tw-col-span-2">
                <q-item-section>
                  <q-item-label class="tw-font-bold">Kebutuhan</q-item-label>
                  <q-item-label caption>{{ data?.need }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="tw-space-y-4">
            <div>
              <div class="tw-font-bold">Keterangan</div>
              <div>{{ data?.description }}</div>
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
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
