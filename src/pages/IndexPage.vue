<script lang="ts" setup>
import ParallaxContent from 'src/components/ParallaxContent.vue';
import ParallaxContent1 from 'src/components/ParallaxContent1.vue';
import ParallaxContent2 from 'src/components/ParallaxContent2.vue';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { onMounted, ref } from 'vue';

const text = ref('');

onMounted(() => {
  AOS.init();
});
</script>
<template>
  <q-page class="tw-overflow-hidden">
    <q-parallax class="!tw-hidden md:!tw-block">
      <template v-slot:media>
        <img src="~assets/bigbg.png" />
      </template>

      <template v-slot:content="scope">
        <div
          :style="{
            top: scope.percentScrolled * 60 + '%',
            left: 0,
            right: 0,
            width: '100%',
          }"
        >
          <ParallaxContent />
        </div>
      </template>
    </q-parallax>

    <div
      class="md:tw-hidden tw-block"
      style="
        overflow-y: hidden !important;
        overflow-x: hidden !important;
        background-image: url('bigbg.png');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        box-shadow: rgba(36, 55, 99, 0.5) 0 0 0 1000000px inset;
      "
    >
      <ParallaxContent />
    </div>
    <div
      style="
        background: rgb(247, 147, 30);
        background: linear-gradient(
          94deg,
          rgba(247, 147, 30, 1) 0%,
          rgba(247, 148, 33, 1) 50%,
          rgba(247, 149, 34, 1) 66%,
          rgba(249, 170, 78, 1) 79%,
          rgba(255, 255, 255, 0.5384278711484594) 100%,
          rgba(255, 255, 255, 0) 100%
        );
      "
    >
      <div
        class="tw-grid tw-items-center tw-py-4 tw-max-w-6xl tw-mx-auto xl:tw-px-0 tw-px-8 md:tw-grid-cols-8"
        data-aos="fade-right"
        data-aos-duration="1000"
        data-aos-offset="-200"
      >
        <div class="tw-col-span-5 tw-items-center">
          <div class="text-white tw-hidden tw-text-xs md:tw-flex tw-gap-4">
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
          <!-- <div class="tw-items-end">
            <q-avatar> <q-img src="~assets/track.png" /> </q-avatar>
          </div> -->
        </div>

        <div class="tw-col-span-3 tw-bg-white">
          <q-input
            filled
            class="text-white"
            v-model="text"
            label="Lacak Pengiriman"
            dense
          >
            <template v-slot:append>
              <q-icon
                v-if="text !== ''"
                name="close"
                @click="text = ''"
                class="cursor-pointer"
              />
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </div>
    </div>
    <div class="tw-grid md:tw-grid-cols-2">
      <div class="tw-px-10 tw-py-10">
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-once="true"
          class="tw-text-5xl tw-pt-5 tw-px-20 tw-font-extrabold"
        >
          MSL
          <q-avatar square><q-img src="/icons/favicon-96x96.png" /> </q-avatar
          ><br />
          <q-separator class="tw-w-6/12 tw-my-2" size="10px" />
          <div class="text-primary tw-font-normal tw-text-sm text-secondary">
            Malindo Sarana logistic menyediakan solusi layanan transportasi dan
            logistik terpadu yang disesuaikan dengan kebutuhan khusus
            pelanggan.<br />
            <br />
          </div>
          <div class="tw-grid md:tw-grid-cols-11 tw-gap-4">
            <div class="tw-col-span-5">
              <p class="tw-text-xl tw-text-left tw-font-bold text-primary">
                Corporate
              </p>
              <p class="tw-text-xs tw-text-left tw-font-normal">
                Daftar untuk fitur bisnis eksekutif atau kirimkan pertanyaan
                anda
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
            </div>
            <q-separator vertical inset class="tw-col-span-1" />
            <div class="tw-col-span-5">
              <p class="tw-text-xl tw-text-left tw-font-bold text-primary">
                Retail
              </p>
              <p class="tw-text-xs tw-text-left tw-font-normal">
                Pengiriman barang cepat mudah untuk usaha pribadi dan usaha
                kecil<br />
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
            </div>
          </div>
        </div>
        <!-- <div
          class="tw-py-8 tw-my-5 md:tw-my-8"
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-once="true"
        >
          <div class="tw-max-w-6xl tw-mx-auto xl:tw-px-0 tw-px-8">
            <div class="tw-grid md:tw-grid-cols-2 tw-gap-4 tw-mb-6">
              <div>
                <q-card class="tw-shadow-md">
                  <q-card-section horizontal>
                    <q-card-section class="tw-space-y-2">
                      <p
                        class="tw-text-xl tw-text-left tw-font-bold text-primary"
                      >
                        CORPORATE
                      </p>
                      <p class="tw-text-xs tw-text-left">
                        Daftar untuk fitur bisnis eksekutif atau kirimkan
                        pertanyaan anda dan mari kita bicara!
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
                  </q-card-section>
                </q-card>
              </div>
              <q-card class="tw-shadow-md">
                <q-card-section horizontal>
                  <q-card-section class="tw-space-y-2">
                   
                  </q-card-section>
                  <q-img class="col-5" src="~assets/pindah.svg" />
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div> -->
      </div>
      <div data-aos="fade-left" data-aos-duration="1000" data-aos-once="true">
        <q-img src="~assets/people1.svg" />
      </div>
    </div>
    <div class="tw-bg-secondary tw-pb-20">
      <div
        class="text-white tw-py-10 tw-px-64 tw-font-normal tw-text-center"
        data-aos="fade-up"
        data-aos-duration="1500"
        data-aos-delay="1000"
        data-aos-once="true"
      >
        <div class="tw-text-2xl tw-pt-5 tw-font-extrabold">
          WILAYAH LAYANAN KAMI TERSEBAR DI SELURUH INDONESIA
        </div>
        <br />
        Manfaatkan keahlian terpercaya kami dan pilih dari berbagai layanan kami
        untuk mengembangkan, menerapkan, dan mengelola solusi logistik yang
        menyederhanakan operasional bisnis Anda.
      </div>
      <div
        class="tw-grid md:tw-grid-cols-4 tw-font-semibold tw-py-4 tw-px-20"
        data-aos="fade-up"
        data-aos-duration="1500"
        data-aos-delay="500"
        data-aos-once="true"
      >
        <q-card square class="tw-overflow-hidden">
          <q-img
            src="~assets/news1.png"
            class="tw-transition tw-duration-500 tw-transform hover:tw-scale-125"
          >
            <div class="absolute-full tw-text-xl flex flex-center">
              Werehouse Management
            </div>
          </q-img>
        </q-card>
        <q-card square class="tw-overflow-hidden">
          <q-img
            src="~assets/news2.png"
            class="tw-transition tw-duration-500 tw-transform hover:tw-scale-125"
          >
            <div class="absolute-full tw-text-xl flex flex-center">
              Bonded Warehouse
            </div>
          </q-img>
        </q-card>
        <q-card square class="tw-overflow-hidden">
          <q-img
            src="~assets/news3.png"
            class="tw-transition tw-duration-500 tw-transform hover:tw-scale-125"
          >
            <div class="absolute-full tw-text-xl flex flex-center">
              Shipping
            </div>
          </q-img>
        </q-card>
        <q-card square class="tw-overflow-hidden">
          <q-img
            src="~assets/news5.png"
            class="tw-transition tw-duration-500 tw-transform hover:tw-scale-125"
          >
            <div class="absolute-full tw-text-xl flex flex-center">
              Maritime Shipping
            </div>
          </q-img>
        </q-card>
        <q-card square class="tw-overflow-hidden">
          <q-img
            src="~assets/news7.png"
            class="tw-transition tw-duration-500 tw-transform hover:tw-scale-125"
          >
            <div class="absolute-full tw-text-xl flex flex-center">
              Professional Services
            </div>
          </q-img>
        </q-card>
        <q-card square class="tw-overflow-hidden">
          <q-img
            src="~assets/news8.png"
            class="tw-transition tw-duration-500 tw-transform hover:tw-scale-125"
          >
            <div class="absolute-full tw-text-xl flex flex-center">
              Sky Shipments
            </div>
          </q-img>
        </q-card>
        <q-card square class="tw-overflow-hidden">
          <q-img
            src="~assets/news9.png"
            class="tw-transition tw-duration-500 tw-transform hover:tw-scale-125"
          >
            <div class="absolute-full tw-text-xl flex flex-center">
              Werehouse Management
            </div>
          </q-img>
        </q-card>
        <q-card square class="tw-overflow-hidden">
          <q-img
            src="~assets/news6.png"
            class="tw-transition tw-duration-500 tw-transform hover:tw-scale-125"
          >
            <div class="absolute-full tw-text-xl flex flex-center">
              Freight Management
            </div>
          </q-img>
        </q-card>
      </div>
    </div>
    <!-- <div class="tw-relative tw-h-full tw-w-full">
      <div class="bg-secondary tw-w-full tw-h-10 tw-absolute tw-top-0"></div>
      <div
        class="!tw-z-50 tw-grid md:tw-grid-cols-6 tw-max-w-6xl tw-mx-auto xl:tw-px-0 tw-px-10"
      >
        <q-card square class="tw-bg-gray-300 tw-col-span-4">
          <div class="tw-px-10 tw-py-4 tw-pb-20">
            <div class="tw-text-2xl tw-pt-5 tw-font-extrabold">COMPLIANCE</div>
            <br />
            kami meyakini bahwa reputasi adalah kunci untuk membangun nilai
            perusahaan, dan reputasi hanya dapat dipertahankan melalui
            seperangkat nilai yang kuat yang terus diperkuat.
          </div>
        </q-card>
        <div class="tw-bg-white tw-col-span-2">
          
        </div>
      </div>
    </div> -->

    <div class="tw-max-w-6xl tw-mx-auto tw-mt-8 xl:tw-px-0 tw-px-8 tw-mb-24">
      <div
        class="text-primary tw-py-10 tw-px-64 tw-font-normal tw-text-center"
        data-aos="fade-right"
        data-aos-duration="1000"
        data-aos-delay="1000"
        data-aos-once="true"
      >
        <div class="tw-text-2xl tw-pt-5 tw-font-extrabold">
          BERBAGAI MACAM ARMADA
        </div>
      </div>
      <div
        class="tw-grid md:tw-grid-cols-3 tw-gap-4"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-once="true"
      >
        <q-card>
          <q-img src="~assets/cdd1.png">
            <div class="absolute-bottom tw-text-center">
              <div class="text-h6">CDD BOX</div>
              <div class="text-subtitle2">
                Berat Maksimal 5000 kg
                <br />Batas Ukuran (PxLxT): 450cm x 200cm x 200cm
              </div>
            </div>
          </q-img>
        </q-card>
        <q-card>
          <q-img src="~assets/fuso1.svg">
            <div class="absolute-bottom tw-text-center">
              <div class="text-h6">FUSO BOX</div>
              <div class="text-subtitle2">
                Berat Maksimal 8000 kg <br />Batas Ukuran (PxLxT): 570cm x 250cm
                x 250cm
              </div>
            </div>
          </q-img>
        </q-card>
        <q-card>
          <q-img src="~assets/10roda1.png">
            <div class="absolute-bottom tw-text-center">
              <div class="text-h6">TRONTON BOX</div>
              <div class="text-subtitle2">
                Berat Maksimal 20.000 kg <br />Batas Ukuran (PxLxT): 940cm x
                240cm x 290cm
              </div>
            </div>
          </q-img>
        </q-card>
        <q-card>
          <q-img src="~assets/fusoopen.png">
            <div class="absolute-bottom tw-text-center">
              <div class="text-h6">TRUCK BAK BUKA</div>
              <div class="text-subtitle2">
                Berat Maksimal 8000 kg <br />Batas Ukuran (PxLxT): 570cm x 250cm
                x 250cm
              </div>
            </div>
          </q-img>
        </q-card>
        <q-card>
          <q-img src="~assets/kuningopen.svg">
            <div class="absolute-bottom tw-text-center">
              <div class="text-h6">TRUCK BAK BUKA</div>
              <div class="text-subtitle2">
                Berat Maksimal 8000 kg <br />Batas Ukuran (PxLxT): 591cm x 197cm
                x 212cm
              </div>
            </div>
          </q-img>
        </q-card>
        <q-card>
          <q-img src="~assets/trontonopen.svg">
            <div class="absolute-bottom tw-text-center">
              <div class="text-h6">TRUCK TRONTON</div>
              <div class="text-subtitle2">
                Berat Maksimal 20.000 kg <br />Batas Ukuran (PxLxT): 630cm x
                250cm x 250cm
              </div>
            </div>
          </q-img>
        </q-card>
      </div>
    </div>

    <div>
      <q-parallax class="!tw-hidden md:!tw-block">
        <template v-slot:media>
          <img src="~assets/bigbg2.png" />
        </template>

        <template v-slot:content="scope">
          <div
            :style="{
              top: scope.percentScrolled * 60 + '%',
              left: 0,
              right: 0,
            }"
          >
            <ParallaxContent2 />
          </div>
        </template>
      </q-parallax>

      <div
        class="md:tw-hidden tw-block"
        style="
          overflow-y: hidden !important;
          overflow-x: hidden !important;
          background-image: url('bigbg2.png');
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center center;
          box-shadow: rgba(36, 55, 99, 0.5) 0 0 0 1000000px inset;
        "
      >
        <ParallaxContent2 />
      </div>
    </div>

    <div
      class="tw-max-w-6xl tw-mx-auto xl:tw-px-0 tw-px-8"
      style="background-image: url('/background/indo.svg')"
    >
      <div
        class="tw-grid md:tw-grid-cols-2 tw-py-10 md:tw-gap-20 tw-gap-10 tw-items-center"
      >
        <div
          class="tw-grid md:tw-grid-cols-2 tw-gap-8 tw-items-center"
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-once="true"
        >
          <div class="tw-space-y-8">
            <q-card
              class="tw-items-center tw-py-4 tw-text-left tw-rounded-3xl tw-shadow-lg"
              data-aos-duration="1000"
              data-aos-once="true"
              data-aos-delay="100"
            >
              <q-card-section class="q-pb-none">
                <div class="tw-flex tw-justify-center">
                  <!-- <q-avatar class="tw-mb-4" square size="180px">
                    <q-img src="~assets/truck.svg" />
                  </q-avatar> -->
                </div>
                <p class="tw-text-lg tw-font-medium">Pengangkutan Darat</p>
                <p class="tw-text-xs">
                  Kami menawarkan layanan angkutan truk domestik dan lintas
                  batas serta koresponden yang berbasis di lokasi strategis
                  sehingga anda dapat mengirimkan barang di sepanjang rute
                  bisnis anda.
                  <q-slide-transition>
                    <p v-show="expanded_darat">
                      <q-separator class="tw-my-2" />
                      Dedikasi untuk menyediakan layanan dari pintu ke pintu dan
                      solusi yang disesuaikan dengan klien, Malindo sarana
                      logistic selalu mematuhi standar kualitas tertinggi dan
                      mematuhi peraturan <br />
                      Tim kami akan menangani seluruh rantai pasokan permukaan ,
                      baik anda hanya memerlukan satu paket pengiriman atau
                      rantai pasokan permukaan yang komprehensif.
                    </p>
                  </q-slide-transition>
                </p>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn
                  flat
                  class="tw-text-xs"
                  color="primary"
                  :label="!expanded_darat ? 'Selengkapnya ' : 'Kembali '"
                  :icon-right="!expanded_darat ? 'arrow_forward' : 'arrow_back'"
                  no-caps
                  dense
                  @click="expanded_darat = !expanded_darat"
                />
              </q-card-actions>
            </q-card>
            <q-card
              class="tw-items-center tw-py-4 tw-text-left tw-rounded-3xl tw-shadow-lg"
              data-aos-duration="1000"
              data-aos-once="true"
              data-aos-delay="500"
            >
              <q-card-section class="q-pb-none">
                <div class="tw-flex tw-justify-center">
                  <!-- <q-avatar class="tw-mb-4" square size="180px">
                    <q-img src="~assets/plane.svg" />
                  </q-avatar> -->
                </div>
                <p class="tw-text-lg tw-font-medium">Pengangkutan Udara</p>
                <p class="tw-text-xs">
                  Berbagai pilihan maskapai penerbangan kelas satu menyediakan
                  koneksi transportasi yang sangat baik serta pelacakan kiriman
                  kami secara terus menerus.
                  <q-slide-transition>
                    <p v-show="expanded_udara">
                      <q-separator class="tw-my-2" />
                      Anda dapat mengandalkan produk angkutan udara kami untuk
                      tetap sesuai jadwal, dan menjaga anggaran anda
                    </p>
                  </q-slide-transition>
                </p>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn
                  flat
                  class="tw-text-xs"
                  color="primary"
                  :label="!expanded_udara ? 'Selengkapnya ' : 'Kembali '"
                  :icon-right="!expanded_udara ? 'arrow_forward' : 'arrow_back'"
                  no-caps
                  dense
                  @click="expanded_udara = !expanded_udara"
                />
              </q-card-actions>
            </q-card>
          </div>
          <div>
            <q-card
              class="tw-items-center tw-py-4 tw-text-left tw-rounded-3xl tw-shadow-lg"
              data-aos-duration="1000"
              data-aos-once="true"
              data-aos-delay="800"
            >
              <q-card-section class="q-pb-none">
                <div class="tw-flex tw-justify-center">
                  <!-- <q-avatar class="tw-mb-4" square size="180px">
                    <q-img src="~assets/beach.svg" />
                  </q-avatar> -->
                </div>
                <p class="tw-text-lg tw-font-medium">Pengangkutan Laut</p>
                <p class="tw-text-xs">
                  Melalui hubungan yang kuat dengan operator maritim besar,
                  tepercaya, dan efisien Malindo menyediakan layanan yang
                  kompetitif dan fleksibel,
                  <q-slide-transition>
                    <p v-show="expanded_laut">
                      <q-separator class="tw-my-2" />
                      serta mengelola lalu lintas dalam jumlah besar bahkan
                      selama musim puncak, menawarkan jaminan ruang kargo dengan
                      harga terjangkau. Pengalaman dan kehadiran global kami
                      memungkinkang kami menangani banyak rute utama di dunia
                      serta pengetahuan mendalam tentang bea cukai dan peraturan
                      lalu lintas internasional.
                    </p>
                  </q-slide-transition>
                </p>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn
                  flat
                  class="tw-text-xs"
                  color="primary"
                  :label="!expanded_laut ? 'Selengkapnya ' : 'Kembali '"
                  :icon-right="!expanded_laut ? 'arrow_forward' : 'arrow_back'"
                  no-caps
                  dense
                  @click="expanded_laut = !expanded_laut"
                />
              </q-card-actions>
            </q-card>
          </div>
        </div>
        <div data-aos="fade-left" data-aos-duration="1000" data-aos-once="true">
          <div class="tw-space-y-4">
            <p
              class="tw-text-3xl tw-text-primary tw-font-bold"
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-once="true"
              data-aos-delay="500"
            >
              Cepat Mudah Terjangkau
            </p>

            <div class="tw-grid md:tw-grid-cols-1 tw-gap-2 text-secondary">
              <div class="text-bold">
                Beragam Armada Pengiriman
                <div class="tw-font-normal tw-text-xs">
                  Pilihan armada yang beragam tersedia untuk pengirimanmu, mulai
                  dari 20 kg hingga 20 ton.
                </div>
              </div>
              <div class="text-bold">
                Pengiriman yang Aman
                <div class="tw-font-normal tw-text-xs">
                  Driver yang terlatih secara profesional akan memastikan barang
                  yang kamu kirim sampai ke tujuan dengan aman, dilengkapi
                  dengan lisensi dan asuransi.
                </div>
              </div>
              <div class="text-bold">
                Terjangkau
                <div class="tw-font-normal tw-text-xs">
                  Nikmati tarif yang transparan. Lakukan pembayaran langsung
                  melalui aplikasi atau secara tunai kepada driver.
                </div>
              </div>
              <div class="text-bold">
                Tepat Waktu dan Efisien
                <div class="tw-font-normal tw-text-xs">
                  Pengiriman akan dijemput dan diantar tepat waktu, menjamin
                  keefisienan dalam setiap prosesnya.
                </div>
              </div>
            </div>

            <!-- <q-btn
              no-caps
              rounded
              color="primary"
              class="tw-font-semibold"
              label="Lihat Selengkapnya"
              :to="{ name: 'product' }"
            /> -->
          </div>
        </div>
      </div>
    </div>
    <div>
      <q-parallax class="!tw-hidden md:!tw-block">
        <template v-slot:media>
          <img src="~assets/bigbg3.png" />
        </template>

        <template v-slot:content="scope">
          <div
            :style="{
              top: scope.percentScrolled * 60 + '%',
              left: 0,
              right: 0,
            }"
          >
            <ParallaxContent1 />
          </div>
        </template>
      </q-parallax>

      <div
        class="md:tw-hidden tw-block"
        style="
          overflow-y: hidden !important;
          overflow-x: hidden !important;
          background-image: url('bigbg3.png');
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center center;
          box-shadow: rgba(36, 55, 99, 0.5) 0 0 0 1000000px inset;
        "
      >
        <ParallaxContent1 />
      </div>
    </div>
    <div class="tw-max-w-6xl tw-mx-auto xl:tw-px-0 tw-px-8 tw-bg-[#f9f9f9]">
      <div class="tw-space-y-4">
        <div
          class="text-primary tw-py-10 tw-px-64 tw-font-normal tw-text-center"
        >
          <div
            class="tw-text-3xl tw-pt-5 tw-font-extrabold"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-once="true"
          >
            Vision, Mission, Values
          </div>
        </div>
        <div
          class="tw-grid md:tw-grid-cols-2"
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-once="true"
        >
          <div class="tw-mb-10 md:tw-mb-20 text-secondary tw-gap-20">
            <div class="tw-space-y-4 tw-mt-10">
              <div class="tw-text-3xl tw-font-bold text-secondary">
                Visi <br />
              </div>
              <div>
                Menjadi perusahaan transportasi yang kompetitif dan transparan
                dengan memprioritaskan kepuasan dan kenyamanan pelanggan
              </div>
              <div class="tw-text-3xl tw-font-bold tw-text-primary">
                Misi <br />
              </div>
              <div>
                <li>
                  Memastikan Pengembangan dan implementasi strategi dan program
                  yang akan memastikan
                </li>
                <li>Professional dalam operasi</li>
                <li>Pemanfaatan keunggulan</li>
                <li>kompetitif secara maksimal</li>
                <li>Kesejahteraan kepada karyawan</li>
              </div>
            </div>

            <!-- <q-img src="~assets/orange.jpg" /> -->
          </div>
          <div>
            <q-img src="~assets/banner.svg" />
          </div>
        </div>
        <div
          class="tw-mb-10 md:tw-mb-20 tw-mt-2 tw-gap-8"
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-once="true"
        >
          <div class="tw-text-3xl tw-font-bold tw-text-center text-secondary">
            Our Values <br />
          </div>
          <div class="tw-grid md:tw-grid-cols-3 tw-py-6 tw-gap-4">
            <q-card class="bg-white tw-text-black tw-shadow-lg">
              <q-card-section horizontal>
                <q-card-section>
                  <q-avatar>
                    <q-img src="~assets/cost.png" />
                  </q-avatar>
                </q-card-section>
                <q-card-section class="q-pl-none">
                  <div
                    class="tw-text-xl tw-text-secondary tw-transition tw-duration-500 hover:tw-text-primary tw-font-bold"
                  >
                    Cost Efektif
                  </div>
                  <div class="q-pt-md">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                  </div>
                </q-card-section>
              </q-card-section>
            </q-card>
            <q-card class="bg-white tw-text-black tw-shadow-lg">
              <q-card-section horizontal>
                <q-card-section>
                  <q-avatar>
                    <q-img src="~assets/accuracy.png" />
                  </q-avatar>
                </q-card-section>
                <q-card-section class="q-pl-none">
                  <div
                    class="tw-text-xl tw-text-secondary tw-transition tw-duration-500 hover:tw-text-primary tw-font-bold"
                  >
                    Cost Efektif
                  </div>
                  <div class="q-pt-md">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                  </div>
                </q-card-section>
              </q-card-section>
            </q-card>
            <q-card class="bg-white tw-text-black tw-shadow-lg">
              <q-card-section horizontal>
                <q-card-section>
                  <q-avatar>
                    <q-img src="~assets/increase.png" />
                  </q-avatar>
                </q-card-section>
                <q-card-section class="q-pl-none">
                  <div
                    class="tw-text-xl tw-text-secondary tw-transition tw-duration-500 hover:tw-text-primary tw-font-bold"
                  >
                    Cost Efektif
                  </div>
                  <div class="q-pt-md">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                  </div>
                </q-card-section>
              </q-card-section>
            </q-card>
            <q-card class="bg-white tw-text-black tw-shadow-lg">
              <q-card-section horizontal>
                <q-card-section>
                  <q-avatar>
                    <q-img src="~assets/visibility.png" />
                  </q-avatar>
                </q-card-section>
                <q-card-section class="q-pl-none">
                  <div
                    class="tw-text-xl tw-text-secondary tw-transition tw-duration-500 hover:tw-text-primary tw-font-bold"
                  >
                    Cost Efektif
                  </div>
                  <div class="q-pt-md">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                  </div>
                </q-card-section>
              </q-card-section>
            </q-card>
            <q-card class="bg-white tw-text-black tw-shadow-lg">
              <q-card-section horizontal>
                <q-card-section>
                  <q-avatar>
                    <q-img src="~assets/reliable.png" />
                  </q-avatar>
                </q-card-section>
                <q-card-section class="q-pl-none">
                  <div
                    class="tw-text-xl tw-text-secondary tw-transition tw-duration-500 hover:tw-text-primary tw-font-bold"
                  >
                    Cost Efektif
                  </div>
                  <div class="q-pt-md">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                  </div>
                </q-card-section>
              </q-card-section>
            </q-card>
            <q-card class="bg-white tw-text-black tw-shadow-lg">
              <q-card-section horizontal>
                <q-card-section>
                  <q-avatar>
                    <q-img src="~assets/easy.png" />
                  </q-avatar>
                </q-card-section>
                <q-card-section class="q-pl-none">
                  <div
                    class="tw-text-xl tw-text-secondary tw-transition tw-duration-500 hover:tw-text-primary tw-font-bold"
                  >
                    Cost Efektif
                  </div>
                  <div class="q-pt-md">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknow
                  </div>
                </q-card-section>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <div
          class="text-secondary tw-py-10 tw-px-64 tw-font-normal tw-text-center"
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-once="true"
        >
          <div
            class="tw-text-2xl tw-pt-5 text-secondary tw-font-extrabold"
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-once="true"
          >
            News Update
          </div>
        </div>
        <div
          class="tw-grid md:tw-grid-cols-4 tw-text-left tw-gap-3"
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-once="true"
          data-aos-delay="200"
        >
          <div class="tw-px-4 tw-text-md">
            <div class="tw-text-xs">20 Oktober 2023</div>
            <div class="tw-font-bold tw-text-lg">
              Manfaat Logistik Warehouse untuk Bisnis
            </div>
            <br />
            Ada beberapa alasan yang membuat Anda harus memilih logistic
            warehouse sebagai penyimpanan barang dalam bisnis Anda.<br /><br />
            <div class="tw-font-bold text-primary">READ MORE</div>
          </div>
          <div class="tw-px-4 tw-text-md">
            <div class="tw-text-xs">20 Oktober 2023</div>
            <div class="tw-font-bold tw-text-lg">
              Manfaat Logistik Warehouse untuk Bisnis
            </div>
            <br />
            Ada beberapa alasan yang membuat Anda harus memilih logistic
            warehouse sebagai penyimpanan barang dalam bisnis Anda.<br /><br />
            <div class="tw-font-bold text-primary">READ MORE</div>
          </div>
          <div class="tw-px-4 tw-text-md">
            <div class="tw-text-xs">20 Oktober 2023</div>
            <div class="tw-font-bold tw-text-lg">
              Manfaat Logistik Warehouse untuk Bisnis
            </div>
            <br />
            Ada beberapa alasan yang membuat Anda harus memilih logistic
            warehouse sebagai penyimpanan barang dalam bisnis Anda.<br /><br />
            <div class="tw-font-bold text-primary">READ MORE</div>
          </div>
          <div class="tw-px-4 tw-text-md">
            <div class="tw-text-xs">20 Oktober 2023</div>
            <div class="tw-font-bold tw-text-lg">
              Manfaat Logistik Warehouse untuk Bisnis
            </div>
            <br />
            Ada beberapa alasan yang membuat Anda harus memilih logistic
            warehouse sebagai penyimpanan barang dalam bisnis Anda.<br /><br />
            <div class="tw-font-bold text-primary">READ MORE</div>
          </div>
        </div>
        <q-separator />
        <div
          class="tw-mx-auto tw-my-5 md:tw-my-10 xl:tw-px-0 tw-space-y-4"
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-once="true"
        >
          <div
            class="text-secondary tw-py-10 tw-px-64 tw-font-normal tw-text-center"
          >
            <div class="tw-text-2xl tw-pt-5 tw-font-extrabold">Our Galery</div>
          </div>
          <div
            class="tw-columns-1 tw-gap-4 sm:tw-columns-2 sm:tw-gap-4 md:tw-columns-3 lg:tw-columns-4"
          >
            <q-img
              class="tw-mb-4 tw-rounded tw-shadow-xl"
              src="~assets/a.png"
            />
            <q-img
              class="tw-mb-4 tw-rounded tw-shadow-xl"
              src="~assets/b.png"
            />
            <q-img
              class="tw-mb-4 tw-rounded tw-shadow-xl"
              src="~assets/c.png"
            />
            <q-img
              class="tw-mb-4 tw-h-[250px] tw-rounded tw-shadow-xl"
              src="~assets/d.png
              "
            />
            <q-img
              class="tw-mb-4 tw-h-[250px] tw-rounded tw-shadow-xl"
              src="~assets/e.png
              "
            />
            <q-img
              class="tw-mb-4 tw-rounded tw-shadow-xl"
              src="~assets/f.png
              "
            />
            <q-img
              class="tw-mb-4 tw-h-[210px] tw-rounded tw-shadow-xl"
              src="~assets/g.png
              "
            />
            <q-img
              class="tw-mb-4 tw-h-[250px] tw-rounded tw-shadow-xl"
              src="~assets/h.png
              "
            />
            <q-img
              class="tw-mb-4 tw-h-[250px] tw-rounded tw-shadow-xl"
              src="~assets/i.png
              "
            />
            <q-img
              class="tw-mb-4 tw-h-[250px] tw-rounded tw-shadow-xl"
              src="~assets/j.png
              "
            />
            <q-img
              class="tw-mb-4 tw-rounded tw-shadow-xl"
              src="~assets/k.png
              "
            />
            <q-img
              class="tw-mb-4 tw-h-[250px] tw-rounded tw-shadow-xl"
              src="~assets/l.png
              "
            />
          </div>
        </div>
      </div>
    </div>

    <ContactUs />
  </q-page>
</template>
<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)
</style>
