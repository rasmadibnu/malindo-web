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
        <div class="text-h6">
          <q-btn
            no-caps
            align="left"
            dense
            :to="{ name: 'register' }"
            flat
            unelevated
            class="tw-w-full tw-shadow-none"
            label="Tidak memiliki akun?  Daftar Sekarang"
          />
          <q-card
            class="md:tw-w-96 tw-w-full tw-p-5 tw-shadow-xl tw-my-auto text-bold tw-text-sm text-dark tw-rounded-xl"
          >
            <q-card-section class="tw-text-sm tw-py-10">
              <q-img src="~assets/malindo.png" style="width: 50%" />
            </q-card-section>
            <q-card-section>
              Please sign in to your account.
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
                <div class="tw-flex tw-justify-between">
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
                    :to="{ name: 'register' }"
                    flat
                    unelevated
                    class="tw-w-full tw-shadow-none"
                    color="primary"
                    label="Lupa Password?"
                  />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-img>
</template>
