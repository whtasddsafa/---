<template>
  <view class="billUse">
    <view class="billUse-top">
      <view class="billUse-top1">订单编号 <span>{{orderDetail.orderSn}}</span></view>
      <view class="billUse-top2">已支付</view>
    </view>
    <view class="purchase-top">
      <view class="left-img-box-bottom">
        <view class="img-box">
          <image :src="goodsList[0].goodsLogo"></image>
        </view>
        <view class="right-box">
          <view class="text-box-top">
            <view class="span1">
              <span>{{goodsList[0].goodsName}}</span>
            </view>
            <!-- <view class="span2">
              <uni-dateformat :date="goodsList[0].effectiveStartTime" format="yyyy/MM/dd"></uni-dateformat>-
              <uni-dateformat :date="goodsList[0].effectiveEndTime" format="yyyy/MM/dd"></uni-dateformat>
            </view> -->
            <view class="span2" v-if="goodsList[0].goodsSn == 'VIP'">
              <uni-dateformat :date="orderDetail.payTime" format="yyyy/MM/dd"></uni-dateformat>-
              <uni-dateformat :date="orderDetail.vipEndTime" format="yyyy/MM/dd"></uni-dateformat>
            </view>
            <view class="span2" v-else>
              购买日期:<uni-dateformat :date="orderDetail.payTime" format="yyyy/MM/dd"></uni-dateformat>
            </view>
            <view class="span3">
              <span>{{goodsList[0].address}}</span>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="bill-QR-code">
        <view class="bill-QR-code1">
          <image :src="QRImg"></image>
        </view>
        <view></view>
        <!-- <view v-if="goodsList[0].goodsSn !== 'VIP'">核销码: {{orderDetail.parentSn}}</view> -->
    </view>
    <view class="hxm" v-if="goodsList[0].goodsSn !== 'VIP'">
        <uinput label="核销:" v-model="test" type="" placeholder="请输入核销码"></uinput>
        <button type="default" size="mini" @click="hx">确认核销</button>
    </view>
    <view class="admissionTicket">
      <view class="admissionTicket-span">
        <span>票品信息</span>
      </view>
      <!-- <view class="ticketType">
        <view class="ticketType-l">
          核销码
        </view>
        <view class="ticketType-r">
          {{orderDetail.parentSn}}
        </view>
      </view> -->
      <view class="ticketType">
        <view class="ticketType-l">
          门票类型
        </view>
        <view class="ticketType-r">
          {{goodsList[0].goodsName}}
        </view>
      </view>
      <!-- <view class="ticketType">
        <view class="ticketType-l">
          选择场次
        </view>
        <view class="ticketType-r">
          {{orderDetail.changci}}
        </view>
      </view> -->
      <view class="ticketType">
        <view class="ticketType-l">
          单价
        </view>
        <view class="ticketType-r">
          ￥{{goodsList[0].marketPrice}}
        </view>
      </view>
      <view class="ticketType">
        <view class="ticketType-l">
          数量
        </view>
        <view class="ticketType-r">
          <span>{{orderDetail.count}}</span>张
        </view>
      </view>
      <view class="ticketType" style="border-bottom: 1px solid #d0d0d0;">
        <view class="ticketType-l">
          总计
        </view>
        <view class="ticketType-r">
          ￥1
        </view>
      </view>
      <view class="actualPayment">
        <view class="actualPayment-l">
          实付款
        </view>
        <view class="actualPayment-r">
          ￥{{orderDetail.totalAmount}}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import uinput from "@/components/poiuy-uinput/uinput.vue";
  export default {
    components: {
          uinput
        },
    data() {
      return {
        count: '',
        orderDetail: [],
        goodsList: [],
        mobile: '',
        userPhoto: '',
        QRImg: '',
        arrayBuffer: '',
        test: '',    // 用户输入的核销码
        orderSn: ''
        
      };
    },
    onLoad(options){
      console.log(options)
      const order_Id = options.orderId
      this.getOrderDetail(order_Id)
    },
    methods: {
      async getOrderDetail(order_Id){
        const {data: res} = await uni.$http.get('/shop/user-order-detail',{
          orderId : order_Id
        })
        if(res.code != 0) return uni.$showMsg()
          this.orderDetail = res.data
          this.goodsList = res.data.goodsList
          this.count = res.data.count
          this.mobile = res.data.mobile
          this.orderSn = res.data.orderSn
          this.getQrcode()
          console.log('订单号',this.orderSn)
      },
      
      // 生成二维码
      // async getQrcode(){
      //   const {data:res} = await uni.$http.get('/qr-code/get',{
      //     // phoneNumber: this.mobile,
      //     phoneNumber: this.mobile,
      //     responseType:'arraybuffer'
      //   })
      //     const arrayBuffer = this.res
      //     console.log(this.arrayBuffer)
      //     this.QRImg = `data:image/jpeg;base64,${uni.arrayBufferToBase64(arrayBuffer)}`
      //     console.log(this.QRImg)
          
      //     // const arrayBuffer = res
      //     // this.QRImg = `data:image/jpeg;base64,${uni.arrayBufferToBase64(arrayBuffer)}`
      //     // console.log('QRImg',this.QRImg)
          
      //   		// const arrayBuffer = new Uint8Array(res)
      //   		// const base64 = "data:image/png;base64" + uni.arrayBufferToBase64(arrayBuffer)
      //   		// this.QRImg = base64 || ''
      //     //   console.log(this.QRImg)
          
      //   // if(res.code != 0) return uni.$showMsg('二维码生成失败')
      // }
      getQrcode(){
        uni.request({
        	url: uni.$http.baseUrl + '/qr-code/get',
        	method: 'GET',
        	responseType: 'arraybuffer',
        	data: {
        		phoneNumber: this.mobile,
        	},
        	header: {
        		'Content-Type': 'application/json',
        	},
        	success: res => {
        		const arrayBuffer = new Uint8Array(res.data)
        		const base64 = "data:image/png;base64," + uni.arrayBufferToBase64(arrayBuffer)
        		this.QRImg = base64 || ''
        	}
        });
      },
      // 用户输入核销码核销
      async hx() {
        const {data: res} = await uni.$http.get('/hexiaoCode',{
          code: this.test,
          orderSn: this.orderSn
        })
        if(res.code !== 0){
          return uni.$showMsg(res.message) 
        }else if(res.code == 0){
         return uni.$showMsg('核销成功!')
        }
      }
    },
  }
</script>

<style lang="scss">
.billUse {
  padding: 24rpx;
  .billUse-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .billUse-top1 {
      font-size: 28rpx;
    }
    .billUse-top2 {
      font-size: 28rpx;
    }
  }
  .purchase-top {
    padding: 40rpx 2rpx 20rpx 2rpx;
    height: 290rpx;
    .left-img-box-bottom {
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .img-box {
        image {
          width: 230rpx;
          height: 290rpx;
          border-radius: 12rpx;
        }
      }
      .right-box {
        margin-left: 20rpx;
        box-sizing: border-box;
        width: 746rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .text-box-top {
          margin-top: 10rpx;
          .span1 {
            font-size: 40rpx;
            font-family: 'Arial Normal', 'Arial', sans-serif;
            weight: 400rpx;
            font-style: normal;
            display:-webkit-box;
            overflow:hidden; 
            -webkit-line-clamp:3;
            -webkit-box-orient:vertical;
            height: 160rpx;
          }
          .span2 {
            margin-top: 20rpx;
            font-family: 'Arial Normal', 'Arial', sans-serif;
            font-weight: 400;
            font-style: normal;
            font-size: 26rpx;
            letter-spacing: normal;
            color: #868686;
            width: 300rpx;
            height: 30rpx;
            margin-bottom: 10rpx;
          }
          .span3 {
            font-family: 'Arial Normal', 'Arial', sans-serif;
            font-weight: 400;
            font-style: normal;
            font-size: 26rpx;
            letter-spacing: normal;
            color: #868686;
          }
        }
      }
    }
  }
  .bill-QR-code {
    width: 100%;
    height: 420rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
      image {
        width: 300rpx;
        height: 300rpx;
      }
  }
  .hxm {
    display: flex;
    align-items: center;
    .input-view>text.data-v-c8ae5176 {
      margin-left: 0px!important;
      font-size: 32rpx!important;
      font-weight: 600!important;
      color: #000000!important;
  }
  .input-view>view.data-v-c8ae5176 {
    width: 75%!important;
  }
  .input-view.data-v-c8ae5176 {
    width: 100%!important;
  }
    button {
      background: #000000;
      color: white;
      height: 70rpx;
      line-height: 70rpx;
      width: 180rpx;
    }
  }
  .admissionTicket {
    .admissionTicket-span {
        font-size: 32rpx;
        font-weight: 600;
        padding: 10rpx 0;
      }
      .ticketType {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-size: 26rpx;
        padding: 20rpx 10rpx;
        color: #676767;
        .ticketType-l {
          
        }
        .ticketType-r {
          
        }
      }
      .actualPayment {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-size: 28rpx;
        height: 70rpx;
        line-height: 70rpx;
        .actualPayment-l {
          font-weight: 600;
        }
        .actualPayment-r {
          color: #c60000;
        }
      }
  }
}
</style>
