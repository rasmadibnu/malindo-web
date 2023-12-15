<script lang="ts" setup>
import { ref } from 'vue';
import { Notify } from 'quasar';
import InputTextField from 'components/form/InputTextField.vue';
import Btn from 'components/ui/Button.vue';
import { api } from 'boot/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { useAuthStore } from 'src/stores/auth';
import { useRouter } from 'vue-router';
import { required } from 'src/utils/validators';

const authStore = useAuthStore();
const router = useRouter();
const payload = ref<{
  username: string;
  password: string;
}>({
  username: '',
  password: '',
});
const is_pwd = ref<boolean>(false);
const loading = ref<boolean>(false);

const login = () => {
  loading.value = true;
  api
    .post('/auth/login', { ...payload.value })
    .then((res: AxiosResponse) => {
      loading.value = false;
      localStorage.setItem('token', res.data.data);
      authStore.token = res.data.data;
      authStore.getUser();
      router.push({ name: 'dashboard' });
    })
    .catch((err: AxiosError) => {
      var message;
      if (err?.response?.status == 404) {
        message = 'ID atau Password salah';
      } else {
        message = err?.message;
      }
      loading.value = false;
      Notify.create({ message: message, color: 'negative' });
    });
};
</script>
<template>
  <q-img src="~assets/bigbg4.svg" class="tw-h-screen">
    <div class="absolute-full text-subtitle2 flex-center">
      <div class="tw-flex tw-gap-4 tw-items-center">
        <q-btn
          no-caps
          unelevated
          :to="{ name: 'home' }"
          icon="chevron_left"
          label="Home"
        />
      </div>
      <div
        class="tw-flex md:tw-justify-between tw-justify-center tw-items-center tw-h-full md:tw-flex-row tw-flex-col tw-max-w-6xl tw-mx-auto xl:tw-px-0 tw-px-8"
      >
        <div
          class="tw-text-4xl tw-hidden md:tw-block tw-py-10 tw-font-extrabold"
        >
          Welcome to <br />
          MALINDO SARANA LOGISTIC
        </div>
        <div>
          <q-card
            class="md:tw-w-96 tw-w-full tw-p-5 tw-shadow-xl tw-my-auto text-bold tw-text-sm text-dark tw-rounded-xl"
          >
            <q-avatar
              class="tw-absolute tw-right-0 tw-top-0"
              square
              size="100px"
            >
              <q-img src="~assets/head.png" />
            </q-avatar>
            <q-card-section class="tw-text-sm">
              <q-img src="~assets/malindo.png" style="width: 50%" />
              <div class="tw-mt-4">
                Selamat Datang di<br />
                Malindo Sarana Logistik
              </div>
            </q-card-section>
            <q-card-section>
              <q-form @submit.prevent="login" class="tw-space-y-2">
                <InputTextField
                  toplabel="Username"
                  filled
                  :rules="[required]"
                  v-model="payload.username"
                />

                <InputTextField
                  :rules="[required]"
                  filled
                  :type="is_pwd ? 'text' : 'password'"
                  v-model="payload.password"
                  toplabel="Password"
                >
                  <template #append>
                    <q-btn
                      flat
                      round
                      :icon="is_pwd ? 'eva-eye-outline' : 'eva-eye-off-outline'"
                      @click="is_pwd = !is_pwd"
                    />
                  </template>
                </InputTextField>
                <Btn
                  type="submit"
                  class="tw-bg-primary hover:!tw-bg-secondary tw-transition-all tw-w-full"
                  label="Log-in"
                />
                <div class="tw-flex tw-justify-end">
                  <!-- <q-btn
                    no-caps
                    align="left"
                    dense
                    flat
                    unelevated
                    :to="{ name: 'home' }"
                    icon="arrow_back"
                    class="tw-w-full tw-shadow-none"
                    color="primary"
                    label="Kembali"
                  /> -->
                  <div>
                    <q-btn
                      no-caps
                      align="right"
                      dense
                      flat
                      unelevated
                      class="tw-w-full tw-shadow-none"
                      color="primary"
                      label="Lupa Password?"
                    />
                  </div>
                </div>
              </q-form>
            </q-card-section>
          </q-card>
          <span
            >Tidak memiliki akun?
            <q-btn
              class="tw-font-semibold"
              no-caps
              align="left"
              dense
              :to="{ name: 'register' }"
              flat
              unelevated
              label="Daftar Sekarang"
            />
          </span>
        </div>
      </div>
    </div>
  </q-img>
</template>
