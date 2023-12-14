<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from 'src/stores/auth';

const auth = useAuthStore();
const profile_img = process.env.VITE_ASSET_URL;

const tab = ref('ongoing');
</script>
<template>
  <q-layout>
    <q-page-container>
      <q-page class="tw-max-w-md tw-mx-auto tw-shadow-xl">
        <div class="tw-py-5 tw-mx-auto xl:tw-px-0 tw-px-4">
          <img src="~assets/malindo.png" style="width: auto; height: 30px" />
          <q-card class="tw-shadow-md tw-rounded-xl">
            <q-item>
              <q-item-section avatar>
                <q-avatar size="70px">
                  <img :src="profile_img + '/driver/' + auth.driver?.photo" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                Hallo,
                <q-item-label class="tw-font-semibold">{{
                  auth.user?.name
                }}</q-item-label>
                <q-item-label caption>{{ auth.user?.username }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-card>
          <div
            class="tw-grid tw-grid-cols-4 tw-gap-4 text-primary tw-py-10 tw-px-3"
          >
            <q-btn>
              <q-avatar>
                <img src="~assets/2.png" />
              </q-avatar>
            </q-btn>
            <q-btn>
              <q-avatar>
                <img src="~assets/5.png" />
              </q-avatar>
            </q-btn>
            <q-btn>
              <q-avatar>
                <img src="~assets/8.png" />
              </q-avatar>
            </q-btn>
            <q-btn>
              <q-avatar>
                <img src="~assets/10.png" />
              </q-avatar>
            </q-btn>
          </div>
        </div>
        <q-card class="tw-rounded-t-3xl tw-h-full" flat>
          <q-tabs
            v-model="tab"
            dense
            class="text-grey tw-mt-4"
            active-color="primary"
            indicator-color="primary"
            align="justify"
          >
            <q-tab name="ongoing" label=" Berjalan" />
            <q-tab name="finish" label="Selesai" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="ongoing">
              <q-list separator>
                <q-item clickable v-ripple>
                  <q-item-section>Single line item</q-item-section>
                </q-item>

                <q-item clickable v-ripple>
                  <q-item-section>
                    <q-item-label>Item with caption</q-item-label>
                    <q-item-label caption>Caption</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-ripple>
                  <q-item-section>
                    <q-item-label overline>OVERLINE</q-item-label>
                    <q-item-label>Item with caption</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>

            <q-tab-panel name="finish">
              <div class="text-h6">Selesai</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
        <div class="tw-flex tw-gap-4 tw-items-center">
          <q-btn
            no-caps
            unelevated
            :to="{ name: 'home' }"
            icon="chevron_left"
            label="Home"
          />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
