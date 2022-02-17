<template>
  <div class="slider-full-size">
    <!-- <hooper
      class="slider-full-size__slider"
      :infiniteScroll="true"
      :autoPlay="true"
      :playSpeed="4000"
      :wheelControl="false"
    >
      <slide v-for="image in images" :key="image.sys.id">
        <img class="" :src="getImageSrc(image)" />
      </slide>
 -->
      <!-- <hooper-pagination slot="hooper-addons"></hooper-pagination> -->
    <!-- </hooper> -->
    <splide 
      class="slider-full-size__slider"
      :options="options">
      <splide-slide v-for="image in images" :key="image.sys.id">
        <img class="" :src="getImageSrc(image)" />
      </splide-slide>
    </splide>
    <slot></slot>
  </div>
</template>

<script>
//import { Hooper, Slide, Pagination as HooperPagination } from "hooper";
import { Splide, SplideSlide } from '@splidejs/vue-splide';

export default {
 // components: { Hooper, Slide, HooperPagination },
  components: {
    Splide,
    SplideSlide,
  },
  name: "SliderFullSize",
  props: {
    data: Object,
  },
  methods: {
    getImageSrc(image) {
      return image.fields?.file?.url;
    },
  },
  computed: {
    images() {
      return this.data?.fields?.items;
    },
    options() {
      return {
        rewind: true,
        arrows: false,
        pagination: false,
        autoplay: true,
        interval: 4000
      };
    }
  },
};
</script>


<style lang="scss">

@import 'assets/css/placeholder.scss';

.slider-full-size {
  height: 100vh;
  width: 100vw;
  position: relative;

  &__slider {
		width: 100vw;
		height: 100vh;
    img {
      width: 100vw;
      height: 100vh;
      object-fit: cover;
    }

    .hooper-indicator.is-active,
    .hooper-indicator:hover {
      background-color: black;
    }
  }
}

.hooper-liveregion.hooper-sr-only {
  visibility: hidden;
  display: none;
}
</style>