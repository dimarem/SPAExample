(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{48:function(e,t,n){},49:function(e,t,n){},50:function(e,t,n){},51:function(e,t,n){},52:function(e,t,n){},53:function(e,t,n){},54:function(e,t,n){},55:function(e,t,n){},66:function(e,t,n){"use strict";var o=n(48);n.n(o).a},67:function(e,t,n){"use strict";var o=n(49);n.n(o).a},68:function(e,t,n){"use strict";var o=n(50);n.n(o).a},69:function(e,t,n){"use strict";var o=n(51);n.n(o).a},70:function(e,t,n){"use strict";var o=n(52);n.n(o).a},71:function(e,t,n){"use strict";var o=n(53);n.n(o).a},72:function(e,t,n){"use strict";var o=n(54);n.n(o).a},73:function(e,t,n){"use strict";var o=n(55);n.n(o).a},84:function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",[e.content?[n("Header",{attrs:{content:e.content.header}}),e._v(" "),n("Main",{attrs:{content:e.content.main}}),e._v(" "),n("Footer")]:e._e(),e._v(" "),e.loading?[n("LoadingComponent")]:e._e(),e._v(" "),e.fetchError?[n("ErrorComponent")]:e._e()],2)};o._withStripped=!0;var r=function(){var e=this.$createElement,t=this._self._c||e;return t("header",{staticClass:"home-page-header"},[t("Main",{attrs:{h1:this.content.h1,h2:this.content.h2}}),this._v(" "),t("Contacts",{attrs:{contacts:this.content.contacts}}),this._v(" "),t("Background",{attrs:{"background-image":this.content.backgroundImage}})],1)};r._withStripped=!0;var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home-page-header-main"},[n("h1",[e._v(e._s(e.h1))]),e._v(" "),n("h2",[e._v(e._s(e.h2))]),e._v(" "),n("div",[n("button",{on:{click:e.createSearchWindow}},[e._v("Поиск")])])])};s._withStripped=!0;var a=n(2),c={props:{h1:{type:String,required:!0},h2:{type:String,required:!0}},methods:Object(a.b)(["createSearchWindow"])},i=(n(66),n(0)),p=Object(i.a)(c,s,[],!1,null,null,null);p.options.__file="src/components/pages/home-page-components/header-components/Main.vue";var u=p.exports,l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home-page-header-background",class:{invisible:!e.imgLoaded},style:{backgroundImage:"url("+e.backgroundImage+")"}},[e.imgLoaded?e._e():n("img",{attrs:{src:e.backgroundImage},on:{load:function(t){e.imgLoaded=!0}}})])};l._withStripped=!0;var h={props:{backgroundImage:{type:String,required:!0}},data:function(){return{imgLoaded:!1}}},v=(n(67),Object(i.a)(h,l,[],!1,null,null,null));v.options.__file="src/components/pages/home-page-components/header-components/Background.vue";var m=v.exports,_=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home-page-contacts"},[n("div",[n("div",{staticClass:"phone"},[n("span",{domProps:{innerHTML:e._s(e.contacts.phone.svg)}}),e._v("\n            "+e._s(e.contacts.phone.number)+"\n        ")]),e._v(" "),n("div",{staticClass:"adress"},[n("span",{domProps:{innerHTML:e._s(e.contacts.adress.svg)}}),e._v("\n            "+e._s(e.contacts.adress.content)+"\n        ")])]),e._v(" "),n("div",{staticClass:"socials"},[n("a",{attrs:{href:e.contacts.vk.href}},[n("span",{domProps:{innerHTML:e._s(e.contacts.vk.svg)}})]),e._v(" "),n("a",{attrs:{href:e.contacts.telega.href}},[n("span",{domProps:{innerHTML:e._s(e.contacts.telega.svg)}})])])])};_._withStripped=!0;var d={props:{contacts:{type:Object,required:!0}}},f=(n(68),Object(i.a)(d,_,[],!1,null,null,null));f.options.__file="src/components/pages/home-page-components/header-components/Contacts.vue";var g=f.exports,b={props:{content:{type:Object,required:!0}},components:{Main:u,Background:m,Contacts:g}},O=(n(69),Object(i.a)(b,r,[],!1,null,null,null));O.options.__file="src/components/pages/home-page-components/Header.vue";var j=O.exports,y=function(){var e=this.$createElement,t=this._self._c||e;return t("main",{staticClass:"home-page-main"},[t("Services",{attrs:{services:this.content.services}}),this._v(" "),t("About",{attrs:{about:this.content.about}})],1)};y._withStripped=!0;var w=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home-page-services"},e._l(e.services,function(t,o){return n("article",{key:o},[n("header",{domProps:{innerHTML:e._s(t.svg)}}),e._v(" "),n("main",[e._v(e._s(t.service))])])}),0)};w._withStripped=!0;var P={props:{services:{type:Array,required:!0}}},S=(n(70),Object(i.a)(P,w,[],!1,null,null,null));S.options.__file="src/components/pages/home-page-components/main-components/Services.vue";var C=S.exports,k=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("article",{staticClass:"home-page-about"},[n("h1",[e._v(e._s(e.about.title))]),e._v(" "),e._l(e.about.paragraphs,function(t,o){return n("p",{key:o},[e._v("\n        "+e._s(t)+"\n    ")])})],2)};k._withStripped=!0;var E={props:{about:{type:Object,required:!0}}},H=(n(71),Object(i.a)(E,k,[],!1,null,null,null));H.options.__file="src/components/pages/home-page-components/main-components/About.vue";var M=H.exports,D={props:{content:{type:Object,required:!0}},components:{Services:C,About:M}},L=(n(72),Object(i.a)(D,y,[],!1,null,null,null));L.options.__file="src/components/pages/home-page-components/Main.vue";var x=L.exports,$=function(){var e=this.$createElement;return(this._self._c||e)("footer",{staticClass:"home-page-footer"},[this._v("® Compass, 2020")])};$._withStripped=!0;n(73);var q=Object(i.a)({},$,[],!1,null,null,null);function T(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,o)}return n}function A(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}q.options.__file="src/components/pages/home-page-components/Footer.vue";var I={components:{Header:j,Main:x,Footer:q.exports},data:function(){return{content:!1,loading:!1,fetchError:!1}},computed:Object(a.a)(["hasHomePageData","homePageStoredData"]),created:function(){document.title="Compass - главная",this.hasHomePageData?this.content=this.homePageStoredData:this.getContent()},methods:function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?T(n,!0).forEach(function(t){A(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):T(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},Object(a.b)(["storeHomePageData"]),{getContent:function(){var e=this,t=setTimeout(function(){e.loading=!0},500),n=this.constants.HOME_DATA_URL;fetch(n).then(function(e){return e.json()}).then(function(t){e.content=t,e.storeHomePageData(t)}).catch(function(t){e.fetchError=!0,console.error(t)}).finally(function(){e.loading=!1,clearTimeout(t)})}})},B=Object(i.a)(I,o,[],!1,null,null,null);B.options.__file="src/components/pages/HomePage.vue";t.default=B.exports}}]);