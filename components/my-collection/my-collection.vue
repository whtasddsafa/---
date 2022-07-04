<template>
  <view class="collection">
    <view class="icons" @click.stop="likeTap">
    	<uni-icons size="30" color="#ecec00" :type="like?'heart-filled':'heart'"></uni-icons>
    </view>
    <span class="text-span">{{collectCount}}</span>
  </view>
</template>

<script>
  export default {
    name:"my-collection",
    props: {
    			item: {
    				type: Object,
    				default () {
    					return {
              }
    				}
    			}
    		},
    data() {
      return {
        like: '',
        isCollect: '',
        goodsId: '',
        floorList: [],
        collectCount: 0
      };
    },
    watch: {
      item(newVal) {
        this.like = this.item.isCollect
        this.collectCount = this.item.collectCount
      }
    },
    created(e) {
      this.like = this.item.isCollect
      this.collectCount = this.item.collectCount
    },
    methods: {
      likeTap() {
        if (!this.like){
          // 添加收藏
          this.setUpdateLikes1()
        }else{
          this.setUpdateLikes()
        }
      },
        // likeTap() {
        //   this.isCollect = !this.isCollect
        //   this.setUpdateLikes()
        //   console.log('取消收藏');
        // },
        
        // 添加收藏
        async setUpdateLikes1() {
          uni.showLoading()
         const {data: res} = await uni.$http.post('/shop/mall-add-collect',{
            goodsId: this.item.goodsId,
          })
          console.log(res)
          if(res.code !== 0) return uni.$showMsg('请登录再收藏喔~')
          this.like = !this.like
          this.collectCount ++
          uni.$showMsg('收藏成功')
          // this.getFloorList()
          // .then(res => {
          //   uni.hideLoading()
          //   console.log('是否', this.like)
          //   uni.showToast({
          //     title:this.like?'收藏成功':'取消收藏',
          //     icon:'none'
          //   })
          //   console.log(res);
            
          // }).catch(()=>{
          //   uni.hideLoading()
          // })
        },
        async setUpdateLikes() {
          uni.showLoading()
          const {data: res} = await uni.$http.post('/shop/mall-cancel-collect',{
            goodsId: this.item.goodsId,
          })
          console.log(res)
          if(res.code !== 0) return uni.$showMsg()
          this.like = !this.like
          this.collectCount --
          uni.$showMsg('您取消了收藏')
        },
        // 请求列表数据
        // async getFloorList() {
        //   const {data: res} = await uni.$http.get('/shop/mall-lists',{
        //     page: 1,
        //     page_num: 10
        //   })
        //   if(res.code !== 0) return uni.$showMsg()
        //     this.floorList = res.data.newGoods.isCollect
        //     console.log(floorList)
        // },
      }
    	}
    </script>
    
<style lang="scss">
.collection {
  width: 80rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  .icons {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50rpx;
      height: 50rpx;
    }
    .text-span {
      font-size: 22rpx;
      color: gray;
    }
  }
</style>