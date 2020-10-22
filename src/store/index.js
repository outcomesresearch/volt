import Vue from "vue";
import Vuex from "vuex";
import FirebaseService from "../services/firebase.service.js";

Vue.use(Vuex);

const state = {
  savedData: {},
  currentUser: undefined,
};

const getters = {
  currentUser(state) {
    return state.currentUser;
  },
};

const actions = {
  SAVEDATA({ commit }, keyValue) {
    return commit("SET_KEY", keyValue);
  },
  LOGIN({ commit }, user) {
    return FirebaseService.auth()
      .signInWithEmailAndPassword(user.studyID, "password")
      .then((result) => {
        // Return a new promise that only resolves after pulling user's profile from firebase after login.  This happens after we recieve a snapshot
        return new Promise((rs) => {
          FirebaseService.database()
            .ref()
            .on("value", function(data) {
              const acct = data.val().notes.users[result.user.uid];
              commit("SET_AUTH", acct);
              rs(acct);
            });
        });
      });
  },
  LOGOUT(context) {
    return FirebaseService.auth()
      .signOut()
      .then((result) => {
        context.commit("PURGE_AUTH");
        return result;
      });
  },
};

const mutations = {
  SET_AUTH(state, user) {
    state.currentUser = user;
  },
  SET_KEY(state, { key, value }) {
    if (!state.savedData[key]) state.savedData[key] = {};
    state.savedData[key] = Object.keys(value).length
      ? { ...state.savedData[key], ...value }
      : value;
  },
  PURGE_AUTH(state) {
    state.currentUser = undefined;
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
