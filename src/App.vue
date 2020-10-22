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
          <div class="counter">
            <span v-if="counterStatus">{{ remaining }} sec remaining</span>
          </div>
          <h3 v-if="currentUser" class="md-title">
            Welcome,
            {{ currentUser.fname | truncatedString(20) }}
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
  data() {
    return {
      counterStatus: false,
      intervalHandle: undefined,
      ownCounter: 0,
      timerLimit: 10000,
    };
  },
  mounted() {
    this.$root.$on("counter-status", (status) => {
      this.counterStatus = status;
    });
    this.$root.$on("counter-changed", ({ time, length }) => {
      this.ownCounter = time.toFixed(0);
      this.timerLimit = length;
    });
  },
  computed: {
    ...mapGetters(["currentUser"]),
    remaining() {
      return this.timerLimit / 1000 - this.ownCounter;
    },
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
  pointer-events: none;
}

.md-title {
  font-size: 16px !important;
}

.counter {
  font-size: 16px;
  margin-left: auto;
  margin-right: auto;
}
</style>
