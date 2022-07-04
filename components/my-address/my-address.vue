<template>
    <view class="login-bottom-service">
      <view class="s">
        <image src="../../static/weizhi.png"></image>
      </view>
      <view class="d">
        <button type='' @click="gotoAddress">收货地址</button>
      </view>
  </view>
</template>

<script>
  import {mapState, mapMutations, mapGetters} from 'vuex'
  export default {
    name:"my-address",
    data() {
      return {
        address1: {},
        address2: '',
        cityInfo: '',
        id: '',
        phone: '',
        username: ''
      };
    },
    methods: {
      ...mapMutations('m_user',['updateAddress']),
      async gotoAddress() {
        const [err, succ] = await uni.chooseAddress().catch(err => err)
        if(err === null && succ.errMsg === 'chooseAddress:ok') {
          console.log('succ',succ)
          this.address1 = succ
          this.phone = succ.telNumber
          this.username = succ.userName
          this.address2 = succ.detailInfo
          this.cityInfo = succ.provinceName +''+ succ.cityName +''+ succ.countyName
          this.updateAddress(succ)
        }
        
        // 调用重新授权方法
        if (err && (err.errMsg === 'chooseAddress:fail auth deny' || err.errMsg === 'chooseAddress:fail authorize no response')){
          this.reAuth()
        }
      },
      // async postAddress(){
      //   const res = await uni.$http.post('/shop/user-address-add-edit',{
      //     address: this.address2,
      //     cityInfo: this.cityInfo,
      //     id: '',
      //     phone: this.phone,
      //     username: this.username
      //   })
      //   if(res.code !== 0) return uni.$showMsg()
      //   console.log('res',res)
      // },
      // 让用户重新授权
      async reAuth(){
        const [err2, confirmResult] = await uni.showModal({
          content: '检测到您没有开启权限地址,是否去设置打开?',
          confirmText: '确认',
          cancelText: '取消'
        })
        if(err2) return
        console.log(confirmResult)
        if(confirmResult.cancel) return uni.$showMsg('您取消了地址授权!')
        if(confirmResult.confirm) return uni.openSetting({
          success: (settingResult) => {
            if(!settingResult.authSetting['scope.address']) return uni.$showMsg('您取消了授权!')
            if(settingResult.authSetting['scope.address']) return uni.$showMsg('授权成功!请选择收货地址')
          }
        })
      }
    },
    computed: {
      ...mapState('m_user',['address']),
      ...mapGetters('m_user',['addstr']),
      // cityInfo() {
      //     if(!this.address1.provinceName) return ''
      //     return this.address1.provinceName + this.address1.cityName + this.address1.countyName
      //   }
    }
  }
</script>

<style lang="scss">
.login-bottom-service {
        height: 100rpx;
        width: 100%;
        // line-height: 200rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        .s {
          // height: 100rpx;
          line-height: 0rpx;
          image {
              width: 60rpx;
              height: 60rpx;
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
</style>
