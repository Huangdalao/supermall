<template>
  <div class="detail-info" v-if="Object.keys(goodsImages).length !== 0" >
    <div class="detail-desc">
      <div class="start"></div>
      <div class="desc">{{goodsImages.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="detail-img">
      <div class="img-desc"> {{goodsImages.detailImage[0].key}} </div>
      <div class="img">
        <img v-for="(item, index) in goodsImages.detailImage[0].list" :key="index" :src="item" alt="" @load="imageLoad">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsImages: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      counter: 0,
      imageLength: 0
    }
  },
  methods: {
    imageLoad() {
      this.counter++
      if(this.counter == this.imageLength) {
        this.$emit('imageLoad')
      }
    }
  },
  watch: {
    goodsImages() {
      this.imageLength = this.goodsImages.detailImage[0].list.length
    }
  }
}
</script>

<style scoped>
.detail-info {
  padding: 15px;
}
.start,
.end {
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
}
.start {
  float: left;
}
.end {
  float: right;
}
.start::before,
.end::after {
  content: '';
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}
.detail-desc {
  font-size: 14px;
}
.end::after {
  right: 0;
}
.desc {
  padding: 15px 0;
  font-size: 14px;
}
.img img {
  width: 100%;
}
</style>