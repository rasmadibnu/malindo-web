<script lang="ts" setup>
import { ref } from 'vue';
import { Notify } from 'quasar';
import { required, email } from 'src/utils/validators';
import InputTextField from 'components/form/InputTextField.vue';
import InputSelect from 'components/form/InputSelect.vue';
import { api } from 'src/boot/axios';

interface Payload {
  pic: string;
  name: string;
  position: string;
  privilege: string;
  phone_number: string;
  email: string;
  address: string;
  contact_via: string;
  vehicle_type_id: number | null;
  deliveries_per_month: string;
  is_20_address_per_day: boolean;
  long_time: string;
}

const initialState = <Payload>{
  name: '',
  pic: '',
  position: '',
  privilege: 'Company',
  phone_number: '',
  email: '',
  address: '',
  contact_via: '',
  vehicle_type_id: null,
  deliveries_per_month: '',
  is_20_address_per_day: false,
  long_time: '',
};

const payload = ref<Payload>({ ...initialState });

const optcall = ['Whatsapp', 'Email', 'Telpon/SMS'];
const optintens = ['0-25', '26-50', '51-75', '76-100', '>100'];
const opttime = [
  'Kurang dari 1 Jam (Segera)',
  '1-4 Jam',
  '4-8 Jam',
  'Satu Hari/Lebih',
];

const is_success = ref<boolean>(false);

const submit = () => {
  api
    .post('/partners', { ...payload.value })
    .then(() => {
      Notify.create({
        message: 'Data berhasil disubmit',
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
  <div class="text-center tw-py-6">
    <div class="tw-text-primary tw-font-bold tw-text-2xl">
      Pengiriman Instan untuk Bisnis Anda
    </div>
    <p>
      Nikmati layanan pengiriman instan ataupun terjadwal untuk kebutuhan bisnis
      Anda bersama Lalamove
    </p>
  </div>
  <div
    class="tw-max-w-6xl tw-mx-auto xl:tw-px-0 tw-px-8 tw-mb-10 tw-rounded-t-3xl"
  >
    <template v-if="!is_success">
      <div class="tw-mt-4 tw-gap-2">
        <q-card class="tw-shadow-md">
          <q-card-section>
            <q-form ref="myForm" @submit.prevent="submit">
              <div class="tw-grid md:tw-grid-cols-2 tw-gap-5">
                <InputTextField
                  v-model="payload.pic"
                  filled
                  toplabel="Nama"
                  :rules="[required]"
                />
                <InputTextField
                  v-model="payload.name"
                  filled
                  toplabel="Nama Perusahaan"
                  :rules="[required]"
                />
                <InputTextField
                  v-model="payload.position"
                  filled
                  toplabel="Jabatan"
                  :rules="[required]"
                />

                <InputTextField
                  v-model="payload.phone_number"
                  filled
                  mask="#"
                  reverse-fill-mask
                  maxlength="15"
                  toplabel="No Handphone"
                  :rules="[required]"
                />
                <InputTextField
                  v-model="payload.email"
                  filled
                  toplabel="E-Mail"
                  :rules="[required, email]"
                />
                <InputTextField
                  v-model="payload.address"
                  filled
                  toplabel="Alamat (KOTA)"
                  :rules="[required]"
                />

                <InputSelect
                  v-model="payload.contact_via"
                  filled
                  toplabel="Kami Dapat menghubungi Melalui"
                  :options="optcall"
                />

                <InputSelect
                  v-model="payload.vehicle_type_id"
                  filled
                  toplabel="Jenis Kendaraan apa yang paling sering dibutuhkan?"
                  api-url="/vehicle-types"
                  opt-label="name"
                  opt-value="id"
                  emit-value
                  map-options
                />
                <InputSelect
                  v-model="payload.deliveries_per_month"
                  filled
                  toplabel="Berapa banyak rata-rata pengiriman yang Anda lakukan per bulan?"
                  :options="optintens"
                />
                <q-checkbox
                  v-model="payload.is_20_address_per_day"
                  label="Apakah anda memiliki kebutuhan pengiriman setidaknya untuk 20 alamat perhari ?"
                />
                <InputSelect
                  v-model="payload.long_time"
                  filled
                  toplabel="Berapa lama waktu yang dibutuhkan dari melakukan pemesanan, hingga barang diambil?"
                  :options="opttime"
                />
                <div class="tw-flex tw-items-center">
                  <div>
                    <q-btn
                      type="submit"
                      label="Kirim Pesan"
                      rounded
                      color="primary"
                      class="tw-mt-4"
                    />
                  </div>
                </div>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </template>
    <template v-else>
      <q-card class="bg-secondary tw-text-white">
        <q-card-section>
          <div class="tw-text-2xl tw-font-semibold">Terima Kasih!</div>
        </q-card-section>
        <q-card-section class="q-pt-none tw-text-justify">
          Permintaan Anda telah berhasil terkirim, mohon bersabar untuk menunggu
          pemberitahuan lebih lanjut dari pihak kami, atau Anda dapat secara
          berkala memeriksa kotak masuk email Anda.
        </q-card-section>
        <q-card-section>
          <q-btn
            color="primary"
            text-color="secondary"
            no-caps
            :to="{ name: 'home' }"
            label="Kembali"
          />
        </q-card-section>
      </q-card>
    </template>
  </div>
</template>
