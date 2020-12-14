<template>
  <div class="image-wrapper" ref="sniffComponent" v-if="!done">
    <div class="smelling-banner" v-show="paused">Paused</div>
    <div v-show="!paused">
      <div class="resting-banner" v-show="resting">Resting...</div>
      <div v-show="!resting && pictures.length">
        <div class="smelling-banner">
          Smelling {{ pictures[pictureIndex].name }}
        </div>
        <img
          v-show="currentUser.studyArm === 'photo' && !paused"
          :src="pictures[pictureIndex].src"
        />
      </div>
    </div>
    <div class="controls" @click="handlePause">
      <img v-show="!paused" :src="require(`@/assets/pause-button.svg`)" />
      <img v-show="paused" :src="require(`@/assets/play-button.svg`)" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "Sniff",
  data() {
    return {
      pictures: [],
      pictureIndex: -1,
      resting: false,
      paused: false,
      done: true,
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  methods: {
    endSniffing() {
      this.pictures = [];
      this.$root.$emit("counter-status", false);
      this.done = true;
    },
    handlePause() {
      this.paused = !this.paused;
      this.$root.$emit("pause");
    },
    // What constitutes a completed session? (Compliance panel): Has endedTime, startedTime, and odors keys.  Odor key has four odors in it
    completedSession(session) {
      return (
        session.endedTime &&
        session.startedTime &&
        session.odors &&
        Object.keys(session.odors).length === 4
      );
    },
    countCompletedSessions() {
      // Sort sessions by date
      const sortedSessions = Object.keys(this.currentUser.sessions)
        .map((s) => this.currentUser.sessions[s])
        .filter(this.completedSession)
        .sort((a, b) => new Date(a.endedTime) - new Date(b.endedTime));

      if (sortedSessions.length) {
        // prettier-ignore
        const lastMidnight = moment().subtract(1, "days").startOf("day");
        let lastSession = moment(sortedSessions.pop().endedTime);
        let sessionsSinceYesterday = 0;
        while (lastSession.isAfter(lastMidnight)) {
          sessionsSinceYesterday += 1;
          lastSession = moment(sortedSessions.pop().endedTime);
        }
        // Increment firebase if they just 2 sessions for the day
        if (sessionsSinceYesterday === 2) {
          this.$store.dispatch("SAVE_COMPLETEDDAY");
        }
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    this.endSniffing();
    return next();
  },
  async mounted() {
    this.pictures = this.$route.params.pictures;
    this.done = false;
    let resolve = () => {};

    this.$root.$on("timer-done", () => {
      this.resting = !this.resting;
      resolve();
    });

    for (let i = 0; i < this.pictures.length; i++) {
      // Resolve these promises timer-done event is emitted on root
      await new Promise((r) => {
        this.pictureIndex = i;
        resolve = r;
        this.$root.$emit("start-timer", 5);
      });
      await new Promise((r) => {
        resolve = r;
        this.$root.$emit("start-timer", 5);
      });

      if (!this.done) this.$store.dispatch("SAVE_ODOR", this.pictures[i].name);

      if (i === this.pictures.length - 1) {
        this.endSniffing();
        this.countCompletedSessions();
        this.$store.dispatch("SAVE_SESSIONEND");
        this.$root.$emit("show-snackbar", "session.ended");
        setTimeout(() => this.$router.push("/"), 500);
      }
    }
  },
};
</script>

<style scoped lang="scss">
.md-progress-bar {
  border-top: 1px solid white;
  height: 10px;
}
.colors-wrapper {
  margin-top: -16px;
  margin-right: -17px;
  margin-left: -17px;
}
.image-wrapper {
  padding: 16px;
  max-width: 600px;
  margin: auto;
}
.image-wrapper img {
  border-radius: 10px;
}

.smelling-banner,
.resting-banner {
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  line-height: 1;
  color: rgb(150, 150, 150);
}
.smelling-banner {
  font-style: italic;
  padding: 10px;
}

.resting-banner {
  padding: 30px;
  border-radius: 10px;
  background: rgb(230, 230, 230);
}

.recorded-data > pre {
  white-space: break-spaces;
}

.controls {
  max-width: 50px;
  margin: auto;
  margin-top: 20px;
  cursor: pointer;
}
</style>
