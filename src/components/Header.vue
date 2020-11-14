<template>
  <div class="toolbar">
    <span class="red-banner"
      >Department of Otolaryngology - Clinical Outcomes Research Office</span
    >
    <h1>Smell Training Clinical Trial</h1>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapGetters(["currentUser"]),
  },
  methods: {
    startExercise() {
      this.$router.push("/sniff");
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/App.scss";

$radius-small: 3px;

.red-banner {
  color: #d01c29;
  font-weight: bold;
  text-transform: uppercase;
}

h1 {
  line-height: 1.3;
  font-family: "Libre Baskerville", "Times New Roman", serif;
}
</style>
