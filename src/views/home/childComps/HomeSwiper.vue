<template>
  <swiper v-if="banners.length > 0">
    <swiper-item v-for="item in banners" :key="item.link">
      <a :href="item.link">
        <img :src="item.image" @load="finishLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper/index.js'

export default {
  name: 'HomeSwiper',
  components: {
    Swiper,
    SwiperItem,
  },
  data() {
    return {
      isLoad: false
    }
  },
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    finishLoad() {
      if(!this.isLoad) {
        this.$emit('finishLoad')
        this.isLoad = true
      }
    }
  }
}
</script>

<style>
</style>