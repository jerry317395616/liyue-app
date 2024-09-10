import request from '@/request/index.js';

/**
 * login
 */
export const wechatLogin = (params) => {
	return request.post({
		url: '/method/liyue.api.wechat_login.wechat_login',
		data: params
	})
}

/**
 * register
 */
export const wechatRegister = (params) => {
	return request.post({
		url: '/resource/Ly User',
		data: params
	})
}

/**
 * item
 */
export const getItem = (params) => {
	return request.get({
		url: '/resource/Ly Item',
		params: params
	})
}

/**
 * create order
 */
export const createOrder = (params) => {
	return request.post({
		url: '/resource/Ly Sales Order',
		data: params
	})
}