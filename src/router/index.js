import Vue from "vue";
import VueRouter from "vue-router";
import FirebaseService from "../services/firebase.service.js";
import store from "../store/";

Vue.use(VueRouter);

const beforeEnter = function(to, from, next) {
  FirebaseService.auth().onAuthStateChanged(function(user) {
    if (user) {
      FirebaseService.database()
        .ref()
        .on("value", function(data) {
          const acct = data.val().notes.users[user.uid];
          store.commit("SET_AUTH", acct);
          return next();
        });
    } else {
      return next("/login");
    }
  });
};

const routes = [
  {
    path: `/`,
    name: `error-404`,
    component: () => import(`@/components/Colors.vue`),
    beforeEnter,
  },
  {
    path: `/sniff`,
    name: `sniff-exercise`,
    component: () => import(`@/components/Sniff.vue`),
    beforeEnter,
  },
  {
    path: "/login",
    name: "login-screen",
    component: () => import(`@/components/LogIn.vue`),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
