<template>
  <view class="tall">
    <view class="login-container">
      <image class="image" :src="headimg"></image>
      <span>{{nickname}}</span>
      <span v-if="isVip == true" class="vip">VIP</span>
      <!-- <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
      <span>微信用户</span> -->
    </view>
    <view class="login-middle">
      <view class="login-bill" @click="bill">
        <view class="a">
          <image src="../../static/piaoju.png" mode=""></image>
        </view>
        <view class="b">
          <span class="text-span">我的票据</span>
        </view>
      </view>
      <view class="login-order" @click="order">
        <view class="a">
        <image src="../../static/dingdan.png" mode=""></image>
        </view>
        <view class="b">
          <span class="text-span">全部订单</span>
        </view>
      </view>
      <view class="login-collection" @click="collection">
        <view class="a">
        <image src="../../static/wodeshoucang.png" mode=""></image>
        </view>
        <view class="b">
          <span class="text-span">我的收藏</span>
        </view>
      </view>
    </view>
    <view class="login-bottom">
      <view class="login-bottom-address">
        <my-address></my-address>
      </view>
      <view class="login-bottom-service" @click="service">
        <view class="s">
          <image src="../../static/kefu.png"></image>
        </view>
        <view class="d">
          <button>联系客服</button>
        </view>
      </view>
      <view class="login-bottom-service">
        <view class="s">
          <image src="../../static/tucao.png"></image>
        </view>
        <view class="d">
        <button open-type='feedback'>我要吐槽</button>
        </view>
      </view>
      <view class="login-bottom-service" @click="logOut">
        <view class="s">
          <image src="../../static/tuichu.png"></image>
        </view>
        <view class="d">
        <button>退出登录</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
  export default {
    name:"my-userinfo",
    data() {
      return {
        user:{},
        id: '',
        nickname: '',
        headimg: '',
        isVip: ''
      };
    },
    created() {
      this.getUser()
    },
    methods: {
      ...mapMutations('m_user',['updateAddress','updateUserInfo','updateToken']),
      async getUser() {
        const {data: res} = await uni.$http.get('/shop/user-my-info')
        if(res.code !== 0){
          this.updateToken('')
          this.ReLogin()
          return uni.$showMsg('')
        }else{
          // console.log('res',res)
          this.user = res.data
          this.id = res.data.id
          this.nickname = res.data.nickname
          this.headimg = res.data.headimg
          this.isVip = res.data.isVip
          }
      },
      // 重新登陆
      ReLogin() {
        uni.switchTab({
          url: '/pages/my/my',
        })
      },
      order() {
        uni.navigateTo({
          url: '/subpkg/order/order?id='+ this.id
        })
      },
      bill() {
        uni.navigateTo({
          url: '/subpkg/bill/bill'
        })
      },
      collection() {
        uni.navigateTo({
          url: '/subpkg/collection/collection'
        })
      },
      goAddress() {
        uni.navigateTo({
          url: '/subpkg/address/address'
        })
      },
      service() {
        uni.navigateTo({
          url: '/subpkg/service/service'
        })
      },
      complaints() {
        uni.navigateTo({
          url: '/subpkg/complaints/complaints'
        })
      },
      async logOut() {
        const [err, succ] = await uni.showModal({
          title:'提示',
          content: '确认退出登录吗?'
        }).catch(err => err)
        if(succ && succ.confirm) {
          this.updateAddress({})
          this.updateUserInfo({})
          this.updateToken('')
        }
      }
    },
    computed: {
      ...mapState('m_user',['userinfo'])
    }
  }
</script>

<style lang="scss">
  .tall {
    button::after { border: none };
    background-color: #F8F8F8;
    .login-container {
      height: 350rpx;
      background-color: #F8F8F8;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .image {
        border-radius: 100rpx;
        height: 200rpx;
        width: 200rpx;
      }
      span {
        margin-top: 20rpx;
      }
      .vip {
        color: #ffc905
      }
    }
    .login-middle {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      height: 100rpx;
      line-height: 184rpx;
      background-color: #F8F8F8;
      .login-bill {
        border-right: 1px scolid #333333;
        // width: 150rpx;
        // height: 50rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .a {
          height: 50rpx;
          image {
            width: 100rpx;
            height: 100rpx;
          }
        }
        .b {
          height: 50rpx;
          .text-span {
            font-size: 32rpx;
          }
        }
      }
      .login-order {
        border-right: 1px scolid #333333;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .a {
          height: 50rpx;
          image {
            width: 100rpx;
            height: 100rpx;
          }
        }
        .b {
          height: 50rpx;
          .text-span {
            font-size: 32rpx;
          }
        }
      }
      .login-collection {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .a {
          height: 50rpx;
          image {
            width: 100rpx;
            height: 100rpx;
          }
        }
        .b {
          height: 50rpx;
          .text-span {
            font-size: 32rpx;
          }
        }
      }
    }
    .login-bottom {
      padding: 20rpx;
      margin: 70rpx 0 0 20rpx;
      .login-bottom-address {
        height: 100rpx;
        width: 100%;
        line-height: 100rpx;
      }
      .login-bottom-service {
        height: 100rpx;
        width: 100%;
        // line-height: 200rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        .s {
          // height: 100rpx;
          image {
              width: 66rpx;
              height: 66rpx;
            }
        }
        .d {
          button {
            background-color: #F8F8F8;
            width: 640rpx;
            font-size: 32rpx;
            text-align: left;
          }
        }
      }
      .login-bottom-complaints {
        height: 100rpx;
        width: 100%;
        line-height: 100rpx;
      }
    }
  }
</style>
