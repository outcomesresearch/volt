<template>
  <div>
    <div>Email: <input placeholder="piccirilloj1@gmail.com" /></div>
    <div>Password: <input placeholder="password" /></div>
    <button @click="signin">Sign In</button>
  </div>
</template>

<script>
import FirebaseService from "@/services/firebase.service.js";

export default {
  name: "login-view",
  methods: {
    signin() {
      const router = this.$router;
      FirebaseService.auth()
        .signInWithEmailAndPassword("piccirilloj1@gmail.com", "password")
        .then((result) => {
          console.log(result);
          return router.push("/");
        })
        .then((err) => {
          console.log(err);
        });
    },
  },
};
</script>
