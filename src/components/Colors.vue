<template>
  <div>
    <div>
      INSTRUCTIONS: Please prepare the four odor oils by dropping them on a
      cotton ball and placing them in their respectively labeled jars. You will
      sniff each scent for 10 seconds, twice daily, once in the morning and once
      in evening, while looking at the photo of the odor. You will take 30
      seconds of rest between each scent. When you are ready to begin, please
      click START
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
};
</script>

<style scoped lang="scss"></style>
