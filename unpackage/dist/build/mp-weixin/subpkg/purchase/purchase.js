(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["subpkg/purchase/purchase"],{"5ec8":function(t,e,n){},"9f33":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a(n("a34a"));function a(t){return t&&t.__esModule?t:{default:t}}function r(t,e,n,o,a,r,i){try{var u=t[r](i),s=u.value}catch(c){return void n(c)}u.done?e(s):Promise.resolve(s).then(o,a)}function i(t){return function(){var e=this,n=arguments;return new Promise((function(o,a){var i=t.apply(e,n);function u(t){r(i,o,a,u,s,"next",t)}function s(t){r(i,o,a,u,s,"throw",t)}u(void 0)}))}}var u={data:function(){return{PhoneNumber:"",text:"发送",isDisabled:!1,isType:"black",isShow:!1,time:60,goods_info:"",goods:""}},onLoad:function(t){console.log(t);var e=t.goodsId;this.getGoodsDetail(e),console.log(e)},methods:{getGoodsDetail:function(e){var n=this;return i(o.default.mark((function a(){var r,i;return o.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.next=2,t.$http.get("/shop/mall-goods-detail",{goods_id:e});case 2:if(r=o.sent,i=r.data,0===i.code){o.next=6;break}return o.abrupt("return",t.$showMsg());case 6:n.goods_info=i.data,n.goods=i.data.detail;case 8:case"end":return o.stop()}}),a)})))()},sendInfo:function(){var t=this;if(this.PhoneNumber!=Number&&11!=this.PhoneNumber.length)this.isShow=!0;else{this.isShow=!1;var e=this.time;this.isDisabled=!0,this.isType="black";var n=setInterval((function(){0==e?(clearInterval(n),t.isDisabled=!1,t.isType="black",t.text="发送",e=t.time):(t.text="".concat(e,"秒"),e--)}),1e3)}}}};e.default=u}).call(this,n("543d")["default"])},a307:function(t,e,n){"use strict";(function(t){n("3fe1");o(n("66fd"));var e=o(n("a67f"));function o(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},a67f:function(t,e,n){"use strict";n.r(e);var o=n("e436"),a=n("c768");for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);n("e17d");var i,u=n("f0c5"),s=Object(u["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);e["default"]=s.exports},c768:function(t,e,n){"use strict";n.r(e);var o=n("9f33"),a=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);e["default"]=a.a},e17d:function(t,e,n){"use strict";var o=n("5ec8"),a=n.n(o);a.a},e436:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return o}));var o={uniDateformat:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat")]).then(n.bind(null,"07f3"))}},a=function(){var t=this,e=t.$createElement;t._self._c},r=[]}},[["a307","common/runtime","common/vendor"]]]);