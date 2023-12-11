<script lang="ts" setup>
import { ref } from 'vue';
import { Notify } from 'quasar';
import InputTextField from 'components/form/InputTextField.vue';
import Btn from 'components/ui/Button.vue';
import { api } from 'boot/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { useAuthStore } from 'src/stores/auth';
import { useRouter } from 'vue-router';
import { required, match, email } from 'src/utils/validators';

const authStore = useAuthStore();
const router = useRouter();
const payload = ref<{
  username: string;
  password: string;
  email: string;
  phone_number: string;
  konfirmasi_password: string;
}>({
  username: '',
  password: '',
  email: '',
  phone_number: '',
  konfirmasi_password: '',
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
  <q-layout class="tw-bg-[#F8F7FA]">
    <q-page-container>
      <q-page class="tw-flex tw-items-center tw-justify-center tw-h-screen">
        <div class="tw-flex-auto md:tw-block tw-hidden tw-w-80 tw-px-20">
          <q-img src="~assets/heavy-box.svg" />
        </div>

        <div
          class="tw-flex-auto tw-flex tw-px-4 md:tw-px-0 tw-flex-col tw-w-20 tw-h-screen tw-items-center tw-bg-white"
        >
          <q-avatar
            size="200px"
            square
            class="tw-absolute tw-top-0 tw-right-64"
          >
            <q-img src="~assets/auth-v1-top-shape.svg" no-spinner />
          </q-avatar>
          <q-avatar
            size="200px"
            square
            class="tw-absolute -tw-bottom-0 -tw-right-0"
          >
            <q-img src="~assets/auth-v1-bottom-shape.svg" no-spinner />
          </q-avatar>

          <q-card class="tw-w-11/12 tw-p-4 tw-shadow-lg tw-my-auto">
            <q-card-section>
              <p class="tw-font-bold tw-text-xl">Buat akun pribadi</p>
              <p>Daftar dan menjadi bagian dari kami 🤝</p>
            </q-card-section>
            <q-card-section>
              <q-form
                @submit.prevent="login"
                class="tw-gap-4 tw-grid tw-grid-cols-2"
              >
                <InputTextField
                  :autofocus="true"
                  toplabel="Nama"
                  :rules="[required]"
                  v-mode
                />
                <InputTextField
                  toplabel="Username"
                  :rules="[required]"
                  v-model="payload.username"
                />
                <InputTextField
                  :rules="[required, email]"
                  toplabel="E-Mail"
                  v-model="payload.email"
                />
                <InputTextField
                  :rules="[required]"
                  toplabel="No. Telp"
                  mask="#"
                  reverse-fill-mask
                  v-model="payload.phone_number"
                />
                <InputTextField
                  :rules="[required]"
                  :type="is_pwd ? 'text' : 'password'"
                  toplabel="Password"
                  v-model="payload.password"
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
                <InputTextField
                  :rules="[
                    required,
                    (val) => payload.password && match(val, payload.password),
                  ]"
                  type="password"
                  toplabel="Konfirmasi Password"
                  v-model="payload.konfirmasi_password"
                />

                <Btn
                  type="submit"
                  class="tw-w-full tw-col-span-2"
                  color="primary"
                  label="Daftar"
                />
                <div class="tw-flex tw-col-span-2 tw-justify-between">
                  <q-btn
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
                  />
                  <q-btn
                    no-caps
                    align="right"
                    dense
                    flat
                    unelevated
                    class="tw-w-full tw-shadow-none"
                    color="primary"
                    :to="{ name: 'login' }"
                    label="Sudah punya akun?"
                  />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
