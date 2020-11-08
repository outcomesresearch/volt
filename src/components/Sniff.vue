<template>
  <div class="colors-wrapper">
    <md-progress-bar
      md-mode="determinate"
      v-if="!done"
      :md-value="progressBarCount * (100 / progressBarSteps)"
    ></md-progress-bar>
    <div class="image-wrapper">
      <div class="resting-banner" v-if="resting">Resting...</div>
      <img :src="imgPath" v-else-if="pictureIndex != -1" />
      <div class="recorded-data" v-if="done">
        See you next time! Logging out ...
      </div>
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
      progressBarSteps: 10,
      progressBarCount: 0,
      done: false,
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
    imgPath() {
      return require(`@/assets/images/${this.pictures[this.pictureIndex]}.jpg`);
    },
  },
  methods: {
    doTimer(length, resolution, oninstance, oncomplete) {
      let steps = (length / 100) * (resolution / 10);
      let speed = length / steps;
      let count = 0;
      let start = new Date().getTime();

      function instance() {
        if (count++ == steps) {
          oncomplete(steps, count);
        } else {
          oninstance(steps, count);

          let diff = new Date().getTime() - start - count * speed;
          setTimeout(instance, speed - diff);
        }
      }
      setTimeout(instance, speed);
      oninstance(steps, count);
    },

    secTimer(steps, count) {
      this.$root.$emit("counter-changed", { count, steps });
      this.progressBarCount = count;
      this.progressBarSteps = steps;
    },
    longTimer(resolve) {
      this.resting = !this.resting;
      resolve();
    },
  },
  async mounted() {
    this.pictures = Object.keys(this.currentUser.odors).map((name) => name);
    const pictureLength = 5000;
    const restLength = 5000;

    write.startedSniffing();

    this.$root.$emit("counter-status", true);
    for (let i = 0; i < this.pictures.length; i++) {
      await new Promise((r) => {
        this.pictureIndex = i;
        this.doTimer(pictureLength, 1, this.secTimer, () => this.longTimer(r));
      });
      await new Promise((r) => {
        this.pictureIndex = -1;
        this.doTimer(restLength, 1, this.secTimer, () => this.longTimer(r));
      });

      write.recordOdor(this.pictures[i]);

      if (i === this.pictures.length - 1) {
        this.$root.$emit("counter-status", false);
        this.done = true;
        setTimeout(this.$root.$children[0].logout, 1000);
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
</style>
