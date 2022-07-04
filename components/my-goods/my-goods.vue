<template>
  <view>
    <!-- 左侧图片 -->
    <view>
      <image :src="goods.logo"></image>
    </view>
    <!-- 右侧盒子 -->
    <view>
      <!-- 商品名字 -->
      <view>{{goods.name}}</view>
      <view>
        <view>￥{{goods.price | tofixed}}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-goods",
    props: {
      goods: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        
      };
    },
    filters: {
      tofixed(num) {
        return Number(num).toFixed(2)
      }
    }
  }
</script>

<style lang="scss">

</style>
