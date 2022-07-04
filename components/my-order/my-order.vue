<template>
  <view class="content">
    <view class="navbar">
      <view
      	v-for="(item, index) in navList" :key="index" 
      	class="nav-item" 
      	:class="{current: tabCurrentIndex === index}"
      	@click="tabClick(index)"
      >{{item.text}}</view>
    </view>
    <!-- <view class="purchase-top">
      <view class="left-img-box-bottom">
        <view class="img-box">
          <image :src="goods.goodsLogo"></image>
        </view>
        <view class="right-box">
          <view class="text-box-top">
            <view class="span1">
              <span>{{goods.goodsName}}</span>
            </view>
            <view class="span2">
              <uni-dateformat :date="goods.effectiveStartTime" format="yyyy/MM/dd"></uni-dateformat>-
              <uni-dateformat :date="goods.effectiveEndTime" format="yyyy/MM/dd"></uni-dateformat>
            </view>
            <view class="span3">
              <span>{{goods.address}}</span>
            </view>
          </view>
          <view class="text-box-bottom">
            <view class="text-box-bottom-left">
              <span>￥{{goods.marketPrice}}</span>
            </view>
          </view>
        </view>
      </view>
    </view> -->
    
    <swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
    	<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
    		<scroll-view 
    			class="list-scroll-content" 
    			scroll-y
    			@scrolltolower="loadData"
    		>
    			<!-- 空白页 -->
    			<empty v-if="tabItem.loaded === true && tabItem.orderList.length === 0"> 暂无数据</empty>
    			
    			<!-- 订单列表 -->
    			<view 
    				v-for="(item,index) in tabItem.orderList" :key="index"
    				class="order-item"
    			>
    				<view class="i-top b-b">
    					<text class="time">{{item.time}}</text>
    					<text class="state" :style="{color: item.stateTipColor}">{{item.stateTip}}</text>
    					<text 
    						v-if="item.state===9" 
    						class="del-btn yticon icon-iconfontshanchu1"
    						@click="deleteOrder(index)"
    					></text>
    				</view>
    				
    				<scroll-view v-if="item.goodsList.length > 1" class="goods-box" scroll-x>
    					<view
    						v-for="(goodsItem, goodsIndex) in item.goodsList" :key="goodsIndex"
    						class="goods-item"
    					>
    						<image class="goods-img" :src="goodsItem.image" mode="aspectFill"></image>
    					</view>
    				</scroll-view>
    				<view 
    					v-if="item.goodsList.length === 1" 
    					class="goods-box-single"
    					v-for="(goodsItem, goodsIndex) in item.goodsList" :key="goodsIndex"
    				>
    					<image class="goods-img" :src="goodsItem.image" mode="aspectFill"></image>
    					<view class="right">
    						<text class="title clamp">{{goodsItem.title}}</text>
    						<text class="attr-box">{{goodsItem.attr}}  x {{goodsItem.number}}</text>
    						<text class="price">{{goodsItem.price}}</text>
    					</view>
    				</view>
    				
    				<view class="price-box">
    					共
    					<text class="num">7</text>
    					件商品 实付款
    					<text class="price">143.7</text>
    				</view>
    				<view class="action-box b-t" v-if="item.state != 9">
    					<button class="action-btn" @click="cancelOrder(item)">取消订单</button>
    					<button class="action-btn recom">立即支付</button>
    				</view>
    			</view>
    			 
    			<uni-load-more :status="tabItem.loadingType"></uni-load-more>
    			
    		</scroll-view>
    	</swiper-item>
    </swiper>
  </view>
</template>

<script>
  import empty from "@/components/empty";
  export default {
    name:"my-order",
    data() {
      return {
        tabCurrentIndex: 0,
        navList: [{
        		state: 0,
        		text: '全部订单',
        		loadingType: 'more',
        		orderList: []
        	},
        	{
        		state: 1,
        		text: '待支付',
        		loadingType: 'more',
        		orderList: []
        	},
        	{
        		state: 2,
        		text: '已付款',
        		loadingType: 'more',
        		orderList: []
        	},
        	{
        		state: 3,
        		text: '使用完成',
        		loadingType: 'more',
        		orderList: []
        	},
        ],
        floorList: [],
        goods: []
      };
    },
    onLoad(options){
    	
    	this.tabCurrentIndex = +options.state;
    	// #ifndef MP
    	this.loadData()
    	// #endif
    	// #ifdef MP
    	if(options.state == 0){
    		this.loadData()
    	}
    	// #endif
    	//调用楼层数据
    	this.getFloorList()
    },
    methods: {
      //获取订单列表
      async getFloorList() {
        const {data: res} = await uni.$http.get('/shop/user-order-list',{
          page: 1,
          page_num: 10
        })
        console.log(res);
        if(res.code !== 0) return uni.$showMsg()
          this.goods = res.data
      },
      
      //获取订单列表
      loadData(source){
      	//这里是将订单挂载到tab列表下
      	let index = this.tabCurrentIndex;
      	let navItem = this.navList[index];
      	let state = navItem.state;
      	
      	if(source === 'tabChange' && navItem.loaded === true){
      		//tab切换只有第一次需要加载数据
      		return;
      	}
      	if(navItem.loadingType === 'loading'){
      		//防止重复加载
      		return;
      	}
      	
      	navItem.loadingType = 'loading';
      	
      	setTimeout(()=>{
      		let orderList = Json.orderList.filter(item=>{
      			//添加不同状态下订单的表现形式
      			item = Object.assign(item, this.orderStateExp(item.state));
      			//演示数据所以自己进行状态筛选
      			if(state === 0){
      				//0为全部订单
      				return item;
      			}
      			return item.state === state
      		});
      		orderList.forEach(item=>{
      			navItem.orderList.push(item);
      		})
      		//loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
      		this.$set(navItem, 'loaded', true);
      		
      		//判断是否还有数据， 有改为 more， 没有改为noMore 
      		navItem.loadingType = 'more';
      	}, 600);	
      }, 
      hanldeItemTap(id) {
        console.log(id)
        uni.$emit('tabsItemChange',this.id)
        // const {index}=e.currentTarget.dataset;
        // let {tabs}=this.id;
        // tabs.forEach((v,i)=>i===id?v.isActive=true:v.isActive=false);
        // this.setData({
        //   tabs
        // })
      },
      //swiper 切换
      changeTab(e){
      	this.tabCurrentIndex = e.target.current;
      	this.loadData('tabChange');
      },
      //顶部tab点击
      tabClick(index){
      	this.tabCurrentIndex = index;
      },
      //删除订单
      deleteOrder(index){
      	uni.showLoading({
      		title: '请稍后'
      	})
      	setTimeout(()=>{
      		this.navList[this.tabCurrentIndex].orderList.splice(index, 1);
      		uni.hideLoading();
      	}, 600)
      },
      //取消订单
      cancelOrder(item){
      	uni.showLoading({
      		title: '请稍后'
      	})
      	setTimeout(()=>{
      		let {stateTip, stateTipColor} = this.orderStateExp(9);
      		item = Object.assign(item, {
      			state: 9,
      			stateTip, 
      			stateTipColor
      		})
      		
      		//取消订单后删除待付款中该项
      		let list = this.navList[1].orderList;
      		let index = list.findIndex(val=>val.id === item.id);
      		index !== -1 && list.splice(index, 1);
      		
      		uni.hideLoading();
      	}, 600)
      },
      //订单状态文字和颜色
      orderStateExp(state){
      	let stateTip = '',
      		stateTipColor = '#fa436a';
      	switch(+state){
      		case 1:
      			stateTip = '待付款'; break;
      		case 2:
      			stateTip = '待发货'; break;
      		case 9:
      			stateTip = '订单已关闭'; 
      			stateTipColor = '#909399';
      			break;
      			
      		//更多自定义
      	}
      	return {stateTip, stateTipColor};
      }
    }
  }
</script>

<style lang="scss">
  .tabs-title {
    // padding: 10rpx;
    height: 66rpx;
    line-height: 66rpx;
    font-size: 26rpx;
    background: #000000;
    color: #EBEEF5;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    .table-item{
      // color: yellow;
      // border-bottom: 3rpx solid currentColor;
    }
    .active {
      color: yellow;
      border-bottom: 3rpx solid currentColor;
    }
  }
  .content{
  	// background: #000000;
  	height: 100%;
  }
  .navbar{
  	display: flex;
  	height: 66rpx;
  	line-height: 66rpx;
  	font-size: 26rpx;
  	padding: 0 5px;
  	background: #fff;
    background: #000000;
  	box-shadow: 0 1px 5px rgba(0,0,0,.06);
  	position: relative;
  	z-index: 10;
  	.nav-item{
  		flex: 1;
  		display: flex;
  		justify-content: center;
  		align-items: center;
  		height: 100%;
      color: #EBEEF5; 
  		position: relative;
  		&.current{
  			color: #fcfcfc;
  			&:after{
  				content: '';
  				position: absolute;
  				left: 50%;
  				bottom: 0;
  				transform: translateX(-50%);
  				width: 80px;
  				height: 0;
  				border-bottom: 2px solid #ebeb00;
  			}
  		}
  	}
  }
  .purchase-top {
    padding: 40rpx 20rpx 20rpx 20rpx;
    height: 380rpx;
    background: #000000;
    .left-img-box-bottom {
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .img-box {
        image {
          width: 260rpx;
          height: 350rpx;
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
            color: #ffffff;
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
            color: #d0d0d0;
            width: 280rpx;
            height: 30rpx;
            margin-bottom: 10rpx;
          }
          .span3 {
            font-family: 'Arial Normal', 'Arial', sans-serif;
            font-weight: 400;
            font-style: normal;
            font-size: 26rpx;
            letter-spacing: normal;
            color: #d0d0d0;
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
            color: #ffffff;
          }
        }
      }
    }
  }
</style>
