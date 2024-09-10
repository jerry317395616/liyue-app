<template>
	<view class="page">
		<view class="order-status-box">
			<template v-if="orderStatus == 1">
				<view class="order-status-text">
					订单已完成
				</view>
				<view class="order-status-desc">
					点击下方按钮查看结单信息
				</view>
				<view class="order-status-detail">
					结单信息
				</view>
			</template>
			<template v-if="orderStatus == 2">
				<view class="order-status-text">
					订单已接
				</view>
				<view class="order-status-desc">
					月亮阿姨正在像风火轮一样筹备物品、打印表文、并安排场地，为阁下亲人准备一场盛宴，让我们一同等待这份美好。
				</view>
			</template>
		</view>
		<view class="order-footer-box" v-if="orderStatus == 1">
			<image class="img1" src="@/static/images/material-item12.png" mode="widthFix"></image>
		</view>
		<view class="order-footer-box1" v-if="orderStatus == 2">
			<image class="img1" src="@/static/images/material-item13.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderStatus: 2
			};
		}
	}
</script>

<style lang="scss" scoped>
.page {
	width: 100%;
	// height: 100vh;
	background-color: #F3F1E3;
	// background-image: url('@/static/images/material-item1.png');
	// background-size: cover;
	// background-position: center;
	padding: 20rpx 20rpx 100rpx 20rpx;
	.order-status-box {
		width: 100%;
		background-color: #fff;
		border-radius: 15rpx;
		text-align: center;
		font-weight: bold;
		padding: 30rpx 20rpx;
		.order-status-text {
			font-size: 40rpx;
		}
		.order-status-desc {
			margin-top: 30rpx;
		}
		.order-status-detail {
			margin: 20rpx auto 0;
			padding: 10rpx 30rpx;
			background-color: #d4d4d4;
			border-radius: 30rpx;
			width: 200rpx;
		}
	}
	.order-footer-box {
		width: 100%;
		background-color: #fff;
		border-radius: 15rpx;
		margin-top: 30rpx;
		padding: 20rpx 0;
		.img1 {
			width: 100%;
		}
	}
	.order-footer-box1 {
		width: 100%;
		background-color: #fff;
		border-radius: 15rpx;
		margin-top: 30rpx;
		padding: 20rpx 60rpx;
		.img1 {
			width: 100%;
		}
	}
}
</style>
