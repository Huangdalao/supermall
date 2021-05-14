<template>
  <div id="detail">
    <detail-nav-bar class="top-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="wrapper" :probeType="3" ref="scroll" @scroll="contentScroll">
      <detail-swiper :topImages="topImages" ref="swiper"></detail-swiper>
      <detail-goods-info :goodsInfo="goods"></detail-goods-info>
      <detail-shop :shop="shop"></detail-shop>
      <detail-goods-images :goodsImages="goodsImages" @imageLoad="imageLoad"></detail-goods-images>
      <detail-goods-param :goodsParams="goodsparams" ref="params"></detail-goods-param>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list ref="recommend" :goods="goodsList" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailShop from './childComps/DetailShop.vue'
import DetailGoodsImages from './childComps/DetailGoodsImages.vue'
import DetailGoodsParam from './childComps/DetailGoodsParam.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'

import GoodsList from 'components/content/goods/GoodsList'

import Scroll from 'components/common/scroll/Scroll.vue'

import {
  getDetailData,
  getRecommend,
  GoodsInfo,
  Shop,
  GoodsParam,
} from 'network/detail.js'
import { debounce } from 'common/untils.js'
import { backTopMixin } from 'common/maxin.js'
import {mapActions} from 'vuex'

export default {
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailGoodsInfo,
    DetailShop,
    DetailGoodsImages,
    DetailGoodsParam,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    Scroll,
  },
  mixins: [backTopMixin],
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      goodsImages: {},
      goodsparams: {},
      themeTopYs: [],
      commentInfo: {},
      goodsList: [],
      getThemeTopYs: null,
      currentIndex: 0,
    }
  },
  created() {
    this.iid = this.$route.params.iid
    getDetailData(this.iid).then((res) => {
      let data = res.result
      this.topImages = data.itemInfo.topImages
      console.log(res)
      this.goods = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo)
      this.shop = new Shop(data.shopInfo)
      this.goodsImages = data.detailInfo
      this.goodsparams = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      )
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0]
      }
    })
    getRecommend().then((res) => {
      this.goodsList = res.data.list
      // console.log(res);
    })
    this.getThemeTopYs = debounce(() => {
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
      console.log(this.themeTopYs)
    }, 50)
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      this.$refs.scroll.refresh()
      this.getThemeTopYs()
    },
    titleClick(index) {
      this.$refs.scroll.scrollToW(0, -this.themeTopYs[index], 200)
    },
    contentScroll(position) {
      let positionY = -position.y
      // 方法一
      // for (let i = 0; i < this.themeTopYs.length; i++) {
      //   if (
      //     (this.currentIndex != i) &&
      //     ((i < this.themeTopYs.length - 1 &&
      //       positionY > this.themeTopYs[i] - 41 &&
      //       positionY < this.themeTopYs[i + 1] - 41) ||
      //     (i == this.themeTopYs.length - 1 &&
      //       positionY > this.themeTopYs[i] - 41))
      //   ) {
      //     this.currentIndex = i
      //     this.$refs.nav.currentIndex = this.currentIndex
      //     console.log(i);
      //   }

      // 方法二
      for (let i = 0; i < this.themeTopYs.length - 1; i++) {
        if (
          positionY > this.themeTopYs[i] - 41 &&
          positionY < this.themeTopYs[i + 1] - 41
        ) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      // console.log(position);
      this.isShowBackTop = -position.y > 1000
    },
    addToCart() {
      const product = {}
      product.iid = this.iid
      product.imgURL = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice

      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // })

      this.addCart(product).then(res => {
        console.log(res);
        this.$toast.show(res)
        // console.log(this.$toast);
      })
    },
  },
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 99;
  background-color: #fff;
  height: 100vh;
}
.wrapper {
  /* height: calc(100% - 44px - 49px); */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.top-nav {
  position: relative;
  z-index: 999;
  background-color: #fff;
}
</style>