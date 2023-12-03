<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

const sliders = ref(['bg.jpg', '1.jpg', '2.jpeg', '3.jpg', '4.avif']);
</script>

<template>
  <Carousel :autoplay="2000" :wrap-around="true">
    <Slide v-for="slide in sliders" :key="slide">
      <img :src="`/slider/${slide}`" style="min-width: 100%; height: 100%" />
    </Slide>

    <template #addons>
      <navigation />
      <pagination />
    </template>
  </Carousel>
</template>
