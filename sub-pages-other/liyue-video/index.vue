<template>
	<view class="container">
		<video v-if="videoUrl" id="myVideo" :src="videoUrl" :fullscreen="true"></video>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoUrl: '',
				videoContext: null
			};
		},
		onReady: function(res) {
			this.videoContext = uni.createVideoContext('myVideo');
			this.videoContext.play();
		},
		onLoad(options) {
			console.log('页面加载参数:', options); // 调试日志
			if (options.url) {
				this.$nextTick(() => {
					this.videoUrl = decodeURIComponent(options.url); // 接收传入的视频 URL
					console.log('视频 URL:', this.videoUrl); // 调试日志
				})
			} else {
				console.error('没有传入视频 URL');
			}
		},
		methods: {

		}
	};
</script>

<style scoped>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-color: black;
	}

	#myVideo {
		width: 100%;
		height: 100%;
		object-fit: contain;
		/* 确保视频按比例缩放以适应容器 */
	}

	.error-message {
		color: white;
	}
</style>