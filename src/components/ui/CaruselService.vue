<script lang="ts" setup>
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
</script>
<template>
  <Carousel
    :autoplay="3000"
    :pauseAutoplayOnHover="true"
    snapAlign="center"
    currentSlide="1"
    :itemsToShow="3.4"
    :wrapAround="true"
    :transition="500"
  >
    <Slide :index="0">
      <q-card>
        <img src="~assets/1.svg" />
      </q-card>
    </Slide>
    <Slide :index="1">
      <q-card>
        <img src="~assets/2.svg" />
      </q-card>
    </Slide>
    <Slide :index="2">
      <q-card>
        <img src="~assets/4.svg" />
      </q-card>
    </Slide>
    <Slide :index="3">
      <q-card>
        <img src="~assets/3.svg" />
      </q-card>
    </Slide>
    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>
<style scoped>
.carousel__slide {
  padding: 30px 5px;
}

/* 

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  z-index: 100;
  filter: blur(0.5px);
  transform: rotateY(-20deg) scale(0.9);
} */

/*

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}
.carousel__slide--prev {
  z-index: 200;
  filter: none;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
  z-index: 200;
  filter: none;

  transform: rotateY(10deg) scale(0.95);
}

*/

.carousel__slide--active {
  filter: none;

  z-index: 300;
  transform: rotateY(0) scale(1.2);
}
</style>
