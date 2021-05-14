<template>
  <div class="cart-list">
    <scroll class="content" :probeType="3" ref="scroll">
      <cart-item v-for="item in cartList" :key="item.iid" :item-info="item"></cart-item>
    </scroll>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Scroll from 'components/common/scroll/Scroll.vue'
import CartItem from './CartItem.vue'
export default {
  components: { CartItem, Scroll },
  name: 'CartList',
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list {
  position: relative;
  height: calc(100% - 44px - 89px);
}
.content {
  overflow: hidden;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>