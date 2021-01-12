import Vue from "vue";
import Vuex from "vuex";
import root from "../main";
import picturesPerOdor from "../assets/picturesPerOdor.json";
import { initializedApp } from "../services/firebase.service";

const getDate = () => {
  return new Date().toString();
};

const getRand = (odor) => {
  const total = picturesPerOdor[odor];
  return ((Math.random() * total) << 0) + 1;
};

function writeChild(path, obj, action) {
  action = action || "update";
  const ref = initializedApp.database().ref(state.currentUser.id);
  let pointer = ref;
  path.split(".").forEach((k) => (pointer = pointer.child(k)));
  const response = pointer[action](obj);
  ref.off();
  return response;
}

function catchHandler(promise) {
  return promise.catch((e) => {
    e.message += ` during: ${this.purpose}`;
    throw e;
  });
}

Vue.use(Vuex);

const state = {
  savedData: {},
  currentUser: undefined,
  sessionKey: undefined,
  notes: [],
  completedDays: 0,
};

const getters = {
  currentUser(state) {
    return state.currentUser;
  },
  sessionKey(state) {
    return state.sessionKey;
  },
  notes(state) {
    return state.notes;
  },
  completedDays(state) {
    return state.completedDays;
  },
};

const actions = {
  SAVE_COMPLETEDDAY({ commit }) {
    const purpose = "User completed two trainings for the day";
    const c = catchHandler.bind({ purpose });
    if (state.currentUser) {
      const completed = state.completedDays;
      const newVal = completed ? completed + 1 : 1;
      return c(writeChild("completedDays", newVal, "set")).then((r) => {
        console.log("new value", r, newVal);
        commit("WRITE_COMPLETEDDAY", newVal);
      });
    }
  },
  /**
   * Save in Firebase that a user completed a smell-rest cycle for an odor during a given session
   */
  SAVE_ODOR(_, odor) {
    const purpose = "Picture, resting completed for specific odor";
    const c = catchHandler.bind({ purpose });
    if (state.currentUser) {
      return c(
        writeChild(`sessions.${state.sessionKey}.odors`, { [odor]: getDate() })
      );
    }
  },
  /**
   * Save in Firebase that a user completed a sesion (smelled+rested for all odors listed in firebase account)
   */
  SAVE_SESSIONEND() {
    const purpose = "Training session (all odors) ended successfully";
    const c = catchHandler.bind({ purpose });
    if (state.currentUser) {
      return c(
        writeChild(`sessions.${state.sessionKey}`, { endedTime: getDate() })
      );
    }
  },
  /**
   * Save note to firebase, update store for reactivity in current user session
   */
  SAVE_NOTE({ commit }, content) {
    const purpose = "User records note";
    const c = catchHandler.bind({ purpose });
    if (state.currentUser) {
      const recordedTime = getDate();
      const newNote = { recordedTime, content };
      return c(writeChild("notes", newNote, "push")).then((r) => {
        // If no error thrown, continue to update our local notes
        commit("WRITE_NOTE", { newNote, key: r.key });
        return r;
      });
    }
  },
  /**
   * Record the begininng of a sniff-training session.  User has already authenticated in Firebase by this point
   */
  BEGIN_TRAINING({ commit }) {
    const purpose = "Authenticated user begins training session";
    const c = catchHandler.bind({ purpose });
    return new Promise((res, rej) => {
      if (state.currentUser) {
        const startedTime = getDate();
        const obj = { studyID: state.currentUser.id, startedTime };
        c(writeChild(`sessions`, obj, "push"))
          .then((resp) => {
            commit("SESSION_KEY", resp.key);
            res();
          })
          .catch((e) => {
            root.$root.$emit("show-snackbar", e.message);
            rej(e);
          });
      }
    });
  },
  /**
   * Check for authentication state, if valid authentication state, then fetch the corresonding user's account in firebase.  Else reject the promise
   */
  CHECK_AUTH({ commit }) {
    return new Promise((res, rej) => {
      initializedApp.auth().onAuthStateChanged(async function(user) {
        const success = (data) => {
          commit("SET_AUTH", { id: user.uid, ...data.val() });
          res();
        };

        // If user found, fetch profile and resolve w that.  Else reject
        return user
          ? initializedApp
              .database()
              .ref(user.uid)
              .once("value", success, rej)
          : rej();
      });
    });
  },
  /**
   * Fetch odor images from firebase storage that correspond to this user's enrollment
   */
  async GET_IMAGES() {
    const user = state.currentUser;
    if (!user.odors)
      throw new Error(
        `User ${user.id} has no odors listed in Firebase profile`
      );

    const odorNames = Object.keys(user.odors).map((name) => ({ name }));
    if (!user.studyArm || user.studyArm !== "photo") return odorNames;

    // Get random image from any number of <odor>_<number>.jpg named files in Google Cloud storage
    const storage = initializedApp.storage();
    for (let i = 0; i < odorNames.length; i++) {
      const url = process.env.VUE_APP_STORAGE_URL;
      const name = odorNames[i].name.replace(/ /g, "").toLowerCase();
      const imgPath = `${url}/${name}-${getRand(name)}.jpg`;
      odorNames[i].src = await storage.refFromURL(imgPath).getDownloadURL();
    }
    return odorNames;
  },
  /**
   * End the user's firebase authentication, then clear user info from store
   */
  LOGOUT({ commit }) {
    const purpose = "User logs out";
    const c = catchHandler.bind({ purpose });
    return c(initializedApp.auth().signOut()).then((r) => {
      commit("PURGE_AUTH");
      return r;
    });
  },
  /**
   * Sign user in with studyID and hardcoded password per user management specifications (only use studyID to login)
   */
  LOGIN(_, studyID) {
    const purpose = "User logs in with studyID";
    const c = catchHandler.bind({ purpose });
    return c(
      initializedApp
        .auth()
        .signInWithEmailAndPassword(
          `${studyID}@outcomesresearch.github.io`,
          process.env.VUE_APP_FB_PASSWORD
        )
    );
  },
};

const mutations = {
  SET_AUTH(state, user) {
    state.currentUser = user;
    state.notes = user.notes || [];
    state.completedDays = user.completedDays || 0;
  },
  WRITE_NOTE(state, { newNote, key }) {
    Vue.set(state.notes, key, newNote);
  },
  WRITE_COMPLETEDDAY(state, newVal) {
    state.completedDays = newVal;
  },
  SESSION_KEY(state, value) {
    state.sessionKey = value;
  },
  PURGE_AUTH(state) {
    state.sessionKey = undefined;
    state.currentUser = undefined;
    state.notes = [];
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
