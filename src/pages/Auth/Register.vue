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
  name: string;
  username: string;
  password: string;
  email: string;
  phone_number: string;
  konfirmasi_password: string;
}>({
  name: '',
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
    .post('/auth/register', { ...payload.value })
    .then((res: AxiosResponse) => {
      loading.value = false;
      return res.data.data;
    })
    .then((res) => {
      api.post('/auth/login', { ...payload.value }).then((res) => {
        localStorage.setItem('token', res.data.data);
        authStore.token = res.data.data;
        authStore.getUser();
        router.push({ name: 'home' });
      });
    })
    .catch((err: AxiosError) => {
      var message;
      if (err?.response?.status == 404) {
        message = 'ID atau Password salah';
      } else {
        console.log(err);
        message = err.response?.data?.message;
      }
      loading.value = false;
      Notify.create({ message: message, color: 'negative' });
    });
};
</script>
<template>
  <div
    style="
      overflow-y: hidden !important;
      overflow-x: hidden !important;
      background-image: url('bigbg4.png');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      box-shadow: rgba(36, 55, 99, 0.5) 0 0 0 1000000px inset;
    "
  >
    <div class="tw-flex tw-items-center tw-m-8">
      <q-btn
        text-color="white"
        no-caps
        unelevated
        :to="{ name: 'home' }"
        icon="chevron_left"
        label="Home"
      />
    </div>
    <div
      class="tw-flex tw-pb-10 md:tw-justify-between tw-justify-center tw-items-center tw-h-full md:tw-flex-row tw-flex-col tw-max-w-6xl tw-mx-auto xl:tw-px-0 tw-px-8"
    >
      <div
        class="tw-text-4xl text-white tw-hidden md:tw-block tw-py-10 tw-font-extrabold"
      >
        Welcome to <br />
        MALINDO SARANA LOGISTIC
      </div>
      <div class="text-h6 text-secondary">
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
              <q-img src="~assets/malindo.png" style="width: 30%" />
              <div class="tw-mt-4">
                <p>Daftar dan menjadi bagian dari kami</p>
              </div>
            </q-card-section>

            <q-card-section>
              <q-form @submit.prevent="login" class="tw-space-y-2">
                <InputTextField
                  :autofocus="true"
                  toplabel="Nama"
                  :rules="[required]"
                  v-model="payload.name"
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
              </q-form>
            </q-card-section>
          </q-card>
          <span class="text-white tw-text-sm"
            >Sudah punya akun?
            <q-btn
              class="tw-font-semibold"
              no-caps
              align="left"
              dense
              :to="{ name: 'login' }"
              flat
              unelevated
              label="Login Sekarang"
            />
          </span>
        </div>
      </div>
    </div>
  </div>
  <!-- <q-img src="~assets/bigbg4.svg" class="tw-pb-48">
    <div class="absolute-full text-subtitle2 flex-center">
      <div class="tw-flex tw-items-center">
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
        <div class="text-h6 text-secondary">
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
                <q-img src="~assets/malindo.png" style="width: 30%" />
                <div class="tw-mt-4">
                  <p>Daftar dan menjadi bagian dari kami</p>
                </div>
              </q-card-section>

              <q-card-section>
                <q-form @submit.prevent="login" class="tw-space-y-2">
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
                </q-form>
              </q-card-section>
            </q-card>
            <span class="text-white tw-text-sm"
              >Sudah punya akun?
              <q-btn
                class="tw-font-semibold"
                no-caps
                align="left"
                dense
                :to="{ name: 'login' }"
                flat
                unelevated
                label="Login Sekarang"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  </q-img> -->
</template>
