(function(e){function t(t){for(var r,o,i=t[0],c=t[1],s=t[2],d=0,f=[];d<i.length;d++)o=i[d],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&f.push(a[o][0]),a[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);l&&l(t);while(f.length)f.shift()();return u.push.apply(u,s||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],r=!0,o=1;o<n.length;o++){var i=n[o];0!==a[i]&&(r=!1)}r&&(u.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},o={app:0},a={app:0},u=[];function i(e){return c.p+"js/"+({}[e]||e)+"."+{"chunk-11dab408":"8f0ef8e5","chunk-312e13f4":"e51f4e16","chunk-e1185e76":"fbfc6cbd"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={"chunk-11dab408":1,"chunk-312e13f4":1,"chunk-e1185e76":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-11dab408":"e433d134","chunk-312e13f4":"7c5382a8","chunk-e1185e76":"99ebe8ea"}[e]+".css",a=c.p+r,u=document.getElementsByTagName("link"),i=0;i<u.length;i++){var s=u[i],d=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(d===r||d===a))return t()}var f=document.getElementsByTagName("style");for(i=0;i<f.length;i++){s=f[i],d=s.getAttribute("data-href");if(d===r||d===a)return t()}var l=document.createElement("link");l.rel="stylesheet",l.type="text/css",l.onload=t,l.onerror=function(t){var r=t&&t.target&&t.target.src||a,u=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");u.code="CSS_CHUNK_LOAD_FAILED",u.request=r,delete o[e],l.parentNode.removeChild(l),n(u)},l.href=a;var p=document.getElementsByTagName("head")[0];p.appendChild(l)})).then((function(){o[e]=0})));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var u=new Promise((function(t,n){r=a[e]=[t,n]}));t.push(r[2]=u);var s,d=document.createElement("script");d.charset="utf-8",d.timeout=120,c.nc&&d.setAttribute("nonce",c.nc),d.src=i(e);var f=new Error;s=function(t){d.onerror=d.onload=null,clearTimeout(l);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",f.name="ChunkLoadError",f.type=r,f.request=o,n[1](f)}a[e]=void 0}};var l=setTimeout((function(){s({type:"timeout",target:d})}),12e4);d.onerror=d.onload=s,document.head.appendChild(d)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/volt/",c.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],d=s.push.bind(s);s.push=t,s=s.slice();for(var f=0;f<s.length;f++)t(s[f]);var l=d;u.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("4de4"),n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("div",{staticClass:"page-container"},[r("md-app",{attrs:{"md-waterfall":"","md-mode":"fixed"}},[r("md-app-toolbar",{staticClass:"md-primary md-dense"},[r("img",{staticClass:"washu-branding",attrs:{src:n("8de0"),alt:"Branding for Washington\n      University in St. Louis"}}),r("div",{staticClass:"counter"},[e.counterStatus?r("span",[e._v(e._s(e.remaining)+" sec remaining")]):e._e()]),e.currentUser?r("h3",{staticClass:"md-title"},[e._v(" Welcome, "+e._s(e._f("truncatedString")(e.currentUser.fname,20))+" ")]):e._e(),e.currentUser&&!e.counterStatus?r("md-button",{on:{click:e.logout}},[e._v("Log Out")]):e._e()],1),r("md-app-content",[r("router-view")],1)],1)],1)])},a=[],u=(n("b680"),n("5530")),i=n("2f62"),c={name:"App",data:function(){return{counterStatus:!1,intervalHandle:void 0,ownCounter:0,timerLimit:1e4}},mounted:function(){var e=this;this.$root.$on("counter-status",(function(t){e.counterStatus=t})),this.$root.$on("counter-changed",(function(t){var n=t.time,r=t.length;e.ownCounter=n.toFixed(0),e.timerLimit=r}))},computed:Object(u["a"])(Object(u["a"])({},Object(i["b"])(["currentUser"])),{},{remaining:function(){return this.timerLimit/1e3-this.ownCounter}}),methods:{logout:function(){var e=this;this.counterStatus=!1,this.$store.dispatch("LOGOUT").then((function(){e.$router.push("/login").catch((function(e){return console.log(e.message)}))}))}}},s=c,d=(n("5c0b"),n("2877")),f=Object(d["a"])(s,o,a,!1,null,null,null),l=f.exports,p=n("8c4f"),h=(n("d3b7"),n("8aa5")),m=n.n(h),v={apiKey:"AIzaSyBIC41wctILRPeNywYbQ39Gt6obsIKnLU8",projectId:Object({NODE_ENV:"production",VUE_APP_API_KEY:"AIzaSyBIC41wctILRPeNywYbQ39Gt6obsIKnLU8",VUE_APP_PROJECT_ID:"reactnotes-f61e8",VUE_APP_DB_URL:"https://reactnotes-f61e8.firebaseio.com/",BASE_URL:"/volt/"}).VUE_APP_PROJECTID,databaseURL:"https://reactnotes-f61e8.firebaseio.com/"},b=m.a.initializeApp(v),g=b;n("b64b");r["default"].use(i["a"]);var _={savedData:{},currentUser:void 0},y={currentUser:function(e){return e.currentUser}},w={SAVEDATA:function(e,t){var n=e.commit;return n("SET_KEY",t)},LOGIN:function(e,t){var n=e.commit;return g.auth().signInWithEmailAndPassword(t.studyID,"password").then((function(e){return new Promise((function(t){g.database().ref().on("value",(function(r){var o=r.val().notes.users[e.user.uid];n("SET_AUTH",o),t(o)}))}))}))},LOGOUT:function(e){return g.auth().signOut().then((function(t){return e.commit("PURGE_AUTH"),t}))}},E={SET_AUTH:function(e,t){e.currentUser=t},SET_KEY:function(e,t){var n=t.key,r=t.value;e.savedData[n]||(e.savedData[n]={}),e.savedData[n]=Object.keys(r).length?Object(u["a"])(Object(u["a"])({},e.savedData[n]),r):r},PURGE_AUTH:function(e){e.currentUser=void 0}},O=new i["a"].Store({state:_,mutations:E,actions:w,getters:y});r["default"].use(p["a"]);var S=function(e,t,n){g.auth().onAuthStateChanged((function(e){if(!e)return n("/login");g.database().ref().on("value",(function(t){var r=t.val().notes.users[e.uid];return O.commit("SET_AUTH",r),n()}))}))},U=[{path:"/",name:"error-404",component:function(){return n.e("chunk-e1185e76").then(n.bind(null,"893c"))},beforeEnter:S},{path:"/sniff",name:"sniff-exercise",component:function(){return n.e("chunk-11dab408").then(n.bind(null,"f5b9"))},beforeEnter:S},{path:"/login",name:"login-screen",component:function(){return n.e("chunk-312e13f4").then(n.bind(null,"499c"))}}],P=new p["a"]({mode:"history",base:"/volt/",routes:U}),A=P,k=n("9c30");n("51de");r["default"].use(k["MdButton"]),r["default"].use(k["MdField"]),r["default"].use(k["MdCard"]),r["default"].use(k["MdMenu"]),r["default"].use(k["MdList"]),r["default"].use(k["MdSnackbar"]),r["default"].use(k["MdApp"]),r["default"].use(k["MdDrawer"]),r["default"].use(k["MdToolbar"]),r["default"].use(k["MdContent"]),r["default"].use(k["MdProgress"]),r["default"].filter("truncatedString",(function(e,t){return e?e.length<=t?e:e.substr(0,t)+"...":""})),r["default"].use(p["a"]),r["default"].config.productionTip=!1;t["default"]=new r["default"]({render:function(e){return e(l)},store:O,router:A}).$mount("#app")},"5c0b":function(e,t,n){"use strict";var r=n("9c0c"),o=n.n(r);o.a},"8de0":function(e,t,n){e.exports=n.p+"img/washu_logo.0c72f6d5.svg"},"9c0c":function(e,t,n){}});
//# sourceMappingURL=app.96d373ea.js.map