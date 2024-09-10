<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			/* 小程序的自动更新 */
			if (wx.canIUse('getUpdateManager')) {
				const updateManager = wx.getUpdateManager()
				updateManager.onCheckForUpdate(function(res) {
					// 请求完新版本信息的回调
					if (res.hasUpdate) {
						updateManager.onUpdateReady(function() {
							wx.showModal({
								title: '更新提示',
								content: '新版本已经准备好，是否重启小程序？',
								success: function(res) {
									if (res.confirm) {
										updateManager.applyUpdate()
									}
								}
							})
						})
						updateManager.onUpdateFailed(function() {
							// 新的版本下载失败
							wx.showModal({
								title: '已经有新版本啦',
								content: '新版本已经上线，请您删除当前小程序，重新搜索打开'
							})
						})
					}
				})
			} else {
				uni.showModal({
					title: '温馨提示',
					content: '当前微信版本过低，要获取最佳体验，请升级到最新微信版本'
				})
			}
		},
		onShow: function() {
			console.log('App Show')
			uni.getNetworkType({
				complete: (res) => {
					if (res.networkType === "none") {
						this.go({
							url: "/sub-pages-other/network/error",
							type: "reLaunch"
						})
					}
				}
			})
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "/plugins/uview-ui/index.scss";
	@import '/style/main.scss';
</style>