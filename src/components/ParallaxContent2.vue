<template>
  <div
    class="tw-items-center tw-py-10 md:tw-py-0 tw-my-5 md:tw-my-8 tw-max-w-6xl tw-mx-auto xl:tw-px-0 tw-px-8"
  >
    <div class="tw-space-y-4">
      <div
        class="tw-text-4xl tw-font-extrabold text-white"
        data-aos="fade-right"
        data-aos-duration="1000"
      >
        Mari Menjadi Bagian dari Malindo Sarana Logistics <br />
      </div>
      <p
        class="text-white"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="50"
      >
        Saatnya bergabung dengan kami untuk cara kerja dan hasil logistik yang
        lebih baik.
      </p>
      <div
        class="tw-space-x-6 tw-pt-5"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="500"
      >
        <q-btn
          color="primary"
          no-caps
          :to="{ name: 'type' }"
          outline
          label="Ship With Us"
        />
        <q-btn
          color="white"
          no-caps
          :to="{ name: 'type' }"
          outline
          label="Drive With Us"
        />
      </div>
    </div>
    <div>
      <!-- <Slider /> -->
    </div>
  </div>
</template>
