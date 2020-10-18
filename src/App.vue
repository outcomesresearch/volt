<template>
  <div id="app">
    <div class="page-container">
      <md-app md-waterfall md-mode="fixed">
        <md-app-toolbar class="md-primary md-dense">
          <img
            class="washu-branding"
            src="@/assets/washu_logo.svg"
            alt="Branding for Washington
        University in St. Louis"
          />

          <h3 v-if="currentUser" class="md-title">
            Welcome, {{ currentUser.fname }}
          </h3>
          <md-button v-if="currentUser" @click="logout">Log Out</md-button>
        </md-app-toolbar>
        <md-app-content>
          <router-view />
        </md-app-content>
      </md-app>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapGetters(["currentUser"]),
  },
  methods: {
    logout() {
      this.$store.dispatch("LOGOUT").then(() => {
        this.$router.push("/login").catch((r) => console.log(r.message));
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/App.scss";

#app {
  height: 100%;
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.page-container {
  min-height: 100%;
}
.md-app {
  min-height: 100vh;
  border: none;
}

.washu-branding {
  width: 252px;
  max-height: 25px;
  vertical-align: bottom;
  margin: 0.55em 0;
  margin-right: auto;
  pointer-events: none;
}

.md-title {
  font-size: 16px !important;
}
</style>
