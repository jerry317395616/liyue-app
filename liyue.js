import Vue from 'vue';
import config from '@/config/config.js';
import { wechatLogin } from "@/request/api/liYueApi.js";

let liyue = {
	splicingParmas: function(url, params) {
		let str = url.endsWith("?") ? url.substring(0, url.length - 1) : url
		Object.keys(params).forEach((key, index) => {
			str += (index === 0 ? "?" : "&") + key + "=" + params[key]
		})
		return str
	},
	goHome: function(params) {
		let path = '/pages/index/index';
		if (params) {
			path = this.splicingParmas(path, params)
		}
		uni.reLaunch({
			url: path
		});
	},
	modal: function(title, content, callback){
		uni.showModal({
			title: title,
			content: content,
			success: (res) => {
				if (res.confirm) {
					callback()
				}
			}
		});
	},
	loading: function(title){
		uni.showLoading({
			title: title
		})
	},
	tip: function(title){
		uni.showToast({
			title: title,
			icon: "none",
			duration: 1500
		})
	},
	webview: function(params) {
		console.log(params);
		uni.navigateTo({
			url: this.splicingParmas("/pages/web-view/web-view", params)
		})
	},
	login: function(callback) {
		this.modal("登录/注册", "是否同意登录/注册", () => {
			this.loading("登录中...")
			uni.login({
				provider: "weixin",
				success: (response) => {
					uni.setStorageSync('wechat_access_code', response.code);
					wechatLogin({
						// 此处调用自己的登录接口
						code: response.code
					}).then(res => {
						console.log(res,'res')
						uni.setStorageSync("openId", res.message.openid);
						if (res && res.message && res.message.token != "") {
							uni.setStorageSync("token", res.message.token);
							uni.setStorageSync("user_id", res.message.user_id);
							uni.setStorageSync("wechat_access_code", res.message.session_key);
							setTimeout(() => {
								uni.hideLoading();
								if (callback) {
									callback()
								}
							}, 1000)
						} else {
							uni.hideLoading();
							uni.navigateTo({
								url: "/sub-pages-other/authorize/index"
							})
						}
					}).catch(err => {
						uni.hideLoading()
						uni.showToast({
							title: "请进入微信小程序",
							icon: "none"
						})
					})
				},
				fail: (err) => {
					uni.hideLoading()
					uni.showToast({
						title: err,
						icon: "none"
					})
				}
			})
		})
	}
}

Vue.prototype.$liyue = liyue;

setTimeout(() => {
    console.log("项目全局挂载：", Vue.prototype.liyue)
}, 500)