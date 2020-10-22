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
        Data recorded for this session:
        <pre>{{ $store.state.savedData }}</pre>
      </div>
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
      return setInterval(() => {
        this.currentTime += 1;
        this.$root.$emit("counter-changed", { time: this.currentTime, length });
      }, 1000);
    },
    longTimer(length, resolve, timerToClear, picIndex) {
      this.limit = length;
      const timer = setTimeout(() => {
        this.currentTime = 0;
        this.resting = !this.resting;
        if (picIndex > -1) {
          this.$store.dispatch("SAVEDATA", {
            key: "odors",
            value: { [this.pictures[picIndex].name]: new Date() },
          });
        }
        clearInterval(timerToClear);
        clearInterval(timer);
        resolve();
      }, length);
    },
  },
  async mounted() {
    console.log(this.$store.state.savedData);
    this.$root.$emit("counter-status", true);
    this.$store.dispatch("SAVEDATA", {
      key: "started",
      value: true,
    });
    for (let i = 0; i < this.pictures.length; i++) {
      await new Promise((r) => {
        this.pictureIndex = i;
        this.longTimer(10000, r, this.secTimer(10000), i);
      });
      await new Promise((r) => {
        this.pictureIndex = -1;
        this.longTimer(5000, r, this.secTimer(5000));
      });
      if (i === this.pictures.length - 1) {
        this.$root.$emit("counter-status", false);
        this.done = true;
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
