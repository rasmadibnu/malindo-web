<template>
  <div class="bg-secondary tw-py-10 text-white">
    <div class="tw-max-w-6xl tw-mx-auto xl:tw-px-0 tw-px-8 tw-space-y-4">
      <div class="tw-grid tw-grid-cols-2 tw-gap-8 tw-items-center">
        <div>
          <h1 class="tw-text-3xl tw-mb-6 tw-font-bold">
            Hubungi tim sales kami, isi form di bawah ini
          </h1>
          <div class="tw-grid md:tw-grid-cols-1 tw-gap-6">
            <q-form class="tw-space-y-6">
              <q-input filled bg-color="white" label="Kebutuhan Bisnis Anda" />
              <q-select filled bg-color="white" label="No Hp Anda" />
              <q-select filled bg-color="white" label="Kota" />
              <q-input
                filled
                bg-color="white"
                label="Ceritakan kebutuhan anda"
                type="textarea"
              />
              <div class="tw-flex tw-justify-end">
                <q-btn
                  unelevated
                  no-caps
                  size="md"
                  icon-right="o_send"
                  class="bg-white text-secondary"
                  label="Kirim"
                />
              </div>
            </q-form>
          </div>
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
