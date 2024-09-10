<template>
	<view class="page">
		<view class="border-box">
			因订单较多，祭祀当天完成，如遇风雪雷天恶劣自然天气，无法燃烧贡品等特殊情况，需耐心等待，关注结单通知。
		</view>
		<view class="border-box">
			<view class="border-title">
				订单
			</view>
			<view class="order-item" v-for="(item, index) in orderList" :key="index">
				<image class="img1" src="@/static/images/shop.png" mode="widthFix"></image>
				<view class="order-yang-name">
					{{item.yangName}}
				</view>
				<view class="shop-list-box">
					<view class="" v-for="(item1,index1) in item.shopList" :key="index1">
						<view class="">
							{{item1.name}} x{{item1.num}}
						</view>
					</view>
				</view>
				<view class="">
					￥50
				</view>
			</view>
			<view class="order-other-price">
				<view class="">
					代烧及环保处理
				</view>
				<view class="">
					￥50
				</view>
			</view>
			<view class="order-other-price">
				<view class="">
					已享优惠VIP
				</view>
				<view class="">
					-￥50
				</view>
			</view>
			<view class="order-other-price">
				<view class="">
					会员卡办理VIP
				</view>
				<view class="">
					￥50
				</view>
			</view>
			<view class="order-count">
				<view class="">
					总计
				</view>
				<view class="">
					￥888.00
				</view>
			</view>
		</view>
		<view class="border-pay">
			<view class="">
				支付方式
			</view>
			<view class="">
				微信
			</view>
		</view>
		<view class="order-create-box">
			<view class="order-create-left">
				<view class="">
					合计<text class="price"> ￥188</text>
				</view>
				<view class="order-create-left-text">
					已优惠 ￥30
				</view>
			</view>
			<view class="order-create-right">
				提交订单
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderList: [{
					yangName: '张三',
					shopList: [{
						name: '金元宝',
						num: 8
					},
					{
						name: '寒衣',
						num: 2
					}]
				},
				{
					yangName: '张三',
					shopList: [{
						name: '金元宝',
						num: 8
					}]
				}]
			};
		}
	}
</script>

<style lang="scss" scoped>
.page {
	width: 100%;
	// height: 100vh;
	background-color: #F3F1E3;
	padding: 20rpx 20rpx 160rpx 20rpx;
	.border-box {
		background-color: #fff;
		padding: 20rpx;
		border-radius: 15rpx;
		font-weight: bold;
		.border-title {
			margin-bottom: 20rpx;
		}
		.order-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.img1 {
				width: 200rpx;
				border-radius: 15rpx;
			}
			.shop-list-box {
				
			}
		}
		.order-item:nth-child(n+2) {
			margin-top: 20rpx;
		}
		.order-other-price {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.order-other-price:nth-child(n+2) {
			margin-top: 20rpx;
		}
		.order-count {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 60rpx;
			font-size: 32rpx;
		}
	}
	.border-box:nth-child(n+2) {
		margin-top: 20rpx;
	}
	.border-pay {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		padding: 20rpx;
		border-radius: 15rpx;
		font-weight: bold;
		margin-top: 20rpx;
	}
	.order-create-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		border-radius: 15rpx;
		margin-top: 20rpx;
		font-size: 32rpx;
		overflow: hidden;
		.order-create-left {
			width: 70%;
			height: 100%;
			background-color: #242424;
			color: #fff;
			padding: 20rpx;
			.price {
				font-size: 46rpx;
			}
			.order-create-left-text {
				color: #F60101;
				margin-top: 10rpx;
			}
		}
		.order-create-right {
			width: 30%;
			height: 100%;
			text-align: center;
			font-weight: bold;
		}
	}
}
</style>
