<template>
  <md-card class="card-container">
    <slot name="header" />
    <md-card-content
      class="card-content"
      :style="!hasPadding_ && { padding: '0px' }"
    >
      <slot name="content" />
    </md-card-content>
    <slot name="footer" />
  </md-card>
</template>

<script>
export default {
  data() {
    return {
      hasPadding_: this.hasPadding,
    };
  },
  props: {
    hasPadding: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped lang="scss">
.card-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0px;
  border-radius: 10px;
  overflow: hidden;
}

.card-content {
  flex-grow: 1;
  padding-bottom: 16px;
}
</style>
