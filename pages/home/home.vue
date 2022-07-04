<template>
  <view class="tall">
    <!-- 轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <!-- <swiper-item v-for="(item, i) in swiperList" :key = "i" v-if="item.effectiveEndTime >= getTime"> -->
      <swiper-item v-for="(item, i) in swiperList" :key = "i">
        <navigator class="swiper-item" :url="'/subpkg/details/details?goodsId=' + item.goodsId">
          <image :src="item.lunboPic" mode="widthFix"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 搜索 -->
    <view class="my-search-container" @click="gotoSearch">
      <view class="my-search-box">
        <uni-icons class="uni-icons" type="search" size="18"></uni-icons>
        <!-- <text class="placeholder">活动名称/场地/艺人</text> -->
        <text class="placeholder">搜索</text>
      </view>
    </view>
    <!-- 活动区域 -->
      <view class="floor-list">
        <!-- 标题 -->
        <view class="floor-top" v-for="(item,i) in floorList.goodsCates" :key = "i">
              <view class="floor-top1">
                <view>
                  <!-- <span class="span1">{{item.cateTitle}}</span> -->
                  <span class="span1">餐饮活动</span>
                </view>
                <view class="span-top" @click="gengduo(id)">
                <!-- <view class="span-top" @click="testAs1"> -->
                  <view>
                    <span v-if="item.id === 13">更多</span>
                    <span v-else>全部活动</span>
                  </view>
                  <view>
                    <image src="../../static/gengduo.svg" mode=""></image>
                  </view>
                </view>
              </view>
            <view class="floor-img-box" v-if="item.id == 13">
              <view v-for="(item2,i2) in floorList.newGoods" :key="i2">
                <view v-if="item2.cateId == 13 && item2.effectiveEndTime >= getTime">
                  <navigator class="img-box" :url="'/subpkg/details/details?goodsId=' + item2.goodsId">
                    <image :src="item2.goodsLogo"></image>
                    <view class="span-box">
                      <span>{{item2.goodsName}}</span>
                    </view>
                  </navigator>
                </view>
              </view>
            </view>
            <view class="left-img-box" v-else>
            <block v-for="(item2,i2) in floorList.newGoods" :key="i2">
              <!-- <view class="data" v-if="item2.effectiveEndTime >= getTime"> -->
              <view class="data">
                <navigator class="img-box" :url="'/subpkg/details/details?goodsId=' + item2.goodsId" v-if="item2.cateId == 14">
                  <image :src="item2.goodsLogo"></image>
                </navigator>
                <view class="right-box" v-if="item2.cateId == 14">
                  <navigator class="text-box-top" :url="'/subpkg/details/details?goodsId=' + item2.goodsId">
                    <view class="span1">
                      <span class="span1">{{item2.goodsName}}</span>
                    </view>
                    <view class="span2">
                      <!-- <span>
                        {{item2.effectiveStartTime}} - {{item2.effectiveEndTime}}
                      </span> -->
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
    </view>
    <min-action-sheet ref="as"></min-action-sheet>
  </view>
</template>

<script>
  import minActionSheet from '@/components/min-action-sheet/min-action-sheet'
  import likes from '@/components/my-collection/my-collection'
  export default {
    components: {minActionSheet,likes},
    data() {
      return {
        id: '',
        // 轮播图的数据列表
        swiperList:[],
        // 楼层的数据
        floorList: [],
        // 活动名称
        goodsCates: [],
        newGoods: [],
        recommedGoods: [],
        favorite: true,
        item: '',
        page: 1,
        page_num: 100,
        pastDue: [],
        getTime: ''
      }
    },
    onShow() {
      this.getCurrentTime()
      // 获取用户信息
      this.getUser()
      //调用方法获取轮播图数据
      this.getSwiperList()
      //调用商品分类模块列表
      setTimeout(()=>{
        this.getFloorList()
      },500)
    },
    methods: {
      //获取当前时间
      getCurrentTime() {
        // new data().getTime()
              var _this = this;
          　　let yy = new Date().getFullYear();
          　　let mm = new Date().getMonth()+1 < 10 ? '' + new Date().getMonth()+1 : new Date().getMonth()+1;
          　　let dd = new Date().getDate()<10 ? '0' + new Date().getDate() : new Date().getDate();
          　　let hh = new Date().getHours()<10 ? '0' + new Date().getHours() : new Date().getHours();
          　　let mf = new Date().getMinutes()<10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
          　　let ss = new Date().getSeconds()<10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
          　　_this.gettime = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
              this.getTime = _this.gettime
          },
      //获取用户信息
      async getUser() {
        const {data: res} = await uni.$http.get('/shop/user-my-info')
        if(res.code !== 0) return
          this.id = res.data.id
      },
      // 轮播图
      async getSwiperList() {
        const {data: res} = await uni.$http.get('/shop/mall-goods-list')
        if(res.code !== 0)
          return uni.$showMsg()
          for ( var i = 0; i < res.data.list.length; i++){
             res.data.list[i].lunboPic = res.data.list[i].lunboPic.replace(/,/g, '')
          }
          // res.data.list[0].lunboPic = res.data.list[0].lunboPic.replace(/,/g, '')
        this.swiperList = res.data.list
      },
      // 商品分类模块列表
      async getFloorList() {
        const {data: res} = await uni.$http.get('/shop/mall-lists',{
          page: this.page,
          limit: this.page_num,
          userId: this.id
        })
        if(res.code !== 0) return uni.$showMsg()
          this.floorList = res.data
          this.pastDue = res.data.newGoods[0].effectiveEndTime
      },
      //搜索跳转页面
      gotoSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      },
      //更多
      testAs1 () {
            this.$refs.as.handleShow({
              actions: [
                {
                  name: '全部活动',
                  // icon: 'iconfont active',
                  // color: '#007aff'
                },
                {
                  name: '学生票',
                  image: ''
                },
                {
                  name: '演出活动',
                  // color: '#007aff',
                  image: ''
                },
                {
                  name: '热门活动',
                  // color: '#007aff',
                  image: ''
                },
                {
                  name: '往期回顾',
                  // color: '#007aff',
                  image: ''
                },
              ],
              success: (res) => {
                switch (res.id) {
                  // -1代表取消按钮
                  case -1:
                    console.log(res)
                    break
                  case 0:
                    console.log(res)
                    uni.navigateTo({
                      url: '/subpkg/search/search'
                    })
                    break
                  case 1:
                    console.log(res)
                    uni.navigateTo({
                      url: '/subpkg/search/search'
                    })
                    break
                  case 2:
                    console.log(res)
                    uni.navigateTo({
                      url: '/subpkg/search/search'
                    })
                    break
                  case 3:
                    console.log(res)
                    uni.navigateTo({
                      url: '/subpkg/search/search'
                    })
                    break
                  case 4:
                    console.log(res)
                    uni.navigateTo({
                      url: '/subpkg/search/search'
                    })
                    break
                }
              }
            })
          },
          gengduo() {
            uni.navigateTo({
              url: '/subpkg/search/search?id='
            })
          }
    }
  }
</script>

<style lang="scss">
.tall {
  box-sizing: border-box;
  padding: 0 20rpx;
  swiper {
    height: 330rpx;
    padding-bottom: 20rpx;
    .swiper-item, 
      image {
        width: 100%;
        height: 100%;
    }
  }
  // 搜索
  .my-search-container {
    
    position: sticky;
    top: 0;
    z-index: 999;
    height: 80rpx;
    display: flex;
    align-items: center;
    padding-top: 5rpx;
    padding-bottom: 20rpx;
    .my-search-box {
      
      background: white;
      height: 80rpx;
      line-height: 80rpx;
      border-radius: 8px;
      width: 100%;
      border: 2px solid #000000;
      .uni-icons {
        margin-left: 15rpx;
      }
      .placeholder {
        font-size: 30rpx;
        margin-left: 17rpx;
        color: #7a7a7a;
      }
    }
  }
  .floor-list {
    box-sizing: border-box;
    .floor-top {
      width: 100%;
      height: 550rpx;
      
      .floor-top1 {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 110rpx;
        .span1 {
          font-size: 56rpx;
          background:linear-gradient(to bottom,transparent 0%,transparent 50%,#f4ea2a 51%,#f4ea2a 100%);
        }
        .span-top {
          font-size: 28rpx;
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          // margin: auto;
          width: 180rpx;
          line-height: 110rpx;
          span {
            font-size: 32rpx;
            color: #333333;
            font-family: 'Arial Normal', 'Arial', sans-serif;
            font-weight: 400;
            font-style: normal;
          }
          image {
            margin-top: 40rpx;
            width: 30rpx;
            height: 30rpx;
          }
        }
      }
      .floor-img-box {
        // box-sizing: border-box;
        overflow : scroll;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        .img-box {
          margin-right: 40rpx;
          width: 280rpx;
          image {
            border-radius: 12rpx;
            width: 280rpx;
            height: 360rpx;
          }
          .span-box {
            width: 280rpx;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            span {
              font-size: 32rpx;
              color: #333333;
              font-family: 'Arial Normal', 'Arial', sans-serif;
              font-weight: 400;
            }
          }
        }
      }
      .left-img-box {
        box-sizing: border-box;
        margin-top: 20rpx;
        // padding: 0rpx 20rpx;
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
                width: 320rpx;
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
  }
  
  .floor-list2 {
    margin-top: 20rpx;
    .floor-top {
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      height: 80rpx;
      line-height: 80rpx;
      span {
        font-size: 56rpx;
        background:linear-gradient(to bottom,transparent 0%,transparent 50%,#f4ea2a 51%,#f4ea2a 100%);
      }
      .span-top {
        font-size: 28rpx;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        // margin: auto;
        width: 178rpx;
        line-height: 140rpx;
        p {
          font-size: 32rpx;
          color: #333333;
          font-family: 'Arial Normal', 'Arial', sans-serif;
          font-weight: 400;
          font-style: normal;
        }
        image {
          margin-top: 56rpx;
          width: 30rpx;
          height: 30rpx;
        }
      }
      
    }
    .left-img-box-bottom {
      box-sizing: border-box;
      margin-top: 20rpx;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .img-box {
        image {
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
            width: 320rpx;
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