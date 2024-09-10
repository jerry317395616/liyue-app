<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '',
				e: null
			}
		},
		// // 将小程序分享给好友
		// onShareAppMessage(res) {
		// 	return {
		// 		title: this.e.customTitle || "", // 标题
		// 		path: `/pages/web-view/web-view?url=${this.e.url}&customTitle=${this.e.customTitle}` // 分享路径
		// 	}
		// },
		// // 将小程序分享到朋友圈
		// onShareTimeline() {
		// 	return {
		// 		title: this.e.customTitle || "", // 标题
		// 		path: `/pages/web-view/web-view?url=${this.e.url}` // 分享路径
		// 	}
		// },
		onLoad(e) {
			// this.e = e;
			let obj = JSON.parse(JSON.stringify(e))
			let url = "";
			if(e.url){
				url = obj.url;
				delete obj.url;
				url = this.$gy.splicingParmas(url, obj);
				this.url = url;
			}else{
				console.error("web-view 加载的页面地址不能为空");
			}
		}
	}
</script>