<template>
  <q-tr :props="props">
    <q-td>
      <div class="tw-text-center">
        <template v-if="number2"> {{ number2 }}.</template>
        {{ number + 1 }}
      </div>
    </q-td>
    <q-td>
      <div
        :style="{
          marginLeft: childIndent,
        }"
      >
        <q-btn
          no-caps
          flat
          dense
          size="sm"
          v-if="row.children.length > 0"
          @click="toggleExpand(row.ID)"
          :icon="!expand.includes(row.ID) ? 'remove' : 'add'"
        />
        {{ row.name }}
      </div>
    </q-td>
    <q-td>
      {{ row.code }}
    </q-td>
    <q-td>
      {{ row.url }}
    </q-td>
    <q-td>
      <div class="text-center">
        <q-icon :name="row.icon" :size="18" />
      </div>
    </q-td>
    <q-td>
      <div class="text-center">
        {{ row.ord }}
      </div>
    </q-td>
    <q-td>
      <div class="tw-space-x-2 tw-text-center">
        <q-btn
          dense
          unelevated
          size="sm"
          flat
          icon="eva-edit-2-outline"
          @click="
            () => {
              openDialog(row);
            }
          "
        />
        <q-btn
          dense
          unelevated
          flat
          size="sm"
          icon="eva-trash-2-outline"
          @click="
            () => {
              confirmDelete(row.id);
            }
          "
        />
      </div>
    </q-td>
  </q-tr>
  <template v-if="!expand.includes(row.ID)">
    <TRMenus
      v-for="(child1, index) in row.children"
      :key="child1.id"
      :number="index"
      :number2="number + 1"
      :row="child1"
      :indent="indent + 10"
      @openDialog="openDialog"
      @confirmDelete="confirmDelete"
    />
  </template>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'TRMenus',
  props: ['props', 'row', 'number', 'number2', 'indent'],
  setup() {
    return {
      expand: ref([]),
    };
  },
  computed: {
    childIndent() {
      return this.indent + 'px';
    },
  },
  methods: {
    toggleExpand(id) {
      this.expand.includes(id)
        ? this.expand.splice(this.expand.indexOf(id), 1)
        : this.expand.push(id);
    },
    openDialog(row) {
      this.$emit('openDialog', row);
    },
    confirmDelete(id) {
      this.$emit('confirmDelete', id);
    },
  },
});
</script>
