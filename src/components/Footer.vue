<template>
  <div class="container">
    <div class="toolbar">
      <footer class="footer">
        <div class="footer-widgets">
          <aside>
            <h2 class="footer-widget-title">
              Clinical Outcomes Research Office
            </h2>
            <a href="https://medicine.wustl.edu/"
              >Washington University School of Medicine</a
            >
            <p>660 S. Euclid Ave. Campus Box 8115</p>
            <p>St. Louis, MO, 63110-1093</p>
          </aside>
        </div>
        <div>
          <p class="footer-copyright">
            ©2020 Washington University in St. Louis
          </p>
        </div>
      </footer>
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

.footer p {
  margin: 5px 0px;
}

.footer a {
  color: white !important;
  text-decoration: underline;
}

.footer aside {
  margin-bottom: 1.8em;
}

.container {
  background-color: #3d3d3d;
  margin: 16px -16px -16px -16px;
}

.footer {
  line-height: 1;
  font-size: 14px;
  padding: 1em 0;
  color: #fff;
  -webkit-font-smoothing: antialiased;
}

.footer-widgets {
  border-bottom: 1px solid #6c7373;
  margin-bottom: 1em;
}

.footer-copyright {
  margin-bottom: 10px !important;
}

.footer-widget-title {
  font-size: 16px;
  font-family: "Libre Baskerville", "Times New Roman", serif;
  font-weight: 400;
  text-transform: none;
  margin: 10px 0px;
}
</style>
