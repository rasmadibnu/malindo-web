<template>
  <q-layout view="hHh LpR fff">
    <q-header reveal class="tw-bg-transparent text-white" @reveal="closeMenu">
      <div class="md:tw-h-4 lg:tw-h-1 tw-h-2" @mouseenter="closeMenu"></div>
      <q-toolbar
        class="tw-shadow-md tw-flex tw-justify-between xl:tw-px-0 tw-px-8"
      >
        <div class="lg:tw-block tw-hidden tw-max-w-6xl xl:tw-mx-auto tw-w-full">
          <div class="tw-flex tw-gap-4 tw-py-2 tw-items-center">
            <div>
              <img
                src="~assets/malindowhite.png"
                style="width: auto; height: 30px"
              />
            </div>
            <div>
              <template v-for="menu in menus" :key="menu.id">
                <q-btn
                  v-if="menu.is_header && menu.child.length > 0"
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
                <q-btn
                  v-else
                  no-caps
                  :label="menu.label"
                  :href="menu.to"
                  flat
                />
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

    <q-page-container class="!tw-pt-0">
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
          <div class="md:tw-flex tw-gap-6 md:tw-justify-between">
            <div>
              <a class="tw-flex tw-items-center">
                <span
                  class="tw-self-center tw-text-3xl tw-font-semibold tw-whitespace-nowrap dark:tw-text-white"
                  >Malindo <span class="text-primary">Sarana</span
                  ><br />Logistic</span
                >
              </a>
              <q-avatar square size="150px">
                <q-img src="~assets/malindowhite.png" style="width: 100%" />
              </q-avatar>
            </div>
            <div class="tw-mb-6 md:tw-mb-0">
              <div class="tw-grid md:tw-grid-cols-2 tw-gap-4 tw-text-left">
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
                <div class="tw-w-10/12 tw-px-3 tw-text-left">
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
                <span>Privacy Policy</span>
              </a>
              <a
                href="#"
                class="tw-hover:text-gray-900 dark:tw-hover:text-white tw-ms-5"
              >
                <span>Terms & Condition</span>
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
    to: '#contactus',
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
