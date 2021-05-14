<template>
  <div class="goods-list">
    <goods-item v-for="item in goods" :key="item.link" :item = "item" />
  </div>
</template>

<script>
import GoodsItem from './GoodsItem.vue'

export default {
  components: { GoodsItem },
  name: 'GoodsList',
  props: {
    goods: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>

<style scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 4px;
  }
</style>