<script lang="ts" setup>
import { QCardProps } from 'quasar';

const props = defineProps<QCardProps>();
</script>
<template>
  <q-card v-bind="props" class="tw-shadow-lg">
    <slot></slot>
  </q-card>
</template>
