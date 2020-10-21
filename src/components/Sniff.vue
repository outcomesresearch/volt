<template>
  <div class="colors-wrapper">
    <md-progress-bar
      md-mode="determinate"
      :md-value="$root.$children[0].counter * 10"
    ></md-progress-bar>
    <div class="image-wrapper">
      <img :src="currentPicture" />
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
      currentPicture: "",
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  async mounted() {
    this.$root.$on("counter-changed", ({ updatedValue, resolve }) => {
      if (updatedValue === 10) {
        this.$root.$emit("counter-ended");
        resolve();
      }
    });

    for (let i = 0; i < this.pictures.length; i++) {
      await new Promise((resolve) => {
        this.$root.$emit("counter-started", { resolve });
        this.currentPicture = this.pictures[i];
      });
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
</style>
