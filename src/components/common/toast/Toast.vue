<template>
  <div class="toast" v-show="isShow">
    {{message}}
  </div>
</template>

<script>
export default {
  name: 'Toast',
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message="请添加信息", time=2000) {
      this.message = message
      this.isShow = true
      setTimeout(() => {
        this.isShow = false
      }, time)
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  z-index: 999;

  color: #fff;
  background-color: rgba(0, 0, 0, 0.65);
}
</style>