<template>
  <q-layout view="hHh LpR fff">
    <q-header class="bg-white text-black" @reveal="closeMenu">
      <div class="md:tw-h-4 lg:tw-h-1 tw-h-2" @mouseenter="closeMenu"></div>
      <q-toolbar
        class="tw-shadow-md tw-flex tw-justify-between xl:tw-px-0 tw-px-8"
      >
        <div class="lg:tw-block tw-hidden tw-max-w-6xl xl:tw-mx-auto tw-w-full">
          <q-avatar square size="80px" class="tw-mr-6">
            <img src="~assets/malindo.png" />
          </q-avatar>

          <template v-for="menu in menus" :key="menu.id">
            <q-btn
              v-if="menu.is_header"
              class="tw-mt-3"
              no-caps
              flat
              @mouseover="expandMenu(menu.id)"
              @click="expandMenu(menu.id)"
              :label="menu.label"
              :to="{ name: menu.to ? menu.to : '#' }"
            >
              <q-menu
                v-if="menu.is_header && menu.child.length > 0"
                square
                v-model="expanded_menu[menu.id]"
                @mouseover="expanded_menu[menu.id] = true"
                @mouseleave="expanded_menu[menu.id] = false"
              >
                <q-list>
                  <q-item
                    v-for="menu_child in menu.child"
                    :key="menu_child.id"
                    clickable
                    v-ripple
                    :to="{
                      name: menu_child.to ? menu_child.to : '#',
                    }"
                  >
                    <q-item-section>
                      <q-item-label>{{ menu_child.label }}</q-item-label>
                      <q-item-label v-if="menu_child.description" caption>{{
                        menu_child.description
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </template>
        </div>
        <q-btn
          class="lg:tw-hidden tw-block"
          flat
          icon="menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-separator />
        <q-btn label="Login" no-caps flat :to="'/login'" />
        <!-- <div
          class="tw-flex tw-items-center tw-space-x-2"
          @mouseenter="closeMenu"
        >
          <div class="tw-rounded-full tw-bg-gray-100 md:tw-p-3 tw-space-x-2">
            <q-btn-toggle
              unelevated
              v-model="mode"
              no-caps
              rounded
              size="sm"
              toggle-color="primary"
              :options="[
                { label: 'Personal', value: 'personal' },
                { label: 'Bisnis', value: 'buisness' },
              ]"
            />
          </div>
        </div> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :width="300"
      :breakpoint="500"
      overlay
      bordered
    >
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="menu in menus" :key="menu.id">
            <q-item
              v-if="menu.is_header && menu.child.length <= 0"
              clickable
              v-ripple
              :to="{ name: menu.to ? menu.to : '#' }"
            >
              <q-item-section>{{ menu.label }}</q-item-section>
            </q-item>
            <template v-else>
              <q-separator spaced />
              <q-item-label header>{{ menu.label }}</q-item-label>
              <q-item
                v-for="menu_child in menu.child"
                :key="menu_child.label"
                clickable
                v-ripple
                :to="{
                  name: menu_child.to ? menu_child.to : '#',
                }"
              >
                <q-item-section>
                  <q-item-label>{{ menu_child.label }}</q-item-label>
                  <q-item-label v-if="menu_child.description" caption>{{
                    menu_child.description
                  }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer
      class="bg-primary text-white tw-text-center lg:tw-text-left tw-bg-gray-100 tw-text-gray-600 tw-z-40"
    >
      <div
        class="tw-py-10 tw-text-center md:tw-grid tw-grid-cols-12 md:tw-text-left tw-max-w-6xl tw-space-y-4 tw-my-2 tw-mx-auto xl:tw-px-0 tw-px-8"
      >
        <div class="tw-col-span-4">
          <div class="tw-space-y-4">
            <q-avatar square size="100px">
              <img src="~assets/logowhite.png" />
            </q-avatar>
          </div>
        </div>
        <div class="md:tw-grid tw-grid-cols-3 tw-col-span-8 tw-gap-4">
          <div>
            <h6
              class="tw-font-semibold tw-mb-4 tw-flex tw-justify-center md:tw-justify-start"
            >
              Menu
            </h6>
            <template v-for="menu in menus" :key="menu.id">
              <q-btn
                v-if="menu.is_header && menu.child.length <= 0"
                no-caps
                dense
                color="white"
                :label="menu.label"
                flat
                :to="{ name: menu.to ? menu.to : '#' }"
                class="tw-flex tw-w-full md:tw-items-start"
              />
              <q-btn
                v-else
                no-caps
                dense
                color="white"
                :label="menu.label"
                flat
                class="tw-flex tw-flex-col tw-w-full md:tw-items-start"
              >
                <q-menu>
                  <q-list style="min-width: 100px">
                    <q-item
                      v-for="menu_child in menu.child"
                      :key="menu_child.id"
                      clickable
                      v-ripple
                      :to="{
                        name: menu_child.to ? menu_child.to : '#',
                      }"
                    >
                      <q-item-section>
                        <q-item-label>{{ menu_child.label }}</q-item-label>
                        <q-item-label v-if="menu_child.description" caption>{{
                          menu_child.description
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </template>
            <!-- <p class="tw-mb-4">
              <a href="#!" class="tw-text-gray-100">Tentang SMART</a>
            </p>
            <p class="tw-mb-4">
              <a href="#!" class="tw-text-gray-100">Fitur</a>
            </p>
            <p class="tw-mb-4">
              <a href="#!" class="tw-text-gray-100">Karir</a>
            </p>
            <p class="tw-mb-4">
              <a href="#!" class="tw-text-gray-100">Bantuan</a>
            </p> -->
          </div>
          <div>
            <h6
              class="tw-font-semibold tw-mb-4 tw-flex tw-justify-center md:tw-justify-start"
            >
              Lokasi
            </h6>
            <p>
              Perumahan Bukit Katulistiwa Blok K No 37 Kel. Berua Kec.
              Biringkanaya Makassar
            </p>
          </div>
          <div>
            <h6
              class="tw-font-semibold tw-mb-4 tw-flex tw-justify-center md:tw-justify-start"
            >
              Kontak Kami
            </h6>
            <p
              class="tw-flex tw-items-center tw-justify-center md:tw-justify-start tw-mb-4"
            >
              WhatsApp :0853-9990-0855<br />
              Email : Malindosaranalogistic@gmail.com<br />
              Instagram : @Malindo<br />
              Facebook : Malindo<br />
              Tiktok : @Malindo
            </p>
          </div>
        </div>
      </div>
      <!-- <div class="tw-flex tw-justify-end">
        <q-btn
          class="tw-mx-8"
          size="sm"
          round
          color="primary"
          icon="expand_less"
          @click="goToTop"
        />
      </div> -->
      <div
        class="tw-max-w-6xl tw-my-2 tw-mx-auto tw-space-x-12 xl:tw-px-0 tw-px-8"
      >
        <span>© <i>Malindosaranalogistic</i></span>
        <a href="!#">Kebijakan Privasi</a>
        <a href="!#">Syarat dan Ketentuan</a>
      </div>
    </q-footer>
    <transition
      appear
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <div
        v-show="scroll > 500"
        class="tw-fixed tw-right-0 tw-bottom-0 tw-p-4 tw-z-50"
        transition-show="jump-down"
        transition-hide="jump-up"
      >
        <q-btn
          @click="goToTop"
          round
          color="primary"
          icon="keyboard_arrow_up"
        />
      </div>
    </transition>
  </q-layout>
</template>
<style>
html {
  scroll-behavior: smooth;
}
</style>
<script>
import { defineComponent, ref } from 'vue';

const menus = [
  {
    id: '1',
    label: 'Home',
    description: '',
    child: [],
    is_header: true,
    to: 'home',
  },
  {
    id: '2',
    label: 'Services',
    child: [
      // {
      //     id: '3',
      //     label: 'Pengajuan Kredit',
      //     description: 'Produk dengan jaminan BPKB Motor dan BPKB Mobil',
      //     child: [],
      //     is_header: false,
      //     to: 'product',
      // },
      // {
      //     id: '4',
      //     label: 'Cek Status Pengajuan',
      //     description: 'Status progress pengajuan online anda',
      //     child: [],
      //     is_header: false,
      //     to: 'submission-check',
      // },
      // {
      //     id: '5',
      //     label: 'Cek Kontrak',
      //     description:
      //         'Sisa angsuran dan tenor anda di SMART Multifinance',
      //     child: [],
      //     is_header: false,
      //     to: 'contract-check',
      // },
      {
        id: '6',
        label: 'Pengangkutan Darat',
        description: 'Pilih Jenis Angkutan Darat',
        child: [],
        is_header: false,
        to: 'paymentmethod',
      },
      {
        id: '7',
        label: 'Pengangkutan Udara',
        description: 'Pilih Maskapai Penerbangan',
        child: [],
        is_header: false,
        to: 'faq',
      },
      {
        id: '8',
        label: 'Pengangkutan Laut',
        description: 'Operator Maritim',
        child: [],
        is_header: false,
        to: 'network',
      },
      {
        id: '8',
        label: 'Layanan Asuransi',
        description: '',
        child: [],
        is_header: false,
        to: 'network',
      },
      {
        id: '8',
        label: 'Bea Cukai',
        description: '',
        child: [],
        is_header: false,
        to: 'network',
      },
      {
        id: '8',
        label: 'Pergudangan & Penyimpanan',
        description: '',
        child: [],
        is_header: false,
        to: 'network',
      },
    ],
    is_header: true,
    to: '',
  },
  {
    id: '9',
    label: 'Tracking',
    child: [
      // {
      //     id: '13',
      //     label: 'Info & Berita',
      //     description: 'Anda dapat melihat informasi terbaru dari kami',
      //     child: [],
      //     is_header: false,
      //     to: 'newsinfo',
      // },
      // {
      //     id: '14',
      //     label: 'Promo Berlangsung',
      //     description: 'Dapat cashback dan Gift jika pengajuan online',
      //     child: [],
      //     is_header: false,
      //     to: 'promo',
      // },
      // {
      //     id: '15',
      //     label: 'Serba Mulia Group',
      //     description:
      //         'SMART Multifinance merupakan bagian dari Serba Mulia Group',
      //     child: [],
      //     is_header: false,
      //     to: '',
      // },
    ],
    is_header: true,
    to: '',
  },
  // {
  //     id: '16',
  //     label: 'Karir',
  //     description: '',
  //     child: [],
  //     is_header: true,
  //     to: 'karir',
  // },
  {
    id: '17',
    label: 'About Us',
    description: '',
    child: [
      {
        id: '10',
        label: 'Company Profile',
        description: 'Perusahaan, Visi & Misi, Our Value',
        child: [],
        is_header: false,
        to: 'companyprofile',
      },
    ],
    is_header: true,
    to: '',
  },
  {
    id: '19',
    label: 'Contact Us',
    description: '',
    child: [
      {
        id: '20',
        label: 'Pengaduan',
        description:
          'Anda dapat memberikan pengaduan terkait proses yang berlangsung',
        child: [],
        is_header: false,
        to: 'help',
      },
    ],
    is_header: true,
    to: '',
  },
];

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      mode: ref('personal'),
      expanded_menu: ref([]),
      scroll: ref(0),
      menus,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  methods: {
    goToTop() {
      window.scrollTo(0, 0);
    },
    onScroll(e) {
      this.scroll = e.srcElement.scrollingElement.scrollTop;
    },
    expandMenu(menu) {
      this.expanded_menu[menu] = true;
      this.menus
        .filter((e) => {
          return e.is_header && e.child.length > 0;
        })
        .forEach((e) => {
          if (e.id != menu) {
            this.expanded_menu[e.id] = false;
          }
        });
    },
    closeMenu() {
      this.menus
        .filter((e) => {
          return e.is_header && e.child.length > 0;
        })
        .forEach((e) => {
          this.expanded_menu[e.id] = false;
        });
    },
  },
});
</script>
