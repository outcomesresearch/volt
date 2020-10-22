<template>
  <div class="colors-wrapper">
    <md-progress-bar
      md-mode="determinate"
      :md-value="currentTime * (100 / (limit / 1000))"
    ></md-progress-bar>
    <div class="image-wrapper">
      <div class="resting-banner" v-if="resting">Resting...</div>
      <img :src="pictures[pictureIndex]" v-else />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Sniff",
  data() {
    return {
      pictures: [
        "/images/cedar.jpg",
        "/images/cloves.jpg",
        "/images/oranges.jpg",
        "/images/strawberries.jpg",
      ],
      pictureIndex: -1,
      currentTime: 0,
      resting: false,
      limit: 10,
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  methods: {
    secTimer(length) {
      return setInterval(() => {
        this.currentTime += 1;
        this.$root.$emit("counter-changed", { time: this.currentTime, length });
      }, 1000);
    },
    longTimer(length, resolve, timerToClear) {
      this.limit = length;
      const timer = setTimeout(() => {
        this.currentTime = 0;
        this.resting = !this.resting;
        clearInterval(timerToClear);
        clearInterval(timer);
        resolve();
      }, length);
    },
  },
  async mounted() {
    this.$root.$emit("counter-status", true);
    for (let i = 0; i < this.pictures.length; i++) {
      await new Promise((r) => {
        this.pictureIndex = i;
        this.longTimer(10000, r, this.secTimer(10000));
      });
      await new Promise((r) => {
        this.pictureIndex = -1;
        this.longTimer(5000, r, this.secTimer(5000));
      });
      if (i === this.pictures.length - 1)
        this.$root.$emit("counter-status", false);
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
</style>
