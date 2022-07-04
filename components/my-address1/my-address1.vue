<template>
  <view>
    <!-- 选择收货地址 -->
    <view class="address-choose-box" v-if="JSON.stringify(address) == '{}'">
      <button type="default" @click="chooseAddress">请选择收货地址</button>
    </view>
    <!-- 渲染收货地址 -->
    <view class="address-info-box" v-else>
      <view class="row1">
        <view class="row1-left">
          <view class="username">收货人: {{address.userName}}</view>
        </view>
        <view class="row1-right">
          <view class="phone">电话: {{address.telNumber}}</view>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">收货地址: </view>
        <view class="row2-right"> {{addstr}}</view>
      </view>
    </view>
  </view>
</template>

<script>
  import {mapState, mapMutations, mapGetters} from 'vuex'
  export default {
    name:"my-address1",
    data() {
      return {
        address: {}
      };
    },
    methods: {
      ...mapMutations('m_user',['updateAddress']),
      async chooseAddress() {
        const [err, succ] = await uni.chooseAddress().catch(err => err)
        if(err === null && succ.errMsg === 'chooseAddress:ok') {
          console.log(succ)
          this.address = succ
          // this.updateAddress(succ)
        }
      },
    },
    computed:{
      ...mapState('m_user',['address']),
      ...mapGetters('m_user',['addstr']),
      addstr() {
          if(!this.address.provinceName) return ''
          return this.address.provinceName + this.address.cityName + this.address.countyName + this.address.detailInfo
        }
    }
  }
</script>

<style lang="scss">
.address-choose-box {
  margin:50rpx 0;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  button{
    background: black;
    color: white;
  }
}
.address-info-box{
  margin: 20rpx;
  border: 3px solid #000000;
  font-size: 30rpx;
  height: 180rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10rpx;
  .row1{
    display: flex;
    justify-content: space-between;
    
    .row1-left {
      .username {
        
      }
    }
    .row1-right {
      display: flex;
      justify-content: space-between;
      
      .phone {
        
      }
    }
  }
  .row2{
    display: flex;
    align-items: center;
    margin-top: 20rpx;
    .row2-left{
      white-space: nowrap;
    }
    .row2-right {
      margin-left: 10rpx;
    }
  }
}
</style>
