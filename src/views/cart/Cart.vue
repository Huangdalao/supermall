<template>
  <div id="cart">
    <nav-bar class="cart-nav">
      <template v-slot:center>购物车({{cartLength}})</template>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import NavBar from 'components/common/navbar/NavBar.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'
import CartList from './childComps/CartList.vue'
export default {
  name: 'Cart',
  components: {
    CartList,
    NavBar,
    CartBottomBar,
  },
  computed: {
    ...mapGetters(['cartLength','cartList'])
  },

}
</script>

<style scoped>
#cart {
  height: 100vh;
}
.cart-nav {
  color: #fff;
  background-color: var(--color-tint);
  font-weight: 700;
  font-size: 20px;
}
</style>
