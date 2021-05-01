<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NabBar',
}
</script>

<style>
.nav-bar {
  text-align: center;
  display: flex;
  height: 44px;
  line-height: 44px;
}
.nav-bar .left,
.nav-bar .right {
  width: 60px;
}

.nav-bar .center {
  flex: 1;
}
</style>