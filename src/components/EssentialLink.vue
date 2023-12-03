<template>
  <q-item-label v-if="is_header" header>{{ name }}</q-item-label>

  <q-item
    clickable
    :to="{ name: url }"
    v-else-if="!is_header && !children"
    dense
    class="tw-py-2 tw-rounded-lg"
    active-class="tw-from-primary tw-text-white tw-from-60% tw-bg-gradient-to-r tw-to-primary/60  tw-rounded-lg"
  >
    <q-item-section v-if="icon" avatar class="q-pr-md tw-min-w-fit">
      <q-icon :name="icon" size="20px" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ name }}</q-item-label>
      <!-- <q-item-label v-if="caption" caption>{{ caption }}</q-item-label> -->
    </q-item-section>
  </q-item>
  <q-expansion-item
    clickable
    v-else
    dense
    class="my-expand"
    :header-class="[
      route.matched.map((e) => e.name).includes(url) && miniState == true
        ? 'tw-from-primary tw-from-60% tw-bg-gradient-to-r tw-to-primary/60'
        : '',
      'tw-py-2 tw-rounded-lg',
    ]"
    expand-icon-class="q-pr-md"
    :default-opened="route.matched.map((e) => e.name).includes(url)"
    :content-inset-level="0.3"
    :label="name"
    :icon="icon"
  >
    <EssentialLink
      v-for="link in children"
      :key="link.id"
      :route="route"
      v-bind="link"
    />
  </q-expansion-item>
</template>

<script setup lang="ts">
export interface EssentialLinkProps {
  name: string;
  url?: string;
  icon?: string;
  parent_id?: number;
  is_header: boolean;
  children: EssentialLinkProps[] | null;
  route: object;
  miniState: boolean;
}

withDefaults(defineProps<EssentialLinkProps>(), {
  url: '#',
});
</script>

<style>
.my-expand .q-item__section--avatar {
  min-width: fit-content;
}

.my-expand .q-item__section--side > .q-icon {
  font-size: 20px;
}
</style>
