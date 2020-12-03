import Vue from "vue";
import VueRouter from "vue-router";
import { auth, write, read } from "../services/firebase.service.js";
import store from "../store/";

Vue.use(VueRouter);

const routes = [
  {
    path: `/`,
    name: `landing-page`,
    component: () => import(`@/components/Colors.vue`),
    beforeEnter: async function(to, from, next) {
      await store.dispatch("SET_SESSION_KEY", undefined);
      auth
        .checkAuthentication()
        .then(next)
        .catch(() => next("/login"));
    },
  },
  {
    path: `/sniff`,
    name: `sniff-exercise`,
    component: () => import(`@/components/Sniff.vue`),
    beforeEnter: async function(to, from, next) {
      if (!from.name) {
        console.log(from.name);
        await auth.checkAuthentication().catch(() => next("/login"));
      }
      to.params.pictures = await read.getImages();
      await write.authenticatedSelf();
      return next();
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
