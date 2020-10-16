<template>
  <div class="hello">
    <md-button @click="logout">Log Out</md-button>
    <div>You Are Logged In. This is the colors Page!</div>
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

<style scoped lang="scss"></style>
