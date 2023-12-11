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
  <q-img src="~assets/bg.svg" class="tw-h-screen">
    <div class="absolute-full text-subtitle2 flex-center">
      <div class="tw-flex tw-items-center">
        <q-btn
          no-caps
          dense
          unelevated
          :to="{ name: 'home' }"
          rounded
          color="primary"
          padding="sm sm"
          icon="arrow_back"
        />

        <div class="text-bold">Home</div>
      </div>
      <div
        class="tw-flex tw-justify-between tw-max-w-6xl tw-mx-auto xl:tw-px-0 tw-px-8"
      >
        <div class="tw-text-4xl tw-py-10 tw-font-extrabold">
          Welcome to <br />
          MALINDO
        </div>
        <div class="text-h6 text-secondary">
          <div
            class="tw-flex-auto tw-flex tw-px-4 md:tw-px-0 tw-items-center tw-bg-white"
          >
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
                        :icon="
                          is_pwd ? 'eva-eye-outline' : 'eva-eye-off-outline'
                        "
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
        </div>
      </div>
    </div>
  </q-img>
</template>
