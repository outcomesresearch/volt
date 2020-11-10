<template>
  <div>
    <div class="toolbar">
      <span class="red-banner"
        >Department of Otolaryngology - Clinical Outcomes Research Office</span
      >
      <h1>Smell Training Clinical Trial</h1>
    </div>
    <div class="full-bleed-hero">
      <!-- <img src="@/assets/hello-cellphone.jpg" /> -->
    </div>
    <div class="instruction-panel">
      <div class="instructions-title">INSTRUCTIONS</div>
      <ul>
        <li>
          Prepare the four odor oils by dropping them on a cotton ball and
          placing them in their respectively labeled jars.
        </li>
        <li>
          Sniff each scent for 10 seconds, twice daily, once in the morning and
          once in evening, while looking at the photo of the odor.
        </li>
        <li>
          Take 30 seconds of rest between each scent.
        </li>
      </ul>
    </div>
    <div class="start-button md-primary">
      <md-button @click="startExercise">Start</md-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "colors",
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

.start-button {
  margin: auto;
  max-width: min-content;
  border-radius: $radius-small;
}

.start-button button {
  background-color: rgba(0, 0, 0, 0.075);
}

.toolbar {
  max-width: 71em;
  min-height: 30px;
  margin: auto;
}
.red-banner {
  color: #d01c29;
  font-weight: bold;
  text-transform: uppercase;
}

h1 {
  line-height: 1;
  font-family: "Libre Baskerville", "Times New Roman", serif;
}

.full-bleed-hero {
  height: 300px;
  overflow: hidden;
  margin: 0px -16px;
  background-image: url("../assets/hello-cellphone.jpg");
  background-position: center;
  background-size: cover;
}

.instruction-panel {
  background-color: #2b8282;
  color: white;
  padding: 20px 20px 20px 0px;
  margin: 10px 40px;
  border-radius: $radius-small;
  margin-left: auto;
  margin-right: auto;
  max-width: 600px;
  font-size: 18px;
}

li:not(:last-child) {
  margin-bottom: 10px;
}

.instructions-title {
  font-style: italic;
  font-weight: bold;
  text-align: center;
}
</style>
