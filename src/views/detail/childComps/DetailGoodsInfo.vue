<template>
  <div class="goods-info" v-if="Object.keys(goodsInfo).length !== 0" >

    <div class="goods-des">{{goodsInfo.title}}</div>

    <div class="goods-price">
      <span class="real">{{goodsInfo.price}}</span>
      <span class="old">{{goodsInfo.oldPrice}}</span>
      <span class="discount" :style="{backgroundColor: goodsInfo.discountBgColor}">{{goodsInfo.discountDesc}}</span>
    </div>

    <div class="info-other">
      <span v-for="index in goodsInfo.columns.length-1" :key="index">{{goodsInfo.columns[index-1]}}</span>
      <span>{{goodsInfo.services[goodsInfo.services.length-1].name}}</span>
    </div>

    <div class="info-service">
      <span v-for="index in goodsInfo.services.length-1" :key="index">
        <img :src="goodsInfo.services[index-1].icon" alt="">
        {{goodsInfo.services[index-1].name}}
      </span>
    </div>
  </div>

</template>

<script>
export default {
  name: 'DetailGoodsInfo',
  data() {
    return {

    }
  },
  props: {
    goodsInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },

}
</script>

<style scoped>
.goods-info {
  padding: 15px 8px;
  /* height: 1000px; */
  border-bottom: 5px solid #f2f5f8;
}
.goods-des {
  color: black;
  font-size: 16px;
}
.goods-price {
  position: relative;
  margin: 15px 0;
}
.goods-price span {
  margin-right: 5px;
}
.real {
  font-size: 24px;
  color: var(--color-high-text  );
}
.old {
  font-size: 14px;
  color: #999;
  text-decoration: line-through;
}
.discount {
  position: absolute;
  top: -5px;
  font-size: 12px;
  border-radius: 12px;
  padding: 2px 7px;
  color: #fff;
  /* background-color: var(--color-high-text); */
}
.info-other {
  display: flex;
  justify-content: space-between;
  line-height: 28px;
  border-bottom: 1px solid #eee;
}
.info-other span {
  font-size: 14px;
  color: #999;
}
.info-service {
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}
.info-service img {
  height: 12px;
}

</style>