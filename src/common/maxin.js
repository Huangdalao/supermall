import BackTop from 'components/common/backTop/BackTop'

export const backTopMixin = {
	components: {
		BackTop
	},
	data() {
		return {
      isShowBackTop: false,
		}
	},
	methods: {
    backTopClick() {
      this.$refs.scroll.scrollToW(0, 0, 300)
    },
	}
}