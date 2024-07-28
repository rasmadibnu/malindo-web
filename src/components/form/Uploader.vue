<script lang="ts" setup>
import { Notify, QUploaderProps } from 'quasar';
import { useAuthStore } from 'src/stores/auth';

const auth = useAuthStore();
interface Props extends QUploaderProps {
  path: string;
}

const props = withDefaults(defineProps<Props>(), {
  autoUpload: true,
});

const emit = defineEmits(['update:modelValue']);

const onFileUploaded = (info) => {
  if (info.xhr.status == 200) {
    let data = JSON.parse(info.xhr.response);
    emit('update:modelValue', data.data.join('|'));
  } else {
    {
      Notify.create({
        message: 'Fialed to upload file',
        color: 'negative',
      });
    }
  }
};
</script>
<template>
  <q-uploader
    @uploaded="onFileUploaded"
    class="tw-mt-2"
    v-bind="props"
    dense
    flat
    :headers="[
      {
        name: 'Authorization',
        value: `Bearer ${auth.token}`,
      },
    ]"
    bordered
  />
</template>
