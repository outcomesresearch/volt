(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4e9347d2"],{"0c7a":function(e,t,n){e.exports=n.p+"img/play-button.ac3681af.svg"},"3ca3":function(e,t,n){"use strict";var r=n("6547").charAt,i=n("69f3"),a=n("7dd0"),c="String Iterator",s=i.set,o=i.getterFor(c);a(String,"String",(function(e){s(this,{type:c,string:String(e),index:0})}),(function(){var e,t=o(this),n=t.string,i=t.index;return i>=n.length?{value:void 0,done:!0}:(e=r(n,i),t.index+=e.length,{value:e,done:!1})}))},6547:function(e,t,n){var r=n("a691"),i=n("1d80"),a=function(e){return function(t,n){var a,c,s=String(i(t)),o=r(n),u=s.length;return o<0||o>=u?e?"":void 0:(a=s.charCodeAt(o),a<55296||a>56319||o+1===u||(c=s.charCodeAt(o+1))<56320||c>57343?e?s.charAt(o):a:e?s.slice(o,o+2):c-56320+(a-55296<<10)+65536)}};e.exports={codeAt:a(!1),charAt:a(!0)}},"94ac":function(e,t,n){"use strict";var r=n("f633"),i=n.n(r);i.a},b339:function(e,t,n){e.exports=n.p+"img/oranges.2e761228.jpg"},b5a1:function(e,t,n){var r={"./cedar.jpg":"cfd4","./cloves.jpg":"ce58","./oranges.jpg":"b339","./strawberries.jpg":"cc37"};function i(e){var t=a(e);return n(t)}function a(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}i.keys=function(){return Object.keys(r)},i.resolve=a,e.exports=i,i.id="b5a1"},c974:function(e,t,n){e.exports=n.p+"img/pause-button.d57c2ab8.svg"},cc37:function(e,t,n){e.exports=n.p+"img/strawberries.79747cac.jpg"},ce58:function(e,t,n){e.exports=n.p+"img/cloves.ee800a0a.jpg"},cfd4:function(e,t,n){e.exports=n.p+"img/cedar.9bb6110a.jpg"},d81d:function(e,t,n){"use strict";var r=n("23e7"),i=n("b727").map,a=n("1dde"),c=n("ae40"),s=a("map"),o=c("map");r({target:"Array",proto:!0,forced:!s||!o},{map:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}})},ddb0:function(e,t,n){var r=n("da84"),i=n("fdbc"),a=n("e260"),c=n("9112"),s=n("b622"),o=s("iterator"),u=s("toStringTag"),d=a.values;for(var p in i){var f=r[p],g=f&&f.prototype;if(g){if(g[o]!==d)try{c(g,o,d)}catch(m){g[o]=d}if(g[u]||c(g,u,p),i[p])for(var h in a)if(g[h]!==a[h])try{c(g,h,a[h])}catch(m){g[h]=a[h]}}}},f5b9:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"sniffComponent",staticClass:"image-wrapper"},[e.resting?n("div",{staticClass:"resting-banner"},[e._v("Resting...")]):-1!=e.pictureIndex?n("img",{attrs:{src:e.imgPath}}):e._e(),e.done?e._e():n("div",{staticClass:"pause",on:{click:e.handlePause}},[n("img",{directives:[{name:"show",rawName:"v-show",value:!e.paused,expression:"!paused"}],attrs:{src:e.pausePath}}),n("img",{directives:[{name:"show",rawName:"v-show",value:e.paused,expression:"paused"}],attrs:{src:e.playPath}})])])},i=[],a=(n("d81d"),n("b64b"),n("d3b7"),n("3ca3"),n("ddb0"),n("96cf"),n("1da1")),c=n("5530"),s=n("2f62"),o=n("800b"),u={name:"Sniff",data:function(){return{pictures:[],pictureIndex:-1,resting:!1,paused:!1,done:!1}},computed:Object(c["a"])(Object(c["a"])({},Object(s["b"])(["currentUser"])),{},{pausePath:function(){return n("c974")},playPath:function(){return n("0c7a")},imgPath:function(){return this.pictures[this.pictureIndex]?n("b5a1")("./".concat(this.pictures[this.pictureIndex],".jpg")):""}}),methods:{endSniffing:function(){this.pictures=[],this.$root.$emit("counter-status",!1),this.done=!0},handlePause:function(){this.paused=!this.paused,this.$root.$emit("pause")}},beforeRouteLeave:function(e,t,n){return this.endSniffing(),n()},mounted:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var n,r,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.pictures=Object.keys(e.currentUser.odors).map((function(e){return e})),n=function(){},e.$root.$on("timer-done",(function(){e.resting=!e.resting,n()})),o["b"].startedSniffing(),r=regeneratorRuntime.mark((function t(r){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,new Promise((function(t){e.pictureIndex=r,n=t,e.$root.$emit("start-timer",5)}));case 2:return t.next=4,new Promise((function(t){n=t,e.$root.$emit("start-timer",5)}));case 4:e.done||o["b"].recordOdor(e.pictures[r]),r===e.pictures.length-1&&(e.endSniffing(),setTimeout((function(){return e.$router.push("/")}),500));case 6:case"end":return t.stop()}}),t)})),i=0;case 6:if(!(i<e.pictures.length)){t.next=11;break}return t.delegateYield(r(i),"t0",8);case 8:i++,t.next=6;break;case 11:case"end":return t.stop()}}),t)})))()}},d=u,p=(n("94ac"),n("2877")),f=Object(p["a"])(d,r,i,!1,null,"1b82607e",null);t["default"]=f.exports},f633:function(e,t,n){}}]);
//# sourceMappingURL=chunk-4e9347d2.1db629b2.js.map