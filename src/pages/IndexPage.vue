<template>
  <q-page>
    <div class="tw-max-w-6xl tw-mx-auto xl:tw-px-0 tw-px-8">
      <div class="text-secondary tw-text-xs tw-flex tw-justify-end tw-gap-4">
        <div class="tw-flex tw-items-center tw-gap-1">
          <q-avatar size="xs">
            <q-img src="~assets/wa.svg" />
          </q-avatar>
          <div>0853-9990-0855</div>
        </div>
        <div class="tw-flex tw-items-center tw-gap-1">
          <q-avatar size="xs">
            <q-img src="~assets/gmail.svg" />
          </q-avatar>
          <div>Malindosaranalogistic@gmail.com</div>
        </div>
      </div>
      <div class="tw-grid md:tw-grid-cols-2 tw-items-center tw-gap-20">
        <div class="tw-space-y-4 tw-mt-10">
          <div class="tw-text-4xl tw-font-semibold text-secondary">
            LOGISTIC & <br />
            <div class="text-primary">TRANSPORT AGENCY</div>
          </div>
          <p>
            Kami berkomitmen untuk selalu membantu masyarakat Indonesia dari
            aspek pendanaan dan modal usaha.
          </p>
          <q-btn color="secondary" label="Kirim Sekarang" @click="onClick" />
          <div class="tw-grid md:tw-grid-cols-4 tw-gap-4 text-primary tw-py-10">
            <q-card class="tw-shadow-xl">
              <q-card-section class="tw-text-center tw-items-center">
                <p class="tw-font-semibold tw-text-2xl">101</p>
                <p class="tw-text-xs">Unit Ready</p>
              </q-card-section>
            </q-card>
            <q-card class="tw-shadow-xl">
              <q-card-section class="tw-text-center tw-items-center">
                <p class="tw-font-semibold tw-text-2xl">40 rb</p>
                <p class="tw-text-xs">Pelanggan</p>
              </q-card-section>
            </q-card>
            <q-card class="tw-shadow-xl">
              <q-card-section class="tw-text-center tw-items-center">
                <p class="tw-font-semibold tw-text-2xl">30</p>
                <p class="tw-text-xs">Pengiriman setiap hari</p>
              </q-card-section>
            </q-card>
            <q-card class="tw-shadow-xl">
              <q-card-section class="tw-text-center tw-items-center">
                <p class="tw-font-semibold tw-text-2xl">70</p>
                <p class="tw-text-xs">Driver</p>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div>
          <Slider />
        </div>
      </div>
    </div>
    <q-card>
      <q-card-section
        class="bg-secondary tw-text-right tw-text-lg tw-text-white"
      >
        Service
      </q-card-section>
    </q-card>

    <div>
      <div class="tw-max-w-6xl tw-mx-auto tw-my-20 xl:tw-px-0 tw-px-8">
        <div class="tw-grid tw-grid-cols-2 tw-gap-4 tw-mb-6">
          <div>
            <q-card class="tw-rounded-3xl tw-shadow-lg">
              <q-card-section horizontal>
                <q-card-section>
                  <p class="tw-text-lg tw-text-left tw-font-bold text-primary">
                    BISNIS
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
          <q-card class="tw-rounded-3xl tw-shadow-lg">
            <q-card-section horizontal>
              <q-card-section>
                <p class="tw-text-lg tw-text-left tw-font-bold text-primary">
                  INDIVIDU
                </p>
                <p class="tw-text-xs tw-text-left">
                  Pengiriman barang cepat mudah untuk kebutuhan pribadi anda
                </p></q-card-section
              >
              <q-img class="col-5" src="~assets/pindah.svg" />
            </q-card-section>
          </q-card>
        </div>
        <div class="tw-max-w-6xl tw-mx-auto xl:tw-px-0 tw-px-8 tw-space-y-6">
          <h1 class="text-primary tw-text-xl tw-font-bold">
            Berbagai Macam Armada
          </h1>
          <div class="tw-grid md:tw-grid-cols-3 tw-gap-4">
            <router-link :to="{ query: { type: 'mobil' } }">
              <q-card class="tw-shadow">
                <q-img src="~assets/kuning.jpg" />
                <q-card-section>
                  <p class="tw-text-lg tw-font-medium">Truck</p>
                  <p>Siap pengantaran sejumlah 20 ton</p>
                </q-card-section>
              </q-card>
            </router-link>
            <router-link :to="{ query: { type: 'motor' } }">
              <q-card class="tw-shadow">
                <q-img src="~assets/merah.jpg" />
                <q-card-section>
                  <p class="tw-text-lg tw-font-medium">Dump Truck</p>
                  <p>Pengangkutan 200 ton</p>
                </q-card-section>
              </q-card>
            </router-link>
            <router-link :to="{ query: { type: 'syariah' } }">
              <q-card class="tw-shadow">
                <q-img src="~assets/merahh.jpg" />
                <q-card-section>
                  <p class="tw-text-lg tw-font-medium">DUMP</p>
                  <p>Sampai Tujuan aman</p>
                </q-card-section>
              </q-card>
            </router-link>
          </div>
        </div>
        <div
          class="tw-grid md:tw-grid-cols-2 tw-py-10 tw-gap-20 tw-items-center"
        >
          <div class="tw-grid md:tw-grid-cols-2 tw-gap-8 tw-items-center">
            <div class="tw-space-y-8">
              <q-card
                class="tw-items-center tw-py-4 tw-text-left tw-rounded-3xl tw-shadow-lg"
              >
                <q-card-section class="q-pb-none">
                  <q-avatar class="tw-mb-4" square size="180px">
                    <q-img src="~assets/truck.svg" />
                  </q-avatar>
                  <p class="tw-text-lg tw-font-medium">Pengangkutan Darat</p>
                  <p class="tw-text-xs">
                    Kami menawarkan layanan angkutan truk domestik dan lintas
                    batas serta koresponden yang berbasis di lokasi strategis...
                    <!-- sehingga anda dapat mengirimkan barang di sepanjang rute -->
                  </p>

                  <!-- bisnis anda. Pengangkutan darat Dedikasi untuk menyediakan
                    layanan dari pintu ke pintu dan solusi yang disesuaikan
                    dengan klien, Malindo sarana logistic selalu mematuhi
                    standar kualitas tertinggi dan mematuhi peraturan
                    lingkungan. Tim kami akan menangani seluruh rantai pasokan
                    permukaan , baik anda hanya memerlukan satu paket pengiriman
                    atau rantai pasokan permukaan yang komprehensif. -->
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn
                    flat
                    class="tw-text-xs"
                    color="primary"
                    label="Cari Tahu "
                    icon-right="arrow_forward"
                    no-caps
                    dense
                  />
                </q-card-actions>
              </q-card>
              <q-card
                class="tw-items-center tw-py-4 tw-text-center tw-rounded-3xl tw-shadow-lg"
              >
                <q-card-section>
                  <q-avatar class="tw-mb-4" square size="180px">
                    <q-img src="~assets/plane.svg" />
                  </q-avatar>
                  <p class="tw-text-lg tw-text-left tw-font-medium">
                    Pengangkutan Udara
                  </p>
                  <p class="tw-text-xs tw-text-left">
                    Berbagai pilihan maskapai penerbangan kelas satu menyediakan
                    koneksi transportasi yang sangat baik serta pelacakan...
                    <!-- kiriman kami secara terus menerus. Anda dapat mengandalkan
                    produk angkutan udara kami untuk tetap sesuai jadwal, dan
                    menjaga anggaran anda
                  </p> -->
                  </p></q-card-section
                >

                <q-card-actions align="right">
                  <q-btn
                    flat
                    class="tw-text-xs"
                    color="primary"
                    label="Cari Tahu "
                    icon-right="arrow_forward"
                    no-caps
                    dense
                  />
                </q-card-actions>
              </q-card>
            </div>
            <div>
              <q-card
                class="tw-items-center tw-py-4 tw-text-center tw-rounded-3xl tw-shadow-lg"
              >
                <q-card-section>
                  <q-avatar class="tw-mb-4" square size="180px">
                    <q-img src="~assets/beach.svg" />
                  </q-avatar>
                  <p class="tw-text-lg tw-text-left tw-font-medium">
                    Pengangkutan Laut
                  </p>
                  <p class="tw-text-left tw-text-xs">
                    Melalui hubungan yang kuat dengan operator maritim besar,
                    tepercaya, dan efisien Malindo menyediakan layanan yang
                    kompetitif dan fleksibel...,
                    <!-- serta mengelola lalu lintas dalam
                    jumlah besar bahkan selama musim puncak, menawarkan jaminan
                    ruang kargo dengan harga terjangkau. Pengalaman dan
                    kehadiran global kami memungkinkang kami menangani banyak
                    rute utama di dunia serta pengetahuan mendalam tentang bea
                    cukai dan peraturan lalu lintas internasional. -->
                  </p>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn
                    flat
                    class="tw-text-xs"
                    color="primary"
                    label="Cari Tahu "
                    icon-right="arrow_forward"
                    no-caps
                    dense
                  />
                </q-card-actions>
              </q-card>
            </div>
          </div>
          <div>
            <div class="tw-space-y-4">
              <p class="tw-text-3xl tw-font-semibold">CEPAT MUDAH TERJANGKAU</p>

              <div class="tw-grid md:tw-grid-cols-1 text-secondary">
                <div class="text-bold">
                  Beragam Armada Pengiriman
                  <div class="tw-font-normal tw-text-xs">
                    Pilihan armada yang beragam tersedia untuk pengirimanmu,
                    mulai dari 20 kg hingga 8 ton.
                  </div>
                  Pengiriman yang Aman
                  <div class="tw-font-normal tw-text-xs">
                    Driver yang terlatih secara profesional akan memastikan
                    barang yang kamu kirim sampai ke tujuan dengan aman,
                    dilengkapi dengan lisensi dan asuransi.
                  </div>
                </div>
                <div class="text-bold">
                  Terjangkau
                  <div class="tw-font-normal tw-text-xs">
                    Nikmati tarif yang transparan. Lakukan pembayaran langsung
                    melalui aplikasi atau secara tunai kepada driver.
                  </div>
                  Tepat Waktu dan Efisien
                  <div class="tw-font-normal tw-text-xs">
                    Pengiriman akan dijemput dan diantar tepat waktu, menjamin
                    keefisienan dalam setiap prosesnya.
                  </div>
                </div>
              </div>

              <q-btn
                no-caps
                rounded
                color="primary"
                class="tw-font-semibold"
                label="Lihat Selengkapnya"
                :to="{ name: 'product' }"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="tw-space-y-4 tw-pb-20">
        <div class="tw-max-w-6xl tw-mx-auto tw-my-20 xl:tw-px-0 tw-px-8">
          <div class="tw-grid md:tw-grid-cols-2 tw-items-center tw-gap-20">
            <div class="tw-space-y-4 tw-mt-10">
              <div class="tw-text-4xl tw-font-semibold text-secondary">
                MALINDO <br />
                <div class="text-primary">SARANA LOGISTICS</div>
                <div class="tw-text-black tw-text-sm">
                  <br /><b></b>SUKSES SEMUANYA TENTANG WAKTU DAN KOMITMEN.
                </div>
              </div>
            </div>
            <div>
              <div class="tw-space-y-4 tw-mt-10">
                <p>
                  Masalah transportasi anda adalah spesialisasi kami. Kami
                  bekerja sama dengan anda untuk menemukan solusi.
                </p>
                <p>
                  Kami lebih dari sekedar perusahaan transportasi. Selain
                  menambah nilai, kami mengurangi biaya dengan memahami bisnis
                  pelanggan kami dengan lebih baik dan memenuhi persyaratan
                  rantai pasokan mereka. Berkat pengalaman kami selama
                  bertahun-tahun di bidang logistik, kami dapat meningkatkan
                  kebutuhan logistik Anda
                </p>

                <p>
                  Kualitas dan fleksibilitas layanan pengiriman kami selalu
                  dijamin dengan harga yang bersaing, menggaris bawahi komitmen
                  kami terhadap kualitas dan fleksibilitas. Dengan memiliki
                  jaringan nasional, kami dapat memenuhi permintaan lokal, dan
                  memahami berbagai peraturan adat dan administratif disetiap
                  provinsi
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="tw-max-w-6xl tw-mx-auto tw-my-20 xl:tw-px-0 tw-px-8">
          <div class="tw-grid md:tw-grid-cols-2 tw-items-center tw-gap-20">
            <div class="tw-space-y-4 tw-mt-10">
              <div class="tw-text-4xl tw-font-semibold text-secondary">
                VISI <br />
              </div>
              <p>
                Menjadi perusahaan transportasi yang kompetitif dan transparan
                dengan memprioritaskan kepuasan dan kenyamanan pelanggan
              </p>
            </div>
            <div class="tw-space-y-4 tw-mt-10">
              <div class="tw-text-4xl tw-font-semibold text-primary">
                MISI <br />
              </div>
              Pengembangan dan implementasi strategi dan program yang akan
              memastikan:
              <ul class="tw-list-disc">
                <li>Professional dalam operasi</li>
              </ul>
              <ul class="tw-list-disc">
                <li>Pemanfaatan keunggulan kompetitif secara maksimal</li>
              </ul>
              <ul class="tw-list-disc">
                <li>Kesejahteraan kepada karyawan</li>
              </ul>
            </div>
          </div>
          <div class="text-secondary">
            <div class="text-bold">
              Keamanan dan prioritas
              <div class="tw-font-normal tw-text-xs">
                Keselamatan karyawan dan klien kami adalah prioritas nomor satu
                kami sebagai perusahaan yang bertanggung jawab dan akuntabel.
              </div>
              Intergritas
              <div class="tw-font-normal tw-text-xs">
                Kepercayaan adalah dasar kami membangun reputasi. Dengan terus
                mengedepankan kejujuran, integritas, dan keandalan, kita
                mematuhi standar moral dan etika tertinggi.
              </div>
              Inovasi
              <div class="tw-font-normal tw-text-xs">
                Perusahaan kami menantang cara - cara standar dalam melakukan
                sesuatu di industri logistik dan mengembangkan cara - cara baru
                dan inovatif untuk memenuhi kebutuhan klien kami.
              </div>
            </div>
          </div>
        </div>
        <div class="tw-mt-20 bg-secondary tw-py-10 text-white">
          <div class="tw-max-w-6xl tw-mx-auto xl:tw-px-0 tw-px-8 tw-space-y-4">
            <h1 class="tw-text-2xl tw-font-bold">
              Hubungi tim sales kami, isi form di bawah ini
            </h1>
            <div class="tw-grid md:tw-grid-cols-2 tw-gap-6">
              <q-form class="tw-space-y-6">
                <q-input
                  filled
                  bg-color="white"
                  label="Kebutuhan Bisnis Anda"
                />
                <q-select filled bg-color="white" label="No Hp Anda" />
                <q-select filled bg-color="white" label="Kota" />
                <q-btn
                  unelevated
                  no-caps
                  class="bg-white text-secondary tw-float-right"
                  label="Kirim"
                />
                <div class="tw-clear-right"></div>
              </q-form>
              <div>
                <q-card flat class="tw-w-full">
                  <q-card-section
                    class="tw-text-secondary"
                    vertical
                    align="center"
                  >
                    <p class="tw-font-bold tw-text-lg">
                      Sales Kami akan segera menghubungin Anda
                    </p>
                    <p class="tw-font-bold tw-text-3xl tex">Rp. 000.000.000</p>
                    <p class="text-grey">Ceritakan Kebutuhan Anda</p>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>
        </div>
        <div class="tw-space-y-4 tw-pb-20 bg-secondary">
          <div class="tw-flex tw-flex-col tw-items-center tw-gap-10 tw-mx-auto">
            <p class="tw-text-3xl tw-font-semibold text-white">
              Sudah Sampai Mana Pengirimanmu?
            </p>
            <q-input
              style="width: 1000px"
              filled
              v-model="text"
              label="Masukkan Kode Transaksi"
              class="bg-white"
            />
          </div>
        </div>
      </div>
      <div
        class="tw-absolute tw-top-[60rem] tw-left-[-10px] xl:tw-block tw-hidden"
      >
        <q-avatar size="55px" class="tw-h-full" square>
          <q-img src="~assets/kotak-primary.svg" />
        </q-avatar>
      </div>
      <div class="tw-absolute tw-right-0 tw-top-[80rem] xl:tw-block tw-hidden">
        <q-avatar size="65px" class="tw-h-full" square>
          <q-img src="~assets/kotak-secondary.svg" />
        </q-avatar>
      </div>
    </div>
    <BeritaInfo :data="articles" />
    <CoverageComp />
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
// import BeritaInfo from 'src/components/BeritaInfo.vue';
// import CoverageComp from '../components/CoverageComp.vue';
import Slider from 'src/components/Slider.vue';

export default defineComponent({
  components: { Slider },
  name: 'IndexPage',
  setup() {
    return {
      articles: ref([]),
    };
  },
  mounted() {
    this.getArticle();
  },
  methods: {
    getArticle() {
      this.$api
        .get('/articles?size=-1?&filters=["category_id", "3"]')
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
