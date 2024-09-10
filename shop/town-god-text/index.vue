<template>
	<view class="page">
		<view class="town-god-text">
			<image class="img" src="@/static/images/material-item7.png" mode="widthFix"></image>
			<image class="img1" src="@/static/images/material-item10.png" mode="widthFix"></image>
			<view class="town-god-input">
				<view class="town-god-box-left">
					<view class="form-item">
						<view class="form-label">阳上人姓名：</view>
						<u-input v-model="yangName" placeholder="请填写姓名" />
					</view>
					<view class="form-item">
						<view class="form-label">居住地址：</view>
						<u-input v-model="yangAddress" placeholder="请填写地址" />
					</view>
				</view>
				<view class="town-god-box-right">
					<image class="img1" src="@/static/images/material-item11.png" mode="widthFix"></image>
					<view class="">
						<u-number-box
							v-model="yangNum"
							:min="0"
							:max="9999"
							size="20"
							bg-color="#FEB500"
							input-width="50"
						></u-number-box>
					</view>
				</view>
			</view>
		</view>
		<view class="town-god-text">
			<image class="img" src="@/static/images/material-item8.png" mode="widthFix"></image>
			<image class="img1" src="@/static/images/material-item9.png" mode="widthFix"></image>
			<view class="town-god-input">
				<view class="town-god-box-left">
					<view class="form-item">
						<view class="form-label">阳上人姓名：</view>
						<u-input v-model="yangName1" placeholder="请填写姓名" />
					</view>
					<view class="form-item">
						<view class="form-label">居住地址：</view>
						<u-input v-model="yangAddress1" placeholder="请填写地址" />
					</view>
				</view>
				<view class="town-god-box-right">
					<image class="img1" src="@/static/images/material-item11.png" mode="widthFix"></image>
					<view class="">
						<u-number-box
							v-model="yangNum1"
							:min="0"
							:max="9999"
							size="20"
							bg-color="#FEB500"
							input-width="50"
						></u-number-box>
					</view>
				</view>
			</view>
		</view>
		<view class="order-create">
			<view class="order-button-item" @click="toTownGod">
				表文功能(用于表文显示)
			</view>
			<view class="order-button-item">
				生成表文转入订单
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				yangName: '',
				yangAddress: '',
				yangNum: '',
				
				yangName1: '',
				yangAddress1: '',
				yangNum1: '',
				labelStyle: {
					'height': '40rpx'
				}
			};
		}
	}
</script>

<style lang="scss" scoped>
.page {
	width: 100%;
	background-color: #F3F1E3;
	padding: 20rpx;
	.town-god-text {
		width: 100%;
		.img {
			width: 200rpx;
			height: 50rpx;
			margin: 0 auto;
		}
		.img1 {
			width: 100%;
			height: 300rpx;
			margin-top: 20rpx;
		}
		.town-god-input {
			display: flex;
			justify-content: space-between;
			// align-items: center;
			margin-top: 20rpx;
			background-color: #fff;
			// padding: 20rpx;
			height: 130rpx;
			border-radius: 15rpx;
			.town-god-box-left {
				// min-width: 70%;
				padding-left: 20rpx;
				.form-item {
					display: flex;
					justify-content: start;
					align-items: center;
					height: 60rpx;
					.form-label {
						width: 170rpx;
						min-width: 170rpx;
					}
				}
			}
			.town-god-box-right {
				display: flex;
				justify-content: space-between;
				align-items: center;
				background-color: #FEB500;
				width: 40%;
				min-width: 40%;
				height: 100%;
				.img1 {
					width: 80rpx;
					margin: auto auto auto 10rpx;
				}
			}
		}
	}
	.town-god-text:nth-child(n+2) {
		margin-top: 40rpx;
	}
	.order-create {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 30rpx;
		.order-button-item {
			width: 48%;
			padding: 20rpx 0;
			border: 1rpx solid #DDDDDC;
			background-color: #fff;
			border-radius: 15rpx;
			text-align: center;
			font-weight: bold;
		}
	}
	::v-deep .u-icon-disabled {
		background: #FEB500 !important;
	}
}
</style>
