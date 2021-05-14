<template>
  <div v-if="topImages.length > 0">
  <swiper class="detail-swiper">
    <template v-show="topImages!=[]">
      <swiper-item v-for="(item,index) in topImages" :key="index">
        <img :src="item" />
      </swiper-item>
    </template>
  </swiper>
  </div>
</template>

<script>
import Swiper from 'components/common/swiper/Swiper.vue'
import SwiperItem from 'components/common/swiper/SwiperItem.vue'

export default {
  name: 'DetailSwiper',
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      },
    },
  },
  // methods: {
  //   imageLoad() {
  //     console.log(this.topImages.length);
  //   }
  // }
}
</script>

<style>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>