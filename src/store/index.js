import Vue from 'vue'
import Vuex from 'vuex' 
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCount(state, payload) {
      payload.count += 1
    },
    addToCart(state,payload) {
      payload.checked = true
      state.cartList.push(payload)
    }
  },
  actions: {
    addCart(context,payload) {
      return new Promise((resolve) => {
        let oldProduct = context.state.cartList.find(item => item.iid == payload.iid)
        if(oldProduct) {
          context.commit('addCount',oldProduct)
          resolve('该商品数量加1')
        }else {
          payload.count = 1
          context.commit('addToCart',payload)
          resolve('该商品已加入购物车')
        }
      })
    }
  },
  getters: {
    cartLength(state) {
      return state.cartList.length
    },
    cartList(state) {
      return state.cartList
    },
    checkedLength(state) {
      return state.cartList.filter((item) => item.checked == true).length
    },
    totalPrice(state) {
      let checkedArr = state.cartList.filter((item) => item.checked == true)
      let totalPrice = 0
      if(checkedArr.length!=0) {
        // for (let i = 0; i < checkedArr.length; i++) {
        //   totalPrice += checkedArr[i].price * checkedArr[i].count
        // }
        // return totalPrice
        return checkedArr.reduce((preVal,item) => {
          return preVal + item.price * item.count
        }, 0)
      }else{
        return 0
      }
    }
  }
})

export default store