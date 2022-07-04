<template>
    <view>
			<view class="cover_screen" @click="hideBuyModal" v-if="showModalStatus"></view>
			<view class="buy_box" v-if="showModalStatus">
				<text class="title">{{title}}</text>
				<text class="newdetaildivider"></text>
				<text class="title" @tap="toCarmea">拍照</text>
				<text class="newdetaildivider"></text>
				<text class="title" @tap="toPhoto">相册</text>
				<text class="newdetaildivider"></text>
				<text class="title" @tap="primary">取消</text>
			</view>
		</view>
<!--  <view>
  		<view class="show-box-bg wx-login-box">
  			<view class="conten">
  				<view class="titl">{{ popupMsg.title }}</view>
  				<view class="text">{{ popupMsg.content }}</view>
  				<view class="btn-box">
  					<view class="cancel" @click='hidePopup("no")'>{{ popupMsg.cancel }}</view>
  					<view class="confirm" @click='hidePopup("yes")'>{{ popupMsg.confirm }}</view>
  				</view>
  			</view>
  		</view>
  	</view> -->
 
</template>
 
<script>
	export default {
		props:{
					isShowImgTitle:{
						type:Boolean,
						value:false
					},
					title:{
						type:String,
						value:'上传头像'
					},
        },
    // props: ['popupMsg'],
		data() {
			return {
				showModalStatus: false
			}
		},
		methods: {
			show(){
							this.showModalStatus = true
						},
						hide(){
							this.showModalStatus = false
						},
						hideBuyModal:function(){
							this.hide()
						},
						toCarmea:function(){
							console.log("~~~")
							this.$emit('toCarmea')
						},
						toPhoto:function(){
							console.log("~~~")
							
							this.$emit('toPhoto')
						},
						primary:function(){
							console.log("~~~")
							this.$emit('primary')
						},
      hidePopup:function(type) {
      			    //子组件中，使用$emit调用父组件自定义事件，还可以传参
      				this.$emit('handlePopup', type)
      			},
            primary() {
            	console.log('关闭弹框')
            	this.$refs.chooseImg.hide()
            },
            //打开相机
            toCarmea() {
            	console.log('调用打开相机方法')
            	this.$refs.chooseImg.hide()
            },
            toPhoto() {
            //打开相册
            }
			
		}
	}
</script>
 
<style lang="scss">
	.buy_box {
		  width: 100%;
		  box-sizing: border-box;
		  position: fixed;
		  bottom: 0;
		  left: 0;
		  z-index: 2000;
		  background: #fff;
		  overflow: hidden;
		  display: flex;
		  flex-direction: column;
		}
		
		.newdetaildivider {
		  height: 1px;
		  background: #eaeaea;
		  display: block;
		}
		
		.title {
		  display: flex;
		  height: 99rpx;
		  font-size: 36rpx;
		  text-align: center;
		  align-items: center;
		  justify-content: center;
		}
		
		.titleImg {
		  flex-direction: column;
		  display: flex;
		  background-color: #eeeeee;
		}
		
		.titleImg text{
		  margin-top: 12rpx;
		  display: flex;
		  font-size: 36rpx;
		  text-align: center;
		  align-items: center;
		  justify-content: center;
		}
		
		.imgs {
		  margin-top: 12rpx;
		  display: flex;
		  justify-content: space-between;
		  margin-left: 30rpx;
		  margin-right: 30rpx;
		  margin-bottom: 12rpx;
		}
		
		.cover_screen {
		  width: 100%;
		  height: 100%;
		  position: fixed;
		  top: 0;
		  left: 0;
		  background: #000;
		  opacity: 0.2;
		  overflow: hidden;
		  z-index: 1000;
		  color: #fff;
		}
</style>
