<template>
  <view class="tall">
    <view class="purchase-tall">
      <view class="purchase-top">
        <view class="left-img-box-bottom">
          <view class="img-box">
            <image :src="goods.goodsLogo"></image>
          </view>
          <view class="right-box">
            <view class="text-box-top">
              <view class="span1">
                <span>{{goods.goodsName}}</span>
              </view>
              <view class="span2">
                <uni-dateformat :date="goods.effectiveStartTime" format="yyyy/MM/dd"></uni-dateformat>-
                <uni-dateformat :date="goods.effectiveEndTime" format="yyyy/MM/dd"></uni-dateformat>
              </view>
              <view class="span3">
                <span>{{goods.address}}</span>
              </view>
            </view>
            <view class="text-box-bottom">
              <view class="text-box-bottom-left">
                <span>￥{{goods.marketPrice}}</span>
              </view>
              <view class="top-card-text-right" v-if="goodsSn !== 'VIP'">
                <span>VIP票价:￥{{goods.costPrice}}</span>
              </view>
            </view>
          </view>
        </view>
      </view>
      <!-- <view class="purchase-bottom">
        <view class="content">
                <view class="box">
                    手机号：
                    <view class="phone-box"> -->
                        <!-- @confirm监听回车事件 -->
                        <!-- <input type="text" @confirm="sendInfo" v-model="PhoneNumber"/>
                    </view> -->
                        <!-- @tap监听用户点击事件 -->
                    <!-- <button @tap="sendInfo" :disabled="isDisabled">
                        {{text}}
                    </button>
                </view>
                <text v-if="isShow" class="alertText">请输入有效的手机号码</text>
            </view>
      </view> -->
      <view class="">
        <!-- 场次 -->
        <!-- <view class="changCi" v-if="goodsSn !== 'VIP'">
          <view class="changCix">
            请选择日期:
          </view>
          <view class="changCi0">
            <view class="changCi1" v-for="(item, i) in list" :key = "i">
              <button type="default" size="mini" @click="changCi(item)" v-model="list">
              {{item}}
              </button>
            </view>
          </view>
        </view>
        <view class="CC" v-if="goodsSn !== 'VIP'">
          <view class="CC1">您的日期:</view>
          <view class="CC2"> {{hobbies}}</view>
        </view> -->
        <view class="CC" v-if="goodsSn !== 'VIP'">
          <view class="CC1">您的票数:</view>
          <view class="CC2"><uni-number-box :min="1" v-model="shuliang" background="black" color="white"></uni-number-box></view>
        </view>
        <view class="">
          <uinput label="您的姓名:" v-model="test" type="" placeholder="请输入姓名"></uinput>
        </view>
        <view>
          <uinput label="手机号码:" v-model="tel" type="tel" placeholder="请输入手机号"></uinput>
        </view>
        <!-- 选择收货地址 -->
        <!-- <view class="address-choose-box" v-if="JSON.stringify(address) == '{}'">
          <button type="default" @click="chooseAddress">请选择购票人信息</button>
        </view> -->
        <!-- 渲染收货地址 -->
        <!-- <view class="address-info-box" v-else @click="chooseAddress">
          <view class="row1">
            <view class="row1-left">
              <view class="username">姓名: </view>
              <view class="username1"> {{address.userName}}</view>
            </view>
            <view class="row1-right">
              <view class="phone">手机号:</view>
              <vew> {{address.telNumber}}</vew>
            </view>
          </view>
        </view> -->
      </view>
    </view>
    <!-- <view class="button" v-if="goodsSn == 'VIP'">
      <button type="default" @click="order1">提交订单</button>
    </view> -->
    <view class="button">
      <button type="default" @click="order">提交订单</button>
    </view>
  </view>
</template>

<script>
  import {mapState, mapMutations, mapGetters} from 'vuex'
  import LbPicker from '@/components/lb-picker'
  import uinput from "@/components/poiuy-uinput/uinput.vue";
  export default {
    components: {
          LbPicker,
          uinput
        },
    data() {
      return {
          PhoneNumber:'',//判断用户输入
          text: '发送',
          isDisabled: false,
          isType: 'black',//判读按钮的颜色
          isShow:false,//是否显示红色文本提醒
          time: 60,
          goods_info: '',
          goods: '',
          shuliang: 1,  //数量
          goods_id1: '',
          address: {},  //地址
          userName: '',   //用户名
          seconds: 3,   //倒计时的秒数
          timer: null,
          telNumber: '',  //手机号
          hobbies: '',  //选择场次
          list: [],   // 总场次
          goodsSn: '',
          goodsBuyType: '',
          getTime: '',
          effectiveStartTime: '',   //开始时间
          effectiveEndTime: '',    //结束时间
          tel: '',   //手机号
          test: '',    //姓名
          id: ''      //用户id
          
      }
  },
  onLoad(options) {
    // 获取用户信息
    // this.getUser()
    //查询最近订单信息
    this.getOrderInfo()
    this.getCurrentTime()
    const goods_id = options.goodsId
    this.getGoodsDetail(goods_id)
    console.log(goods_id)
  },
  methods: {
    ...mapMutations('m_user',['updateAddress','updateRedirectInfo']),
    //获取用户信息
    // async getUser() {
    //   const {data: res} = await uni.$http.get('/shop/user-my-info')
    //   if(res.code !== 0) return
    //     this.id = res.data.id
    // },
    //查询最近订单信息
    async getOrderInfo() {
      const {data: res} = await uni.$http.get('/shop/lastOrderInfo')
      // console.log('最近订单信息',res)
        if(res.code !== 0) return
          this.test = res.data.name
          this.tel = res.data.phone
    },
    //获取当前时间
    getCurrentTime() {
            var _this = this;
        　　let yy = new Date().getFullYear();
        　　let mm = new Date().getMonth()+1 < 10 ? '' + new Date().getMonth()+1 : new Date().getMonth()+1;
        　　let dd = new Date().getDate()<10 ? '0' + new Date().getDate() : new Date().getDate();
        　　let hh = new Date().getHours()<10 ? '0' + new Date().getHours() : new Date().getHours();
        　　let mf = new Date().getMinutes()<10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
        　　let ss = new Date().getSeconds()<10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
        　　_this.gettime = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
            this.getTime = _this.gettime
        　　console.log(this.getTime)  
        },
    // 加载购买前
    async getGoodsDetail(goods_id) {
      const {data: res} = await uni.$http.get('/shop/mall-goods-detail', {
        goods_id: goods_id
        })
      if(res.code !== 0) return uni.$showMsg()
      console.log('res',res)
      this.goods_id1 = res.data.detail.goodsId
      this.goods_info = res.data
      this.goods = res.data.detail
      this.list = res.data.detail.changciArray
      this.goodsSn = res.data.detail.goodsSn
      this.goodsBuyType = res.data.detail.goodsBuyType
      this.effectiveEndTime = res.data.detail.effectiveEndTime
      this.effectiveStartTime = res.data.detail.effectiveStartTime
      // console.log('keywords',this.keywords)
    },
      sendInfo() {
          if(this.PhoneNumber != Number && this.PhoneNumber.length != 11){//判断手机输入条件
              this.isShow = true//显示红色文本
          }
          else {
              this.isShow = false//用户输入重新输入正确的手机号后，红色文本提醒信息消除
              let time = this.time
              this.isDisabled = true
              this.isType = 'black'
              const timer = setInterval(() => {
                  if (time == 0) {
                      clearInterval(timer)//清除定时器后，以下都是恢复原始状态
                      this.isDisabled = false
                      this.isType = 'black'
                      this.text = '发送'
                      time = this.time
                  } else {
                      this.text = `${time}秒`
                      time-- //倒计时的实现，利用递减
                  }
              }, 1000)
          }
      },
      // 微信支付流程
      // 1.创建订单  (收货地址、场次、姓名、电话、商品id、商品数量发送服务器,服务器返回订单号)
      // 2.订单预支付  (订单号发送服务器,服务器返回预支付相关的参数)
      // 3.发起微信支付 (调用 uni.requestPayment() 发起微信支付 把 2.订单预支付接口返回的参数传递)
      async order() {
          // if(this.effectiveStartTime <= this.getTime) return uni.$showMsg('预售还未开始~')
          // if(this.effectiveEndTime >= this.getTime) return uni.$showMsg('预售已结束~')
          // if(!this.token) return this.delayNavigate()
          if(!this.goodsBuyType == 1) return uni.$showMsg('仅VIP可购买!')
          // if(!this.hobbies && this.goodsSn !== 'VIP') return uni.$showMsg('请选择场次!')
          if(!this.test) return uni.$showMsg('请输入用户名!')
          if(!this.tel) return uni.$showMsg('请输入手机号!')
          if(!this.token) return this.delayNavigate()
          // if(!this.token) return uni.$showMsg('请登录!')
          // return this.zforder()
          const {data: res} = await uni.$http.post('/shop/mall-order-submit',{
            // addressId: this.addstr,
            address: this.addstr,
            changci: this.hobbies,
            consignee: this.test,
            goodsId: this.goods_id1,
            goodsNum: this.shuliang,
            mobile: this.tel
          })
          if(res.code !== 0 && res.message == '未授权') return this.delayNavigate()
          if(res.code !== 0) return uni.$showMsg(res.message)
          //得到订单编号
          const orderNumber = res.data.order_no
          console.log('orderNumber',orderNumber)
          // 开始支付
          const {data:res2} = await uni.$http.post('/shop/pay-do-pay', {orderNo: orderNumber})
          console.log('res2',res2)
          const payInfo = res2.data
          console.log('payInfo',payInfo)
          // 支付前获取价格
          
            // if(res2.code !== 0) return uni.$showMsg('预支付失败!')

            const appId = res2.data.appId
            const nonceStr = res2.data.nonceStr
            const packageValue =res2.data.packageValue
            const paySign = res2.data.paySign
            const signType = res2.data.signType
            const timeStamp = res2.data.timeStamp
            // const {data:res3} = await uni.$http.post('/shop/pay-confirm-money', {
            //   order_no: orderNumber
            // })
            // console.log('res3 价格',res3)
            // if(res3.code !== 0) return uni.$showMsg('获取价格失败!')
            // const jg = res3.data.order_amount
            // console.log('价格',jg)
            // 3.发起微信支付 (调用 uni.requestPayment() 发起微信支付 把 2.订单预支付接口返回的参数传递)
            // 3.1 调用 uni.requestPayment()发起微信支付
            const [err, succ] = await uni.requestPayment({
              appId: appId,
              nonceStr: nonceStr,
              package: packageValue,
              paySign: paySign,
              signType: signType,
              timeStamp: timeStamp
            })
            // 3.2 未完成支付
            if(err) return uni.$showMsg('订单未支付!')
            // 3.3 完成支付,进一步查询支付结果
            const {data:res4} = await uni.$http.get('/shop/payQuery', {
              orderNo: orderNumber
            })
            console.log('res4',res4)
            if(res4.payStatus !== "SUCCESS")return uni.$showMsg('订单未支付!')
            uni.showToast({
              title:'订单支付完成!',
              icon: 'success'
            })
            this.paySuccess()
      },
      // zforder() {
      //   uni.navigateTo({
      //     url: '/subpkg/payment/payment?id='
      //   })
      // },
      // 支付成功后
        paySuccess() {
        uni.switchTab({
          url: '/pages/home/home'
        })
      },
      // 延时导航到my页面
      delayNavigate() {
        this.showTips(this.seconds)
        this.timer = setInterval(() => {
          this.seconds--
          if(this.seconds <= 0) {
            clearInterval(this.timer)
            uni.switchTab({
              url: '/pages/my/my',
              success: () => {
                this.updateRedirectInfo({
                  openType: 'switchTab',
                  // from: '/subpkg/purchase/purchase'
                  from: '/pages/home/home'
                })
              }
            })
            return
          }
          this.showTips(this.seconds)
        },1000)
      },
      //展示倒计时提示消息
      showTips(n) {
        uni.showToast({
          icon: 'none',
          title: '请先登录! '+ n +' 秒之后自动跳转到登录页',
          mack: true,
          duration: 1500
        })
      },
      // 选择地址
      async chooseAddress() {
        const [err, succ] = await uni.chooseAddress().catch(err => err)
        if(err === null && succ.errMsg === 'chooseAddress:ok') {
          console.log(succ)
          this.address = succ
          this.userName = succ.userName
          this.telNumber = succ.telNumber
          // this.updateAddress(succ)
        }
      },
      // 选择场次
      changCi(item) {
        console.log(item)
        this.hobbies = item
        console.log('hobbies',this.hobbies)
      },
    },
  computed:{
    ...mapState('m_user',['address','token']),
    ...mapGetters('m_user',['addstr']),
    addstr() {
        if(!this.address.provinceName) return ''
        return this.address.provinceName + this.address.cityName + this.address.countyName + this.address.detailInfo
      }
  }
  }
</script>

<style lang="scss">
.tall {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .purchase-tall {
    
    .purchase-top {
      padding: 40rpx 20rpx 20rpx 20rpx;
      height: 380rpx;
      background: #000000;
      .left-img-box-bottom {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .img-box {
          image {
            width: 260rpx;
            height: 350rpx;
          }
        }
        .right-box {
          margin-left: 20rpx;
          box-sizing: border-box;
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
              color: #ffffff;
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
              color: #d0d0d0;
              width: 424rpx;
              height: 30rpx;
              margin-bottom: 10rpx;
            }
            .span3 {
              font-family: 'Arial Normal', 'Arial', sans-serif;
              font-weight: 400;
              font-style: normal;
              font-size: 26rpx;
              letter-spacing: normal;
              color: #d0d0d0;
            }
          }
          .text-box-bottom {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            // margin-bottom: 16rpx;
            height: 88rpx;
            
            .text-box-bottom-left {
              font-size: 32rpx;
              line-height: 88rpx;
              color: #ffffff;
            }
            .top-card-text-right {
              margin-top: 20rpx;
              font-size: 32rpx;
              color: #ffffff;
              line-height: 48rpx;
            }
          }
        }
      }
    }
    .address-choose-box {
      margin:50rpx 30rpx;
      // display: flex;
      // justify-content: center;
      // align-items: center;
      button{
        background: black;
        color: white;
      }
    }
    .changCi {
      width: 692rpx;
      // height: 80rpx;
      margin: 30rpx;
      .changCix {
        height: 80rpx;
        line-height: 80rpx;
        font-size: 32rpx;
        color: #787878;
      }
      .changCi0 {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap;
        width: 718rpx;
        .changCi1 {
          // float: left;
          margin-right: 28rpx;
          button {
            background: #000000;
            color: white;
          }
        }
      }
    }
    .CC {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 30rpx;
      font-size: 32rpx;
      .CC1 {
        color: #787878;
      }
    }
    // .address-info-box{
    //   margin: 20rpx;
    //   border: 3px solid #000000;
    //   font-size: 30rpx;
    //   height: 180rpx;
    //   display: flex;
    //   flex-direction: column;
    //   justify-content: center;
    //   padding: 0 10rpx;
    //   .row1{
    //     display: flex;
    //     justify-content: space-between;
        
    //     .row1-left {
    //       .username {
            
    //       }
    //     }
    //     .row1-right {
    //       display: flex;
    //       justify-content: space-between;
          
    //       .phone {
            
    //       }
    //     }
    //   }
    //   .row2{
    //     display: flex;
    //     align-items: center;
    //     margin-top: 20rpx;
    //     .row2-left{
    //       white-space: nowrap;
    //     }
    //     .row2-right {
    //       margin-left: 10rpx;
    //     }
    //   }
    // }
    .address-info-box{
      margin: 20rpx;
      font-size: 32rpx;
      height: 180rpx;
      padding: 0 10rpx;
      .row1{
        .row1-left {
          height: 80rpx;
          line-height: 80rpx;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          border-bottom: 1px scolid #7e7e7e;
          .username {
            color: #787878;
          }
          .username1 {
            
          }
        }
        .row1-right {
          height: 80rpx;
          line-height: 80rpx;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .phone {
            color: #787878;
          }
        }
      }
    }
    .purchase-bottom {
      .content {
        margin: 26rpx;
        .box {
            display: flex;
            justify-content: space-around;
            font-size: 30rpx;
            height: 80rpx; //1px = 2upx = 2rpx
            line-height: 80rpx;
  
            .phone-box {
                width: 400rpx;
                border: 1rpx solid #C0C0C0;
                border-radius: 10rpx;
                line-height: 80rpx;
                height: 80rpx;
  
                input {
                    font-size: 30rpx;
                    line-height: 80rpx;
                    margin-top: 20rpx;
                    margin-left: 20rpx;
                }
                button {
                  height: 80rpx;
                  line-height: 80rpx;
                }
            }
  
        }
    }
    .alertText{
        color: red;
        display: flex;
        justify-content: center;
    }
    }
  }
  .button {
    position:fixed;
    bottom: 0;
    width: 100%;
    button{
      background: black;
      color: white;
    }
  }
}
</style>