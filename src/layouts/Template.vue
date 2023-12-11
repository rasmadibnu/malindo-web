<template>
  <q-layout view="hHh LpR fff">
    <q-header reveal class="bg-white text-black" @reveal="closeMenu">
      <div class="md:tw-h-4 lg:tw-h-1 tw-h-2" @mouseenter="closeMenu"></div>
      <q-toolbar
        class="tw-shadow-md tw-flex tw-justify-between xl:tw-px-0 tw-px-8"
      >
        <div class="lg:tw-block tw-hidden tw-max-w-6xl xl:tw-mx-auto tw-w-full">
          <div class="tw-flex tw-gap-4 tw-py-2 tw-items-center">
            <div>
              <img
                src="~assets/malindo.png"
                style="width: 130px; height: 50px"
              />
            </div>
            <div>
              <template v-for="menu in menus" :key="menu.id">
                <q-btn
                  v-if="menu.is_header"
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
            <q-space />
            <div class="tw-flex tw-gap-2">
              <q-btn
                unelevated
                color="primary"
                label="Login"
                no-caps
                :to="'/login'"
                v-if="auth.token == null"
              />
              <q-separator v-if="auth.token == null" vertical />
              <q-btn
                unelevated
                color="primary"
                outline
                label="Register"
                no-caps
                :to="'/login'"
                v-if="auth.token == null"
              />
              <q-btn
                unelevated
                color="primary"
                label="Dashboard"
                no-caps
                :to="'/dashboard'"
                v-else
              />
            </div>
          </div>
        </div>
        <div class="lg:tw-hidden tw-w-full tw-flex tw-items-center">
          <q-btn flat icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" />
          <div>Malindo Sarana</div>
          <q-space />
          <q-btn
            unelevated
            color="primary"
            flat
            dense
            label="Login"
            no-caps
            :to="'/login'"
            v-if="auth.token == null"
          />
          <q-btn
            unelevated
            color="primary"
            label="Dashboard"
            no-caps
            flat
            :to="'/dashboard'"
            v-else
          />
        </div>
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
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn
          fab
          color="green-5"
          href="https://wa.me/6285399900855"
          target="_blank"
        >
          <q-avatar rounded size="md">
            <q-img src="~assets/whatsapp-128.png" />
          </q-avatar>
        </q-btn>
      </q-page-sticky>
    </q-page-container>

    <q-footer
      class="bg-primary text-white tw-text-center lg:tw-text-left tw-bg-gray-100 tw-text-gray-600 tw-z-40"
    >
      <div id="contact" class="bg-secondary tw-text-white">
        <div
          class="tw-max-w-6xl tw-py-10 tw-mx-auto tw-space-y-6 xl:tw-px-0 tw-px-8"
        >
          <div class="md:tw-flex md:tw-justify-between">
            <q-avatar square size="150px">
              <q-img src="~assets/malindowhite.png" style="width: 100%" />
            </q-avatar>
            <div class="tw-mb-6 md:tw-mb-0">
              <a class="tw-flex tw-items-center">
                <span
                  class="tw-self-center tw-text-2xl tw-font-semibold tw-whitespace-nowrap dark:tw-text-white"
                  >Malindo
                  <span class="text-primary">Sarana</span> Logistic</span
                >
              </a>
              <div class="tw-grid md:tw-grid-cols-2 tw-gap-4">
                <q-list>
                  <!-- <q-item>
                      <q-item-section avatar>
                        <q-icon color="primary" name="o_phone_in_talk" />
                      </q-item-section>
                      <q-item-section>048484148</q-item-section>
                    </q-item> -->
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="primary" name="smartphone" />
                    </q-item-section>
                    <q-item-section>0853-9990-0855</q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="primary" name="alternate_email" />
                    </q-item-section>
                    <q-item-section class="tw-lowercase"
                      >malindosaranalogistic@gmail.com</q-item-section
                    >
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="primary" name="mail" />
                    </q-item-section>
                    <q-item-section class="tw-lowercase"
                      >malindosarana.com</q-item-section
                    >
                  </q-item>
                </q-list>
                <div class="tw-w-10/12 tw-px-3">
                  <q-icon
                    name="pin_drop"
                    class="tw-mb-2"
                    color="primary"
                    size="md"
                  /><br />
                  PERUMAHAN BUKIT KATULISTIWA BLOK K NO 37 KEL. BERUA, KEC
                  BIRINGKANAYA, MAKASSAR.
                  <q-input
                    dense
                    bg-color="white"
                    filled
                    class="tw-mt-2"
                    placeholder="E-Mail"
                  >
                    <template #after>
                      <q-btn icon="send" color="primary" />
                    </template>
                  </q-input>
                </div>
              </div>
            </div>
            <div
              class="tw-grid tw-grid-cols-2 tw-gap-8 sm:tw-gap-6 sm:tw-grid-cols-3"
            >
              <div>
                <h2
                  class="tw-mb-6 tw-text-sm tw-font-semibold tw-text-gray-900 tw-uppercase dark:tw-text-white"
                >
                  Menu
                </h2>
                <ul class="dark:tw-text-gray-400 tw-font-medium">
                  <li class="tw-mb-4">
                    <a href="#service" class="tw-hover:underline">Service</a>
                  </li>
                  <li class="tw-mb-4">
                    <a href="#about" class="tw-hover:underline">About</a>
                  </li>
                  <li class="tw-mb-4">
                    <a href="#client" class="tw-hover:underline">Client</a>
                  </li>
                </ul>
              </div>
              <div>
                <h2
                  class="tw-mb-6 tw-text-sm tw-font-semibold tw-text-gray-900 tw-uppercase dark:tw-text-white"
                >
                  &nbsp;
                </h2>
                <ul class="dark:tw-text-gray-400 tw-font-medium">
                  <li class="tw-mb-4">
                    <a href="#facility" class="tw-hover:underline">Facility</a>
                  </li>
                  <li class="tw-mb-4">
                    <a href="#strategy" class="tw-hover:underline">Strategy</a>
                  </li>
                  <li class="tw-mb-4">
                    <a href="#contact" class="tw-hover:underline">Contact Us</a>
                  </li>
                </ul>
              </div>
              <div>
                <h2
                  class="tw-mb-6 tw-text-sm tw-font-semibold tw-text-gray-900 tw-uppercase dark:tw-text-white"
                >
                  &nbsp;
                </h2>
                <ul class="dark:tw-text-gray-400 tw-font-medium">
                  <li class="tw-mb-4">
                    <a href="#" class="tw-hover:underline">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#" class="tw-hover:underline"
                      >Terms &amp; Conditions</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr
            class="tw-my-6 tw-border-gray-200 sm:tw-mx-auto dark:tw-border-gray-700 tw-lg:my-8"
          />
          <div class="sm:tw-flex sm:tw-items-center sm:tw-justify-between">
            <span class="tw-text-sm sm:tw-text-center dark:tw-text-gray-400"
              >© 2023
              <a href="https://flowbite.com/" class="tw-hover:underline"
                >Malindo Sarana Logistics</a
              >. All Rights Reserved.
            </span>
            <div class="tw-flex tw-mt-4 sm:tw-justify-center sm:tw-mt-0">
              <a
                href="#"
                class="tw-hover:text-gray-900 dark:tw-hover:text-white"
              >
                <svg
                  class="tw-w-4 tw-h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 8 19"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="tw-sr-only">Facebook page</span>
              </a>
              <a
                href="#"
                class="tw-hover:text-gray-900 dark:tw-hover:text-white tw-ms-5"
              >
                <svg
                  class="tw-w-4 tw-h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 21 16"
                >
                  <path
                    d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z"
                  ></path>
                </svg>
                <span class="tw-sr-only">Discord community</span>
              </a>
              <a
                href="#"
                class="tw-hover:text-gray-900 dark:tw-hover:text-white tw-ms-5"
              >
                <svg
                  class="tw-w-4 tw-h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 17"
                >
                  <path
                    fill-rule="evenodd"
                    d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z"
                  ></path>
                </svg>
                <span class="tw-sr-only">Twitter page</span>
              </a>
              <a
                href="#"
                class="tw-hover:text-gray-900 dark:tw-hover:text-white tw-ms-5"
              >
                <svg
                  class="tw-w-4 tw-h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="tw-sr-only">GitHub account</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </q-footer>
    <!-- <transition
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
    </transition> -->
  </q-layout>
</template>
<style>
html {
  scroll-behavior: smooth;
}
</style>
<script>
import { defineComponent, ref } from 'vue';
import { useAuthStore } from 'src/stores/auth';
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
    child: [],
    is_header: true,
    to: '',
  },
  {
    id: '19',
    label: 'Contact Us',
    description: '',
    child: [],
    is_header: true,
    to: '',
  },
];

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const leftDrawerOpen = ref(false);

    const auth = useAuthStore();
    return {
      auth,
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
