<template>
  <view class="tall">
    <view class="service-top">
      <view class="service-text">
        需要帮助?请联系客服:{{text}}
      </view>
      <view class="service-button">
        <button type="primary" @click="copy(text)">复制客服微信</button>
      </view>
    </view>
    <view class="service-bottom">
      <view class="QR-code">
        <image src="../../static/QR.jpg" mode=""></image>
      </view>
      <view class="service-bottom-text">
        <view class="text1">微信公众号: BABYFACE世贸店</view>
        <!-- <view class="text2">官方微博:{{text}}</view> -->
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        text:'BABYFACE-vip1'
      };
    },
    methods: {
       copy(text) {
       	uni.setClipboardData({
       	    data: 'BABYFACE-vip1',
       	    success: function () {
       	        console.log('success',text);
       	    }
       	});
       }
    }
  }
</script>

<style lang="scss">
  .tall {
    .service-top {
      height: 500rpx;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
     .service-text {
       font-size: 34rpx;
       color: #666666;
     }
     .service-button {
       margin-top: 40rpx;
       button {
         width: 600rpx;
         color: yellow;
         background-color: black;
         font-weight: 500;
       }
     } 
    }
    .service-bottom {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .QR-code {
        margin: 40rpx 0;
        image {
          width: 240rpx;
          height: 240rpx;
        }
      }
      .service-bottom-text {
        text-align: center;
        font-size: 34rpx;
        color: #666666;
      }
    }
  }
</style>
