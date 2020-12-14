<template>
  <div class="footer-bottom">
    <volt-header />
    <div class="login-container">
      <div class="login-panel">
        <form novalidate class="md-layout" @submit.prevent="signin">
          <md-card class="md-layout-item">
            <md-card-header>
              <div class="md-title">Log In to VOLT</div>
            </md-card-header>

            <md-card-content>
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field>
                    <label for="first-name">Study ID</label>
                    <md-input
                      name="first-name"
                      id="first-name"
                      autocomplete="given-name"
                      v-model="form.studyID"
                      :disabled="sending"
                    />
                    <span class="md-error" v-if="!v.form.studyID.required"
                      >The first name is required</span
                    >
                    <span class="md-error" v-else-if="!v.form.studyID.minlength"
                      >Invalid first name</span
                    >
                  </md-field>
                </div>
              </div>
            </md-card-content>
            <md-card-actions>
              <md-button
                type="submit"
                class="md-primary"
                :disabled="sending || !form.studyID"
                >Log In</md-button
              >
            </md-card-actions>
          </md-card>
        </form>
      </div>
    </div>
    <volt-footer />
  </div>
</template>

<script>
import VoltHeader from "./Header.vue";
import VoltFooter from "./Footer.vue";

export default {
  name: "login-view",
  components: { VoltHeader, VoltFooter },
  data() {
    return {
      sending: false,
      v: {
        form: {
          studyID: { minLength: 10, required: true },
        },
      },
      form: {
        studyID: "",
      },
    };
  },
  methods: {
    signin() {
      this.$store
        .dispatch("LOGIN", this.form.studyID)
        .then(() => this.$store.dispatch("CHECK_AUTH"))
        .then(() => this.$router.push("/"))
        .catch((err) => {
          // Show snackbar with error on sign in failure
          this.$root.$emit("show-snackbar", err.message);
        });
    },
  },
};
</script>

<style scoped>
.login-container {
  align-self: center;
}

.login-panel {
  max-width: 300px;
  margin: auto;
}
</style>
