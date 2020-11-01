<template>
  <div class="colors-wrapper">
    <md-progress-bar
      md-mode="determinate"
      v-if="!done"
      :md-value="currentTime * (100 / (limit / 1000))"
    ></md-progress-bar>
    <div class="image-wrapper">
      <div class="resting-banner" v-if="resting">Resting...</div>
      <img :src="pictures[pictureIndex] && pictures[pictureIndex].src" v-else />
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
      pictures: [
        {
          name: "strawberries",
          src:
            "https://hips.hearstapps.com/clv.h-cdn.co/assets/15/22/2560x1728/gallery-1432664914-strawberry-facts1.jpg?resize=768:*",
        },
        {
          name: "cloves",
          src:
            "https://leavla.com/wp-content/uploads/2019/11/gewuerznelken-cloves-by-k-adobe-103298233.jpg",
        },
      ],
      pictureIndex: -1,
      currentTime: 0,
      resting: false,
      limit: 10,
      done: false,
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  methods: {
    secTimer(length) {
      this.$root.$emit("counter-changed", { time: this.currentTime, length });
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
    const pictureLength = 10000;
    const restLength = 5000;

    write.startedSniffing();

    this.$root.$emit("counter-status", true);
    for (let i = 0; i < this.pictures.length; i++) {
      await new Promise((r) => {
        this.pictureIndex = i;
        this.longTimer(pictureLength, r, this.secTimer(pictureLength));
      });
      await new Promise((r) => {
        this.pictureIndex = -1;
        this.longTimer(restLength, r, this.secTimer(restLength));
      });

      write.recordOdor(this.pictures[i].name);

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
