<template>
  <view>
    <view class="search-top">
      <!-- 搜索框 -->
      <view class="search-container">
          <uni-search-bar placeholder="活动名称" @confirm="search" @input="input" :radius="8" cancelButton="none"></uni-search-bar>
          <!-- <uni-search-bar placeholder="搜索您想要的美食" @confirm="search" @input="input" :radius="8" cancelButton="none"></uni-search-bar> -->
      </view>
      <view class="span-top" @click="testAs1">
          <view>
            <span>{{name}}</span>
          </view>
          <view>
            <image src="../../static/qb.svg" mode=""></image>
          </view>
      </view>
    </view>
    <!-- 搜索 -->
    <view class="left-img-box">
      <block v-for="(item2,i2) in searchResults" :key="i2">
        <view class="data" v-if="item2.effectiveEndTime >= getTime">
          <navigator class="img-box" :url="'/subpkg/details/details?goodsId=' + item2.goodsId">
            <image :src="item2.goodsLogo"></image>
          </navigator>
          <view class="right-box">
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
                <span></span>
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
    <!-- 全部信息 -->
    <view class="left-img-box" @click="gotoDetail(goods)" v-if="kw == ''">
      <block v-for="(item2,i2) in floorList.newGoods" :key="i2" v-if="item2.effectiveEndTime >= getTime">
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
    <!-- 演出活动 -->
    <view class="left-img-box" @click="gotoDetail(goods)" v-if="show !== ''">
        <block v-for="(item3,i3) in show" :key="i3">
          <view class="data" v-if="item3.effectiveEndTime >= getTime">
            <navigator class="img-box" :url="'/subpkg/details/details?goodsId=' + item3.goodsId">
              <image :src="item3.goodsLogo"></image>
            </navigator>
            <view class="right-box">
              <navigator class="text-box-top" :url="'/subpkg/details/details?goodsId=' + item3.goodsId">
                <view class="span1">
                  <span class="span1">{{item3.goodsName}}</span>
                </view>
                <view class="span2">
                  <uni-dateformat :date="item3.effectiveStartTime" format="yyyy/MM/dd"></uni-dateformat>-
                  <uni-dateformat :date="item3.effectiveEndTime" format="yyyy/MM/dd"></uni-dateformat>
                </view>
                <view class="span3">
                  <span>{{item3.address}}</span>
                </view>
              </navigator>
              <view class="text-box-bottom">
                <view class="text-box-bottom-left">
                  <span>￥{{item3.marketPrice}}</span>
                </view>
                
                <view class="top-card-text-right">
                  <likes :item="item3" class="likes"></likes>
                  <!-- <span class="text-span">{{item3.collectCount}}</span> -->
                </view>
              </view>
            </view>
          </view>
        </block>
    </view>
    <!-- 热门活动 -->
    <view class="left-img-box" @click="gotoDetail(goods)" v-if="hot !== ''">
        <block v-for="(item4,i4) in hot" :key="i4">
          <view class="data" v-if="item4.effectiveEndTime >= getTime">
            <navigator class="img-box" :url="'/subpkg/details/details?goodsId=' + item4.goodsId">
              <image :src="item4.goodsLogo"></image>
            </navigator>
            <view class="right-box">
              <navigator class="text-box-top" :url="'/subpkg/details/details?goodsId=' + item4.goodsId">
                <view class="span1">
                  <span class="span1">{{item4.goodsName}}</span>
                </view>
                <view class="span2">
                  <uni-dateformat :date="item4.effectiveStartTime" format="yyyy/MM/dd"></uni-dateformat>-
                  <uni-dateformat :date="item4.effectiveEndTime" format="yyyy/MM/dd"></uni-dateformat>
                </view>
                <view class="span3">
                  <span>{{item4.address}}</span>
                </view>
              </navigator>
              <view class="text-box-bottom">
                <view class="text-box-bottom-left">
                  <span>￥{{item4.marketPrice}}</span>
                </view>
                
                <view class="top-card-text-right">
                  <likes :item="item4" class="likes"></likes>
                  <!-- <span class="text-span">{{item3.collectCount}}</span> -->
                </view>
              </view>
            </view>
          </view>
        </block>
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
         favorite: true,
         timer: null,
         kw: '',
         // 搜索结果的列表
         searchResults: [],
         // 请求参数对象
         queryObj: {
           query: '', //查询关键词
           cid: '', //ID
           pageNum: 1, //页数索引
           pagesize: 10, //每页长度
         },
         goodsList: [],
         total : 0,
         // 楼层的数据
         floorList: [],
         page: 1,
         page_num: 10,
         name: '全部活动',
         show: [],
         hot: [],
         getTime: ''
         //节流
         // isloading: false
      };
    },
    onLoad(options) {
      this.getCurrentTime()
      // this.queryObj.query = options.query || ''
      // this.queryObj.cid = options.cid || ''
      this.getUser()
      this.getGoodsList()
      //调用全部订单数据
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
          　　console.log(this.getTime)  
          },
      //获取用户信息
      async getUser() {
        const {data: res} = await uni.$http.get('/shop/user-my-info')
        if(res.code !== 0) return uni.$showMsg('请登录~')
          this.id = res.data.id
          console.log('id',this.id)
      },
      // 搜索框
      input(e) {
        let that = this
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          that.kw = e
          console.log(that.kw)
          this.getSearchList()
        },500)
      },
      // 搜索接口
      async getSearchList() {
        this.show = []
        this.hot = []
        this.floorList = []
        if(this.kw.length === 0) {
          this.searchResults = []
          return
        }
        const {data: res} = await uni.$http.get('/shop/mall-goods-list', {
          keywords: this.kw,
          page: this.page,
          page_num: this.page_num,
          userId: this.id
          })
        if(res.code !== 0) return uni.$showMsg()
        this.searchResults = res.data.list
      },
      // 全部数据
      async getFloorList() {
        this.show = []
        this.hot = []
        this.searchResults = []
        const {data: res} = await uni.$http.get('/shop/mall-lists',{
          page: this.page,
          limit: this.page_num,
          userId: this.id
        })
        console.log(res);
        if(res.code !== 0) return uni.$showMsg()
          this.floorList = res.data
          // this.goodsCates = res.data.goodsCates
          // this.newGoods = res.data.newGoods
          // this.recommedGoods = res.data.recommedGoods
      },
      // 演出活动数据
      async getShow() {
        this.floorList = []
        this.hot = []
        this.searchResults = []
        const {data: res} = await uni.$http.get('/shop/mall-goods-list',{
          cat_id: 14,
          page: this.page,
          page_num: this.page_num,
          userId: this.id
        })
        console.log('show',res);
        if(res.code !== 0) return uni.$showMsg()
          this.show = res.data.list
      },
      // 热门活动数据
      async getHot() {
        this.floorList = []
        this.show = []
        this.searchResults = []
        const {data: res} = await uni.$http.get('/shop/mall-goods-list',{
          cat_id: 13,
          page: this.page,
          page_num: this.page_num,
          userId: this.id
        })
        console.log('show',res);
        if(res.code !== 0) return uni.$showMsg()
          this.hot = res.data.list
      },
      // gotoDetail1(item) {
      //   console.log(item.goodsId)
      // },
      
      // 跳转
      gotoDetail(goods) {
        uni.navigateTo({
          url: '/subpkg/details/details?goods_id=' + goods.goods_id
        })
      },
      // 获取列表数据的方法
      async getGoodsList(cb) {
        //打开节流
        // this.isloading = true
        const {data: res} = await uni.$http.get('/shop/mall-lists',{
        keywords: this.kw,
        page: this.page,
        limit: this.page_num,
        userId: this.id
        })
        //关闭节流
        // this.isLoading = false
        cb && cb()
        if(res.code !== 0) return uni.$showMsg()
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
      },
      
      //收藏
        toFavorite(){
          this.favorite = !this.favorite;
        },
        //更多
        testAs1 () {
              this.$refs.as.handleShow({
                actions: [
                  {
                    name: '全部',
                    // icon: 'iconfont active',
                    // color: '#007aff'
                    // this.getGoodsList()
                  },
                  {
                    name: '演出活动',
                    // name: '酒水',
                    // color: '#007aff',
                    // image: ''
                  },
                  {
                    name: '热门活动',
                    // color: '#007aff',
                    // image: ''
                  },
                  // {
                  //   name: '往期回顾',
                  //   // color: '#007aff',
                  //   // image: ''
                  // },
                  // {
                  //   name: '学生票',
                  //   // image: ''
                  // },
                ],
                success: (res) => {
                  switch (res.id) {
                    // -1代表取消按钮
                    case -1:
                      console.log(res)
                      break
                    case 0:
                      console.log(res)
                      this.name = '全部活动'
                      this.getFloorList()
                      break
                    case 1:
                      console.log(res)
                      this.name = '演出活动'
                      this.getShow()
                      break
                    case 2:
                      console.log(res)
                      this.name = '热门活动'
                      this.getHot()
                      break
                    // case 3:
                    //   console.log(res)
                    //   this.name = '往期回顾'
                    //   break
                    // case 4:
                    //   console.log(res)
                    //   this.name = '学生票'
                    //   break
                  }
                }
              })
            },
    },
    onReachBottom() {
      // if(this.page_num * this.page >= this.total) return uni.$shwMsg('已经到底啦！')
      // 判断是否节流
      // if(this.isloading) return
      // 下拉加载更多
      this.page_num++
      // this.getGoodsList()
      this.getFloorList()
    },
    onPullDownRefresh() {
      // 重置关键数据
      this.page = 1,
      // this.total = 0,
      this.isloading = false,
      this.floorList = [],
      // 重新发起请求
      this.getFloorList(() =>uni.stopPullDownRefresh())
    },
  }
</script>

<style lang="scss">
  .search-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 140rpx;
    line-height: 140rpx;
    background: black;
    width: 100%;
    .search-container {
      height: 140rpx!important;
      line-height: 140rpx;
      margin: auto;
      position: sticky;
      top: 0;
      z-index: 999;
      width: 532rpx;
      margin-top: 14rpx;
    }
    .span-top {
      color: white;
      padding-right: 10rpx;
      font-size: 28rpx;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      margin: auto;
      width: 178rpx;
      line-height: 140rpx;
      image {
        margin-top: 56rpx;
        width: 30rpx;
        height: 30rpx;
      }
    }
  }
  .sugg-list {
    padding: 0 10rpx 0 20rpx;
    .sugg-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 30rpx;
      padding: 26rpx 0;
      border-bottom: 1px solid #efefef;
      .goods-name{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .left-img-box {
    box-sizing: border-box;
    margin-top: 20rpx;
    padding: 0rpx 20rpx;
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
  // .left-img-box-bottom {
  //   box-sizing: border-box;
  //   margin-top: 20rpx;
  //   display: flex;
  //   flex-direction: row;
  //   justify-content: space-between;
  //   .img-box {
  //     image {
  //       width: 270rpx;
  //       height: 360rpx;
  //     }
  //   }
  //   .right-box {
  //     margin-left: 20rpx;
  //     box-sizing: border-box;
  //     width: 424rpx;
  //     display: flex;
  //     flex-direction: column;
  //     justify-content: space-between;
  //     .text-box-top {
  //       margin-top: 10rpx;
  //       .span1 {
  //         font-size: 40rpx;
  //         font-family: 'Arial Normal', 'Arial', sans-serif;
  //         font-weight: 400;
  //         font-style: normal;
  //         color: #333333;
  //         display:-webkit-box; 
  //         overflow:hidden; 
  //         -webkit-line-clamp:3;
  //         -webkit-box-orient:vertical;
  //         height: 160rpx;
  //       }
  //       .span2 {
  //         margin-top: 20rpx;
  //         font-family: 'Arial Normal', 'Arial', sans-serif;
  //         font-weight: 400;
  //         font-style: normal;
  //         font-size: 26rpx;
  //         letter-spacing: normal;
  //         color: #5a5a5a;
  //         width: 268rpx;
  //         height: 30rpx;
  //         margin-bottom: 10rpx;
  //       }
  //       .span3 {
  //         font-family: 'Arial Normal', 'Arial', sans-serif;
  //         font-weight: 400;
  //         font-style: normal;
  //         font-size: 26rpx;
  //         letter-spacing: normal;
  //         color: #5a5a5a;
  //       }
  //     }
  //     .text-box-bottom {
  //       display: flex;
  //       flex-direction: row;
  //       justify-content: space-between;
  //       margin-bottom: 16rpx;
  //     }
  //     .text-box-bottom-left {
  //       font-size: 32rpx;
  //     }
  //     .text-box-bottom-right {
  //       color: #7a7a7a;
  //     }
  //   }
  // }
</style>
