<template>
  <view class="payment-tall">
    <view class="payment-top">
      <view class="payment-top1">
        {{goodsList[0].goodsName}}
      </view>
      <view class="payment-top2">
        {{goodsList[0].address}}
      </view>
    </view>
    <view class="payment-middle">
      <view class="payment-middle1">
        <view class="payment-middle1-1">
          票型
        </view>
        <view class="payment-middle1-2" v-if="goodsList[0].goodsSn == 'VIP'">
          会员卡
        </view>
        <view class="payment-middle1-2" v-else>
          {{goodsList[0].goodsName}}
        </view>
      </view>
      <view class="payment-middle1" v-if="goodsList[0].goodsSn == 'VIP'">
        <view class="payment-middle1-1">
          入场时间
        </view>
        <view class="payment-middle1-2">
          现场凭借购买手机号识别会员后购买畅饮券
        </view>
        <view class="payment-middle1-2" v-if="goodsList[0].goodsSn !== 'VIP'">
          {{orderDetail.changci}}
        </view>
      </view>
      <view class="hysj" v-if="goodsList[0].goodsSn == 'VIP'">
        有效期365天
      </view>
    </view>
    <view class="xz">
      <view class="payment-middle33">
        <view class="payment-middle3">
          <view class="payment-middle3-1">
            单价
          </view>
          <view class="payment-middle3-2">
            ￥{{goodsList[0].marketPrice}}
          </view>
        </view>
        <view class="payment-middle3" v-if="goodsList[0].goodsSn !== 'VIP'">
          <view class="payment-middle3-1" v-if="goodsList[0].goodsSn !== 'VIP'">
            会员价
          </view>
          <view class="payment-middle3-2" v-if="goodsList[0].goodsSn !== 'VIP'">
            ￥{{goodsList[0].costPrice}}
          </view>
        </view>
        <view class="payment-middle3" v-if="goodsList[0].goodsSn !== 'VIP'">
          <view class="payment-middle3-1">
            数量
          </view>
          <view class="payment-middle3-2">
            {{count}}
            <!-- <uni-number-box :min="1" v-model="count" background="black" color="white"></uni-number-box> -->
          </view>
        </view>
        <view class="payment-middle3" v-if="goodsList[0].goodsSn == 'VIP'">
          <view class="payment-middle3-1">
            数量 (限购一张)
          </view>
          <view class="payment-middle3-2">
            1
            <!-- <uni-number-box :min="1" v-model="count" background="black" color="white"></uni-number-box> -->
          </view>
        </view>
        <view class="payment-middle3">
          <view class="payment-middle3-1">
            实际支付
          </view>
          <view class="payment-middle3-2" v-if="vip == true">
            ￥{{count*goodsList[0].costPrice}}
          </view>
          <view class="payment-middle3-2" v-else>
            ￥{{count*goodsList[0].marketPrice}}
          </view>
        </view>
      </view>
    </view>
    <!-- <view class="payment-middle-b" v-if="orderDetail.payStatus == 1 && orderDetail.orderStatus == 1 && goodsList[0].goodsSn !== 'VIP'">
      <view class="payment-middle1">
        <view class="payment-middle1-1">
          核销码
        </view>
        <view class="payment-middle1-2">
          {{orderDetail.parentSn}}
        </view>
      </view>
    </view> -->
    <view class="payment-middle-b">
      <view class="payment-middle1">
        <view class="payment-middle1-1">
          联系手机
        </view>
        <view class="payment-middle1-2">
          {{orderDetail.mobile}}
        </view>
      </view>
    </view>
    <view class="payment-middle-b">
      <view class="payment-middle1">
        <view class="payment-middle1-1">
          客服联系方式
        </view>
        <view class="payment-middle1-2">
          BABYFACE-vip1
        </view>
      </view>
    </view>
    <view class="notice">
      <view class="notice1">
        <span>购买须知</span>
      </view>
      <view class="notice2" v-html="goodsList[0].goodsRemark">
        <!-- <span>{{goodsList[0].goodsRemark}}</span> -->
      </view>
    </view>
    <!-- 购买按钮 -->
    <!-- <view class="goods-nav">
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @buttonClick="buttonClick(goods)"></uni-goods-nav>
    </view> -->
    <view class="bar">
        <view class="bar_item">
            <text>不支持退换票</text>
        </view>
        <view class="bar_item" v-if="vip == true">
            <text>应付￥{{count*goodsList[0].costPrice}}</text>
        </view>
        <view class="bar_item" v-else>
            <text>应付￥{{count*goodsList[0].marketPrice}}</text>
        </view>
        <view class="bar_item1" v-if="orderDetail.orderStatus == -1">
            <text>已取消</text>
        </view>
        <view class="bar_item1" v-if="orderDetail.payStatus == 0 && orderDetail.orderStatus !== -1" @click="fk">
            <text>付款</text>
        </view>
        <view class="bar_item1" v-if="orderDetail.payStatus == 1 && orderDetail.orderStatus == 1">
            <text>已付款</text>
        </view>
        <view class="bar_item1" v-if="orderDetail.orderStatus == 2 && orderDetail.payStatus == 1">
            <text>已使用</text>
        </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        count: '',
        orderDetail: [],
        goodsList: [],
        id: '',
        vip: '',
        keywords: '',
        orderNumber: ''
        //  options: [{
        //             text: '不支持退换票'
        //         }, {
        //             text: '店铺',
        //         }],
        // buttonGroup: [{
        //   text: '购买',
        //   backgroundColor: 'black',
        //   color: 'yellow'
        // }],
      };
    },
    onLoad(options){
      this.getUser()
      console.log(options)
      const order_Id = options.orderId
      this.getOrderDetail(order_Id)
    },
    watch:{
      
    },
    methods: {
      //获取用户信息
      async getUser() {
        const {data: res} = await uni.$http.get('/shop/user-my-info')
        if(res.code !== 0) return uni.$showMsg()
          this.id = res.data.id
          this.vip = res.data.isVip
          // console.log('个人信息res.data',res.data)
      },
      async getOrderDetail(order_Id){
        const {data: res} = await uni.$http.get('/shop/user-order-detail',{
          orderId : order_Id
        })
        if(res.code != 0) return uni.$showMsg()
          this.orderDetail = res.data
          this.goodsList = res.data.goodsList
          this.count = res.data.count
          this.orderNumber = res.data.orderSn
          console.log('kankan',res)
          // this.keywords = res.data.goodsList[0].keywords
          // console.log('keywords',keywords)
          // console.log('this.shuliang',res.data.goodsList[0].shuliang)
      },
      async fk() {
        const {data:res2} = await uni.$http.post('/shop/pay-do-pay', {orderNo: this.orderNumber})
        console.log('res2',res2)
        const appId = res2.data.appId
        const nonceStr = res2.data.nonceStr
        const packageValue =res2.data.packageValue
        const paySign = res2.data.paySign
        const signType = res2.data.signType
        const timeStamp = res2.data.timeStamp
        const [err, succ] = await uni.requestPayment({
          appId: appId,
          nonceStr: nonceStr,
          package: packageValue,
          paySign: paySign,
          signType: signType,
          timeStamp: timeStamp
        })
        console.log('err',err)
        console.log('succ',succ)
        if(err) return uni.$showMsg('订单未支付!')
        // 需要进一步查询支付结果
        const {data:res4} = await uni.$http.get('/shop/payQuery', {
          orderNo: this.orderNumber
        })
        console.log('res4',res4)
        if(res4.payStatus !== "SUCCESS")return uni.$showMsg('订单未支付!')
        
        uni.showToast({
          title:'订单支付完成!',
          icon: 'success'
        })
        this.wancheng()
      },
      wancheng() {
        uni.navigateTo({
          url: '/subpkg/order/order'
        })
      },
      //购买
      buttonClick(goods) {
        
        // uni.navigateTo({
        //   url: '/subpkg/purchase/purchase?goodsId=' + goods.goodsId
        // })
      },
    }
  }
</script>

<style lang="scss">
.payment-tall {
  .payment-top {
    height: 140rpx;
    width: 100%;
    background: black;
    padding: 30rpx 26rpx;
    .payment-top1 {
      width: 700rpx;
      font-size: 50rpx;
      color: white;
      height: 80rpx;
      line-height: 80rpx;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .payment-top2 {
      font-size: 28rpx;
      color: #d1d1d1;
      height: 50rpx;
      line-height: 50rpx;
      width: 700rpx;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
  }
  .payment-middle {
    padding: 26rpx 26rpx;
    background-color: #ffffff;
    .payment-middle1 {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height: 60rpx;
      // line-height: 60rpx;
      .payment-middle1-1 {
        font-size: 26rpx;
        color: #6c6c6c;
      }
      .payment-middle1-2 {
        font-size: 26rpx;
        font-weight: 600;
      }
    }
    .hysj {
      font-size: 26rpx;
      color: #6c6c6c;
    }
  }
  .payment-middle-b {
    padding: 26rpx 26rpx;
    background-color: #ffffff;
    margin-bottom: 16rpx;
    .payment-middle1 {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height: 20rpx;
      line-height: 20rpx;
      .payment-middle1-1 {
        font-size: 26rpx;
        color: #6c6c6c;
      }
      .payment-middle1-2 {
        font-size: 26rpx;
        font-weight: 600;
      }
    }
    .hysj {
      font-size: 26rpx;
      color: #6c6c6c;
    }
  }
  .xz {
    padding: 16rpx 0;
    .payment-middle33 {
      // padding: 26rpx 26rpx;
      padding: 0 26rpx;
      background-color: #FFFFFF;
      .payment-middle3 {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 98rpx;
        line-height: 98rpx;
        background-color: #FFFFFF;
        // padding: 0 26rpx;
        border-bottom: 1px solid #efefef;
        .payment-middle3-1 {
          font-size: 26rpx;
          color: #6c6c6c;
        }
        .payment-middle3-2 {
          font-size: 26rpx;
          font-weight: 600;
        }
      }
      .hysj {
        font-size: 26rpx;
        color: #6c6c6c;
      }
    }
  }
  .notice {
    background-color: #FFFFFF;
    padding: 26rpx;
    .notice1 {
      font-size: 40rpx;
      margin-bottom: 30rpx;
    }
    .notice2 {
      font-size: 28rpx;
      color: #888888;
    }
  }
  .goods-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    .uni-tab__cart-sub-left.data-v-279c619b {
      padding: 0px;
    }
    .uni-tab__right.data-v-279c619b {
      border-radius: 1px;
      margin: 0px;
    }
  }
  .bar {
    width: 100%;
      height: 100rpx;
      position: fixed;
      display: flex;
      bottom: 0;
      .bar_item {
          width: 35%;
          line-height: 100rpx;
          height: 100rpx;
          text-align: center;
          font-size: 32rpx;
          background: black;
          color: #b8b8b8;
          display: flex;
          flex-direction: column; //修改轴方向
          align-items: center; //上下居中
      }
      .bar_item1 {
          width: 30%;
          font-size: 32rpx;
          text-align: center;
          line-height: 100rpx;
          background-color: #ffea00;
      }
  
  }
}
</style>
