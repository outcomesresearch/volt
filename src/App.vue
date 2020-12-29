<template>
  <div id="app" :style="modalStyle">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary md-dense">
        <h3 v-if="currentUser" class="md-title welcome-name">
          Welcome,
          {{ currentUser.fname | truncatedString(nameCharCount) }}
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
    <md-snackbar :md-active.sync="snackBarShowing" :md-duration="7000">
      {{ snackBarMessage }}
    </md-snackbar>
    <volt-modal :active="modalShowing" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { txlate } from "@/services/message.service.js";
import VoltTimer from "./components/Timer";
import VoltModal from "./components/Modal";
const sizes = [
  { width: 280, chars: 8 },
  { width: 380, chars: 12 },
  { width: 2000, chars: 17 },
];

export default {
  name: "App",
  components: { VoltTimer, VoltModal },
  data() {
    return {
      nameCharCount: 0,
      counterStatus: false,
      snackBarShowing: false,
      snackBarMessage: undefined,
      makingNote: false,
      intervalHandle: undefined,
      modalShowing: false,
      timerRefreshKey: 0,
      progress: 0,
      limit: 10,
      pause: false,
    };
  },
  mounted() {
    this.nameCharCount = sizes.find((b) => window.innerWidth <= b.width).chars;
    this.$root.$on("start-timer", async (limit) => {
      this.counterStatus = true;
      this.progress = 0;
      this.timerRefreshKey += 1;
      this.limit = limit;
    });

    this.$root.$on("show-snackbar", async (message) => {
      this.snackBarShowing = true;
      this.snackBarMessage = txlate(message);
    });

    this.$root.$on("pause", () => {
      this.pause = !this.pause;
    });

    this.$root.$on("modal", (opened) => {
      this.modalShowing = opened;
    });

    this.$root.$on("making-note", () => {
      this.makingNote = true;
    });

    this.$root.$on("counter-status", (status) => (this.counterStatus = status));
  },
  computed: {
    ...mapGetters(["currentUser"]),
    modalStyle() {
      return { overflow: this.modalShowing ? "hidden" : "auto" };
    },
  },
  methods: {
    logout() {
      this.counterStatus = false;
      this.$store.dispatch("LOGOUT").then(() => {
        this.$router.push("/login").catch((err) => console.log(err.message));
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

#app ~ .md-snackbar {
  // Sibling combinator bc md-snackbar actually gets rendered separately from where it's specified in the DOM tree
  box-shadow: 0 3px 5px -1px rgba(90, 90, 90, 0.2),
    0 6px 10px 0 rgba(100, 100, 100, 0.14),
    0 1px 18px 0 rgba(100, 100, 100, 0.12);
  margin-bottom: 10px;
  font-size: 16px;
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

// Fix height of placeholder text's container on Safari, requires this override
.past-notes .md-card-content {
  height: 100%;
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
  .panel-container {
    grid-template-columns: 1fr !important;
    & .past-notes {
      order: 2;
    }
    & .right-column {
      order: 1;
    }
  }
}
</style>
