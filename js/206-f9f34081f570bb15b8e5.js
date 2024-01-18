(window.cbJsonP=window.cbJsonP||[]).push([[206],{280:function(e,t,n){"use strict";t.__esModule=!0;var r=o(n(112)),a=o(n(281));function o(e){return e&&e.__esModule?e:{default:e}}t.default=function e(t,n,o){null===t&&(t=Function.prototype);var i=(0,a.default)(t,n);if(void 0===i){var u=(0,r.default)(t);return null===u?void 0:e(u,n,o)}if("value"in i)return i.value;var l=i.get;return void 0!==l?l.call(o):void 0}},281:function(e,t,n){e.exports={default:n(282),__esModule:!0}},282:function(e,t,n){n(283);var r=n(8).Object;e.exports=function(e,t){return r.getOwnPropertyDescriptor(e,t)}},283:function(e,t,n){var r=n(37),a=n(90).f;n(107)("getOwnPropertyDescriptor",(function(){return function(e,t){return a(r(e),t)}}))},495:function(e,t,n){"use strict";n.r(t);var r,a=n(21),o=n.n(a),i=n(112),u=n.n(i),l=n(16),s=n.n(l),c=n(2),d=n.n(c),f=n(113),v=n.n(f),p=n(5),g=n.n(p),h=n(114),k=n.n(h),m=n(280),y=n.n(m),_=(n(31),n(33)),E=[{name:"logger",actions:[{name:"track",method:"post",endpoint:"/api/internal/kvl",headers:{"X-Requested-With":"XMLHttpRequest","Content-Type":"application/json"}}]}],O=n(3),w=n.n(O),M=n(7),b=n.n(M),C=n(28),R=function(){function e(t){d()(this,e),t&&this.setMetadata(t),this.ready=this.initialize()}return g()(e,[{key:"setMetadata",value:function(e){e&&"object"===(void 0===e?"undefined":b()(e))&&w()(e).length>0&&(this.meta=e)}}],[{key:"throw",value:function(e,t){}},{key:"getMaskedError",value:function(){var e=new Error;return e.name="unknown_error",e.message=Object(C.d)("error.unknownError"),e}},{key:"throwMaskedError",value:function(t,n){throw e.getMaskedError()}},{key:"sanitizeError",value:function(e){if(e instanceof Error||e&&e.name){var t=new Error;return t.name=e.name,t.message=e.displayMessage||e.message,t.stack=e.stack,t}return new Error(e)}}]),e}(),j=n(15),G=n(42);!function(e){e.ERROR="ERROR",e.INFO="INFO"}(r||(r={}));var I=n(54),L=function(e){function t(e){d()(this,t);var n=v()(this,(t.__proto__||u()(t)).call(this));return n.commMgr=e,n.apiClient=e.apiClient,n.iframeClient=e.connectionClient,n}return k()(t,e),g()(t,[{key:"init",value:function(){return this.apiClient.addApis(E),s.a.resolve()}},{key:"initialize",value:function(){return s.a.resolve()}},{key:"setMetadata",value:function(e){y()(t.prototype.__proto__||u()(t.prototype),"setMetadata",this).call(this,e)}},{key:"log",value:function(e,t){var n=this,a={data:Object(j.b)(o()({},Object(j.m)(e),t,this.meta,{key:G.a.LOGGING,log_data_type:r.INFO,ref_module:"chargebee.js"}),"_"),type:"kvl"};this.commMgr.pluginMan.isPluginLoaded(_.a.CHECKOUT_UTILS)?this.commMgr.getCheckoutUtilsPlugin().then((function(e){return e.getHpData().customer_handle})).then((function(e){e&&(a.data.customer_handle=e),n.apiClient.logger.track({},a)})):this.apiClient.logger.track({},a)}},{key:"logError",value:function(e,t){var n={data:Object(j.b)(o()({},Object(j.m)(R.sanitizeError(e)),t,this.meta,{key:G.a.LOGGING,log_data_type:r.ERROR,ref_module:"chargebee.js"}),"_"),type:"kvl"};this.apiClient.logger.track({},n)}},{key:"captureException",value:function(e){var t=e.error,n=e.extraData;return t&&(I.a.error(t,n),this.logError(t,n)),s.a.resolve({acknowledged:!0})}},{key:"captureKVL",value:function(e){return this.log(e),s.a.resolve({acknowledged:!0})}}]),t}(R);t.default=L}}]);
//# sourceMappingURL=206-f9f34081f570bb15b8e5.js.map