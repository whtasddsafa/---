
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from './store/store';
Vue.prototype.$store = store;
//导入网络请求的包
import { $http } from '@escook/request-miniprogram'
uni.$http = $http

//请求的根路径
$http.baseUrl = 'https://gp.guoguoyun.cn:8081'
//请求拦截器
$http.beforeRequest = function(options) {
  uni.showLoading({
    title:'数据加载中...'
  })
  // console.log(store)
  options.header = {
      Authorization: store.state.m_user.token,
    }
  // if(options.url.indexOf('/my/') !== -1) {
  //   options.header = {
  //     Authorization: store.state.m_user.token,
  //   }
  // }
}
//响应拦截器
$http.afterRequest = function() {
  uni.hideLoading()
}

//封装弹框的方法
uni.$showMsg = function(title = '加载失败!', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app,
    store
  }
}
// #endif