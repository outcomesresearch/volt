(function(e){function t(t){for(var r,a,s=t[0],u=t[1],c=t[2],d=0,l=[];d<s.length;d++)a=s[d],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&l.push(o[a][0]),o[a]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);f&&f(t);while(l.length)l.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,a=1;a<n.length;a++){var s=n[a];0!==o[s]&&(r=!1)}r&&(i.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},a={app:0},o={app:0},i=[];function s(e){return u.p+"js/"+({}[e]||e)+"."+{"chunk-477e0162":"f445aea2","chunk-1c2f2d28":"bf533656","chunk-6bf136d8":"9f2e4872","chunk-7b6b1798":"5d34ab79","chunk-560a5d82":"76b845b8"}[e]+".js"}function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n={"chunk-477e0162":1,"chunk-1c2f2d28":1,"chunk-7b6b1798":1,"chunk-560a5d82":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-477e0162":"c5f84cc4","chunk-1c2f2d28":"df697a37","chunk-6bf136d8":"31d6cfe0","chunk-7b6b1798":"46181d2d","chunk-560a5d82":"7440295e"}[e]+".css",o=u.p+r,i=document.getElementsByTagName("link"),s=0;s<i.length;s++){var c=i[s],d=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(d===r||d===o))return t()}var l=document.getElementsByTagName("style");for(s=0;s<l.length;s++){c=l[s],d=c.getAttribute("data-href");if(d===r||d===o)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var r=t&&t.target&&t.target.src||o,i=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=r,delete a[e],f.parentNode.removeChild(f),n(i)},f.href=o;var m=document.getElementsByTagName("head")[0];m.appendChild(f)})).then((function(){a[e]=0})));var r=o[e];if(0!==r)if(r)t.push(r[2]);else{var i=new Promise((function(t,n){r=o[e]=[t,n]}));t.push(r[2]=i);var c,d=document.createElement("script");d.charset="utf-8",d.timeout=120,u.nc&&d.setAttribute("nonce",u.nc),d.src=s(e);var l=new Error;c=function(t){d.onerror=d.onload=null,clearTimeout(f);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",l.name="ChunkLoadError",l.type=r,l.request=a,n[1](l)}o[e]=void 0}};var f=setTimeout((function(){c({type:"timeout",target:d})}),12e4);d.onerror=d.onload=c,document.head.appendChild(d)}return Promise.all(t)},u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/volt/",u.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],d=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var f=d;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("4de4"),n("96cf");var r=n("1da1"),a=(n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("2b0e")),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{style:e.modalStyle,attrs:{id:"app"}},[n("md-app",{attrs:{"md-waterfall":"","md-mode":"fixed"}},[n("md-app-toolbar",{staticClass:"md-primary md-dense"},[e.currentUser?n("h3",{staticClass:"md-title welcome-name"},[e._v(" Welcome, "+e._s(e._f("truncatedString")(e.currentUser.fname,e.nameCharCount))+" ")]):e._e(),n("div",{staticClass:"counter"},[e.counterStatus?n("volt-timer",{key:e.timerRefreshKey,attrs:{limit:e.limit,pause:e.pause},on:{"counter-value":function(t){e.progress=t}}}):e._e()],1),e.currentUser&&!e.counterStatus?n("md-button",{staticClass:"log-out-button",on:{click:e.logout}},[e._v("Log Out")]):e._e()],1),n("md-app-content",[e.counterStatus?n("md-progress-bar",{staticStyle:{margin:"-17px -16px 0px -17px"},attrs:{"md-mode":"determinate","md-value":e.progress/e.limit*100}}):e._e(),n("router-view")],1)],1),n("md-snackbar",{attrs:{"md-active":e.snackBarShowing,"md-duration":7e3},on:{"update:mdActive":function(t){e.snackBarShowing=t},"update:md-active":function(t){e.snackBarShowing=t}}},[e._v(" "+e._s(e.snackBarMessage)+" ")]),n("volt-modal",{attrs:{active:e.modalShowing}})],1)},i=[],s=(n("7db0"),n("5530")),u=n("2f62"),c=(n("caad"),n("2532"),{"notes.saved":"Note saved!","User records note":"Your note could not be saved! (Permission denied)","User authenticates self and begins training session":"Cannot begin training session! (Permission denied)","The email address is badly formatted.":"Study ID incorrectly formatted!","There is no user record corresponding to this identifier. The user may have been deleted.":"Participant not found!","Client doesn't have permission to access the desired data.":"Can't log in (Permission denied). Please contact amish.khan@wustl.edu.","session.ended":"Thanks for training! Be sure to jot down anything special in a note."}),d=function(e){for(var t in c)if(e.includes(t))return c[t]},l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v(e._s(e.timerCount)+" sec remaining")])},f=[],m={immediate:!0},p={data:function(){return{timerCount:void 0,individualTimeout:void 0,unwatch:void 0}},props:["limit","pause"],mounted:function(){this.timerCount=this.limit,this.unwatch=this.$watch("timerCount",this.watcher,m)},methods:{watcher:function(e){var t=this;e>0?(this.$emit("counter-value",this.limit-e),this.individualTimeout=setTimeout((function(){t.timerCount--}),1e3)):this.$root.$emit("timer-done")}},watch:{pause:function(e){e?(this.unwatch(),clearTimeout(this.individualTimeout)):this.unwatch=this.$watch("timerCount",this.watcher,m)}}},h=p,v=n("2877"),g=Object(v["a"])(h,l,f,!1,null,null,null),b=g.exports,w=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("md-dialog",{attrs:{"md-active":e.$parent.makingNote},on:{"update:mdActive":function(t){return e.$set(e.$parent,"makingNote",t)},"update:md-active":function(t){return e.$set(e.$parent,"makingNote",t)},"md-opened":function(t){return e.$root.$emit("modal",!0)},"md-closed":function(t){return e.$root.$emit("modal",!1)}}},[n("md-dialog-title",[e._v("Jot something down...")]),n("md-dialog-content",[n("md-field",{staticClass:"field"},[n("md-textarea",{directives:[{name:"focus",rawName:"v-focus"}],staticClass:"textarea",attrs:{"md-counter":"",maxlength:1500,id:"volt"},model:{value:e.text,callback:function(t){e.text=t},expression:"text"}})],1)],1),n("md-dialog-actions",[n("md-button",{staticClass:"md-primary",on:{click:e.close}},[e._v("Close")]),n("div",[n("md-button",{directives:[{name:"show",rawName:"v-show",value:e.inProgress,expression:"inProgress"}],staticClass:"md-primary hidden-spinner"},[n("md-progress-spinner",{staticClass:"my-spin",attrs:{"md-diameter":20,"md-stroke":3,"md-mode":"indeterminate"}})],1),n("md-button",{directives:[{name:"show",rawName:"v-show",value:!e.inProgress,expression:"!inProgress"}],staticClass:"md-primary",attrs:{disabled:!e.text},on:{click:e.save}},[e._v("Save")])],1)],1)],1)},y=[],k={data:function(){return{text:void 0,inProgress:!1}},methods:{close:function(){this.inProgress=!1,this.$children[0].closeDialog()},save:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.inProgress=!0,e.$store.dispatch("SAVE_NOTE",e.text).then((function(){e.text=void 0,e.close(),e.$root.$emit("show-snackbar","notes.saved")})).catch((function(t){e.$root.$emit("show-snackbar",t.message),e.inProgress=!1}));case 2:case"end":return t.stop()}}),t)})))()}}},_=k,E=(n("afe3"),Object(v["a"])(_,w,y,!1,null,"3c7650b7",null)),T=E.exports,S=[{width:280,chars:8},{width:380,chars:12},{width:2e3,chars:17}],O={name:"App",components:{VoltTimer:b,VoltModal:T},data:function(){return{nameCharCount:0,counterStatus:!1,snackBarShowing:!1,snackBarMessage:void 0,makingNote:!1,intervalHandle:void 0,modalShowing:!1,timerRefreshKey:0,progress:0,limit:10,pause:!1}},mounted:function(){var e=this;this.nameCharCount=S.find((function(e){return window.innerWidth<=e.width})).chars,this.$root.$on("start-timer",function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.counterStatus=!0,e.progress=0,e.timerRefreshKey+=1,e.limit=n;case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),this.$root.$on("show-snackbar",function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.snackBarShowing=!0,e.snackBarMessage=d(n);case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),this.$root.$on("pause",(function(){e.pause=!e.pause})),this.$root.$on("modal",(function(t){e.modalShowing=t})),this.$root.$on("making-note",(function(){e.makingNote=!0})),this.$root.$on("counter-status",(function(t){return e.counterStatus=t}))},computed:Object(s["a"])(Object(s["a"])({},Object(u["b"])(["currentUser"])),{},{modalStyle:function(){return{overflow:this.modalShowing?"hidden":"auto"}}}),methods:{logout:function(){var e=this;this.counterStatus=!1,this.$store.dispatch("LOGOUT").then((function(){e.$router.push("/login").catch((function(e){return console.log(e.message)}))}))}}},U=O,C=(n("5c0b"),Object(v["a"])(U,o,i,!1,null,null,null)),P=C.exports,x=n("8c4f"),A=(n("b0c0"),n("d3b7"),n("99af"),n("4160"),n("d81d"),n("b64b"),n("ac1f"),n("25f0"),n("5319"),n("1276"),n("159b"),n("ade3")),$=n("ee8c"),R=n("8aa50"),j=n.n(R),N={apiKey:"AIzaSyAIBZT7Ik8_h-blcY5FE8-mUzMGJUImTTU",projectId:Object({NODE_ENV:"production",VUE_APP_API_KEY:"AIzaSyAIBZT7Ik8_h-blcY5FE8-mUzMGJUImTTU",VUE_APP_PROJECT_ID:"volt-data-store",VUE_APP_STORAGE_URL:"gs://volt-data-store.appspot.com",VUE_APP_DB_URL:"https://volt-data-store.firebaseio.com/",BASE_URL:"/volt/"}).VUE_APP_PROJECTID,databaseURL:"https://volt-data-store.firebaseio.com/",storageBucket:"gs://volt-data-store.appspot.com"},I=j.a.initializeApp(N),D=function(){return(new Date).toString()},M=function(e){var t=$[e];return 1+(Math.random()*t<<0)};function B(e,t,n){n=n||"update";var r=I.database().ref(K.currentUser.id),a=r;e.split(".").forEach((function(e){return a=a.child(e)}));var o=a[n](t);return r.off(),o}function L(e){var t=this;return e.catch((function(e){throw e.message+=" during: ".concat(t.purpose),e}))}a["default"].use(u["a"]);var K={savedData:{},currentUser:void 0,sessionKey:void 0,notes:[],completedDays:0},G={currentUser:function(e){return e.currentUser},sessionKey:function(e){return e.sessionKey},notes:function(e){return e.notes},completedDays:function(e){return e.completedDays}},V={SAVE_COMPLETEDDAY:function(e){var t=e.commit,n="User completed two trainings for the day",r=L.bind({purpose:n});if(K.currentUser){var a=K.completedDays,o=a?a+1:1;return r(B("completedDays",o,"set")).then((function(e){console.log("new value",e,o),t("WRITE_COMPLETEDDAY",o)}))}},SAVE_ODOR:function(e,t){var n="Picture, resting completed for specific odor",r=L.bind({purpose:n});if(K.currentUser)return r(B("sessions.".concat(K.sessionKey,".odors"),Object(A["a"])({},t,D())))},SAVE_SESSIONEND:function(){var e="Training session (all odors) ended successfully",t=L.bind({purpose:e});if(K.currentUser)return t(B("sessions.".concat(K.sessionKey),{endedTime:D()}))},SAVE_NOTE:function(e,t){var n=e.commit,r="User records note",a=L.bind({purpose:r});if(K.currentUser){var o=D(),i={recordedTime:o,content:t};return a(B("notes",i,"push")).then((function(e){return n("WRITE_NOTE",{newNote:i,key:e.key}),e}))}},BEGIN_TRAINING:function(e){var t=e.commit,n="Authenticated user begins training session",r=L.bind({purpose:n});return new Promise((function(e,n){if(K.currentUser){var a=D(),o={studyID:K.currentUser.id,startedTime:a};r(B("sessions",o,"push")).then((function(n){t("SESSION_KEY",n.key),e()})).catch((function(e){q.$root.$emit("show-snackbar",e.message),n(e)}))}}))},CHECK_AUTH:function(e){var t=e.commit;return new Promise((function(e,n){I.auth().onAuthStateChanged(function(){var a=Object(r["a"])(regeneratorRuntime.mark((function r(a){var o;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return o=function(n){t("SET_AUTH",Object(s["a"])({id:a.uid},n.val())),e()},r.abrupt("return",a?I.database().ref(a.uid).once("value",o,n):n());case 2:case"end":return r.stop()}}),r)})));return function(e){return a.apply(this,arguments)}}())}))},GET_IMAGES:function(){return Object(r["a"])(regeneratorRuntime.mark((function e(){var t,n,r,a,o,i,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t=K.currentUser,t.odors){e.next=3;break}throw new Error("User ".concat(t.id," has no odors listed in Firebase profile"));case 3:if(n=Object.keys(t.odors).map((function(e){return{name:e}})),t.studyArm&&"photo"===t.studyArm){e.next=6;break}return e.abrupt("return",n);case 6:r=I.storage(),a=0;case 8:if(!(a<n.length)){e.next=18;break}return o="gs://volt-data-store.appspot.com",i=n[a].name.replace(/ /g,"").toLowerCase(),s="".concat(o,"/").concat(i,"-").concat(M(i),".jpg"),e.next=14,r.refFromURL(s).getDownloadURL();case 14:n[a].src=e.sent;case 15:a++,e.next=8;break;case 18:return e.abrupt("return",n);case 19:case"end":return e.stop()}}),e)})))()},LOGOUT:function(e){var t=e.commit,n="User logs out",r=L.bind({purpose:n});return r(I.auth().signOut()).then((function(e){return t("PURGE_AUTH"),e}))},LOGIN:function(e,t){var n="User logs in with studyID",r=L.bind({purpose:n});return r(I.auth().signInWithEmailAndPassword(t,"password"))}},H={SET_AUTH:function(e,t){e.currentUser=t,e.notes=t.notes||[],e.completedDays=t.completedDays||0},WRITE_NOTE:function(e,t){var n=t.newNote,r=t.key;a["default"].set(e.notes,r,n)},WRITE_COMPLETEDDAY:function(e,t){e.completedDays=t},SESSION_KEY:function(e,t){e.sessionKey=t},PURGE_AUTH:function(e){e.sessionKey=void 0,e.currentUser=void 0,e.notes=[]}},Y=new u["a"].Store({state:K,mutations:H,actions:V,getters:G});a["default"].use(x["a"]);var J=[{path:"/",name:"landing-page",component:function(){return Promise.all([n.e("chunk-6bf136d8"),n.e("chunk-477e0162"),n.e("chunk-7b6b1798")]).then(n.bind(null,"893c"))},beforeEnter:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t,n,r){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:Y.dispatch("CHECK_AUTH").then(r).catch((function(){return r("/login")}));case 1:case"end":return e.stop()}}),e)})));function t(t,n,r){return e.apply(this,arguments)}return t}()},{path:"/sniff",name:"sniff-exercise",component:function(){return Promise.all([n.e("chunk-6bf136d8"),n.e("chunk-560a5d82")]).then(n.bind(null,"f5b9"))},beforeEnter:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t,n,r){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(e.prev=0,n.name){e.next=4;break}return e.next=4,Y.dispatch("CHECK_AUTH");case 4:return e.next=6,Y.dispatch("BEGIN_TRAINING");case 6:if(t.params.pictures){e.next=10;break}return e.next=9,Y.dispatch("GET_IMAGES");case 9:t.params.pictures=e.sent;case 10:return e.abrupt("return",r());case 13:return e.prev=13,e.t0=e["catch"](0),e.abrupt("return",r(n.path||"/login"));case 16:case"end":return e.stop()}}),e,null,[[0,13]])})));function t(t,n,r){return e.apply(this,arguments)}return t}()},{path:"/login",name:"login-screen",component:function(){return Promise.all([n.e("chunk-477e0162"),n.e("chunk-1c2f2d28")]).then(n.bind(null,"499c"))}},{path:"*",name:"catch-all",redirect:"/"}],W=new x["a"]({mode:"history",base:"/volt/",routes:J}),F=W,z=n("9c30");n("51de");a["default"].use(z["MdButton"]),a["default"].use(z["MdField"]),a["default"].use(z["MdCard"]),a["default"].use(z["MdMenu"]),a["default"].use(z["MdList"]),a["default"].use(z["MdSnackbar"]),a["default"].use(z["MdApp"]),a["default"].use(z["MdDrawer"]),a["default"].use(z["MdToolbar"]),a["default"].use(z["MdContent"]),a["default"].use(z["MdProgress"]),a["default"].use(z["MdDialog"]),a["default"].use(z["MdTabs"]),a["default"].directive("focus",{inserted:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:setTimeout((function(){return t.focus()}),500);case 1:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()}),a["default"].filter("truncatedString",(function(e,t){return e?e.length<=t?e:e.substr(0,t)+"...":""})),a["default"].use(x["a"]),a["default"].config.productionTip=!1,document.title="Smell Training Clinical Trial";var q=t["default"]=new a["default"]({render:function(e){return e(P)},store:Y,router:F}).$mount("#app")},"5c0b":function(e,t,n){"use strict";var r=n("9c0c"),a=n.n(r);a.a},"9c0c":function(e,t,n){},ad3f:function(e,t,n){},afe3:function(e,t,n){"use strict";var r=n("ad3f"),a=n.n(r);a.a},ee8c:function(e){e.exports=JSON.parse('{"blackpepper":12,"cedarwood":10,"cinnamon":9,"clove":10,"coffee":13,"eucalyptus":19,"frankincense":16,"geranium":17,"grapefruit":13,"jasmine":19,"juniper":10,"lavender":13,"lemon":12,"lime":10,"nutmeg":11,"orange":10,"oregano":12,"peppermintspearmint":12,"rose":14,"rosemary":13,"sandalwood":15,"teatree":10,"vanilla":9}')}});
//# sourceMappingURL=app.edd66210.js.map