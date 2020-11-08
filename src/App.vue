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
            {{ currentUser.fname | truncatedString(17) }}
          </h3>
          <!-- <md-button v-if="currentUser && !counterStatus" @click="logout"
            >Log Out</md-button
          > -->
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
import { auth, write } from "./services/firebase.service";

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
    this.$root.$on("counter-changed", ({ count, steps }) => {
      this.ownCounter = count.toFixed(0);
      this.timerLimit = steps;
    });
  },
  computed: {
    ...mapGetters(["currentUser"]),
    remaining() {
      return this.timerLimit - this.ownCounter;
    },
  },
  methods: {
    logout() {
      this.counterStatus = false;

      write
        .logout()
        .then(auth.logout)
        .then(() => {
          this.$store.dispatch("LOGOUT");
          this.$router.push("/login").catch((r) => console.log(r.message));
        });
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/App.scss";

$washuLogoWidth: 252px;

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
  overflow: hidden;
}

.washu-branding {
  width: $washuLogoWidth;
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

@media (max-width: 500px) {
  .washu-branding {
    margin-right: calc(100% - #{$washuLogoWidth});
  }
  h3.md-title {
    margin-left: 0px !important;
  }

  .counter {
    margin-left: 0px;
  }
}
</style>
