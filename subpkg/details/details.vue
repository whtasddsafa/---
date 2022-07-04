<template>
  <view class="tall">
    <view>
      <view class="box-top">
          <view class="box-top-image">
            <image :src="goods.lunboPic" mode="widthFix"></image>
          </view>
          <view class="box-top-card">
            <view class="top-card">
              <view class="top-card-1">
                <view class="top-card-text-left">
                  <span>{{goods.goodsName}}</span>
                </view>
                <view class="top-card-text-right">
                  <likes :item="goods" class="likes"></likes>
                  <!-- <span class="text-span">{{goods.collectCount}}</span> -->
                </view>
              </view>
              <view class="top-card-2">
                <view class="top-card-2-image">
                  <image src="../../static/time.svg" mode=""></image>
                </view>
                <view class="top-card-2-text">
                  <uni-dateformat :date="goods.effectiveStartTime" format="yyyy/MM/dd"></uni-dateformat>-
                  <uni-dateformat :date="goods.effectiveEndTime" format="yyyy/MM/dd"></uni-dateformat>
                </view>
              </view>
              <view class="top-card-3-1">
                <view class="top-card-3">
                  <view class="top-card-3-image">
                    <image src="../../static/position.svg" mode=""></image>
                  </view>
                  <view class="top-card-3-text">
                    <span>{{goods.address}}</span>
                  </view>
                </view>
                <view class="top-card-3-fx">
                  <image src="../../static/details.svg" mode=""></image>
                  <button open-type='share'></button>
                </view>
              </view>
              <view class="price">
                <span>￥{{goods.marketPrice}}</span>
                <!-- <span class="span1" v-if="goods.goodsSn !== VIP">会员价:</span> -->
                <!-- <span v-if="goods.goodsSn !== VIP">￥{{goods.costPrice}}</span> -->
              </view>
            </view>
          </view>
        </view>
        <view class="box-bottom">
          <text class="yticon icon-shoucang" :class="{active: data.favorite}" @click="favorite"></text>
          <view class="box-bottom-1">
            <view class="box-text-bottom">
              <span>购买须知</span>
            </view>
            <view class="box-text-bottom-notice" v-html="goods.goodsRemark">
              <!-- {{goods.goodsRemark}} -->
              <!-- <p>购买须知 (请您在购买时务必仔细核对您的订单信息并审慎下单)</p> -->
            </view>
          </view>
          <view class="box-bottom-2">
                <view class="box-text-bottom">
                  <span>演出详情</span>
                  <!-- <span>餐品详情</span> -->
                </view>
                <!-- <view class="box-text-bottom-image">
                 <image :src="goods.goodsContent" mode="widthFix"></image>
                </view> -->
                <view class="box-text-bottom-image">
                 <rich-text :nodes="goods.goodsContent"></rich-text>
                </view>
              </view>
        </view>
        <!-- 购买按钮 -->
        <view class="goods-nav">
          <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @buttonClick="buttonClick(goods)"></uni-goods-nav>
        </view>
    </view>
  </view>
</template>

<script>
  import likes from '@/components/my-collection/my-collection'
  import {mapState, mapMutations, mapGetters} from 'vuex'
  export default {
    components:{likes},
    data() {
      return {
        id: '',
        favorite: true,
        //当前设备可用的高度
        // wh: 0,
        // 存接口数据
        // cateList: []
        goods_info: {},
        goods: {},
        buttonGroup: [{
          text: '购买',
          backgroundColor: 'black',
          color: 'yellow'
        }],
          goods_id: '',
          goods_id1: '',
          vip: '',
          seconds: 3,   //倒计时的秒数
          timer: null
      };
    },
    onLoad(options) {
      this.getUser()
      const goods_id = options.goodsId
      setTimeout(() => {
        this.getGoodsDetail(goods_id)
      },500)
      console.log(goods_id)
    },
    // 分享
    onShareAppMessage(e) {
    				// let title = '分享好友'
          // if (res.from === 'button') {
          //       // 来自页面内转发按钮
          //       console.log(res.target)
          //     }
          return {
            // title: title,
            // path: 'subpkg/details/details',
          }
        },
    methods: {
      ...mapMutations('m_user',['updateRedirectInfo']),
      //获取用户信息
      async getUser() {
        const {data: res} = await uni.$http.get('/shop/user-my-info')
        if(res.code !== 0) return
          this.id = res.data.id
          this.vip = res.data.vip
          // console.log('id',this.id)
      },
      //获取图片数据
      async getGoodsDetail(goods_id) {
        const {data: res} = await uni.$http.get('/shop/mall-goods-detail', {
          goods_id: goods_id,
          userId: this.id
          })
        if(res.code !== 0) return uni.$showMsg()
        // 图片适配
          res.data.detail.lunboPic = res.data.detail.lunboPic.replace(/,/g, '')
         res.data.detail.goodsContent = res.data.detail.goodsContent.replace(/">/g, '"style="width: 100%!important;height:100%">')
        this.goods_info = res.data
        this.goods = res.data.detail
      },
      
      //购买
      buttonClick(goods) {
        if(!this.token) return this.delayNavigate()
        uni.navigateTo({
          url: '/subpkg/purchase/purchase?goodsId=' + goods.goodsId
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
      //分享
      share(){
      	this.$refs.share.toggleMask();
      },
      //收藏
      toFavorite(){
      	this.favorite = !this.favorite;
      },
    },
    computed:{
      ...mapState('m_user',['token'])
    }
  }
</script>

<style lang="scss">
  .yticon {
  	font-size: 46upx;
  	color: #000000;
  	padding: 10upx 12upx;
  	&.active{
  		color: #ff4443;
  	}
  	&:nth-child(2) {
  		font-size: 50upx;
  	}
  }
  .tall {
    box-sizing: border-box;
    padding-bottom: 230rpx;
    position:relative;
    .box-top {
      
      .box-top-image {
        height: 520rpx;
        overflow:hidden;
        image {
          width: 100%;
          // height: 100%;
        }
      }
      .box-top-card {
        background: #ffffff;
        position: absolute;
        top: 350rpx;
        width: 670rpx;
        // wdith: 100%;
        height: 430rpx;
        margin: 0 40rpx;
        box-shadow:0px 0px 1px 1px #f0f0f0;
        .top-card {
          padding: 42rpx 36rpx 20rpx;
          .top-card-1 {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .top-card-text-left {
              width: 472rpx;
              height: 118rpx;
              font-size: 44rpx;
              font-family: 'Arial Normal', 'Arial', sans-serif;
              font-weight: 400;
              display:-webkit-box;
              overflow:hidden; 
              -webkit-line-clamp:2;
              -webkit-box-orient:vertical;
            }
            .top-card-text-right {
              width: 120rpx;
              display: flex;
              flex-direction: column;
              align-items: center;
              image {
                width: 52rpx;
                height: 52rpx;
              }
            }
            .text-span {
              font-size: 26rpx;
              color: gray;
            }
          }
          .top-card-2 {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            margin-top: 32rpx;
            .top-card-2-image {
              height: 36rpx;
              line-height: 36rpx;
              image {
                width: 36rpx;
                height: 36rpx;
              }
            }
            .top-card-2-text {
              font-family: 'Arial Normal', 'Arial', sans-serif;
              font-weight: 400;
              font-size: 30rpx;
              color: #333333;
              margin-left: 12rpx;
              width: 500rpx;
            }
          }
          .top-card-3-1{
            margin-top: 32rpx;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .top-card-3 {
              display: flex;
              flex-direction: row;
              justify-content: flex-start;
              .top-card-3-image{
                height: 36rpx;
                line-height: 36rpx;
                image {
                  width: 36rpx;
                  height: 36rpx;
                }
              }
              .top-card-3-text {
                font-family: 'Arial Normal', 'Arial', sans-serif;
                font-weight: 400;
                font-size: 28rpx;
                color: #333333;
                margin-left: 12rpx;
                width: 474rpx;
              }
            }
            .top-card-3-fx {
                height: 38rpx;
                width: 38rpx;
                position:relative;
                // bottom: 170rpx;
                right: 40rpx;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                // font-size: 24rpx;
                z-index: 10;
                image {
                  height: 38rpx;
                  width: 38rpx;
                }
                button {
                  position: absolute;
                  height: 100%;
                  width: 100%;
                  opacity: 0.1;
                  z-index: 99;
                }
            }
            // .top-card-3-fx {
            //   width: 120rpx;
            //   align-items: center;
            //   image {
            //     width: 30rpx;
            //     height: 30rpx;
            //   }
            // }
          }
          .price {
            margin-top: 32rpx;
            font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
            font-weight: 700;
            font-size: 38rpx;
          }
          .span1 {
            font-weight: 400;
            margin-left: 350rpx;
            font-size: 28rpx;
          }
        }
      }
    }
    .box-bottom {
      padding: 0 26rpx;
      margin-top: 240rpx;
      .box-bottom-1 {
        margin-bottom: 36rpx;
        .box-text-bottom {
          margin-left: 20rpx;
          margin-bottom: 20rpx;
          span {
            font-size: 44rpx;
            background:linear-gradient(to bottom,transparent 0%,transparent 50%,#f4ea2a 51%,#f4ea2a 100%);
          }
        }
        .box-text-bottom-notice {
          font-size: 28rpx;
          color: #888888;
          // height: 780rpx;
        }
      }
      .box-bottom-2 {
        width: 100%;
        // height: 1000rpx;
        .box-text-bottom {
          margin-left: 20rpx;
          margin-bottom: 20rpx;
          span {
            font-size: 44rpx;
            background:linear-gradient(to bottom,transparent 0%,transparent 50%,#f4ea2a 51%,#f4ea2a 100%);
          }
        }
        .box-text-bottom-image {
          // margin: auto;
          // box-sizing: border-box;
          // width: 100rpx;
          width: 100%;
          // height: 100%;
          margin-bottom: 10rpx;
          // .rich {
          //   width: 100rpx;
          //   height: 100%;
          // }
        }
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
  }
</style>
