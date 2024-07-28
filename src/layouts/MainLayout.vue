<script setup lang="ts">
import { ref, watch, onBeforeMount } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import { useAuthStore } from 'src/stores/auth';
import Btn from 'src/components/ui/Button.vue';
import { useRoute, useRouter } from 'vue-router';
import { Platform } from 'quasar';

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();

const logout_dialog = ref<boolean>();

const leftDrawerOpen = ref(false);

const isPinned = ref(true);
const miniState = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const logout = () => {
  localStorage.removeItem('token');
  auth.token = null;
  router.push({ name: 'home' });
};

watch(isPinned, () => {
  localStorage.setItem('isPinned', isPinned.value);
});

onBeforeMount(() => {
  if (localStorage.getItem('isPinned')) {
    isPinned.value = localStorage.getItem('isPinned') == 'true' ? true : false;
  } else {
    isPinned.value = true;
  }
  if (isPinned.value) {
    miniState.value = false;
  } else {
    miniState.value = true;
  }
});
</script>
<template>
  <q-layout view="lHh Lpr lFf" class="tw-bg-[#F8F7FA]">
    <q-drawer
      :mini="miniState"
      :mini-width="78"
      :width="270"
      v-model="leftDrawerOpen"
      show-if-above
      :persistent="Platform.is.mobile ? false : true"
      class="tw-px-4 tw-shadow-md tw-pb-20"
      :overlay="!isPinned"
      @mouseover="if (!isPinned) miniState = false;"
      @mouseout="if (!isPinned) miniState = true;"
    >
      <q-list>
        <q-item class="q-pa-none">
          <q-item-section
            avatar
            @click="router.push({ name: 'home' })"
            class="tw-cursor-pointer tw-pl-3"
          >
            <q-avatar :size="isPinned ? '30px' : '30px'" square>
              <q-img src="/favicon.ico" />
            </q-avatar>
          </q-item-section>

          <q-item-section
            class="tw-text-sm tw-font-extrabold tw-cursor-pointer"
            @click="router.push({ name: 'home' })"
            >Malindo Sarana</q-item-section
          >
          <q-item-section side>
            <q-btn
              dense
              flat
              size="sm"
              round
              :icon="
                isPinned ? 'radio_button_checked' : 'radio_button_unchecked'
              "
              @click="
                () => {
                  isPinned = !isPinned;
                  if (isPinned) {
                    miniState = false;
                  } else {
                    miniState = true;
                  }
                }
              "
            />
          </q-item-section>
        </q-item>

        <EssentialLink
          v-for="link in auth.menus"
          :key="link.id"
          v-bind="link"
          :route="route"
          :mini-state="miniState"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page class="tw-p-6" :class="isPinned || 'md:tw-ml-[78px]'">
        <q-card class="tw-shadow-md tw-mb-6">
          <q-card-section
            class="tw-flex tw-items-center tw-justify-between q-py-sm"
          >
            <div class="tw-flex tw-items-center">
              <div class="md:tw-hidden tw-block">
                <q-btn
                  @click="toggleLeftDrawer"
                  round
                  icon="menu"
                  flat
                  unelevated
                  dense
                />
                <q-btn round icon="search" flat unelevated dense />
              </div>
              <q-input
                class="tw-hidden md:tw-block"
                placeholder="Search..."
                dense
                flat
                borderless
              >
                <template #prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
            <div class="tw-space-x-1">
              <q-btn icon="eva-bell-outline" flat round>
                <q-badge color="red" rounded floating>4</q-badge>
                <q-menu>
                  <q-list style="min-width: 200px">
                    <q-separator />
                    <q-item clickable>
                      <q-item-section>
                        <q-item-label>ada pesan baru dari burhan</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-badge color="red" label="3" />
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <q-item-label>ada pesan baru dari lia</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-badge color="red" label="2" />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
              <q-btn round flat>
                <q-avatar
                  size="40px"
                  color="primary"
                  text-color="white"
                  icon="eva-person-outline"
                />
                <q-menu>
                  <q-list style="min-width: 200px">
                    <q-item>
                      <q-item-section avatar>
                        <q-avatar
                          size="40px"
                          color="primary"
                          text-color="white"
                          icon="eva-person-outline"
                        />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>{{ auth.user.name }}</q-item-label>
                        <q-item-label caption>
                          {{ auth.user.email }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable>
                      <q-item-section avatar>
                        <q-icon name="eva-person-outline" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Profile</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section avatar>
                        <q-icon name="eva-credit-card-outline" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Billing</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-badge color="red" label="3" />
                      </q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section avatar>
                        <q-icon name="eva-question-mark-circle-outline" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Faq</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator />

                    <q-item
                      clickable
                      class="text-red"
                      @click="logout_dialog = true"
                    >
                      <q-item-section avatar>
                        <q-icon name="eva-log-out-outline" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Logout</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </q-card-section>
        </q-card>
        <router-view />
        <!-- <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn fab icon="headset_mic" color="positive" />
        </q-page-sticky> -->
      </q-page>
    </q-page-container>
  </q-layout>
  <q-dialog v-model="logout_dialog">
    <q-card style="min-width: 400px" class="tw-p-2">
      <q-card-section>
        <div class="text-h6">Logout</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        Anda yakin ingin log-out dari aplikasi ini?
      </q-card-section>
      <q-card-actions align="right">
        <Btn
          label="Cancel"
          color="grey-3"
          text-color="grey"
          @click="
            () => {
              logout_dialog = false;
            }
          "
        />
        <Btn label="Logout" color="red-5" @click="logout" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
