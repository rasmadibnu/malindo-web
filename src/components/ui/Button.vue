<script lang="ts" setup>
import { QBtnProps } from 'quasar';

const props = withDefaults(defineProps<QBtnProps>(), {
  color: 'primary',
});
</script>
<template>
  <q-btn
    v-bind="props"
    class="tw-shadow-sm tw-rounded-md"
    dense
    unelevated
    padding="xs md"
    no-caps
    :color="props.color"
  >
    <slot></slot>
  </q-btn>
</template>
