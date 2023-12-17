<template>
  <div class="tw-max-w-6xl tw-my-5 tw-mx-auto xl:tw-px-0 tw-px-8">
    <!-- <q-img src="~assets/indo.svg" style="max-width: 100%;" class="tw-h-screen tw-absolute" /> -->
    <div
      class="text-white tw-hidden tw-pt-28 tw-text-xs md:tw-flex tw-justify-end tw-gap-4"
    >
      <div class="tw-flex tw-items-center tw-gap-1">
        <q-icon name="call" />
        <div>0817-0841-985</div>
      </div>
      <div class="tw-flex tw-items-center tw-gap-1">
        <q-icon name="mail" />
        <div>malindosaranalogistic@gmail.com</div>
      </div>
      <div class="tw-flex tw-items-center tw-gap-1">
        <q-icon name="public" />
        <div>malindosarana.com</div>
      </div>
    </div>
    <br /><br />
    <div class="tw-grid md:tw-grid-cols-2 tw-items-center md:tw-gap-20">
      <div class="tw-space-y-4">
        <div class="tw-text-4xl tw-pt-5 tw-font-extrabold text-white">
          LOGISTIC & <br />
          <div class="text-primary">TRANSPORT AGENCY</div>
        </div>
        <p class="text-white">
          Masalah transportasi anda adalah spesialisasi kami. <br />Kami bekerja
          sama dengan anda untuk menemukan solusi.
        </p>
        <q-btn
          color="primary"
          no-caps
          :to="{ name: 'type' }"
          outline
          label="Kirim Sekarang"
        />
        <div
          class="tw-grid md:tw-grid-cols-3 tw-gap-4 text-secondary tw-z-50 tw-py-4"
        >
          <q-card class="tw-shadow-md">
            <q-card-section
              class="tw-text-center text-font-bold tw-text-sm tw-items-center"
            >
              <p class="tw-text-xs">Werehouse Solutions</p>
            </q-card-section>
          </q-card>
          <q-card class="tw-shadow-md">
            <q-card-section
              class="tw-text-center text-font-bold tw-text-sm tw-items-center"
            >
              <!-- <p class="tw-font-semibold tw-text-2xl"></p> -->
              <p class="tw-text-xs">Transport & Distribution</p>
            </q-card-section>
          </q-card>
          <q-card class="tw-shadow-md">
            <q-card-section
              class="tw-text-center text-font-bold tw-text-sm tw-items-center"
            >
              <p class="tw-text-xs">Contract Logistics</p>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div>
        <!-- <Slider /> -->
      </div>
    </div>
  </div>
</template>
