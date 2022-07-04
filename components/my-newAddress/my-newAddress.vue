<template>
  <view class="newAddress-info-box">
    <view class="row1">
      <view class="row1-left">
        <view class="username">
          联系人
        </view>
      </view>
      <view class="row1-right">
        <uni-icons type="arrowringt" size="16"></uni-icons>
      </view>
    </view>
    <view class="row2">
      <view class="phone">
        手机号码
      </view>
    </view>
    <view class="row3">
      <view class="row3-left">
        <view class="region">
          地区信息
        </view>
      </view>
      <view class="row3-right">
        <uni-icons type="arrowringt" size="16"></uni-icons>
      </view>
    </view>
    <view class="row4">
      <view class="street">
        详细地址
      </view>
    </view>
    <view class="row5">
      <view class="postalCode">
        邮政编码
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-newAddress",
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss">
  .newAddress-info-box {
    .row1 {
      .row1-left {
        .username {
          
        }
      }
      .row1-right {
        
      }
    }
    .row2 {
      .phone {
        
      }
    }
    .row3 {
      
    }
    .row4 {
      .street {
        
      }
    }
  }
</style>
