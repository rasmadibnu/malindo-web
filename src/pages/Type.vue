<script lang="ts" setup>
import { ref } from 'vue';
import { Notify } from 'quasar';
// import Banner from 'src/components/banner/Banner.vue';
// import { required, email } from 'src/utils/validators';
import InputTextField from 'components/form/InputTextField.vue';
import InputSelect from 'components/form/InputSelect.vue';
import { api } from 'src/boot/axios';

interface Payload {
  agreement_no: number | null;
  name: string;
  is_upheld: boolean;
  phone_number: string;
  email: string;
  reporter_name?: string;
  category: string;
  description: string;
  ktp?: File | undefined;
  ktp_receipent_attorney?: File | undefined;
  letter_attorney?: File | undefined;
  document?: File | undefined;
}

const initialState = {
  agreement_no: null,
  name: '',
  is_upheld: false,
  phone_number: '',
  email: '',
  reporter_name: '',
  category: '',
  description: '',
  ktp: undefined,
  document: undefined,
  ktp_receipent_attorney: undefined,
  letter_attorney: undefined,
};

const payload = ref<Payload>({ ...initialState });

const optcall = ['Whatsapp', 'Email', 'Telpon/SMS'];
const opttruck = ['Pickup Box', 'Engkel Box', 'Pickup Bak'];
const optintens = ['0-25', '26-50', '51-75', '76-100', '>100'];
const optyesno = ['Yes', 'No'];
const opttime = [
  'Kurang dari 1 Jam (Segera)',
  '1-4 Jam',
  '4-8 Jam',
  'Satu Hari/Lebih',
];

const is_success = ref<boolean>(false);

const submit = () => {
  api
    .post('/complaints', { ...payload.value })
    .then(() => {
      Notify.create({
        message: 'Pengaduan berhasil disubmit',
        color: 'positive',
      });

      is_success.value = true;
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>
<template>
  <Banner asset="smart-care.svg" />
  <div
    class="text-center tw-text-primary tw-font-bold tw-text-2xl tw-rounded-3xl tw-py-10"
  >
    Pilih Jenis Akun Anda
  </div>
  <div class="tw-max-w-6xl tw-mx-auto tw-my-5 md:tw-my-8 xl:tw-px-0 tw-px-8">
    <div class="tw-grid md:tw-grid-cols-2 tw-gap-4 tw-mb-6">
      <div>
        <q-card class="tw-shadow-md">
          <q-card-section horizontal>
            <q-card-section>
              <p class="tw-text-xl tw-text-left tw-font-bold text-primary">
                CORPORATE
              </p>
              <p class="tw-text-xs tw-text-left">
                Solusi Pengiriman Instan Untuk Bisnis Anda
              </p>
            </q-card-section>

            <q-img class="col-5" src="~assets/heavy.svg" />
          </q-card-section>
          <q-card-actions align="left">
            <q-btn
              flat
              class="tw-text-xs"
              color="primary"
              label="Cari Tahu"
              icon-right="arrow_forward"
              no-caps
              dense
              :to="{ name: 'form' }"
            />
          </q-card-actions>
        </q-card>
      </div>
      <q-card class="tw-shadow-md">
        <q-card-section horizontal>
          <q-card-section>
            <p class="tw-text-xl tw-text-left tw-font-bold text-primary">
              RETAIL
            </p>
            <p class="tw-text-xs tw-text-left">
              Pengiriman barang cepat mudah untuk kebutuhan anda
            </p></q-card-section
          >
          <q-img class="col-5" src="~assets/pindah.svg" />
        </q-card-section>
        <q-card-actions align="left">
          <q-btn
            flat
            class="tw-text-xs"
            color="primary"
            label="Cari Tahu"
            icon-right="arrow_forward"
            no-caps
            dense
            :to="{ name: 'form' }"
          />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>
