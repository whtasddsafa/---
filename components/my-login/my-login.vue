<template>
    <view class="login-container">
      <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
      <button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
      <!-- <button type="primary" class="btn-login" @click="login">一键登录</button> -->
    </view>
</template>

<script>
  import { mapMutations,mapState } from 'vuex'
  export default {
    name:"my-login",
    data() {
      return {
        
      };
    },
    computed: {
      ...mapState('m_user',['redirectInfo'])
    },
    methods: {
      ...mapMutations('m_user',['updateUserInfo','updateToken','updateRedirectInfo']),
      getUserInfo(e) {
        console.log('e',e);
        if(e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权!')
        this.updateUserInfo(e.detail.userInfo)
        this.getToken(e.detail)
      },
      async getToken(info) {
      // 获取code对应的值
        const [err, res] = await uni.login().catch(err => err)
        if(err || res.errMsg !== 'login:ok')return uni.$showMsg('登陆失败! 请重新登录!')
        console.log('res',res);
        console.log('info',info);
      // 参数
        const loginVO = {
          // avatarUrl: '',
          code: res.code,     //  必须
          encrypted_data: info.encryptedData,   //  加密用户数据 必须
          // gender: '',
          iv: info.iv,    //  加密算法的初始向量 必须
          // nickName: '',
          // phone: '',
          // rawData: info.rawData,
          // signature: info.signature,
          // avatarUrl: '',
          // openId: 123456,
        };
        // console.log(loginVO)
        // const {data: loginResult} = await uni.$http.post('/oauth/access_token', loginVO)
        const {data: loginResult} = await uni.$http.post('/oauth/access_token', {
          code: res.code,
          encrypted_data: info.encryptedData,
          iv: info.iv
        })
        console.log('loginResult',loginResult);
        if(loginResult.code !== 0) return uni.$showMsg('登陆失败! 请重新登录!')
        uni.$showMsg('登录成功!')
        this.updateToken(loginResult.data.Authorization)
        this.navigateBack()
      },
      navigateBack() {
        if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
          uni.switchTab({
            url: this.redirectInfo.from,
            complete: () => {
              this.updateRedirectInfo(null)
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .login-container {
    height: 750rpx;
    background-color: #F8F8F8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .btn-login {
      width: 90%;
      border-radius: 20px;
      margin: 15px 0;
      background-color: #eaea00;
      color: black;
    }
  }
</style>
