<script lang="ts" setup>
import { ref } from 'vue';
import { required } from 'src/utils/validators';
import InputTextField from 'src/components/form/InputTextField.vue';
import InputSelect from 'src/components/form/InputSelect.vue';
import Btn from 'src/components/ui/Button.vue';
import { api } from 'src/boot/axios';
import { useRoute } from 'vue-router';

const route = useRoute();

const police_no = ref('');
const types = ref([
  {
    label: 'Hitam',
    value: '01',
  },
  {
    label: 'Kuning',
    value: '02',
  },
  {
    label: 'Merah',
    value: '03',
  },
]);
const type = ref('');
const output = ref('');

const submit = () => {
  api
    .post('/transactions/check-tax', {
      police_no: police_no.value,
      type: type.value,
    })
    .then((res) => {
      output.value = res.data.data;
    });
};
</script>
<template>
  <q-breadcrumbs class="tw-mb-4">
    <template
      v-for="pathd in route.fullPath.split('/').filter((e) => {
        return e != '';
      })"
      v-bind:key="pathd"
    >
      <q-breadcrumbs-el
        v-if="
          route.matched.some(({ path }) => {
            return path == `/${pathd}`;
          })
        "
        class="tw-capitalize tw-text-lg tw-font-semibold"
        :label="pathd.replace('-', ' ')"
        :to="`/${pathd}`"
      />

      <q-breadcrumbs-el
        v-else
        class="tw-capitalize tw-text-lg tw-text-[#4B465C] tw-font-semibold"
        :label="pathd.replace('-', ' ')"
      />
    </template>
  </q-breadcrumbs>
  <q-card class="tw-shadow-md tw-py-4">
    <q-form @submit.prevent="submit">
      <q-card-section
        class="tw-flex tw-justify-center tw-items-center tw-gap-4 q-pb-none"
      >
        <InputTextField
          :rules="[required]"
          v-model="police_no"
          toplabel="Nomot Plat"
        />
        <InputSelect
          :rules="[required]"
          v-model="type"
          :options="types"
          map-options
          emit-value
          toplabel="Warna Plat"
        />
        <div>
          <Btn label="Simulasi" type="submit" />
        </div>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <div v-html="output"></div>
      </q-card-section>
    </q-form>
  </q-card>
</template>
