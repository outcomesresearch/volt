<template>
  <div id="app">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary md-dense">
        <h3 v-if="currentUser" class="md-title welcome-name">
          Welcome,
          {{ currentUser.fname | truncatedString(17) }}
        </h3>
        <div class="counter">
          <volt-timer
            @counter-value="progress = $event"
            v-if="counterStatus"
            :key="timerRefreshKey"
            :limit="limit"
            :pause="pause"
          />
        </div>
        <md-button
          class="log-out-button"
          v-if="currentUser && !counterStatus"
          @click="makingNote = true"
          >Make Note</md-button
        >
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
    <md-snackbar :md-active.sync="snackBarShowing">
      {{ snackBarMessage }}
    </md-snackbar>
    <volt-modal :active="makingNote" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { auth } from "./services/firebase.service";
import VoltTimer from "./components/Timer";
import VoltModal from "./components/Modal";

export default {
  name: "App",
  components: { VoltTimer, VoltModal },
  data() {
    return {
      counterStatus: false,
      snackBarShowing: false,
      snackBarMessage: undefined,
      makingNote: false,
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

    this.$root.$on("show-snackbar", async (message) => {
      this.snackBarShowing = true;
      this.snackBarMessage = message;
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

// Override material design (md-) namespaces
.md-app {
  min-height: 100%;
  border: none;
  overflow: hidden;
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
  padding: 0px !important;
}

.md-button-content {
  font-weight: bold;
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

/** Items in toolbar:  

Landing page: 
- left: Welcome, <fname> 
- right: Log Out button

Sniff Carousel: 
- left: Welcome, <fname>
- right: <sec> remaining
 */

.welcome-name {
  max-height: 25px;
  vertical-align: bottom;
  pointer-events: none;
  margin-left: 16px !important;
}

.log-out-button {
  margin-right: 8px !important;
}

.counter {
  font-size: 16px;
  margin-left: auto;
  margin-right: 16px;
}

// Parent-class to float footer to bottom
.footer-bottom {
  height: 100%;
  display: grid;
  grid-template-rows: min-content auto min-content;
}

// Text area overrides:
.md-count {
  background-color: white;
}

@media (max-width: 71em) {
  .toolbar {
    width: 100%;
    max-width: unset !important;

    & .footer {
      padding: 1em 16px !important;
    }
  }
}

@media (min-width: 500px) {
  .md-dialog-container {
    height: 80%;
    width: 80%;
    max-width: 500px !important;
    max-height: 500px !important;
  }
}

@media (max-width: 500px) {
  @import "@/assets/ColorComponentMobile.scss";
  .footer {
    text-align: center;
  }
}
</style>
