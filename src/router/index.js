import Vue from "vue";
import VueRouter from "vue-router";
import FirebaseService from "../services/firebase.service.js";

Vue.use(VueRouter);

const routes = [
  {
    path: `/`,
    name: `error-404`,
    component: () => import(`@/components/Colors.vue`),
    beforeEnter: function(to, from, next) {
      FirebaseService.auth().onAuthStateChanged(function(user) {
        if (user) {
          return next();
        } else {
          return next("/login");
        }
      });
    },
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
