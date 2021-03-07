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
                <md-button
                  class="md-primary make-note-button"
                  @click="$root.$emit('modal', true)"
                  >Write a note</md-button
                >
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
                      Collect the jars with the four unique scents for the
                      current month.
                    </li>
                    <li>
                      To smell, uncap the appropriate jar, hold it to your nose,
                      and gently draw in air.
                    </li>
                    <li>
                      Smell each essential oil for 15 seconds, with a 30-second
                      rest between smells, once in the morning and once in the
                      evening<span
                        v-if="currentUser && currentUser.studyArm === 'photo'"
                        >, while looking at the photo of the scent</span
                      >.
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
                <span :class="`traffic-light ${complianceColor}`">●</span>
                <div class="compliance-text">
                  Daily trainings completed on {{ completedDays }} of the last
                  {{ totalDays }}
                  days
                </div>
              </div>
            </template>
          </volt-card>
        </div>
        <div class="vid">
          <volt-card>
            <template v-slot:content>
              <div class="video-container">
                <iframe
                  src="https://www.youtube.com/embed/2kQF-3Y-KLw"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
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
import moment from "moment";

export default {
  name: "colors",
  data() {
    return {
      imagesFetched: false,
      pictures: [],
      totalDays: undefined,
    };
  },
  components: { VoltHeader, VoltFooter, VoltCard, VoltPastNote },
  computed: {
    ...mapGetters(["currentUser", "notes", "completedDays"]),
    complianceColor() {
      if (!this.totalDays || !this.currentUser) return; // no color to begin w

      const thresholds = {
        90: "green",
        80: "orange",
        70: "red",
      };
      const limits = [70, 80, 90];
      const percentageComplete = (this.completedDays / this.totalDays) * 100;
      const matched = limits.find((l) => percentageComplete <= l);
      return thresholds[matched || 90]; // Return corresponding class name
    },
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
    this.totalDays =
      moment().diff(moment(this.currentUser.enrollmentDate), "days") + 1;

    this.pictures = await this.$store.dispatch("GET_IMAGES").catch(console.log);

    this.imagesFetched = true;
  },
  beforeDestroy() {
    this.$root.$emit("modal", false);
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
$colors: (
  "green": #0c0,
  "orange": #ffa500,
  "red": #ff0033,
);

// Past notes panel
.past-notes {
  .past-note-container {
    display: grid;
    grid-row-gap: 16px;
  }
  .make-note-button {
    float: right;
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
    color: white;
    user-select: none;
    -webkit-transform: translateZ(0);
    font-size: 60px;
    margin-right: 10px;
    line-height: 40px;
    margin-bottom: 5px;
  }
  @each $name, $hex in $colors {
    .#{$name} {
      color: #{$hex};
      text-shadow: 0px 0px 7px #{$hex};
      -webkit-text-shadow: 0px 0px 7px #{$hex};
    }
  }
  .circle-text {
    display: flex;
    align-items: center;
  }
  .compliance-text {
    font-size: 16px;
  }
}

//Standard available CSS to make youtube embeds be responsive
.video-container {
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 30px;
  height: 0;
  overflow: hidden;
  border-radius: 5px;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}

.video-container iframe,
.video-container object,
.video-container embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
