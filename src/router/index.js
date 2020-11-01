import Vue from "vue";
import VueRouter from "vue-router";
import { auth, write } from "../services/firebase.service.js";

Vue.use(VueRouter);

const beforeEnter = async function(to, from, next) {
  auth
    .checkAuthentication()
    .then(write.authenticatedSelf)
    .then(next)
    .catch(() => next("/login"));
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
    beforeEnter: async function(to, from, next) {
      if (!from.name) beforeEnter(to, from, next);
      else next();
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
