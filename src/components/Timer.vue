<template>
  <div>{{ timerCount }} sec remaining</div>
</template>

<script>
const opts = { immediate: true };

export default {
  data() {
    return {
      timerCount: undefined,
      individualTimeout: undefined,
      unwatch: undefined,
    };
  },
  props: ["limit", "pause"],
  mounted() {
    this.timerCount = this.limit;
    this.unwatch = this.$watch("timerCount", this.watcher, opts);
  },
  methods: {
    watcher(value) {
      if (value > 0) {
        this.$emit("counter-value", this.limit - value);
        this.individualTimeout = setTimeout(() => {
          this.timerCount--;
        }, 1000);
      } else {
        this.$root.$emit("timer-done");
      }
    },
  },
  watch: {
    pause(val) {
      if (val) {
        this.unwatch();
        // Also clear the individual timer, which has a pending timeout which would reduce the count by 1 even after we remove the watcher
        clearTimeout(this.individualTimeout);
      } else {
        this.unwatch = this.$watch("timerCount", this.watcher, opts);
      }
    },
  },
};
</script>
