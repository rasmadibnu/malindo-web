<script lang="ts" setup>
import { onMounted, ref, onBeforeMount } from 'vue';
import { QTableColumn, Notify } from 'quasar';
import Btn from 'components/ui/Button.vue';
import { useRoute } from 'vue-router';
import { AxiosError, AxiosResponse } from 'axios';
import { api } from 'boot/axios';
import { isEmptyArray, isEmpty } from 'src/utils/validators';
import { useAuthStore } from 'src/stores/auth';

const auth = useAuthStore();
interface Props {
  title: string;
  columns: QTableColumn[];
  apiUrl?: string;
  useIndex?: boolean;
  useAction?: boolean;
  colKey?: string;
  colInfo?: string;
  search_column?: unknown;
  extPayload?: unknown;
  params?: object;
  menuCode?: string;
}

const route = useRoute();

const props = withDefaults(defineProps<Props>(), {
  title: '',
  apiUrl: '',
  useIndex: true,
  useAction: true,
  search_column: [],
  params: undefined,
});

const cols = ref([]);
if (props.useIndex) {
  cols.value.push(
    {
      name: 'index',
      label: '#',
      align: 'center',
    },
    ...props.columns
  );
}

const total_pages = ref<number>(0);
const pagination = ref<{
  sortBy: string;
  descending: boolean;
  page: number;
  rowsPerPage: number;
  rowsNumber: number;
}>({
  sortBy: '',
  descending: false,
  page: 0,
  rowsPerPage: 10,
  rowsNumber: 0,
});
const row = ref({});
const rows = ref([]);
const search = ref('');
const loading = ref(false);
const my_table = ref(null);

function fetchData(requestProps: {
  pagination: {
    sortBy: string;
    descending: boolean;
    page: number;
    rowsPerPage: number;
    rowsNumber: number;
  };
}) {
  loading.value = true;
  pagination.value = requestProps?.pagination;

  const params = new URLSearchParams(props.params);
  const data = {
    params: params,
  };
  let { page, rowsPerPage, rowsNumber } = requestProps.pagination;

  if (rowsPerPage == 0) {
    page = 1;
    rowsPerPage = rowsNumber;
  }

  if (total_pages.value < page) {
    page = total_pages.value;
  }

  // if (sortBy) {
  //   pagination.value.sortBy = sortBy;
  //   pagination.value.descending = descending;
  //   params.append('sort', (descending ? '-' : '') + sortBy);
  // }

  params.append('size', rowsPerPage.toString());
  params.append('page', (page - 1).toString());

  if (search.value && props.search_column) {
    params.delete('filters');
    const dataForSearchs = [];

    if (props.params?.filters) {
      dataForSearchs.push(props.params['filters']);
      dataForSearchs.push('["AND"]');
    }
    if (!isEmptyArray(props.search_column)) {
      props.search_column.map((item, i) => {
        dataForSearchs.push(`["${item}", "like", "${search.value}"]`);
        if (props.search_column.length - 1 > i) {
          dataForSearchs.push('["OR"]');
        }
      });
    } else {
      props.columns.forEach((col, i) => {
        dataForSearchs.push(`["${col.name}", "like", "${search.value}"]`);
        if (props.columns.length - 1 > i) {
          dataForSearchs.push('["OR"]');
        }
      });
    }

    console.log(dataForSearchs);

    params.append(
      'filters',
      dataForSearchs.includes('["OR"]') || dataForSearchs.includes('["AND"]')
        ? `[${dataForSearchs}]`
        : dataForSearchs
    );
  }

  api
    .get(props.apiUrl, data)
    .then((response: AxiosResponse) => {
      rows.value = response.data.data.items;
      pagination.value.rowsNumber = response.data.data.total;
      total_pages.value = response.data.data.total_pages as number;

      loading.value = false;
    })
    .catch((error: AxiosError) => {
      console.log(error);
      loading.value = false;
    });
}

const is_edit = ref(false);
const dialog = ref(false);
const dialog_delete = ref(false);

const payload = ref({});

const emit = defineEmits(['beforeSubmit', 'afterSubmit', 'afterDelete']);

async function storeData() {
  loading.value = true;
  await emit('beforeSubmit', is_edit.value);

  if (!is_edit.value) {
    api
      .post(props.apiUrl, { ...payload.value, ...props.extPayload })
      .then((res) => {
        Notify.create({
          message: `${props.title} berhasil ditambahkan`,
          color: 'positive',
        });
        dialog.value = false;
        loading.value = false;
        my_table.value.requestServerInteraction();
      })
      .catch((err) => {
        loading.value = false;
        console.log(err);
      })
      .finally(() => {
        emit('afterSubmit');
      });
  } else {
    let id = payload.value[props.colKey];
    delete payload.value[props.colKey];
    api
      .put(props.apiUrl + '/' + id, { ...payload.value })
      .then((res) => {
        Notify.create({
          message: `${props.title} berhasil diupdate`,
          color: 'positive',
        });
        dialog.value = false;
        loading.value = false;
        my_table.value.requestServerInteraction();
      })
      .catch((err) => {
        loading.value = false;
        console.log(err);
      });
    // .finally(() => {
    //   emit('afterSubmit');
    // });
  }
}

function deleteData() {
  loading.value = true;
  api
    .delete(props.apiUrl + '/' + row.value[props.colKey])
    .then((res) => {
      Notify.create({
        message: `${props.title} berhasil dihapus`,
        color: 'positive',
      });
      dialog_delete.value = false;
      loading.value = false;
      my_table.value.requestServerInteraction();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      emit('afterDelete');
    });
}

const refresh = () => {
  my_table.value.requestServerInteraction();
};

const updateSearch = (val: string) => {
  search.value = val;
  my_table.value.requestServerInteraction();
};

defineExpose({
  updateSearch,
  refresh,
});

onBeforeMount(() => {
  auth.checkPermissions(props.menuCode);
});

onMounted(() => {
  refresh();
  if (props.useAction && auth.permission.includes('Action')) {
    cols.value.push({
      name: 'actions',
      label: 'Action',
      align: 'center',
    });
  }
});
</script>
<template>
  <q-breadcrumbs class="tw-mb-4" v-if="!$slots.breadcrumbs">
    <template
      v-for="pathd in route.fullPath.split('/').filter((e) => {
        return e != '';
      })"
      v-bind:key="pathd"
    >
      <q-breadcrumbs-el
        v-if="
          route.matched.some(({ path }) => {
            return path == `/${pathd}`;
          })
        "
        class="tw-capitalize tw-text-lg tw-font-semibold"
        :label="pathd.replace('-', ' ')"
        :to="`/${pathd}`"
      />

      <q-breadcrumbs-el
        v-else
        class="tw-capitalize tw-text-lg tw-text-[#4B465C] tw-font-semibold"
        :label="pathd.replace('-', ' ')"
      />
    </template>
  </q-breadcrumbs>
  <slot name="breadcrumbs"></slot>
  <div class="tw-mb-6" v-if="$slots.top">
    <slot name="top"></slot>
  </div>
  <q-table
    ref="my_table"
    :columns="cols"
    :rows="rows"
    :loading="loading"
    @request="fetchData"
    v-model:pagination="pagination"
    card-class="tw-py-2"
    class="tw-col-span-2 tw-shadow-md"
    :class="
      cols.map((col) => col.name).includes('actions') &&
      'my-sticky-column-table'
    "
  >
    <template #top>
      <div class="tw-flex tw-w-full tw-items-center tw-justify-between">
        <q-input
          class="input-box tw-w-40 md:tw-w-fit"
          dense
          placeholder="Search"
          v-model="search"
          debounce="300"
          @update:model-value="$refs.my_table.requestServerInteraction()"
          hide-bottom-space
          outlined
        >
          <template #prepend>
            <q-icon name="search" />
          </template>
          <template #append>
            <q-btn
              v-if="search"
              flat
              size="sm"
              dense
              rounded
              icon="close"
              class="bg-red"
              text-color="white"
              @click="
                () => {
                  search = '';
                  $refs.my_table.requestServerInteraction();
                }
              "
            />
          </template>
        </q-input>
        <div>
          <Btn
            v-if="auth.permission.includes('Create')"
            icon="add"
            label="Add"
            @click="
              () => {
                dialog = true;
                payload = {};
              }
            "
          />
        </div>
      </div>
    </template>
    <template #body-cell-index="props">
      <q-td :props="props">
        {{ props.rowIndex + 1 }}
      </q-td>
    </template>
    <template
      v-for="col in columns.filter((e) => e?.slot == true)"
      v-slot:[`body-cell-${col.name}`]="props"
    >
      <slot :name="`body-cell-${col.name}`" :props="props"></slot>
    </template>

    <template #body-cell-actions="props">
      <q-td :props="props">
        <div class="tw-space-x-2">
          <slot name="prepend-action" :row="props.row"> </slot>
          <template v-if="!$slots.action">
            <q-btn
              dense
              unelevated
              size="sm"
              flat
              icon="eva-edit-2-outline"
              @click="
                () => {
                  is_edit = true;
                  dialog = true;
                  payload = props.row;
                }
              "
            >
              <q-tooltip anchor="bottom middle" self="top middle">
                Edit
              </q-tooltip>
            </q-btn>
            <q-btn
              dense
              unelevated
              flat
              size="sm"
              icon="eva-trash-2-outline"
              @click="
                () => {
                  row = props.row;
                  dialog_delete = true;
                }
              "
            >
              <q-tooltip anchor="bottom middle" self="top middle">
                Hapus
              </q-tooltip>
            </q-btn>
          </template>
          <template v-else>
            <slot name="action" :row="props.row" />
          </template>
          <slot name="append-action" :row="props.row"> </slot>
        </div>
      </q-td>
    </template>
  </q-table>
  <q-dialog
    v-model="dialog"
    @hide="
      () => {
        is_edit = false;
        payload = {};
        row = {};
      }
    "
  >
    <q-card style="width: 600px" class="tw-p-6">
      <q-card-section>
        <div class="text-h6 text-center">
          {{ is_edit ? 'Edit' : 'Add' }} {{ props.title }}
        </div>
      </q-card-section>
      <q-form @submit.prevent="storeData">
        <q-card-section>
          <slot name="form" :is_edit="is_edit" :payload="payload" />
        </q-card-section>
        <q-card-section align="center" class="tw-space-x-2">
          <Btn
            label="Cancel"
            color="grey-3"
            text-color="grey"
            @click="
              () => {
                dialog = false;
              }
            "
          />
          <Btn type="submit" :loading="loading" label="Submit" />
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
  <q-dialog v-model="dialog_delete">
    <q-card style="min-width: 400px" class="tw-p-2">
      <q-card-section>
        <div class="text-h6">Hapus {{ props.title }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        Anda yakin ingin menghapus
        <span class="tw-font-bold">{{ row[props.colInfo] }}</span
        >?<br />Proses ini tidak dapat dibatalkan
      </q-card-section>
      <q-card-actions align="right">
        <Btn
          label="Cancel"
          color="grey-3"
          text-color="grey"
          @click="
            () => {
              dialog_delete = false;
            }
          "
        />
        <Btn label="Delete" color="red-5" @click="deleteData" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<style scoped lang="scss">
:deep(.input-box .q-field__control),
:deep(.input-box .q-field__marginal) {
  height: 36px;
}

.my-sticky-column-table :deep(th:last-child) {
  position: sticky;
  right: 0;
  z-index: 1;
  background-color: #fff;
}
.my-sticky-column-table td:last-child {
  position: sticky;
  right: 0;
  z-index: 1;
  background-color: #fff;
}
</style>
