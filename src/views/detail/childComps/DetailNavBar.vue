<template>
  <div>
    <nav-bar>
        <template v-slot:left>
          <div class="back">
          <img @click="goBack" src="~assets/img/common/back.svg" alt="">
          </div>
        </template>
        <template v-slot:center>
          <div class="detail-nav">
            <div v-for="(item, index) in titles" :key="index" 
            class="item" @click="itemClick(index)" 
            :class="{active: currentIndex == index}" >{{item}}</div>
          </div>
        </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
export default {
  name: 'DetailNavBar',
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  components: {
    NavBar
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('titleClick',index)
    },
    goBack() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.detail-nav {
  display: flex;
}
.item {
  flex: 1;
  font-size: 14px;
}
.active {
  color: var(--color-tint);
}
.back {
  margin-top: 6px;
}
</style>