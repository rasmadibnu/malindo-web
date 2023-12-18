<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>
<template>
  <q-breadcrumbs class="tw-mb-4">
    <template
      v-for="(pathd, index) in route.fullPath.split('/').filter((e) => {
        return e != '';
      })"
      v-bind:key="pathd"
    >
      <q-breadcrumbs-el
        v-if="
          route.matched.some(({ path }) => {
            if (index == 0) {
              return true;
            } else {
              return path == `/dashboard/${pathd}`;
            }
          })
        "
        class="tw-capitalize tw-text-lg tw-font-semibold"
        :label="pathd.replace('-', ' ')"
        :to="pathd == 'dashboard' ? '/dashboard' : `/dashboard/${pathd}`"
      />

      <q-breadcrumbs-el
        v-else
        class="tw-capitalize tw-text-lg tw-text-[#4B465C] tw-font-semibold"
        :label="pathd.replace('-', ' ')"
      />
    </template>
  </q-breadcrumbs>
</template>
