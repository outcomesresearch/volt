import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import router from "./router";
import store from "./store";

import {
  MdButton,
  MdField,
  MdCard,
  MdMenu,
  MdList,
  MdSnackbar,
  MdApp,
  MdDrawer,
  MdToolbar,
  MdContent,
  MdProgress,
} from "vue-material/dist/components";
import "vue-material/dist/vue-material.min.css";

Vue.use(MdButton);
Vue.use(MdField);
Vue.use(MdCard);
Vue.use(MdMenu);
Vue.use(MdList);
Vue.use(MdSnackbar);
Vue.use(MdApp);
Vue.use(MdDrawer);
Vue.use(MdToolbar);
Vue.use(MdContent);
Vue.use(MdProgress);

Vue.filter("truncatedString", function(value, size) {
  if (!value) return "";
  return value.length <= size ? value : value.substr(0, size) + "...";
});

Vue.use(VueRouter);
Vue.config.productionTip = false;

export default new Vue({
  render: (h) => h(App),
  store,
  router,
}).$mount("#app");
