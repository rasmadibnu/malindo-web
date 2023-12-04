<template>
  <q-breadcrumbs class="tw-mb-4">
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
  <q-table
    flat
    class="remove-padding-table-top tw-shadow-md"
    :loading="loading"
    :rows="rows"
    :columns="columns"
    row-key="ID"
    :filter="search"
    :pagination="{ rowsPerPage: 10 }"
  >
    <!-- @request="getData"
    v-model:pagination="pagination" -->
    <template #top>
      <div class="tw-flex tw-justify-between tw-w-full">
        <q-input
          class="input-box tw-w-40 md:tw-w-fit"
          dense
          placeholder="Search"
          v-model="search"
          debounce="300"
          outlined
        >
          <template #prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <div>
          <Btn icon="add" label="Add" @click="openDialog(null)" />
        </div>
      </div>
    </template>
    <template v-slot:body="props">
      <TRMenus
        :props="props"
        :row="props.row"
        :number="props.rowIndex"
        :indent="10"
        @openDialog="openDialog"
        @confirmDelete="confirmDelete"
      />
    </template>
  </q-table>

  <q-dialog v-model="form_dialog">
    <q-card class="tw-p-6">
      <q-card-section>
        <div class="text-h6 text-center">
          {{ is_edit ? 'Edit' : 'Add' }} Menu
        </div>
      </q-card-section>

      <q-form @submit.prevent="submit">
        <q-card-section
          class="tw-grid md:tw-grid-cols-6 tw-grid-cols-1 tw-gap-x-4 tw-gap-y-2"
        >
          <InputSelect
            parentClass="md:tw-col-span-6"
            :options="menu_list"
            emit-value
            map-options
            clearable
            v-model.number="form.parent_id"
            filled
            toplabel="Parent"
            hint=""
          />
          <InputTextField
            v-model="form.name"
            filled
            toplabel="Nama"
            :rules="[(val) => !!val || 'Field harus diisi']"
            parentClass="md:tw-col-span-3"
          />
          <q-checkbox
            v-model="form.is_header"
            label="Is Header"
            :rules="[(val) => !!val || 'Field harus diisi']"
            class="md:tw-col-span-3"
          />

          <template v-if="!form.is_header">
            <InputTextField
              v-model="form.code"
              filled
              toplabel="Code"
              parentClass="md:tw-col-span-3"
              hint=""
            />
            <InputTextField
              v-model="form.url"
              filled
              toplabel="URL"
              :rules="[(val) => !!val || 'Field harus diisi']"
              parentClass="md:tw-col-span-3"
            />
            <InputTextField
              v-model="form.icon"
              filled
              toplabel="Icon"
              :rules="[(val) => !!val || 'Field harus diisi']"
              parentClass="md:tw-col-span-3"
            />
            <InputTextField
              v-model="form.ord"
              filled
              mask="#"
              reverse-fill-mask
              toplabel="Urutan"
              :rules="[(val) => !!val || 'Field harus diisi']"
              parentClass="md:tw-col-span-3"
            />
          </template>
          <template v-else>
            <InputTextField
              v-model="form.ord"
              filled
              mask="#"
              reverse-fill-mask
              toplabel="Urutan"
              :rules="[(val) => !!val || 'Field harus diisi']"
              parentClass="md:tw-col-span-6"
            />
          </template>
        </q-card-section>

        <q-card-actions align="center">
          <Btn label="Cancel" color="grey-3" text-color="grey" v-close-popup />

          <q-btn
            label="Simpan"
            class="tw-shadow-sm tw-rounded-md"
            dense
            unelevated
            padding="xs md"
            no-caps
            color="primary"
            type="submit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
  <q-dialog v-model="confirm">
    <q-card style="min-width: 400px" class="tw-p-2">
      <q-card-section>
        <div class="text-h6">Hapus {{ 'menu' }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Anda yakin ingin menghapus menu ini?
      </q-card-section>

      <q-card-actions align="right">
        <Btn label="Cancel" color="grey-3" text-color="grey" v-close-popup />
        <Btn label="Delete" color="red-5" @click="deleteData" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<style scoped>
:deep(.input-box .q-field__control),
:deep(.input-box .q-field__marginal) {
  height: 36px;
}
</style>
<script>
import { defineComponent, ref } from 'vue';
import TRMenus from 'src/components/ui/TRMenus.vue';
import Btn from 'src/components/ui/Button.vue';
import InputTextField from 'src/components/form/InputTextField.vue';
import InputSelect from 'src/components/form/InputSelect.vue';
import { useRoute } from 'vue-router';

const initial_form = {
  name: null,
  url: null,
  icon: null,
  code: null,
  ord: 0,
  is_header: false,
};

export default defineComponent({
  props: ['user'],
  components: { TRMenus, Btn, InputTextField, InputSelect },
  setup() {
    const columns = [
      {
        name: 'index',
        label: '#',
        align: 'center',
      },
      {
        name: 'Name',
        label: 'Nama',
        align: 'left',
        field: 'name',
        sortable: true,
      },
      {
        name: 'Kode',
        label: 'Kode',
        align: 'left',
        field: 'Kode',
        sortable: true,
      },
      {
        name: 'Url',
        label: 'URL',
        align: 'left',
        field: 'Url',
        sortable: true,
      },
      {
        name: 'Icon',
        label: 'Icon',
        align: 'left',
        field: 'Icon',
        sortable: true,
      },
      {
        name: 'Urutan',
        label: 'Urutan',
        align: 'center',
        field: 'Ord',
        sortable: true,
      },

      {
        name: 'action',
        label: 'Aksi',
        align: 'center',
      },
    ];

    const route = useRoute();
    return {
      route,
      rows: ref([]),
      columns,
      pagination: ref({
        page: 1,
        rowsPerPage: 10,
      }),
      search: ref(''),
      totalPages: ref(0),

      form_dialog: ref(false),
      confirm: ref(false),
      is_edit: ref(false),
      loading: ref(false),
      id: ref(''),
      form: ref(structuredClone(initial_form)),

      menu_list: ref([]),
    };
  },
  mounted() {
    // this.$refs.tableRef.requestServerInteraction();
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      // this.pagination = props?.pagination;

      // const params = new URLSearchParams();
      // const data = {
      //   params: params,
      // };
      // let { page, rowsPerPage, rowsNumber } = props.pagination;

      // if (rowsPerPage == 0) {
      //   page = 1;
      //   rowsPerPage = rowsNumber;
      // }

      // if (this.totalPages < page) {
      //   page = this.totalPages;
      // }

      // params.append("Limit", rowsPerPage);
      // params.append("Page", page);

      this.$api
        .get('/menus')
        .then((response) => {
          this.rows = response.data.data;
          // this.pagination.rowsNumber = response.data.data.TotalRows;
          // this.totalPages = response.data.data.TotalPages;

          this.menu_list = this.rows
            .filter((menu) => {
              return menu.parent_id == 0;
            })
            .map((menu) => {
              return { value: menu.id, label: menu.name };
            });
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },

    openDialog(data) {
      if (!data) {
        this.form = { ...initial_form };
        this.is_edit = false;
      } else {
        this.is_edit = true;
        this.id = data.id;
        if (!data.parent_id) {
          delete data.parent_id;
        }
        this.form = { ...data };
      }
      this.form_dialog = true;
    },
    closeDialog() {
      this.form = { ...initial_form };
      this.form_dialog = false;
      this.loading = false;
    },
    submit() {
      this.loading = true;
      if (!this.is_edit) {
        this.$api
          .post('/menus', {
            ...this.form,
            ord: parseInt(this.form.ord),
          })
          .then((res) => {
            this.$q.notify({
              message: 'Menu berhasil ditambahkan',
              color: 'positive',
            });
            this.closeDialog();
            this.getData();
          })
          .catch((err) => {
            this.closeDialog();
            console.log(err);
          });
      } else {
        this.$api
          .put('/menus/' + this.id, {
            ...this.form,
            ord: parseInt(this.form.ord),
          })
          .then((res) => {
            this.$q.notify({
              message: 'Menu berhasil diubah',
              color: 'positive',
            });
            this.closeDialog();
            this.getData();
          })
          .catch((err) => {
            this.closeDialog();
            console.log(err);
          });
      }
    },
    confirmDelete(id) {
      this.id = id;
      this.confirm = true;
    },
    deleteData() {
      this.$api
        .delete('/menus/' + this.id)
        .then((res) => {
          this.$q.notify({
            message: 'Menu berhasil dihapus',
            color: 'positive',
          });
          this.getData();
          this.confirm = false;
        })
        .catch((err) => {
          console.log(err);
          this.confirm = false;
        });
    },
  },
});
</script>
