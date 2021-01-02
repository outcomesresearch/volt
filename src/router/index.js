import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/";

Vue.use(VueRouter);

const routes = [
  {
    path: `/`,
    name: `landing-page`,
    component: () => import(`@/components/Colors.vue`),
    beforeEnter: async function(to, from, next) {
      store
        .dispatch("CHECK_AUTH")
        .then(next)
        .catch(() => next("/login"));
    },
  },
  {
    path: `/sniff`,
    name: `sniff-exercise`,
    component: () => import(`@/components/Sniff.vue`),
    beforeEnter: async function(to, from, next) {
      try {
        if (!from.name) {
          await store.dispatch("CHECK_AUTH");
        }
        await store.dispatch("BEGIN_TRAINING");
        // Attach pre-fetched pictures to params, if not there already
        if (!to.params.pictures) {
          to.params.pictures = await store.dispatch("GET_IMAGES");
        }
        return next();
      } catch (e) {
        return next(from.path || "/login");
      }
    },
  },
  {
    path: "/login",
    name: "login-screen",
    component: () => import(`@/components/LogIn.vue`),
    beforeEnter: function(to, from, next) {
      store
        .dispatch("LOGOUT")
        .then(next)
        .catch(console.log);
    },
  },
  {
    path: "*",
    name: "catch-all",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
