import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  savedData: {},
  currentUser: undefined,
  sessionKey: undefined,
};

const getters = {
  currentUser(state) {
    return state.currentUser;
  },
  sessionKey(state) {
    return state.sessionKey;
  },
};

const actions = {
  SAVEDATA({ commit }, keyValue) {
    return commit("SET_KEY", keyValue);
  },
  SET_AUTH_ACTION({ commit }, acct) {
    return commit("SET_AUTH", acct);
  },
  SET_SESSION_KEY({ commit }, value) {
    return commit("SESSION_KEY", value);
  },
  LOGOUT({ commit }) {
    return commit("PURGE_AUTH");
  },
};

const mutations = {
  SET_AUTH(state, user) {
    state.currentUser = user;
  },
  SESSION_KEY(state, value) {
    if (!state.sessionKey) state.sessionKey = value;
  },
  SET_KEY(state, { key, value }) {
    if (!state.savedData[key]) state.savedData[key] = {};
    state.savedData[key] = Object.keys(value).length
      ? { ...state.savedData[key], ...value }
      : value;
  },
  PURGE_AUTH(state) {
    state.sessionKey = undefined;
    state.currentUser = undefined;
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
