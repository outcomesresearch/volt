<template>
  <md-dialog
    :md-active.sync="$parent.modalShowing"
    @md-opened="$root.$emit('modal', true)"
    @md-closed="$root.$emit('modal', false)"
  >
    <md-dialog-title>Jot something down...</md-dialog-title>
    <md-dialog-content>
      <md-field class="field">
        <md-textarea
          v-focus
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
      <div>
        <md-button class="md-primary hidden-spinner" v-show="inProgress">
          <md-progress-spinner
            class="my-spin"
            :md-diameter="20"
            :md-stroke="3"
            md-mode="indeterminate"
          ></md-progress-spinner>
        </md-button>
        <md-button
          class="md-primary"
          v-show="!inProgress"
          @click="save"
          :disabled="!text || !text.trim()"
          >Save</md-button
        >
      </div>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
export default {
  data() {
    return {
      text: undefined,
      inProgress: false,
    };
  },
  methods: {
    close() {
      // Reach into the child and call the correct method to close this dialog
      this.inProgress = false;
      this.$children[0].closeDialog();
    },
    async save() {
      this.inProgress = true;
      this.$store
        .dispatch("SAVE_NOTE", this.text.trim())
        .then(() => {
          this.text = undefined;
          this.close();
          this.$root.$emit("show-snackbar", "notes.saved");
        })
        .catch((e) => {
          this.$root.$emit("show-snackbar", e.message);
          this.inProgress = false;
        });
    },
  },
};
</script>

<style scoped lang="scss">
.md-dialog-content {
  padding-bottom: 0px;
  height: 100%;
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

.md-primary {
  min-width: 75px !important;
}

.hidden-spinner {
  margin-left: 8px !important;
}

.full {
  color: white !important;
  &.my-button {
    position: relative;
  }

  &.my-spin {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -10px;
    margin-left: -10px;
  }
}
</style>
