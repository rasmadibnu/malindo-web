<script lang="ts" setup>
import { watch, ref } from 'vue';
import { QInputProps, QInputSlots } from 'quasar';

interface Props extends QInputProps {
  toplabel?: string;
  parentClass?: string;
  btnState?: boolean;
  mask?: string;
}

// type NoLabelProps = Omit<Props, 'label'>;

const props = withDefaults(defineProps<Props>(), {
  outlined: true,
  btnState: true,
});

const qDateProxy = ref(null);
const date = ref();

const emit = defineEmits(['update:modelValue']);

watch(date, () => {
  qDateProxy.value.hide();
  emit('update:modelValue', date.value);
});

defineSlots<QInputSlots>();
</script>
<template>
  <template v-if="props.toplabel">
    <div :class="props.parentClass">
      <div class="tw-font-medium">{{ props.toplabel }}</div>
      <q-input class="tw-mt-2" v-bind="props" :mask="undefined" readonly dense>
        <template v-slot:append>
          <q-icon name="event" v-if="btnState" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
              ref="qDateProxy"
            >
              <q-date v-model="date" :mask="props.mask">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
  </template>
  <template v-else>
    <q-input v-bind="props" outlined dense>
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy
            ref="qDateProxy"
            cover
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date v-model="date">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </template>
</template>
