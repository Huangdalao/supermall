<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <tab-control @tabClick="tabClick" :kinds="['流行', '新款', '精选']" ref="control1" :class="{fixed:true}" v-show="isfixed"/>
    <scroll
      class="content"
      ref="scroll"
      @scroll="scroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @finishLoad = "finishLoad"  />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control @tabClick="tabClick" :kinds="['流行', '新款', '精选']" ref="control2" />
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>

    <back-top @click.native="backTopClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabcontrol/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import BackTop from 'components/common/backTop/BackTop.vue'

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView.vue'

import { getHomeMulitdata, getHomeData } from 'network/home.js'

export default {
  name: 'Home',
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: {
          page: 0,
          list: [],
        },
        sell: {
          page: 0,
          list: [],
        },
        new: {
          page: 0,
          list: [],
        },
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isfixed: false,
      saveY: 0
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  created() {
    this.hGetHomeMultidata()

    this.hGetHomeData('pop')
    this.hGetHomeData('sell')
    this.hGetHomeData('new')
  },
  mounted() {
    let refresh = this.debounce(this.$refs.scroll.refresh, 50)
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })
  },
  activated() {
    console.log(this.saveY);
    this.$refs.scroll.scrollToW(0,this.saveY,10)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y
    // console.log(this.$refs.scroll.scroll.y);
  },
  methods: {
    // 组件中的方法
    debounce(fun, delay) {
      let timer = null
      return function (...args) {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          fun.apply(this, args)
        }, delay)
      }
    },
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.control1.currentIndex = index 
      this.$refs.control2.currentIndex = index 

    },
    backTopClick() {
      this.$refs.scroll.scrollToW(0, 0, 1000)
    },
    scroll(position) {
      this.isShowBackTop = -position.y > 1000

      this.isfixed = -position.y > this.tabOffsetTop
      // console.log(position);
    },
    loadMore() {
      this.hGetHomeData(this.currentType)
    },
    finishLoad() {
      this.tabOffsetTop = this.$refs.control2.$el.offsetTop
      // console.log(this.tabOffsetTop);
    },

    // 调用数据的方法
    hGetHomeData(type) {
      let page = this.goods[type].page + 1
      getHomeData(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        this.$refs.scroll.finishPullingUp()
        // this.$refs.scroll.scroll.refresh()
      })
    },
    hGetHomeMultidata() {
      getHomeMulitdata().then((res) => {
        // console.log(res.data)
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
  },
}
</script>

<style scoped>
#home {
  position: relative;
  height: 100vh;
  /* padding-top: 44px; */
}
.home-nav {
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999; */
  background-color: var(--color-tint);
  color: #fff;
}
.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.fixed {
  position: relative;
  /* top: 0;
  left: 0;
  right: 0; */
  z-index: 999;
  background-color: #fff;
}
</style>
