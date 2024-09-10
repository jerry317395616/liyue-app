<template>
	<view class="network-error">
		<view class="content">
			<u-empty mode="wifi" />
			<view class="button" @click.stop="checkNetwork">重 试</view>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			checkNetwork() {
				uni.getNetworkType({
					success: (res) => {
						if (res.networkType !== "none") {
							this.$gy.goHome()
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.network-error{
		.content{
			width: 100%;
			height: 500rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			.button{
				width: 200rpx;
				height: 70rpx;
				border-radius: 35rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border: 1rpx solid #999999;
				font-size: 30rpx;
				color: #666666;
				margin-top: 50rpx;
			}
		}
	}
</style>