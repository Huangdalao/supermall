<template>
  <div class="tab-control">
    <div v-for="(item, index) in kinds" :key="item" @click="itemClick(index)">
      <span :class="{active: currentIndex==index}">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    kinds: {
      type: Array,
      default() {
        return []
      },
    },
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('tabClick',index)
    },
  },
}
</script>

<style>
.tab-control {
  display: flex;
  text-align: center;
  line-height: 44px;
}
.tab-control > div {
  flex: 1;
}
.tab-control span {
  padding: 7px;
}
.tab-control .active {
  color: var(--color-tint);
  border-bottom: 1px solid var(--color-tint);
}

</style>