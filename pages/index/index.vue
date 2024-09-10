<template>
	<view class="page">
		<swiper class="swiper" circular :indicator-dots="swiper.indicatorDots" :autoplay="swiper.autoplay" :interval="swiper.interval"
			:duration="swiper.duration" @change="onSwiperChange">
			<swiper-item class="swiper-item" v-for="(item, index) in bannerList" :key="index">
				<video
					v-if="item.url"
					ref="videos"
					:id="item.url"
					:src="item.url"
					autoplay
					loop
					muted
					:controls="false"
					:show-fullscreen-btn="false"
					:show-play-btn="false"
					:show-center-play-btn="false"
					:show-loading="false"
					:enable-progress-gesture="false"
					:vslide-gesture-in-fullscreen="false"
					class="bg-video"
					object-fit="cover" 
					play-btn-position="center"
					></video>
			</swiper-item>
		</swiper>
		<view class="liyue-logo-bg">
			<image src="@/static/images/material-item6.png" mode="aspectFit"></image>
		</view>
		<view class="view-box1" @click="redClick">
			<view class="view-box-child">
				
			</view>
		</view>
		<view class="view-box2">
			<view class="view-box2-child1">
				<view class="view-box2-child2">
					
				</view>
			</view>
			<view class="view-box2-child1">
				<view class="view-box2-child2">
					
				</view>
			</view>
		</view>
		<view class="view-box3">
			<view class="view-box-child">
				
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
				swiper: {
					indicatorDots: true,
					autoplay: true,
					interval: 10000,
					duration: 500
				},
				bannerList: [],
				currentIndex: 0
			}
		},
		onLoad() {
			if (!uni.getStorageSync("token")) {
				this.$liyue.login('',() => {
					console.log('登录')
				})
			}
		},
		onShow() {
			if (!uni.getStorageSync("token")) {
				this.$liyue.login('',() => {
					console.log('登录')
				})
			} else {
				this.init()
			}
		},
		onReady: function() {
			this.playVideo(this.currentIndex);
			// this.bannerList.forEach(item => {
			//   const videoContext = uni.createVideoContext(item.url, this);
			//   videoContext.play();
			// });
		},
		methods: {
			init() {
				this.getVideo()
			},
			redClick() {
				console.log('点击了')
			},
			getVideo() {
				const params = {
					filters: JSON.stringify([["category", "=", "首页视频"]]),
					fields: JSON.stringify(["*"])
				}
				getItem(params).then(res => {
					console.log(res, '首页背景视频')
					this.bannerList = res.data
					this.bannerList.forEach(item => {
						item.url = config.img + item.video
					})
				})
			},
			playVideo(index) {
				this.$nextTick(() => {
					this.bannerList.forEach((video, i) => {
						const videoContext = uni.createVideoContext(video.url, this);
						if (i === index) {
							videoContext.seek(0);
							videoContext.play();
						} else {
							videoContext.pause();
						}
					});
				});
			},
			onSwiperChange(e) {
				this.currentIndex = e.detail.current;
				this.playVideo(this.currentIndex);
			}
		}
	}
</script>

<style lang="scss" scoped>
.page {
	height: 100vh;
	width: 100%;
	position: relative;
	.swiper {
		position: relative;
		height: 100%;
		width: 100%;
		.swiper-item {
			.bg-video {
				width: 100%;
				height: 100%;
			}
		}
	}
	.liyue-logo-bg {
		position: absolute;
		left: 50%;
		top: 20%;
		transform: translateX(-50%);
		width: 150rpx;
		height: 150rpx;
		z-index: 10;
	}
	.view-box1 {
		position: absolute;
		left: 50%;
		top: 53%;
		transform: translateX(-50%);
		width: 90%;
		height: 200rpx;
		z-index: 10;
		// pointer-events: none; // 禁止 .view-box1 响应事件，确保轮播图滑动不受影响
		
		border: 4rpx solid #F1EDE9;
	    border-radius: 15rpx;
	    padding: 6rpx;
	    background-color: rgba(255, 255, 255, 0);
	    box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.2);
		box-sizing: border-box;
		
		.view-box-child {
			width: 100%;
			height: 100%;
			background-color: #F1EDE9;
			border-radius: 5rpx;
			position: relative; 
			z-index: 1;
			overflow: hidden;
		}
	}
	
	.view-box2 {
		position: absolute;
		left: 50%;
		top: 68%;
		transform: translateX(-50%);
		width: 90%;
		height: 200rpx;
		z-index: 10;
		// pointer-events: none; // 禁止 .view-box1 响应事件，确保轮播图滑动不受影响
		
		display: flex;
		justify-content: space-between;
		align-items: center;
		
		.view-box2-child1 {
			width: 49%;
			height: 100%;
			border: 4rpx solid #F1EDE9;
			border-radius: 15rpx;
			padding: 6rpx;
			background-color: rgba(255, 255, 255, 0);
			box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.2);
			box-sizing: border-box;
			.view-box2-child2 {
				width: 100%;
				height: 100%;
				background-color: #F1EDE9;
				border-radius: 5rpx;
				position: relative; 
				z-index: 1;
				overflow: hidden;
			}
		}
	}
	
	.view-box3 {
		position: absolute;
		left: 50%;
		top: 83%;
		transform: translateX(-50%);
		width: 90%;
		height: 200rpx;
		z-index: 10;
		// pointer-events: none; // 禁止 .view-box1 响应事件，确保轮播图滑动不受影响
		
		border: 4rpx solid #F1EDE9;
	    border-radius: 15rpx;
	    padding: 6rpx;
	    background-color: rgba(255, 255, 255, 0);
	    box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.2);
		box-sizing: border-box;
		
		.view-box-child {
			width: 100%;
			height: 100%;
			background-color: #F1EDE9;
			border-radius: 5rpx;
			position: relative; 
			z-index: 1;
			overflow: hidden;
		}
	}
	
	//未选中的指示点样式，支持h5、app
	/deep/ .uni-swiper-dot{
		width: 6rpx;
		height: 6rpx;
		background: #FFFFFF;
		border-radius: 50%;
	}
	//未选中的指示点样式，支持微信小程序
	/deep/ .wx-swiper-dot {
		width: 6rpx;
		height: 6rpx;
		background: #FFFFFF;
		border-radius: 50%;
	}
	//选中的指示点样式，支持h5、app
	/deep/ .uni-swiper-dot-active{
		width: 30rpx;
		height: 6rpx;
		background: #FFFFFF;
		border-radius: 0;
	}
	//选中的指示点样式，支持微信小程序
	 /deep/ .wx-swiper-dot-active {
		width: 30rpx;
		height: 6rpx;
		background: #FFFFFF;
		border-radius: 0;
	}
	//指示点位置，支持h5、app
	/deep/ .uni-swiper-dots-horizontal{
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translateX(-50%);
	}
	//指示点位置，支持微信小程序
	/deep/ .wx-swiper-dots-horizontal{
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translateX(-50%);
	}
}
</style>
