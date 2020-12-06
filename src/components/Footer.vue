<template>
  <div class="container">
    <div class="toolbar">
      <footer class="footer">
        <aside>
          <h2>Clinical Outcomes Research Office</h2>
          <a href="https://medicine.wustl.edu/"
            >Washington University School of Medicine</a
          >
          <p>660 S. Euclid Ave. Campus Box 8115</p>
          <p>St. Louis, MO, 63110-1093</p>
        </aside>
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

.footer {
  line-height: 1;
  font-size: 14px;
  padding: 1em 0;
  color: #fff;
  -webkit-font-smoothing: antialiased;

  & > aside {
    margin: 10px 0px;
    & a {
      color: white !important;
      text-decoration: underline;
    }
    & > h2 {
      font-size: 16px;
      font-family: "Libre Baskerville", "Times New Roman", serif;
      font-weight: 400;
      text-transform: none;
      margin: 0px 0px 10px 0px;
    }
    & > p:last-of-type {
      margin-bottom: 0px;
    }
    & > p {
      margin: 5px 0px;
    }
  }
}

.container {
  background-color: #3d3d3d;
  margin: 16px -16px -16px -16px;
}
</style>
