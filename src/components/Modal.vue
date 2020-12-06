<template>
  <md-dialog :md-active.sync="$parent.makingNote">
    <md-dialog-title>Jot something down...</md-dialog-title>
    <md-dialog-content>
      <md-field class="field">
        <md-textarea
          v-model="text"
          md-counter
          :maxlength="1500"
          id="volt"
          class="textarea"
        ></md-textarea>
      </md-field>
    </md-dialog-content>
    <md-dialog-actions>
      <md-button class="md-primary" @click="close">Close</md-button>
      <md-button class="md-primary" @click="close">Save</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
export default {
  data() {
    return {
      text: undefined,
    };
  },
  methods: {
    close() {
      // Reach into the child and call the correct method to close this dialog
      this.$children[0].closeDialog();
    },
  },
};
</script>

<style scoped lang="scss">
.md-dialog-content {
  padding-bottom: 0px;
}

.field {
  margin: 0px;
  height: 100%;
      overflow: hidden;
}
#volt.md-textarea {
  padding-top: 0px;
  max-height: unset;
  height: 100%;
  resize: none;
}

.volt-container {
  max-height: calc(100% - 30px);
}
</style>
