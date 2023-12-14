<script lang="ts" setup>
import { Notify } from 'quasar';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { required } from 'src/utils/validators';

const name = ref('');
const need = ref('');
const phone_number = ref('');
const city = ref('');
const description = ref('');

const is_submit = ref(false);
const submit = () => {
  api
    .post('/inbox', {
      name: name.value,
      need: need.value,
      phone_number: phone_number.value,
      city: city.value,
      description: description.value,
      status_id: 10,
    })
    .then((res) => {
      is_submit.value = true;
      Notify.create({
        message: 'Pesan berhasil terikim',
        color: 'positive',
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<template>
  <div class="tw-py-10 text-primary">
    <div class="tw-max-w-6xl tw-mx-auto xl:tw-px-0 tw-px-8 tw-space-y-4">
      <div class="tw-grid md:tw-grid-cols-2 tw-gap-8 tw-items-center">
        <div>
          <h1 class="tw-text-3xl tw-mb-6 tw-font-bold" id="contactus">
            Hubungi tim sales kami, isi form di bawah ini
          </h1>
          <q-card v-if="!is_submit" class="tw-shadow-md">
            <q-card-section>
              <q-form
                class="tw-grid md:tw-grid-cols-2 tw-gap-6"
                @submit.prevent="submit"
              >
                <q-input
                  filled
                  class="tw-col-span-2"
                  label="Name"
                  v-model="name"
                  :rules="[required]"
                />

                <q-input
                  filled
                  class="tw-col-span-2"
                  label="Kebutuhan Bisnis Anda"
                  v-model="need"
                  :rules="[required]"
                />
                <q-input
                  filled
                  label="No Handphone"
                  v-model="phone_number"
                  mask="#"
                  reverse-fill-mask
                  :rules="[required]"
                />
                <q-input
                  filled
                  label="Kota"
                  v-model="city"
                  :rules="[required]"
                />
                <q-input
                  filled
                  label="Ceritakan kebutuhan anda"
                  type="textarea"
                  class="tw-col-span-2"
                  v-model="description"
                />
                <div class="tw-flex tw-col-span-2 tw-justify-end">
                  <q-btn
                    type="submit"
                    unelevated
                    no-caps
                    size="md"
                    color="primary"
                    icon-right="o_send"
                    label="Kirim"
                  />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
          <q-card v-else class="bg-green-5 tw-shadow-md">
            <q-card-section class="tw-text tw-text-white tw-font-semibold">
              Terima kasih telah mengirim pesan kepada kami. Admin kami akan
              segera menghubungi anda.
            </q-card-section>
          </q-card>
        </div>
        <div>
          <q-avatar size="400px" class="tw-w-full" square>
            <q-img src="~assets/contact_us.svg" />
          </q-avatar>
        </div>
      </div>
    </div>
  </div>
</template>
