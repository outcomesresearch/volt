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
            <volt-timer
              @counter-value="progress = $event"
              v-if="counterStatus"
              :key="timerRefreshKey"
              :limit="limit"
              :pause="pause"
            />
          </div>
          <h3 v-if="currentUser" class="md-title">
            Welcome,
            {{ currentUser.fname | truncatedString(17) }}
          </h3>
          <md-button
            class="log-out-button"
            v-if="currentUser && !counterStatus"
            @click="logout"
            >Log Out</md-button
          >
        </md-app-toolbar>
        <md-app-content>
          <md-progress-bar
            style="margin: -17px -16px 0px -17px"
            md-mode="determinate"
            :md-value="(progress / limit) * 100"
            v-if="counterStatus"
          ></md-progress-bar>
          <router-view />
        </md-app-content>
      </md-app>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { auth } from "./services/firebase.service";
import VoltTimer from "./components/Timer";

export default {
  name: "App",
  components: { VoltTimer },
  data() {
    return {
      counterStatus: false,
      intervalHandle: undefined,
      timerRefreshKey: 0,
      progress: 0,
      limit: 10,
      pause: false,
    };
  },
  mounted() {
    this.$root.$on("start-timer", async (limit) => {
      this.counterStatus = true;
      this.progress = 0;
      this.timerRefreshKey += 1;
      this.limit = limit;
    });

    this.$root.$on("pause", () => {
      this.pause = !this.pause;
    });

    this.$root.$on("counter-status", (status) => (this.counterStatus = status));
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  methods: {
    logout() {
      this.counterStatus = false;
      auth.logout().then(() => {
        this.$store.dispatch("LOGOUT");
        this.$router.push("/login").catch((r) => console.log(r.message));
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/App.scss";
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Libre+Baskerville&display=swap");

$washuLogoWidth: 252px;

#app {
  height: 100%;
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: "Source Sans Pro" !important;
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

.md-app-content {
  height: calc(100% - 48px);
  overflow-y: hidden;
  border: none !important;
}

.md-toolbar.md-app-toolbar.md-primary.md-dense.md-theme-default.md-elevation-4.md-no-elevation {
  padding-left: calc(calc(100% - #{$content-width}) / 2);
  padding-right: calc(calc(100% - #{$content-width}) / 2);
}

.md-button-content {
  font-weight: bold;
}

.counter {
  font-size: 16px;
  margin-left: auto;
  margin-right: auto;
}

h1 {
  font-weight: 300;
  line-height: 1;
  font-family: "Libre Baskerville", "Times New Roman", serif;
}

.toolbar {
  width: 71em;
  min-height: 30px;
  margin: auto;
}

@media (max-width: 71em) {
  .md-toolbar.md-app-toolbar.md-primary.md-dense.md-theme-default.md-elevation-4.md-no-elevation {
    padding: 0px 8px;
  }
  .toolbar {
    width: 100%;
    max-width: unset !important;

    & .footer {
      padding: 1em 16px !important;
    }
  }
}

@media (max-width: 500px) {
  @import "@/assets/ColorComponentMobile.scss";

  .washu-branding {
    margin-right: calc(100% - #{$washuLogoWidth});
  }
  h3.md-title {
    margin-left: 0px !important;
  }

  .log-out-button {
    margin-left: auto !important;
    margin-right: 0px !important;
  }

  .counter {
    margin-left: 0px;
  }

  .footer {
    text-align: center;
  }
  .footer-copyright {
    text-align: left;
  }
}

.footer-bottom {
  height: 100%;
  display: grid;
  grid-template-rows: min-content auto min-content;
}
</style>
