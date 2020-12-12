<template>
  <div>
    <span>{{ formattedString }}</span>
    <span v-show="text && text.length > maxChars">
      &nbsp;<a
        href="#"
        v-show="!isReadMore"
        v-on:click="triggerReadMore($event, true)"
        >(more)</a
      >
      &nbsp;<a
        href="#"
        v-show="isReadMore"
        v-on:click="triggerReadMore($event, false)"
        >(less)</a
      >
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isReadMore: false,
      text: this.$slots.default[0].text.trim(),
      maxChars: 200,
    };
  },
  computed: {
    formattedString() {
      let val_container = this.text;
      if (!this.isReadMore && this.text.length > this.maxChars) {
        val_container = val_container.substring(0, this.maxChars) + "...";
      }
      return val_container;
    },
  },
  methods: {
    triggerReadMore(e, b) {
      e.preventDefault();
      this.isReadMore = b;
    },
  },
};
</script>
<style scoped lang="scss">
a {
  color: grey !important;
  font-style: oblique;
}
</style>
