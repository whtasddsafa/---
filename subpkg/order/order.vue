<template>
    <view class="tall">
        <custom-tabs index="0" :animation="true" tabPadding="40" :scrollY="true" :flex="false" @changeIndex="changeIndex">
            <custom-tab-pane label="全部订单">
                <view class="allOrders" v-for="(item,i) in goods" :key = "i">
                  <view class="top" @click="orderDetails(item)">
                    <view class="orderNo">
                      订单号: {{item.orderSn}}
                    </view>
                    <view class="state" v-if="item.orderStatus == -1">
                      已取消
                    </view>
                    <view class="state" v-if="item.payStatus == 0 && item.orderStatus == 0">
                      待付款
                    </view>
                    <view class="state" v-if="item.payStatus == 1 && item.orderStatus == 1">
                      已付款 (待使用)
                    </view>
                    <view class="state" v-if="item.payStatus == 1 && item.orderStatus == 2">
                      使用完成
                    </view>
                  </view>
                  <view class="left-img-box" @click="orderDetails(item)">
                      <view class="data">
                        <view class="img-box" v-for="(item2, i2) in item.goodsList" :key = "i2">
                          <image :src="item2.goodsLogo"></image>
                        </view>
                        <view class="right-box">
                          <view class="text-box-top">
                            <view class="span1" v-for="(item2, i2) in item.goodsList" :key="i2">
                              <span class="span1">{{ item2.goodsName }}</span>
                            </view>
                            <view class="span3" v-for="(item2, i2) in item.goodsList" :key="i2">
                              <span>{{item2.address}}</span>
                            </view>
                            <view class="span2" v-for="(item2, i2) in item.goodsList" :key="i2">
                              活动时间:
                              <uni-dateformat :date="item2.effectiveStartTime" format="yyyy/MM/dd"></uni-dateformat>-
                              <uni-dateformat :date="item2.effectiveEndTime" format="yyyy/MM/dd"></uni-dateformat>
                            </view>
                            <view class="span4">
                              <!-- <span>选择场次:{{item.changci}}</span> -->
                            </view>
                          </view>
                        </view>
                      </view>
                  </view>
                  <view class="order-bottom">
                    <view class="bottom1">
                      <view class="span-top" @click="testAs1(item)" v-if="item.orderStatus !== 1">
                        <!-- <view> -->
                          <span>操作</span>
                        <!-- </view> -->
                      </view>
                      <view class="bottom-span" v-for="(item2, i2) in item.goodsList" :key="i2" @click="orderDetails(item)">
                        <view class="bottom-span1">
                          <span>{{item2.goodsName}}</span>
                        </view>
                        <view class="bottom-span2">
                          <span>{{item.count}}</span>
                        </view>
                        <view class="bottom-span3">
                          <span class="bottom-span3">张</span>
                        </view>
                      </view>
                    </view>
                    <view class="" v-if="item.payStatus == 1" @click="orderDetails(item)">
                      实际付款￥{{item.totalAmount}}
                    </view>
                    <view class="button" v-if="item.payStatus == 0 && item.orderStatus !== -1" @click="orderDetails(item)">
                      <button type="default" size="mini">去付款</button>
                    </view>
                  </view>
                </view>
            </custom-tab-pane>
            <!-- 待付款 -->
            <custom-tab-pane label="待付款">
              <view class="allOrders" v-for="(item,i) in goods" :key = "i" v-if="item.payStatus == 0 && item.orderStatus == 0">
                <view class="top" @click="orderDetails(item)">
                  <view class="orderNo">
                    订单号: {{item.orderSn}}
                  </view>
                  <view class="state">
                    待付款
                  </view>
                </view>
                <view class="left-img-box" @click="orderDetails(item)">
                    <view class="data">
                      <view class="img-box" v-for="(item2, i2) in item.goodsList" :key = "i2">
                        <image :src="item2.goodsLogo"></image>
                      </view>
                      <view class="right-box">
                        <view class="text-box-top">
                          <view class="span1" v-for="(item2, i2) in item.goodsList" :key="i2">
                            <span class="span1">{{item2.goodsName}}</span>
                          </view>
                          <view class="span3" v-for="(item2, i2) in item.goodsList" :key="i2">
                            <span>{{item2.address}}</span>
                          </view>
                          <view class="span2" v-for="(item2, i2) in item.goodsList" :key="i2">
                            活动时间:
                            <uni-dateformat :date="item2.effectiveStartTime" format="yyyy/MM/dd"></uni-dateformat>-
                            <uni-dateformat :date="item2.effectiveEndTime" format="yyyy/MM/dd"></uni-dateformat>
                          </view>
                          <view class="span4">
                            <!-- <span>选择场次:{{item.changci}}</span> -->
                          </view>
                        </view>
                      </view>
                    </view>
                </view>
                <view class="order-bottom">
                  <view class="bottom1">
                    <view class="span-top" @click="testAs1(item)">
                      <!-- <view> -->
                        <span>操作</span>
                      <!-- </view> -->
                    </view>
                    <view class="bottom-span" v-for="(item2, i2) in item.goodsList" :key="i2" @click="orderDetails(item)">
                      <view class="bottom-span1">
                        <span>{{item2.goodsName}}</span>
                      </view>
                      <view class="bottom-span2">
                        <span>{{item.count}}</span>
                      </view>
                      <view class="bottom-span3">
                        <span class="bottom-span3">张</span>
                      </view>
                    </view>
                  </view>
                  <!-- <view class="" v-if="item.orderStatus == 1" @click="orderDetails(item)">
                    实际付款￥{{item.totalAmount}}
                  </view> -->
                  <view class="button" @click="orderDetails(item)">
                    <button type="default" size="mini" @click="payment(item)">去付款</button>
                  </view>
                </view>
              </view>
            </custom-tab-pane>
            <!-- 已付款 -->
            <custom-tab-pane label="已付款">
              <view class="allOrders" v-for="(item,i) in goods" :key = "i" v-if="item.payStatus == 1 && item.orderStatus == 1">
                <view class="top" @click="orderDetails(item)">
                  <view class="orderNo">
                    订单号: {{item.orderSn}}
                  </view>
                  <view class="state" v-if="item.payStatus == 1 && item.orderStatus == 1">
                    已付款 (待使用)
                  </view>
                </view>
                <view class="left-img-box" @click="orderDetails(item)">
                    <view class="data">
                      <view class="img-box" v-for="(item2, i2) in item.goodsList" :key = "i2">
                        <image :src="item2.goodsLogo"></image>
                      </view>
                      <view class="right-box">
                        <view class="text-box-top">
                          <view class="span1" v-for="(item2, i2) in item.goodsList" :key="i2">
                            <span class="span1">{{ item2.goodsName }}</span>
                          </view>
                          <view class="span3" v-for="(item2, i2) in item.goodsList" :key="i2">
                            <span>{{item2.address}}</span>
                          </view>
                          <view class="span2" v-for="(item2, i2) in item.goodsList" :key="i2">
                            活动时间:
                            <uni-dateformat :date="item2.effectiveStartTime" format="yyyy/MM/dd"></uni-dateformat>-
                            <uni-dateformat :date="item2.effectiveEndTime" format="yyyy/MM/dd"></uni-dateformat>
                          </view>
                          <view class="span4">
                            <!-- <span>选择场次:{{item.changci}}</span> -->
                          </view>
                        </view>
                      </view>
                    </view>
                </view>
                <view class="order-bottom">
                  <view class="bottom1">
                    <view class="span-top" @click="testAs1(item)">
                      <!-- <view> -->
                        <span>操作</span>
                      <!-- </view> -->
                    </view>
                    <view class="bottom-span" v-for="(item2, i2) in item.goodsList" :key="i2" @click="orderDetails(item)">
                      <view class="bottom-span1">
                        <span>{{item2.goodsName}}</span>
                      </view>
                      <view class="bottom-span2">
                        <span>{{item.count}}</span>
                      </view>
                      <view class="bottom-span3">
                        <span class="bottom-span3">张</span>
                      </view>
                    </view>
                  </view>
                  <view class="" @click="orderDetails(item)">
                    实际付款￥{{item.totalAmount}}
                  </view>
                </view>
              </view>
            </custom-tab-pane>
            <!-- 使用完成 -->
            <custom-tab-pane label="使用完成">
              <view class="allOrders" v-for="(item,i) in goods" :key = "i" @click="orderDetails(item)" v-if="item.orderStatus == 2 && item.payStatus == 1">
                <view class="top">
                  <view class="orderNo">
                    订单号: {{item.orderSn}}
                  </view>
                  <view class="state">
                    使用完成
                  </view>
                </view>
                <view class="left-img-box">
                    <view class="data">
                      <view class="img-box" v-for="(item2, i2) in item.goodsList" :key = "i2">
                        <image :src="item2.goodsLogo"></image>
                      </view>
                      <view class="right-box">
                        <view class="text-box-top">
                          <view class="span1" v-for="(item2, i2) in item.goodsList" :key="i2">
                            <span class="span1">{{ item2.goodsName }}</span>
                          </view>
                          <view class="span3" v-for="(item2, i2) in item.goodsList" :key="i2">
                            <span>{{item2.address}}</span>
                          </view>
                          <view class="span2" v-for="(item2, i2) in item.goodsList" :key="i2">
                            活动时间:
                            <uni-dateformat :date="item2.effectiveStartTime" format="yyyy/MM/dd"></uni-dateformat>-
                            <uni-dateformat :date="item2.effectiveEndTime" format="yyyy/MM/dd"></uni-dateformat>
                          </view>
                          <view class="span4">
                            <!-- <span>选择场次:{{item.changci}}</span> -->
                          </view>
                        </view>
                      </view>
                    </view>
                </view>
                <view class="order-bottom">
                  <view class="bottom1">
                    <view class="span-top" @click="testAs1(item)">
                      <!-- <view> -->
                        <span>操作</span>
                      <!-- </view> -->
                    </view>
                    <view class="bottom-span" v-for="(item2, i2) in item.goodsList" :key="i2" @click="orderDetails(item)">
                      <view class="bottom-span1">
                        <span>{{item2.goodsName}}</span>
                      </view>
                      <view class="bottom-span2">
                        <span>{{item.count}}</span>
                      </view>
                      <view class="bottom-span3">
                        <span class="bottom-span3">张</span>
                      </view>
                    </view>
                  </view>
                  <view class="" @click="orderDetails(item)">
                    实际付款￥{{item.totalAmount}}
                  </view>
                </view>
              </view>
            </custom-tab-pane>
        </custom-tabs>
        <min-action-sheet ref="as"></min-action-sheet>
    </view>
</template>
<script>
    export default {
      data() {
        return {
          goods: [],
          goodsList: [],
          page: 1,
          page_num: 66
        };
      },
      onLoad() {
        this.getFloorList()
      },
      methods: {
        onPullDownRefresh:function(){
          this.getFloorList()
         },
         // onPullDownRefresh() {
         //       uni.request({
         //                url:'',
         //                success: (res) => {
         //                    uni.stopPullDownRefresh()
         //                }
         //            })
                
         //    },
          changeIndex(index) {
              console.log('改变了index:', index)
          },
          //获取订单列表
          async getFloorList() {
            const {data: res} = await uni.$http.get('/shop/user-order-list',{
              page: this.page,
              page_num: this.page_num
            })
            console.log(res);
            if(res.code !== 0) return uni.$showMsg()
              this.goods = [...this.goods, ...res.data]  //下拉加载更多拼接
              // this.goodsList = res.data[0].goodList
              // res.data.goodsList.forEach((item)=>{
              //   this.goodsList.push(item)
              // })
          },
          // 取消订单操作
          async Postoperation(item) {
            const {data: res} = await uni.$http.post('/shop/user-order-handle',{
              type: -1,
              order_id: item.orderId
            })
              console.log(res);
              if(res.code !== 0) return uni.$showMsg('取消失败')
              this.getFloorList()
              return uni.$showMsg('您取消了订单')
              // this.onLoad()
          },
          // 删除订单操作
          async Postoperation1(item) {
            const {data: res} = await uni.$http.post('/shop/user-order-handle',{
              type: 0,
              order_id: item.orderId
            })
              console.log(res);
              if(res.code == 4002) {
                return uni.$showMsg('该订单已删除~')
              }else if(res.code !== 0) {
                console.log(res.message)
                return uni.$showMsg('删除失败')
              }
              this.getFloorList()
              return uni.$showMsg('您成功删除订单~')
              
              // this.onLoad()
          },
          // 订单详情
          orderDetails(item) {
            uni.navigateTo({
              url: '/subpkg/payment/payment?orderId=' + item.orderId
            })
          },
          // 付款
          payment(item) {
            uni.navigateTo({
              url: '/subpkg/payment/payment?orderId=' + item.orderId
            })
          },
          testAs1 (item) {
                this.$refs.as.handleShow({
                  actions: [
                    {
                      name: '取消订单',
                    },
                    {
                      name: '删除订单',
                    },
                  ],
                  success: (res) => {
                    switch (res.id) {
                      // -1代表取消按钮
                      case -1:
                        console.log(res)
                        break
                      case 0:
                      // 取消订单
                        console.log(res)
                        console.log(item)
                        this.Postoperation(item)
                        break
                      case 1:
                      // 删除订单
                        console.log(res)
                        console.log(item)
                        this.Postoperation1(item)
                        break
                    }
                  }
                })
              },
      },
      // 下拉加载更多
      onReachBottom() {
        this.page_num++
        this.getFloorList()
      }
    }
</script>
<style scoped lang="scss">
  .tall {
    height: 700rpx;
    .allOrders {
      height: 520rpx;
      margin: 10rpx 10rpx 30rpx 10rpx;
      padding: 6rpx;
      background-color: #ffffff;
      border-radius: 18rpx;
      // display: flex;
      // flex-direction: column;
      // justify-content: center;
      .top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-size: 28rpx;
        height: 60prx;
        line-height: 60rpx;
        border-bottom: 1px solid #eeeeee;
        margin: 0 16rpx;
        padding-bottom: 10rpx;
        font-family: Microsoft Yahei;
        .orderNo {
          
        }
        .state {
          
        }
      }
      .left-img-box {
        box-sizing: border-box;
        height: 350rpx;
        padding: 20rpx 14rpx;
        margin-bottom: 10rpx;
        // padding: 0rpx 20rpx;
        // display: flex;
        // flex-direction: row;
        // justify-content: space-between;
        .data {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding-bottom: 18rpx;
          border-bottom: 1px solid #eeeeee;
          
          .img-box {
            image {
              border-radius: 16rpx;
              width: 260rpx;
              height: 318rpx;
            }
          }
          .right-box {
            margin-left: 20rpx;
            // box-sizing: border-box;
            width: 424rpx;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .text-box-top {
              margin-top: 10rpx;
              .span1 {
                font-size: 40rpx;
                font-family: Microsoft Yahei;
                font-weight: 400;
                font-style: normal;
                color: #333333;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                width: 430rpx;
                height: 70rpx;
              }
              .span2 {
                font-family: Microsoft Yahei;
                font-weight: 400;
                font-style: normal;
                font-size: 26rpx;
                letter-spacing: normal;
                color: #5a5a5a;
                width: 442rpx;
                height: 62rpx;
                margin: 10rpx 0;
              }
              .span3 {
                font-family: Microsoft Yahei;
                font-weight: 400;
                font-style: normal;
                font-size: 26rpx;
                height: 62rpx;
                letter-spacing: normal;
                color: #5a5a5a;
                table-layout:fixed; 
                word-break:break-all; 
                overflow:hidden;
              }
              .span4 {
                font-family: Microsoft Yahei;
                font-weight: 400;
                font-style: normal;
                font-size: 26rpx;
                letter-spacing: normal;
                color: #5a5a5a;
                width: 426rpx;
                height: 100rpx;
                table-layout:fixed; 
                word-break:break-all; 
                overflow:hidden;
              }
            }
          }
        }
      }
      .order-bottom {
        color: #000000;
        font-size: 28rpx;
        height: 60rpx;
        line-height: 60rpx;
        display: flex;
        flex-direction: row;
        font-family: Microsoft Yahei;
        font-weight: 500;
        justify-content: space-between;
        margin: 30rpx 16rpx 0rpx 16rpx;
        .bottom1 {
          display: flex;
          flex-direction: row;
          .span-top {
            margin-right: 40rpx;
          }
          .bottom-span {
            display: flex;
            flex-direction: row;
            .bottom-span1 {
              width: 170rpx;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
            .bottom-span3 {
              margin-left: 12rpx;
            }
          }
        }
        button {
          width: 170rpx;
          background: black;
          color: white;
        }
      }
    }
  }
</style>