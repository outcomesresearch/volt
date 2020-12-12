<template>
  <div class="footer-bottom">
    <volt-header />
    <div class="toolbar panel-container">
      <div class="past-notes">
        <volt-card>
          <template v-slot:header>
            <md-card-header>
              <div class="md-title">
                <strong>Past Notes</strong>
              </div>
            </md-card-header>
          </template>
          <template v-slot:content>
            <div
              v-if="notes && Object.keys(notes).length"
              class="past-note-container"
            >
              <volt-past-note
                :note="note"
                v-for="note in notes"
                :key="note.recordedAt"
              />
            </div>
            <div
              v-if="notes && !Object.keys(notes).length"
              class="notes-placeholder"
            >
              <div>No notes yet!</div>
            </div>
          </template>
          <template v-slot:footer>
            <md-card-actions>
              <md-button class="md-primary" @click="$root.$emit('making-note')"
                >Write a note</md-button
              >
            </md-card-actions>
          </template>
        </volt-card>
      </div>
      <div class="right-column">
        <div class="begin-training">
          <volt-card :hasPadding="false">
            <template v-slot:content>
              <div class="instruction-panel">
                <div>
                  <div class="instruction-title">Start Training</div>
                  <ul>
                    <li>
                      Prepare the four odor oils by dropping them on a cotton
                      ball and placing them in their respectively labeled jars.
                    </li>
                    <li>
                      Sniff each scent for 10 seconds, twice daily, once in the
                      morning and once in evening<span
                        v-if="currentUser && currentUser.studyArm === 'photo'"
                        >, while looking at the photo of the odor</span
                      >.
                    </li>
                    <li>
                      Take 30 seconds of rest between each scent.
                    </li>
                  </ul>
                </div>
                <div class="start-button md-primary expanded">
                  <md-button @click="startExercise" :disabled="!imagesFetched"
                    >Start</md-button
                  >
                </div>
              </div>
            </template>
          </volt-card>
        </div>
        <div class="compliance">
          <volt-card>
            <template v-slot:header>
              <md-card-header>
                <div class="md-title">
                  <strong>Compliance</strong>
                </div>
              </md-card-header>
            </template>
          </volt-card>
        </div>
      </div>
    </div>

    <volt-footer />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VoltHeader from "./Header.vue";
import VoltFooter from "./Footer.vue";
import VoltCard from "./Card.vue";
import VoltPastNote from "./PastNote.vue";
import { read, initializedApp } from "@/services/firebase.service.js";

export default {
  name: "colors",
  data() {
    return {
      imagesFetched: false,
      notes: undefined,
      pictures: [],
      notesRef: undefined,
    };
  },
  components: { VoltHeader, VoltFooter, VoltCard, VoltPastNote },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  async created() {
    this.pictures = await read.getImages();
    this.imagesFetched = true;

    // Get firebase reference to notes child of currentUser
    this.notesRef = initializedApp
      .database()
      .ref(this.currentUser.id)
      .child("notes");

    // Attach a callback that fires when value changes.  We update the currentUser in the store, including the new notes.
    this.notesRef.on("value", (data) => {
      this.$store.dispatch("SET_AUTH_ACTION", {
        ...this.currentUser,
        notes: data.val(),
      });
    });
  },
  mounted() {
    this.notes = this.currentUser.notes || [];
  },
  methods: {
    async startExercise() {
      const { pictures } = this;
      this.$router.push({ name: "sniff-exercise", params: { pictures } });
    },
  },
  beforeDestroy() {
    // Remove listeners on the firebase reference to notes
    this.notesRef.off();
  },
  watch: {
    // Watch for changes in currentUser (if notes has changed).  If so, assign this View's notes property accordingly
    currentUser: {
      handler(newUser) {
        this.notes = newUser.notes || [];
      },
      deep: true,
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/App.scss";

$radius-small: 3px;

.start-button {
  margin: auto;
  max-width: min-content;
  border-radius: $radius-small;
}

.start-button button {
  background-color: rgba(0, 0, 0, 0.075);
}

.panel-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 16px;
  grid-row-gap: 16px;
}

.right-column {
  display: flex;
  flex-direction: column;

  & > div:not(:last-child) {
    margin-bottom: 16px;
  }
}

.notes-placeholder {
  display: flex;
  font-size: 30px;
  font-weight: 800;
  color: lightgrey;
  align-items: center;
  height: 100%;
  justify-content: center;
}

.past-note-container {
  display: grid;
  grid-row-gap: 16px;
  max-height: 800px;
  overflow: scroll;
}

.instruction-panel {
  background-color: #2b8282;
  color: white;
  border-radius: $radius-small;
  padding: 16px;
  height: 100%;
  font-size: 18px;
}

.instruction-panel ul {
  padding-inline-start: 20px;
}

li:not(:last-child) {
  margin-bottom: 10px;
}

.instruction-title {
  font-style: italic;
  font-weight: bold;
  text-align: center;
}

.md-title {
  margin-top: 0px !important;
}
</style>
