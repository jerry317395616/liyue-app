<template>
	<view class="page">
		<u-form :model="form" ref="uForm" :label-width="180">
			<view class="expressage-text">
				寄：
			</view>
			<view class="form-item-box">
				<u-form-item label="阳上人" prop="yangName" required>
					<u-input v-model.trim="form.yangName" placeholder="如果多人姓名请用“*”号隔开" />
				</u-form-item>
				<u-form-item label="地址" prop="yangAddress" required>
					<u-input type="textarea" v-model="form.yangAddress"  placeholder="请精确到市区" autoHeight />
				</u-form-item>
			</view>
			<view class="expressage-text">
				收：
			</view>
			<view class="form-item-box">
				<u-form-item label="已逝亲人" prop="deceasedName" required>
					<u-input v-model.trim="form.deceasedName" placeholder="如爷爷张宝宝" />
				</u-form-item>
				<u-form-item label="安葬地址" prop="deceasedAddress" required>
					<u-input type="textarea" v-model="form.deceasedAddress"  placeholder="请尽量填写精确地址" autoHeight />
				</u-form-item>
			</view>
		</u-form>
		<view class="addSite" @click="save">
			确&nbsp;&nbsp;&nbsp;&nbsp;定
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			pickerType: '',
			show: false,
			form: {
				yangName: '',
				yangAddress: '',
				deceasedName: '',
				deceasedAddress: ''
			},
			rules: {
				yangName: [
					{ 
						required: true, 
						message: '请输入阳上人', 
						trigger: ['change','blur'],
					}
				],
				yangAddress: [
					{
						required: true, 
						message: '请输入地址', 
						trigger: ['change','blur'],
					}
				],
				deceasedName: [
					{ 
						required: true, 
						message: '请输入已逝亲人', 
						trigger: ['change','blur'],
					}
				],
				deceasedAddress: [
					{
						required: true, 
						message: '请输入安葬地址', 
						trigger: ['change','blur'],
					}
				],
			}
		};
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules)
	},
	onLoad(params) {
		console.log(JSON.parse(JSON.stringify(params)), 'params===>')
		if (params.yangName) {
			this.form = params
		}
	},
	methods: {
		showRegionPicker(type) {
			this.pickerType = type
			this.show = true;
		},
		save() {
			this.$refs.uForm.validate(valid => {
				if (valid) {
					if (this.form.yangName.length > 40 || this.form.yangName.length < 2) {
					    this.$u.toast('阳上人输入格式有误，请输入2~40位汉字或字母');
					    return;
					}
					if (this.form.deceasedName.length > 40 || this.form.deceasedName.length < 2) {
					    this.$u.toast('已逝亲人输入格式有误，请输入2~40位汉字或字母');
					    return;
					}
					console.log(this.form, 'this.form')
					uni.$emit('feteAddress', this.form)
					uni.switchTab({
						url: "/pages/fete/index"
					})
				} else {
					console.log('验证失败');
				}
			})
		}
	}
};
</script>

<style lang="scss" scoped>
	.page {
		padding-bottom: 160rpx;
		.form-item-box {
			background-color: #fff;
			padding: 20rpx 20rpx 20rpx 40rpx;
			// border-radius: 16rpx;
			.default-address-box {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
		// .form-item-box:nth-child(n+1) {
		// 	margin-top: 20rpx;
		// }
		
		.addSite {
			display: flex;
			justify-content: space-around;
			width: 600rpx;
			// position: absolute;
			// bottom: 60rpx;
			// left: 80rpx;
			background-color: #232524;
			border-radius: 60rpx;
			font-size: 30rpx;
			color: #bec2c0;
			padding: 15rpx 40rpx;
			margin: 60rpx auto 20rpx;
		}
		
		.expressage-text {
			margin: 20rpx 0 20rpx 20rpx;
			font-size: 32rpx;
			font-weight: bold;
		}
	}
</style>
