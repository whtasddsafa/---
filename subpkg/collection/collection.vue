<template>
  <view class="tall">
    <!-- <view class="left-img-box" @click="gotoDetail(goods)">-->
    <view class="left-img-box">
      <block v-for="(item2,i2) in collection" :key="i2">
        <view class="data">
          <navigator class="img-box" :url="'/subpkg/details/details?goodsId=' + item2.goodsId">
            <image :src="item2.goodsLogo"></image>
          </navigator>
          <view class="right-box">
            <navigator class="text-box-top" :url="'/subpkg/details/details?goodsId=' + item2.goodsId">
              <view class="span1">
                <span class="span1">{{item2.goodsName}}</span>
              </view>
              <view class="span2">
                <uni-dateformat :date="item2.effectiveStartTime" format="yyyy/MM/dd"></uni-dateformat>-
                <uni-dateformat :date="item2.effectiveEndTime" format="yyyy/MM/dd"></uni-dateformat>
              </view>
              <view class="span3">
                <span>{{item2.address}}</span>
              </view>
            </navigator>
            <view class="text-box-bottom">
              <view class="text-box-bottom-left">
                <span>￥{{item2.marketPrice}}</span>
              </view>
              
              <view class="top-card-text-right">
                <likes :item="item2" class="likes"></likes>
                <!-- <span class="text-span">{{item2.collectCount}}</span> -->
              </view>
            </view>
          </view>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
  import likes from '@/components/my-collection/my-collection'
  export default {
    components:{likes},
    data() {
      return {
        favorite: false,
        collection: {},
        isCollect: true,
      };
    },
    onShow() {
      //调用数据
      this.getFloorList()
    },
    methods:{
      //收藏
      // toFavorite(){
      // 	this.favorite = !this.favorite;
      // },
      async getFloorList() {
        const {data: res} = await uni.$http.get('/shop/user-my-collects',{
          page: 1,
          limit: 100
        })
        console.log(res);
        if(res.code !== 0) return uni.$showMsg('您还未收藏!')
          this.collection = res.data
      },
    },
    gotoDetail(goods) {
      uni.navigateTo({
        url: '/subpkg/details/details?goodsId=' + goods.goodsId
      })
    },
  }
</script>

<style lang="scss">
.tall {
  box-sizing: border-box;
  padding: 0 10rpx;
  .left-img-box {
    box-sizing: border-box;
    margin-top: 20rpx;
    padding: 0 16rpx 20rpx 16rpx;
    // display: flex;
    // flex-direction: row;
    // justify-content: space-between;
    .data {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 10rpx;
      .img-box {
        image {
          border-radius: 12rpx;
          width: 270rpx;
          height: 360rpx;
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
            color: #333333;
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
            color: #5a5a5a;
            width: 318rpx;
            height: 30rpx;
            margin-bottom: 10rpx;
          }
          .span3 {
            font-family: 'Arial Normal', 'Arial', sans-serif;
            font-weight: 400;
            font-style: normal;
            font-size: 26rpx;
            letter-spacing: normal;
            color: #5a5a5a;
          }
        }
        .text-box-bottom {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin-bottom: 16rpx;
          height: 88rpx;
          
          .text-box-bottom-left {
            font-size: 32rpx;
            line-height: 88rpx;
          }
          .top-card-text-right {
            width: 80rpx;
            display: flex;
            flex-direction: column;
            align-items: center;
            image {
              width: 52rpx;
              height: 52rpx;
            }
            .text-span {
              font-size: 22rpx;
              color: gray;
            }
          }
        }
      }
    }
  }
}
</style>
