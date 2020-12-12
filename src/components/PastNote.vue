<template>
  <md-card class="past-note">
    <md-card-content class="card-content">
      {{ $attrs.note.content }}</md-card-content
    >
    <md-card-actions
      ><div class="datestamp">
        {{
          new Date($attrs.note.recordedTime).toLocaleString(undefined, {
            day: "numeric",
            month: "short",
            hour: "numeric",
            minute: "2-digit",
          })
        }}
      </div></md-card-actions
    ></md-card
  >
</template>

<style scoped lang="scss">
.past-note {
  margin: 0px;
  overflow: scroll;
  box-shadow: none;
  background-color: rgba(0, 0, 0, 0.05) !important;
  color: rgb(70, 70, 70) !important;

  & .md-card-content {
    height: unset;
    padding-bottom: 0px;
  }
}

.datestamp {
  font-style: oblique;
  color: grey;
  margin-right: 5px;
}
</style>
