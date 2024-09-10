<template>
	<view class="search-container">
		<u-search :placeholder="placeholder" v-model="keyword" :show-action="showAction"
			@search="searchKeyWord" @custom="searchKeyWord" :focus="isFocus" action-text="搜索">
		</u-search>
	</view>
</template>

<script>
	export default {
		name: 'waySearch',
		props: {
			inputValue:{
				type: String,
				default: ''
			},
			placeholder:{
				type: String,
				default: '请输入关键字'
			},
			isFocus:{
				type: Boolean,
				default: false
			},
			showAction:{
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				keyword: ''
			};
		},
		watch: {
			inputValue: function(newvalue, oldvalue) {
				if (newvalue) {
					this.keyword = newvalue
					console.log(this.keyword, 'this.keyword')
				}
			}
		},
		mounted() {
		},
		methods: {
			searchKeyWord() {
				this.$emit('searchHandle', this.keyword)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-container {
		background-color: #fff;
		padding: 15rpx 0;
	}
</style>
