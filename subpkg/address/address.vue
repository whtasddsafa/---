<template>
  <view class="address-info-box">
    <!-- <view class="address" @myEven="getNum"> -->
    <view class="address">
      <view class="name">
        {{address.userName}}, {{address.telNumber}}
      </view>
      <view class="detailed">
        {{addstr}}
      </view>
    </view>
  </view>
</template>

<script>
  // import {mapState, mapMutations, mapGetters} from 'vuex'
  export default {
      onShow(){
       this.address=this.$store.state.address
      },
    data() {
      return {
        address:{}
      };
    },
    // onLoad(options){
    // 		console.log(options);
    // 		this.address=JSON.parse(options.obj)
    // },
    methods:{
      // ...mapMutations('m_user',['updateAddress'])
      // getNum (address) {
      //   console.log(address)
      //   this.address = address
      // }
    
    },
    computed: {
      // ...mapState('m_user', ['address']),
      // ...mapGetters('m_user', ['addstr'])
      addstr(address) {
          if(!address.address.provinceName) return ''
          return address.address.provinceName + address.address.cityName + address.address.countyName + address.address.detailInfo
        }
      }
    }
</script>

<style lang="scss">
  .address-info-box {
    .address {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 96rpx;
      width: 100%;
      // line-height: 100rpx;
      padding: 18rpx 26rpx;
      border-bottom: 1px solid #e1e1e1;
      .name {
        font-size: 34rpx;
      }
      .detailed {
        font-size: 28rpx;
        color: #C0C0C0;
      }
    }
  }
</style>
