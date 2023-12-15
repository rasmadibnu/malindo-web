<template>
  <q-page class="tw-overflow-hidden">
    <q-parallax class="!tw-hidden -tw-top-10 md:!tw-block">
      <template v-slot:media>
        <img src="~assets/bigbg.png" />
      </template>

      <template v-slot:content="scope">
        <div
          :style="{
            top: scope.percentScrolled * 60 + '%',
            left: 0,
            right: 0,
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
    <div class="tw-max-w-6xl tw-mx-auto tw-mt-8 xl:tw-px-0 tw-px-8 tw-mb-24">
      <h1 class="text-primary tw-mb-4 tw-text-3xl tw-font-bold">
        Berbagai Macam Armada
      </h1>
      <div class="tw-grid md:tw-grid-cols-3 tw-gap-4">
        <q-card>
          <q-carousel class="tw-h-fit" arrows animated v-model="slide">
            <q-carousel-slide name="first" class="q-pa-none">
              <q-img src="~assets/cdd1.png">
                <div class="absolute-bottom tw-text-center">
                  <div class="text-h6">CDD BOX</div>
                  <div class="text-subtitle2">
                    Berat Maksimal 5000 kg
                    <br />Batas Ukuran (PxLxT): 450cm x 200cm x 200cm
                  </div>
                </div>
              </q-img>
            </q-carousel-slide>
            <q-carousel-slide name="second" class="q-pa-none">
              <q-img src="~assets/cdd2.svg">
                <div class="absolute-bottom tw-text-center">
                  <div class="text-h6">CDD BOX</div>
                  <div class="text-subtitle2">
                    Berat Maksimal 5000 kg <br />Batas Ukuran (PxLxT): 450cm x
                    200cm x 200cm
                  </div>
                </div>
              </q-img>
            </q-carousel-slide>
          </q-carousel>
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

    <div class="tw-py-8 tw-my-5 md:tw-my-8">
      <div class="tw-max-w-6xl tw-mx-auto xl:tw-px-0 tw-px-8">
        <div class="tw-mb-4 tw-text-3xl tw-font-bold tw-text-primary">
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
                  Pengiriman barang cepat mudah untuk usaha pribadi dan usaha
                  kecil
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

    <div class="tw-max-w-6xl tw-mx-auto xl:tw-px-0 tw-px-8">
      <div
        class="tw-grid md:tw-grid-cols-2 tw-py-10 md:tw-gap-20 tw-gap-10 tw-items-center"
      >
        <div class="tw-grid md:tw-grid-cols-2 tw-gap-8 tw-items-center">
          <div class="tw-space-y-8">
            <q-card
              class="tw-items-center tw-py-4 tw-text-left tw-rounded-3xl tw-shadow-lg"
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
        <div>
          <div class="tw-space-y-4">
            <p class="tw-text-3xl tw-text-primary tw-font-bold">
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
    <div class="tw-max-w-6xl tw-mx-auto xl:tw-px-0 tw-px-8">
      <div class="tw-space-y-4">
        <div
          class="tw-grid md:tw-grid-cols-2 tw-mb-10 md:tw-mb-20 text-secondary tw-gap-20"
        >
          <div>
            <div class="tw-space-y-4 tw-mt-10">
              <div class="tw-text-3xl tw-font-bold text-secondary">
                VISI <br />
              </div>
              <div>
                <ul
                  style="
                    padding-left: 15px;
                    list-style: disc;
                    list-style-position: outside;
                  "
                >
                  <li>
                    Menjadi perusahaan transportasi yang kompetitif dan
                    transparan
                  </li>
                  <li>
                    dengan memprioritaskan kepuasan dan kenyamanan pelanggan
                  </li>
                </ul>
              </div>
              <div class="tw-text-3xl tw-font-bold tw-text-primary">
                MISI <br />
              </div>
              <div class="tw-text-justify">
                <ul
                  style="
                    padding-left: 15px;
                    list-style: disc;
                    list-style-position: outside;
                  "
                >
                  <li>
                    memastikan Pengembangan dan implementasi strategi dan
                    program yang akan memastikan
                  </li>
                  <li>Professional dalam operasi</li>
                  <li>Pemanfaatan keunggulan</li>
                  <li>kompetitif secara maksimal</li>
                  <li>Kesejahteraan kepada karyawan</li>
                </ul>
              </div>
            </div>
          </div>

          <q-img src="~assets/orange.jpg" />
        </div>
        <div class="tw-mb-10 md:tw-mb-20 tw-mt-2 tw-gap-8">
          <div>
            <p class="tw-text-3xl tw-font-bold text-secondary">Our Values</p>
            <div class="text-secondary tw-mt-4 tw-space-y-2 tw-text-justify">
              <div class="tw-font-bold text-secondary">
                Keamanan dan prioritas<br />
              </div>

              <div>
                Keselamatan karyawan dan klien kami adalah prioritas nomor satu
                kami sebagai perusahaan yang bertanggung jawab dan akuntabel.
              </div>
              <div class="tw-font-bold text-secondary">Intergritas</div>
              <div>
                Kepercayaan adalah dasar kami membangun reputasi. Dengan terus
                mengedepankan kejujuran, integritas, dan keandalan, kita
                mematuhi standar moral dan etika tertinggi.
              </div>
              <div class="tw-font-bold text-secondary">Inovasi</div>
              <div>
                Perusahaan kami menantang cara - cara standar dalam melakukan
                sesuatu di industri logistik dan mengembangkan cara - cara baru
                dan inovatif untuk memenuhi kebutuhan klien kami.
              </div>
            </div>
          </div>
        </div>
        <q-separator />
        <div
          class="tw-max-w-6xl tw-mx-auto tw-my-5 md:tw-my-10 xl:tw-px-0 tw-space-y-4"
        >
          <p class="tw-text-3xl tw-font-bold tw-text-center text-secondary">
            Our Galery <br />
            <br />
          </p>
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
    <div
      id="client"
      class="tw-max-w-6xl tw-my-10 tw-space-y-6 tw-mx-auto xl:tw-px-0 tw-px-8"
    >
      <div class="tw-text-center tw-text-3xl tw-font-bold">
        Dipercaya oleh Berbagai Perusahaan Skala Nasional
      </div>
      <div class="tw-grid md:tw-grid-cols-3 tw-items-center">
        <div class="tw-flex tw-justify-center">
          <q-avatar square size="200px">
            <q-img src="~assets/artaboga.svg" />
          </q-avatar>
        </div>
        <div class="tw-flex tw-justify-center">
          <q-avatar square size="200px">
            <q-img src="~assets/mayora.svg" />
          </q-avatar>
        </div>
        <div class="tw-flex tw-justify-center">
          <q-avatar square size="200px">
            <q-img src="~assets/fajar.png" />
          </q-avatar>
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
<script>
import { defineComponent, ref } from 'vue';
// import BeritaInfo from 'src/components/BeritaInfo.vue';
// import CoverageComp from '../components/CoverageComp.vue';
// import Slider from 'src/components/Slider.vue';
import ContactUs from 'src/components/ContactUs.vue';
import ParallaxContent from 'src/components/ParallaxContent.vue';
import ParallaxContent1 from 'src/components/ParallaxContent1.vue';
import ParallaxContent2 from 'src/components/ParallaxContent2.vue';

export default defineComponent({
  components: {
    ParallaxContent,
    ParallaxContent1,
    ParallaxContent2,
    ContactUs,
  },
  name: 'IndexPage',
  setup() {
    return {
      articles: ref([]),
      expanded_darat: ref(false),
      expanded_udara: ref(false),
      expanded_laut: ref(false),
      slide: ref('first'),
    };
  },
  mounted() {
    //this.getArticle();
  },
  methods: {
    getArticle() {
      this.$api
        .get('/articles?size=-1&filters=["category_id", "3"]')
        .then((ress) => {
          let data = ress.data.data.items;
          this.articles = data;
          console.log(data);
        })
        .catch((err) => console.log(err.response));
    },
  },
});
</script>
