<template>
	<view class="page">
		<view class="header-box" @click="toAddSite">
			<view class="image1">
				<image src="@/static/images/material-item2.png" mode="heightFix"></image>
			</view>
			<view class="image2">
				<image src="@/static/images/material-item3.png" mode="heightFix"></image>
				<view class="content-box">
					<view class="field-row">
						<text class="field-label">阳上人:</text>
						<text class="field-value" v-if="address.yangName">{{address.yangName}}</text>
						<text class="field-value1" v-else>(如果多人姓名请用“*”号隔开)</text>
					</view>
					<view class="field-row">
						<text class="field-label">地址:</text>
						<text class="field-value" v-if="address.yangAddress">{{address.yangAddress}}</text>
						<text class="field-value1" v-else>(请精确到市区)</text>
					</view>
				</view>
				
				<view class="footer-box">
					<view class="field-row">
						<text class="field-label">已逝亲人姓名:</text>
						<text class="field-value" v-if="address.deceasedName">{{address.deceasedName}}</text>
						<text class="field-value1" v-else>(如爷爷张宝宝)</text>
					</view>
					<view class="field-row">
						<text class="field-label">安葬地址:</text>
						<text class="field-value" v-if="address.deceasedAddress">{{address.deceasedAddress}}</text>
						<text class="field-value1" v-else>(请尽量填写精确地址)</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="shop-box">
			<view class="tabs">
				<view v-for="(tab, index) in tabs" :key="index" class="tab-wrapper">
					<view 
						:class="['tab-item', { active: selectedTab === index }]"
						@click="selectTab(index)">
						{{ tab }}
					</view>
					<!-- 在最后一个tab之后不显示分隔符 -->
					<text v-if="index < tabs.length - 1" class="divider">|</text>
				</view>
			</view>
			<view class="grid-container">
				<view class="grid-item" v-for="(item,index) in shopList" :key="index">
					<image class="img" :src="item.shopImg" mode="widthFix"></image>
					<view class="grid-name">
						<view class="">{{item.item_name}}</view>
						<view class="">
							<u-number-box
								v-model="item.num"
								:min="0"
								:max="9999"
								size="20"
								bg-color="#fff"
								input-width="50"
							></u-number-box>
						</view>
					</view>
				</view>
			</view>
			<view class="order-create">
				<view class="order-button-item" @click="toTownGod">
					继续添加表文
				</view>
				<view class="order-button-item" @click="toCreateOrder">
					生成表文转入订单
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getItem } from "@/request/api/liYueApi.js";
	import config from "@/config/config.js"
	export default {
		data() {
			return {
				tabs: ['常用品', '其它'], // 替换为你的Tab名称
				selectedTab: 0, // 初始选中的Tab
				address: {
					yangName: '',
					yangAddress: '',
					deceasedName: '',
					deceasedAddress: ''
				},
				shopList: []
			};
		},
		onLoad() {
			this.getShopList()
		},
		onShow() {
			this.$nextTick(() => {
				uni.$on('feteAddress', (params) => {
					console.log('收到数据',params)
					if (params && params.yangName) {
						this.address = params
					}
				});
			})
		},
		methods: {
			getShopList() {
				const params = {
					filters: JSON.stringify([["category", "=", "商品"]]),
					fields: JSON.stringify(["*"])
				}
				getItem(params).then(res => {
					console.log(res, '商品')
					this.shopList = res.data
					this.shopList.forEach(item => {
						item.shopImg = config.img + item.image
						item.num = 0
					})
				})
			},
			toTownGod() {
				this.go({
					url: '/shop/town-god-text/index',
					params: ''
				})
			},
			selectTab(index) {
				this.selectedTab = index;
			},
			toAddSite(){
				this.go({
					url: '/person/address/index',
					params: this.address
				})
			},
			toCreateOrder() {
				this.go({
					url: '/shop/create-order/index',
					params: ''
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.page {
	width: 100%;
	background-color: #F3F1E3;
	padding: 20rpx;

	.header-box {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		border: 1rpx solid #DFDFDF;
		border-radius: 15rpx;
		background-color: #fff;
		padding: 10rpx;

		.image1 {
			height: 234.45px;
		}

		.image2 {
			position: relative;
			height: 234.45px;

			.content-box {
				position: absolute;
				left: 10rpx;
				top: 30rpx;
				width: 73%;
				display: flex;
				flex-direction: column;
				gap: 5rpx; // 增加字段之间的间距

				.field-row {
					display: flex;  // 使用flex布局
					align-items: flex-start;
					.field-label {
						font-weight: bold;
						text-align: left;  // 文字左对齐
						margin-right: 20rpx;  // 增加label和value之间的间距
					}

					.field-value {
						flex: 1;  // 占据剩余空间
						// word-wrap: break-word;  // 自动换行
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						word-wrap:break-word; // 数字以及字母处理
						word-break: break-all; // 纯数字或纯字母不会自动换行
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;   //  显示2行
					}
					
					.field-value1 {
						flex: 1;  // 占据剩余空间
						word-wrap: break-word;  // 自动换行
						color: #AAAAAA;
						font-size: 24rpx;
					}
				}
			}
			.footer-box {
				position: absolute;
				bottom: 30rpx;
				right: 0;
				width: 73%;
				display: flex;
				flex-direction: column;
				gap: 5rpx; // 增加字段之间的间距
				
				.field-row {
					display: flex;  // 使用flex布局
					align-items: flex-start;
					.field-label {
						font-weight: bold;
						text-align: left;  // 文字左对齐
						margin-right: 20rpx;  // 增加label和value之间的间距
					}
				
					.field-value {
						flex: 1;  // 占据剩余空间
						// word-wrap: break-word;  // 自动换行
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						word-wrap:break-word; // 数字以及字母处理
						word-break: break-all; // 纯数字或纯字母不会自动换行
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;   //  显示2行
					}
					
					.field-value1 {
						flex: 1;  // 占据剩余空间
						word-wrap: break-word;  // 自动换行
						color: #AAAAAA;
						font-size: 24rpx;
					}
				}
			}
		}
	}
	
	.shop-box {
		.tabs {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding: 30rpx 0 30rpx 0;
			.tab-wrapper {
				display: flex;
				align-items: center;
				.tab-item {
					font-size: 30rpx;
					// padding: 10rpx 20rpx;
					color: #000;
					position: relative;
					cursor: pointer;
				}
				
				.divider {
					margin: 0 10rpx;
					color: #999;
				}
				
				.tab-item.active {
					font-weight: bold;
				}
			}
		}
		.grid-container {
			display: grid;
			grid-template-columns: repeat(2, 340rpx); /* 每行三个固定宽度的列 */
			gap: 20rpx; /* 元素之间的间距 */
			width: 100%; /* 容器宽度为 100% */
			justify-content: space-between;
			.grid-item {
				border-radius: 15rpx;
				overflow: hidden;
				border: 1rpx solid #9B9CA2;
				background-color: #fff;
				.img {
					width: 100%;
					height: 100%;
				}
				.grid-name {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 20rpx;
				}
			}
		}
		.order-create {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 30rpx;
			.order-button-item {
				width: 45%;
				padding: 20rpx 0;
				border: 1rpx solid #DDDDDC;
				background-color: #fff;
				border-radius: 15rpx;
				text-align: center;
				font-weight: bold;
			}
		}
	}
}

</style>
