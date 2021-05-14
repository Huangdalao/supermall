<template>
  <div class="cart-button">
    <div class="check-area">
      <check-button class="check-button" @click.native="checkAllClick" :class="{checked:isChecked}"></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">
      合计:{{totalPrice}}
    </div>
    <div class="pay" @click="calcClick">去结算({{checkedLength}})</div>
  </div>
</template>

<script>
import CheckButton from './CheckButton.vue'
import {mapGetters} from 'vuex'
export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['checkedLength','totalPrice','cartLength','cartList']),
    isChecked() {
      if(this.cartLength==0) {
        return false
      }else{
        return this.checkedLength==this.cartLength
      }
    }
  },
  methods: {
    checkAllClick() {
      // 方法一
      // if(this.checkedLength==this.cartLength) {
      //   for (let i = 0; i < this.$store.state.cartList.length; i++) {
      //     this.$store.state.cartList[i].checked = false
      //   }
      // }else {
      //   for (let i = 0; i < this.$store.state.cartList.length; i++) {
      //     this.$store.state.cartList[i].checked = true
      //   }
      // }

      // 方法二
      // if(this.isChecked) {
      //   this.cartList.forEach(item => {
      //     item.checked = false
      //   })
      // }else {
      //   this.cartList.forEach(item => {
      //     item.checked = true
      //   });
      // }

      // 方法三
      let flag = !this.isChecked
      // for (let i = 0; i < this.$store.state.cartList.length; i++) {
      //     this.$store.state.cartList[i].checked = flag
      // }
      this.cartList.forEach(item => {
        item.checked = flag
      })
    },
    calcClick() {
      if(!this.checkedLength) {
        this.$toast.show('请添加商品')
      }
    }
  }
}
</script>


<style scoped>
.cart-button {
  background-color: rgb(230, 224, 224);
  display: flex;
  height: 40px;
  font-size: 14px;
}
.check-area {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.check-button {
  height: 20px;
  width: 20px;
  margin-right: 5px;
}
.checked {
  background-color: red;
}
.total-price {
  flex: 2;
  padding-left: 8px;
  line-height: 40px;
}
.pay {
  flex: 1;
  line-height: 40px;
  background-color: red;
  color: white;
  text-align: center;
}
</style>