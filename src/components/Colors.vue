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
              v-if="notes && sortedNotes.length"
              class="past-note-container"
              :key="sortedNotes.length"
            >
              <volt-past-note
                :note="note"
                v-for="note in sortedNotes"
                :key="note.recordedAt"
              />
            </div>
            <div v-if="notes && !sortedNotes.length" class="notes-placeholder">
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
            <template v-slot:header>
              <md-card-header>
                <div class="md-title">
                  <strong>Start Training</strong>
                </div>
              </md-card-header>
            </template>
            <template v-slot:content>
              <div class="instructions">
                <div>
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
            <template v-slot:content
              ><div class="circle-text">
                <span class="traffic-light">●</span>
                <div class="compliance-text">
                  Both trainings completed on 30 of the last 50 days
                </div>
              </div>
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

export default {
  name: "colors",
  data() {
    return {
      imagesFetched: false,
      pictures: [],
    };
  },
  components: { VoltHeader, VoltFooter, VoltCard, VoltPastNote },
  computed: {
    ...mapGetters(["currentUser", "notes"]),
    sortedNotes() {
      const keys = Object.keys(this.notes);
      return keys.length
        ? keys
            .map((k) => this.notes[k])
            .sort((a, b) => new Date(b.recordedTime) - new Date(a.recordedTime))
        : [];
    },
  },
  async created() {
    this.pictures = await this.$store.dispatch("GET_IMAGES");
    this.imagesFetched = true;
  },
  methods: {
    async startExercise() {
      const { pictures } = this;
      this.$router.push({ name: "sniff-exercise", params: { pictures } });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/App.scss";

$radius-small: 3px;
$instruction-color: #2b8282;
$green: #0c0;
$red: #ff0033;
$orange: #ffa500;

// Past notes panel
.past-notes {
  .past-note-container {
    display: grid;
    grid-row-gap: 16px;
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
}

// Start training teal panel
.begin-training {
  .teal-white {
    background-color: $instruction-color;
    color: white;
  }
  // Special style for this header
  .md-card-header {
    @extend .teal-white;
  }
  // Teal instruction panel
  .instructions {
    @extend .teal-white;
    padding: 0px 16px 16px 16px;
    font-size: 18px;
    ul {
      padding-inline-start: 20px;
      margin-top: 0px;
    }
    li:not(:last-child) {
      margin-bottom: 10px;
    }
    .start-button {
      margin: auto;
      max-width: min-content;
      border-radius: $radius-small;
      background: rgb(240, 240, 240);
      button {
        margin: 0px;
        color: white !important;
        background-color: lighten($instruction-color, 3);
      }
    }
  }
}

.panel-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  margin-top: 0px;
}

.right-column {
  display: flex;
  flex-direction: column;

  & > div:not(:last-child) {
    margin-bottom: 16px;
  }
}

.md-title {
  margin-top: 0px !important;
}

// Compliance readout
.compliance {
  .traffic-light {
    color: $green;
    text-shadow: 0px 0px 7px $green;
    -webkit-transform: translateZ(0);
    -webkit-text-shadow: 0px 0px 7px $green;
    font-size: 60px;
    margin-right: 10px;
    line-height: 40px;
    margin-bottom: 5px;
  }
  .circle-text {
    display: flex;
    align-items: center;
  }
  .compliance-text {
    font-size: 16px;
  }
}
</style>
