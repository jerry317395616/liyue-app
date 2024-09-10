<template>
	<view>
		<view class="page-content">
			<u-image width="200rpx" height="200rpx" :src="img" shape="circle" />
			<view class="tips">
				为了方便您使用小程序进行商品购买、维护地址等服务，将获取您的手机号码
			</view>
			<checkbox-group @change="checkboxChange" style="margin-bottom: 100rpx;">
				<label class="uni-list-cell uni-list-cell-pd" v-for="item in items" :key="item.value">
					<view>
						<checkbox :value="item.value" :checked="item.checked">
							我已阅读并同意
							<text @click.stop="goUserAgreement">《用户使用条款》</text>
							<text @click.stop="goPrivacy">《隐私政策》</text>及
						</checkbox>
					</view>
				</label>
			</checkbox-group>
			<u-button class="custom-btn" shape="circle" :disabled="!agreePrivacy" type="primary"
				@click="getUserPhone1">使用手机号码登录</u-button>
			<!-- <u-button class="custom-btn" shape="circle" open-type="getPhoneNumber" :disabled="!agreePrivacy" type="primary" @getphonenumber="getUserPhone">使用手机号码登录</u-button> -->
			<u-button class="custom-btn" shape="circle" type="info" @click="backHome"
				:custom-style="backBtnStyle">暂不登录</u-button>

			<u-popup v-model="show" mode="bottom">
				<view class="content">
					<u-form :model="user" ref="registerForm" :error-type="['border-bottom']">
						<u-row>
							<u-col span="12">
								<view style="padding-top: 30rpx;">
									<u-form-item prop="phone">
										<u-input v-model="user.phone" type="number" placeholder-style="color:#999"
											placeholder="请输入手机号码" />
									</u-form-item>
								</view>
							</u-col>
						</u-row>
						<u-row>
							<u-col span="12">
								<u-form-item prop="code">
									<view style="float: left; width:70%;">
										<u-input v-model="user.code" class="input-font" type="number"
											placeholder-style="color:#999" placeholder="请输入验证码" />
									</view>
									<view style="float: left; width:30%;margin-top: 5rpx;">
										<u-toast ref="uToast"></u-toast>
										<u-verification-code :seconds="seconds" change-text="xs" ref="uCode"
											@start="codeStart" @end="codeEnd"
											@change="codeChange"></u-verification-code>
										<u-button @click="getCode" :type="codeBtnType" :custom-style="codeBtnStyle"
											size="medium" shape="circle" plain>{{tips}}</u-button>
									</view>
								</u-form-item>
							</u-col>
						</u-row>
					</u-form>
					<view class="bindButton" @click="doLogin">
						确定
					</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import { wechatRegister,wechatLogin } from "@/request/api/liYueApi.js";
	import config from "@/config/config.js"
	export default {
		data() {
			return {
				img: require('@/static/images/logo.jpg'),
				agreePrivacy: false,
				items: [{
					value: 'USA',
					name: 'agreePrivacy'
				}],
				backBtnStyle: {
					backgroundColor: '#cacaca',
					border: 'none',
					color: '#fff',
					marginTop: "30rpx"
				},
				show: false,
				tips: '',
				seconds: 60,
				codeBtnType: "primary",
				codeBtnStyle: {
					width: '180rpx',
					height: '60rpx',
					float: 'left',
					fontSize: '26rpx',
					fontWeight: 'Medium'
				},
				code: '',
				user: {
					phone: null,
					code: null
				}
			}
		},
		onReady() {
			this.$refs.registerForm.setRules(this.rules);
		},
		methods: {
			codeChange(text) {
				this.tips = text;
			},
			codeStart() {
				this.codeBtnType = "info"
				this.codeBtnStyle = {
					width: "180rpx",
					height: "60rpx",
					color: "#999"
				}
			},
			codeEnd() {
				this.codeBtnType = "error"
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					if (this.$u.test.mobile(this.user.phone)) {
						uni.showLoading({
							title: '正在获取验证码'
						})
						let param = {
							phone: this.user.phone
						}
						sendCode(param).then(res => {
							uni.hideLoading();
							this.$u.toast('验证码已发送');
							// 通知验证码组件内部开始倒计时
							this.$refs.uCode.start();
						})
					} else {
						this.$u.toast('手机号码输入有误');
					}
				}
			},
			getUserPhone1() {
				// const that = this
				// uni.login({
				//   provider: 'weixin', //使用微信登录
				//   success: function (loginRes) {
				// 	console.log(loginRes, 'loginRes');
				// 	that.code = loginRes.code
				// 	that.show = true
				// 	console.log(that.code, 'that.code')
				//   }
				// });
				this.show = true
			},
			doLogin() {
				console.log('注册')
				this.$refs.registerForm.validate(valid => {
					if (!this.$u.test.mobile(this.user.phone)) {
						this.$u.toast('手机号码输入有误');
						return;
					}
					if (!this.user.code) {
						this.$u.toast('请输入验证码');
						return;
					}
					if (valid) {
						const params = {
							phone: this.user.phone,
							code: this.user.code,
							wx_openid: uni.getStorageSync('openId'),
							fields: JSON.stringify(["*"])
						}
						wechatRegister(params).then(res => {
							console.log(res, 'res')
							uni.setStorageSync('user', res.data)
							this.$u.toast('注册成功，登录中');
							this.login()
							// uni.setStorageSync("token", res.message.token);
							// uni.setStorageSync("user_id", res.message.user_id);
							// uni.setStorageSync("wechat_access_code", res.message.session_key);
						})
						// userBind(params).then(res => {
						// 	if (res.success) {
						// 		const data = res.data;
						// 		console.log(data, 'dataiiiiii')
						// 		this.$u.toast('绑定成功');
						// 		uni.setStorageSync('token', data.token)
						// 	} else {
						// 		this.$u.toast(res.msg);
						// 	}
						// })
					}
				});
			},
			login() {
				uni.login({
					provider: "weixin",
					success: (response) => {
						uni.setStorageSync('wechat_access_code', response.code);
						wechatLogin({
							// 此处调用自己的登录接口
							code: response.code
						}).then(res => {
							console.log(res,'res')
							if (res && res.message && res.message.token != "") {
								uni.setStorageSync("token", res.message.token);
								uni.setStorageSync("user_id", res.message.user_id);
								uni.setStorageSync("wechat_access_code", res.message.session_key);
								this.$gy.goHome()
							} else {
								uni.navigateTo({
									url: "/sub-pages-other/authorize/index"
								})
							}
						}).catch(err => {
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
			},
			/*  不登录返回首页 */
			backHome() {
				uni.navigateBack()
			},
			checkboxChange: function(e) {
				var items = this.items,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.includes(item.value)) {
						this.$set(item, 'checked', true)
					} else {
						this.$set(item, 'checked', false)
					}
				}
				this.agreePrivacy = items[0].checked
			},
			getUserPhone(e) {
				let accessCode = uni.getStorageSync('wechat_access_code')
				console.log(e, accessCode, '222')
				if (e.detail.errMsg == "getPhoneNumber:ok") {
					uni.checkSession({
						success: (info) => {
							this.doReg(e.detail.encryptedData, e.detail.iv, accessCode)
						},
						fail: (info) => {
							this.$gy.login("system", this.$gy.goHome)
						}
					})
				}
			},
			doReg(encryptedData, iv, code) {
				console.log('来注册了', encryptedData, iv, code)
				// wechatRegister({
				// 	encryptedData: encryptedData,
				// 	iv: iv,
				// 	code: code
				// }).then(response => {
				// 	console.log("进入微信注册")
				// 	const data = response.data;
				// 	if (data && data.token) {
				// 		// 存储 令牌
				// 		uni.setStorageSync('token', data);
				// 		this.$gy.goHome()
				// 	}
				// })
			},
			goUserAgreement() {

			},
			goPrivacy() {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-content {
		width: 100%;
		padding: 100rpx 70rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		.tips {
			font-size: 28rpx;
			color: #666;
			font-weight: 400;
			line-height: 50rpx;
			margin: 60rpx 0;
			padding: 0 10rpx;
		}

		text {
			color: #5983E9;
		}

		checkbox {
			font-size: 24rpx;
		}

		.custom-btn {
			width: 80%;
			margin-top: 30rpx;
		}

		.content {
			padding: 0rpx 28rpx 30rpx 28rpx;
			background-color: #F5F5F5;
			// height: 100vh;

			.bindButton {
				// position: fixed;
				// bottom: 117rpx;
				width: 90%;
				height: 80rpx;
				background: linear-gradient(0deg, #3275ec, #B3CDFA);
				border-radius: 40rpx;
				font-size: 32rpx;
				font-weight: 500;
				color: #FFFFFF;
				text-align: center;
				line-height: 80rpx;
				margin: 120rpx auto 0 auto;
			}
		}
	}
</style>