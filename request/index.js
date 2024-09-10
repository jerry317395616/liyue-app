import appConfig from "@/config/config.js"
import Request from '@/plugins/luch-request/index.js'

const http = new Request();

/**
 * @description 修改全局默认配置
 * @param {Function}   
 */
http.setConfig((config) => { /* config 为默认全局配置*/
	/* 根域名 */
	config.baseURL = appConfig.baseUrl;
	// 默认开启 showLoading
	config.custom = {
		showLoading: true
	}
	config.header = {
		// contentType: "application/x-www-form-urlencoded"
		'Content-Type': 'application/json'
	}
	return config
})


// 为了保证 同一个页面 同时发起多次接口请求而不会多次闪出 "加载中。。"
let requestNum = 0

/**
 * 在请求之前拦截
 */
http.interceptors.request.use((config) => {
	requestNum = requestNum + 1
	if (requestNum === 1) {
		if (config.custom.showLoading) {
			// 打开请求遮罩层
			uni.showLoading({
				title: '加载中，请稍候',
				mask: true,
			});
		}
	}
	let token = uni.getStorageSync("token");
	let user_id = uni.getStorageSync("user_id");

	config.header = {
		...config.header,
		"Authorization": "token 7f6546a02c53292:8e189362e983528",
		"token": token ? token : "",
		"user_id": user_id ? user_id : "",
		"Client-Type": "WECHAT"
	}
	return config
}, config => { // 可使用async await 做异步操作
	return Promise.reject(config)
})


// 响应拦截
http.interceptors.response.use((res) => {
	requestNum = requestNum - 1
	if (requestNum < 1) {
		// 关闭请求遮罩层
		uni.hideLoading()
	}
	//获取状态码
	const status = res.data.code || res.statusCode;
	const message = res.data.msg || res.data.errMsg || '未知错误';
	if (status == 200) {
		// res为服务端返回值，可能有code，data等字段
		return res.data;
	}
	uni.showToast({
		icon: "none",
		title: message,
		duration: 3000
	});
	return Promise.reject("error")
}, error => {
	// console.log("**************************************   error")
	requestNum = 0
	// 当请求异常之后关闭loading
	uni.hideLoading()
	//获取状态码
	const status = error.data.code || error.statusCode || undefined;
	const message = error.data.msg || error.errMsg || '未知错误';
	uni.showToast({
		icon: "none",
		title: message,
		duration: 2000
	});
	if (status == 401) {
		uni.removeStorageSync("token");
	}
});


export default http;
