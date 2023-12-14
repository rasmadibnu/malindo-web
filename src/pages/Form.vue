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
                  v-model="payload.agreement_no"
                  filled
                  toplabel="Nama"
                  mask="#"
                  reverse-fill-mask
                  :rules="[required]"
                />
                <InputTextField
                  v-model="payload.name"
                  filled
                  toplabel="Nama Perusahaan"
                  :rules="[required]"
                />
                <InputTextField
                  v-model="payload.name"
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
                  v-model="payload.name"
                  filled
                  toplabel="Alamat (KOTA)"
                  :rules="[required]"
                />

                <InputTextField
                  v-model="payload.category"
                  filled
                  toplabel="Kami Dapat menghubungi Melalui"
                  :options="optcall"
                  :class="[payload.is_upheld && 'tw-col-span-2']"
                />
                <InputTextField
                  filled
                  v-model="payload.reporter_name"
                  toplabel="Nama Pelapor"
                  v-if="payload.is_upheld"
                />

                <InputSelect
                  v-model="payload.category"
                  filled
                  toplabel="Jenis Kendaraan apa yang paling sering dibutuhkan?"
                  :options="opttruck"
                  :class="[payload.is_upheld && 'tw-col-span-2']"
                />
                <InputSelect
                  v-model="payload.category"
                  filled
                  toplabel="Berapa banyak rata-rata pengiriman yang Anda lakukan per bulan?"
                  :options="optintens"
                  :class="[payload.is_upheld && 'tw-col-span-2']"
                />
                <InputSelect
                  v-model="payload.category"
                  filled
                  toplabel="Apakah anda memiliki kebutuhan pengiriman setidaknya untuk 20 alamat perhari ?"
                  :options="optyesno"
                  :class="[payload.is_upheld && 'tw-col-span-2']"
                />
                <InputSelect
                  v-model="payload.category"
                  filled
                  toplabel="Berapa lama waktu yang dibutuhkan dari melakukan pemesanan, hingga barang diambil?"
                  :options="opttime"
                  :class="[payload.is_upheld && 'tw-col-span-2']"
                />

                <q-file filled v-model="payload.ktp" label="KTP">
                  <template v-slot:append>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>
                <q-file
                  filled
                  v-model="payload.ktp_receipent_attorney"
                  label="KTP Penerima Kuasa"
                  v-if="payload.is_upheld"
                >
                  <template v-slot:append>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>

                <q-file
                  filled
                  v-model="payload.letter_attorney"
                  v-if="payload.is_upheld"
                  label="Surat Kuasa"
                >
                  <template v-slot:append>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>
                <q-file
                  filled
                  v-model="payload.document"
                  label="Dokumen Lainnya (Jika Ada)"
                >
                  <template v-slot:append>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>
              </div>

              <q-btn
                type="submit"
                label="Kirim Pesan"
                rounded
                color="primary"
                class="tw-mt-4"
              />
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
          Pengaduan Anda telah berhasil terkirim, mohon bersabar untuk menunggu
          pemberitahuan lebih lanjut dari pihak kami, atau Anda dapat secara
          berkala memeriksa kotak masuk email Anda. Kami akan memberikan
          informasi lebih lanjut segera setelah pengaduan Anda ditinjau. Terima
          kasih atas kerjasama dan pengertiannya
        </q-card-section>
        <q-card-section>
          <q-btn
            color="white"
            text-color="secondary"
            no-caps
            :to="{ name: 'home' }"
            toplabel="Kembali"
          />
        </q-card-section>
      </q-card>
    </template>
  </div>
</template>
