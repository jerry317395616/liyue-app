import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './liyue.js';
import './static/css/common.css'

// 引入 uview 组件框架
import uView from '@/plugins/uview-ui'

Vue.use(uView)

// 定义全局 路由跳转
Vue.prototype.go = (params) => {
	if (typeof params === 'string') {
		if (params && (params.startsWith("http") || params.startsWith("https"))) {
			app.$u.route({
				url: "/sub-pages-other/web-view/web-view",
				params: {
					url: params
				}
			})
		} else {
			app.$u.route(params);
		}
	}
	if (typeof params === 'object') {
		app.$u.route({
			...params
		});
	}
};

App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif