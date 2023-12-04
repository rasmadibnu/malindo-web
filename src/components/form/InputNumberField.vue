<script lang="ts" setup>
import { QInputProps, QInputSlots } from 'quasar';

interface Props extends QInputProps {
  toplabel?: string;
  parentClass?: string;
}

// type NoLabelProps = Omit<Props, 'label'>;

const props = withDefaults(defineProps<Props>(), {
  outlined: true,
});

const emit = defineEmits(['update:modelValue']);

defineSlots<QInputSlots>();
</script>
<template>
  <template v-if="props.toplabel">
    <div :class="props.parentClass">
      <div class="tw-font-medium">{{ props.toplabel }}</div>
      <q-input
        class="tw-mt-2"
        v-bind="props"
        @update:model-value="
          (val) => {
            emit('update:modelValue', parseInt(val));
          }
        "
        dense
      >
        <template #append>
          <slot name="append" />
        </template>
      </q-input>
    </div>
  </template>
  <template v-else>
    <q-input v-bind="props" outlined dense>
      <slot></slot>
    </q-input>
  </template>
</template>
