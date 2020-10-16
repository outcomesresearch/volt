<template>
  <div class="page-container">
    <md-app
      md-waterfall
      md-mode="fixed"
      style="min-height: 100vh; border: none"
    >
      <md-app-toolbar class="md-primary">
        <h3 class="md-title" style="flex: 1">Welcome, currentUser</h3>
        <md-button @click="logout">Log Out</md-button>
      </md-app-toolbar>
      <md-app-content>
        <div>
          INSTRUCTIONS: Please prepare the four odor oils by dropping them on a
          cotton ball and placing them in their respectively labeled jars. You
          will sniff each scent for 10 seconds, twice daily, once in the morning
          and once in evening, while looking at the photo of the odor. You will
          take 30 seconds of rest between each scent. When you are ready to
          begin, please click START
        </div>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import FirebaseService from "@/services/firebase.service.js";

export default {
  name: "colors",
  methods: {
    logout() {
      FirebaseService.auth()
        .signOut()
        .then(() => {
          this.$router.push("/").catch((r) => console.log(r.message));
        });
    },
  },
};
</script>

<style scoped lang="scss">
.md-app {
  max-height: 400px;
  border: 1px solid rgba(#000, 0.12);
}
</style>
