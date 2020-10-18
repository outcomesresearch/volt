<template>
  <div class="colors-wrapper">
    <md-progress-bar
      md-mode="determinate"
      :md-value="amount * 10"
    ></md-progress-bar>
    <div class="image-wrapper"><img :src="currentPicture" /></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Sniff",
  data() {
    return {
      amount: 0,
      pictures: [
        "/images/cedar.jpg",
        "/images/cloves.jpg",
        "/images/oranges.jpg",
        "/images/strawberries.jpg",
      ],
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
    currentPicture() {
      return this.pictures[this.amount % 4];
    },
  },
  mounted() {
    this.$root.$emit("counter-started");
    this.$root.$on("counter-changed", (newVal) => {
      this.amount = newVal;
    });
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
