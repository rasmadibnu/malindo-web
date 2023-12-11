<script lang="ts" setup>
import ContactUs from 'src/components/ContactUs.vue';
</script>
<template>
  <div class="tw-max-w-6xl tw-mx-auto tw-my-10 xl:tw-px-0 tw-px-8">
    <div class="tw-mb-4 tw-text-3xl tw-font-bold text-secondary">
      Pilih sesuai kebutuhan anda!
    </div>
    <div class="tw-grid md:tw-grid-cols-2 tw-gap-4 tw-mb-6">
      <div>
        <q-card class="tw-shadow-md">
          <q-card-section horizontal>
            <q-card-section class="tw-space-y-2">
              <p class="tw-text-xl tw-text-left tw-font-bold text-primary">
                CORPORATE
              </p>
              <p class="tw-text-xs tw-text-left">
                Daftar untuk fitur bisnis eksekutif atau kirimkan pertanyaan
                anda dan mari kita bicara!
              </p>
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
            </q-card-section>

            <q-img class="col-5" src="~assets/heavy.svg" />
          </q-card-section>
        </q-card>
      </div>
      <q-card class="tw-shadow-md">
        <q-card-section horizontal>
          <q-card-section class="tw-space-y-2">
            <p class="tw-text-xl tw-text-left tw-font-bold text-primary">
              RETAIL
            </p>
            <p class="tw-text-xs tw-text-left">
              Pengiriman barang cepat mudah untuk usaha pribadi dan usaha kecil
            </p>
            <q-btn
              flat
              class="tw-text-xs"
              color="primary"
              label="Daftar Sekarang"
              icon-right="arrow_forward"
              no-caps
              dense
              :to="{ name: 'register' }"
            />
          </q-card-section>
          <q-img class="col-5" src="~assets/pindah.svg" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <ContactUs />
</template>
