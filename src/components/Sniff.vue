<template>
  <div class="image-wrapper" ref="sniffComponent">
    <div class="resting-banner" v-if="resting">Resting...</div>
    <img :src="imgPath" v-else-if="pictureIndex != -1" />
    <div class="pause" @click="handlePause" v-if="!done">
      <img v-show="!paused" src="@/assets/pause-button.svg" />
      <img v-show="paused" src="@/assets/play-button.svg" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { write } from "../services/firebase.service";

export default {
  name: "Sniff",
  data() {
    return {
      pictures: [],
      pictureIndex: -1,
      resting: false,
      paused: false,
      done: false,
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
    imgPath() {
      return this.pictures[this.pictureIndex]
        ? require(`@/assets/images/${this.pictures[this.pictureIndex]}.jpg`)
        : "";
    },
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
  },
  beforeRouteLeave(to, from, next) {
    this.endSniffing();
    return next();
  },
  async mounted() {
    this.pictures = Object.keys(this.currentUser.odors).map((name) => name);
    let resolve = () => {};

    this.$root.$on("timer-done", () => {
      this.resting = !this.resting;
      resolve();
    });

    write.startedSniffing();

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

      if (!this.done) write.recordOdor(this.pictures[i]);

      if (i === this.pictures.length - 1) {
        this.endSniffing();
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
  max-width: 800px;
  margin: auto;
}
.image-wrapper > img {
  border-radius: 10px;
}
.resting-banner {
  font-size: 30px;
  font-weight: 600;
  border-radius: 10px;
  color: rgb(150, 150, 150);
  text-align: center;
  line-height: 1;
  background: rgb(230, 230, 230);
  padding: 30px;
}

.recorded-data > pre {
  white-space: break-spaces;
}

.pause {
  max-width: 50px;
  opacity: 50%;
  margin: auto;
  margin-top: 20px;
  cursor: pointer;
}
</style>
