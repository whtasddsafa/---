<template>
  <view class="app">
    <!-- <view class="allOrders" v-for="(item,i) in goods" :key = "i" @click="billUse(item)"
    v-if="item.payStatus == 1 && item.orderStatus !== 1 && item.orderStatus !== -1 && item.orderStatus !== 0"> -->
    <view class="allOrders" v-for="(item,i) in goods" :key = "i" @click="billUse(item)"
     v-if="item.payStatus == 1 && item.orderStatus == 1">
      <view class="top">
        <view class="orderNo">
          订单号: {{item.orderSn}}
        </view>
      </view>
      <view class="left-img-box">
          <view class="data">
            <view class="img-box" v-for="(item2,i2) in item.goodsList" :key = "i2">
              <image :src="item2.goodsLogo"></image>
            </view>
            <view class="right-box">
              <view class="text-box-top">
                <view class="span1" v-for="(item2, i2) in item.goodsList" :key="i2">
                  <span class="span1">{{ item2.goodsName }}</span>
                </view>
                <view class="span3" v-for="(item2, i2) in item.goodsList" :key="i2">
                  <span>{{item2.address}}</span>
                </view>
                <view class="span2" v-for="(item2, i2) in item.goodsList" :key="i2">
                  活动时间:
                  <uni-dateformat :date="item2.effectiveStartTime" format="yyyy/MM/dd"></uni-dateformat>-
                  <uni-dateformat :date="item2.effectiveEndTime" format="yyyy/MM/dd"></uni-dateformat>
                </view>
                <!-- <view class="span4">
                  <span>选择场次:{{item.changci}}</span>
                </view> -->
              </view>
            </view>
          </view>
      </view>
    </view>
  </view>
</template>

<script>
  import minActionSheet from '@/components/min-action-sheet/min-action-sheet'
  import likes from '@/components/my-collection/my-collection'
  export default {
    components: {minActionSheet,likes},
    data() {
      return {
        goods: [],
        goodsList: [],
        page: 1,
        page_num: 50,
      };
    },
    onShow() {
      this.getFloorList()
    },
    methods:{
     //获取票据列表
     async getFloorList() {
       const {data: res} = await uni.$http.get('/shop/user-order-list',{
         page: this.page,
         page_num: this.page_num
       })
       // console.log(res);
       if(res.code !== 0) return uni.$showMsg()
         this.goods = [...this.goodsList, ...res.data]  //下拉加载更多拼接
     },
     billUse(item) {
       uni.navigateTo({
         url: '/subpkg/billUse/billUse?orderId=' + item.orderId
       })
     }
    },
    // 下拉加载更多
    onReachBottom() {
      this.page_num++
      this.getFloorList()
    }
  }
</script>

<style lang="scss">
.app {
  .allOrders {
    height: 410rpx;
    padding: 10rpx 20rpx 10rpx 20rpx;
    margin: 10rpx 10rpx 30rpx 10rpx;
    background-color: #ffffff;
    border-radius: 18rpx;
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    .top {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-size: 28rpx;
      height: 60prx;
      line-height: 60rpx;
      border-bottom: 1px solid #d9d9d9;
      margin-bottom: 16rpx;
      .orderNo {
        
      }
      .state {
        
      }
    }
    .left-img-box {
      box-sizing: border-box;
      height: 350rpx;
      // padding: 0rpx 20rpx;
      // display: flex;
      // flex-direction: row;
      // justify-content: space-between;
      .data {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 10rpx;
        // border-bottom: 1px solid #d9d9d9;
        
        .img-box {
          image {
            border-radius: 16rpx;
            width: 260rpx;
            height: 318rpx;
          }
        }
        .right-box {
          margin-left: 20rpx;
          // box-sizing: border-box;
          width: 424rpx;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .text-box-top {
            margin-top: 10rpx;
            .span1 {
              font-size: 40rpx;
              font-family: 'Arial Normal', 'Arial', sans-serif;
              font-weight: 400;
              font-style: normal;
              color: #333333;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              width: 430rpx;
              height: 70rpx;
            }
            .span2 {
              font-family: 'Arial Normal', 'Arial', sans-serif;
              font-weight: 400;
              font-style: normal;
              font-size: 26rpx;
              letter-spacing: normal;
              color: #5a5a5a;
              width: 442rpx;
              height: 62rpx;
              margin: 10rpx 0;
            }
            .span3 {
              font-family: 'Arial Normal', 'Arial', sans-serif;
              font-weight: 400;
              font-style: normal;
              font-size: 26rpx;
              height: 62rpx;
              letter-spacing: normal;
              color: #5a5a5a;
              table-layout:fixed; 
              word-break:break-all; 
              overflow:hidden;
            }
            .span4 {
              font-family: 'Arial Normal', 'Arial', sans-serif;
              font-weight: 400;
              font-style: normal;
              font-size: 26rpx;
              letter-spacing: normal;
              color: #5a5a5a;
              width: 426rpx;
              height: 100rpx;
              table-layout:fixed; 
              word-break:break-all; 
              overflow:hidden;
            }
          }
        }
      }
    }
  }
}
</style>
