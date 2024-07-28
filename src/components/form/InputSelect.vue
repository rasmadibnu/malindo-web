<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { QSelectProps } from 'quasar';
import { api } from 'src/boot/axios';
import { isEmpty } from 'src/utils/validators';

interface Props extends QSelectProps {
  toplabel?: string;
  parentClass?: string;
  apiUrl?: string;
  optLabel?: string;
  optValue?: string;
  searchKey?: string;
  params?: object;
}

const props = withDefaults(defineProps<Props>(), {
  params: undefined,
});

const loading = ref<boolean>(false);
const page = ref<number>(0);
const totalPages = ref<number>(0);
const search = ref<string>('');
const options = ref([]);
const optionsRaw = ref([]);

if (!props.apiUrl) {
  options.value = props.options;
  optionsRaw.value = props.options;
}

const fetchData = () => {
  if (!props.apiUrl) {
    return;
  }

  const params = new URLSearchParams(props.params);
  const data = {
    params: params,
  };

  params.append('page', page.value);
  params.append('size', 50);

  if (search.value) {
    params.delete('filters');
    const dataForSearchs = [];
    if (props.params?.filters) {
      dataForSearchs.push(props.params['filters']);
      dataForSearchs.push('["AND"]');
    }

    dataForSearchs.push(`["${props.searchKey}","like","${search.value}"]`);
    params.append(
      'filters',
      dataForSearchs.includes('["OR"]') || dataForSearchs.includes('["AND"]')
        ? `[${dataForSearchs}]`
        : dataForSearchs
    );
    options.value = [];
  }

  api.get(props.apiUrl, data).then((res) => {
    res.data.data.items.forEach((item) => {
      options.value.push({
        label: item[props.optLabel],
        value: item[props.optValue],
        ...item,
      });
    });

    totalPages.value = res.data.data.total_pages;
  });
};

const filterFn = (val, update, abort) => {
  search.value = val;

  if (!isEmpty(search.value)) {
    if (props.apiUrl) {
      fetchData();
    } else {
      update(() => {
        options.value = optionsRaw.value.filter(
          (v) => v.label.toLowerCase().indexOf(val) > -1
        );
      });
    }
  } else {
    options.value = optionsRaw.value;
  }
  if (options.value.length !== 0) {
    update();
    return;
  }

  update(() => {
    isEmpty(search.value) && fetchData();
  });
};

const onScroll = ({ to, ref }) => {
  const lastIndex = options.value.length - 1;

  if (
    loading.value !== true &&
    page.value < totalPages.value - 1 &&
    to == lastIndex
  ) {
    page.value++;
    fetchData();
  }
};

onMounted(() => {
  if (props.modelValue) {
    fetchData();
  }
  if (options.value?.length && props.apiUrl) {
    fetchData();
  }
});
</script>
<template>
  <template v-if="props.toplabel">
    <div :class="props.parentClass">
      <div class="tw-font-medium">{{ props.toplabel }}</div>
      <q-select
        class="tw-mt-2"
        v-bind="props"
        :options="options"
        :model-value="props.modelValue"
        outlined
        dense
        use-input
        @filter="filterFn"
        @popup-hide="
          () => {
            if (props.apiUrl) {
              options = [];
              page = 0;
              search = '';
            }
          }
        "
        @virtual-scroll="onScroll"
      >
        <template #option="scope" v-if="$slots.option">
          <slot name="option" :scope="scope" />
        </template>
        <slot></slot>
      </q-select>
    </div>
  </template>
  <template>
    <q-input v-bind="props" outlined dense>
      <slot></slot>
    </q-input>
  </template>
</template>
