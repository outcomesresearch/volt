import firebase from "firebase";
import store from "../store/";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  projectId: process.env.VUE_APP_PROJECTID,
  databaseURL: process.env.VUE_APP_DB_URL,
};

export const initializedApp = firebase.initializeApp(firebaseConfig);

export const auth = {
  login: function(studyID) {
    // Return a new promise that only resolves after pulling user's profile from firebase after login
    return initializedApp
      .auth()
      .signInWithEmailAndPassword(studyID, "password");
  },
  logout: function() {
    return initializedApp.auth().signOut();
  },
  checkAuthentication: function() {
    return new Promise((res, rej) => {
      initializedApp.auth().onAuthStateChanged(async function(user) {
        if (user) {
          read(user.uid)
            .then((acct) => {
              store.dispatch("SET_AUTH_ACTION", { id: user.uid, ...acct });
              res();
            })
            .catch(rej);
        } else {
          rej();
        }
      });
    });
  },
};

export function read(key) {
  return new Promise((res, rej) => {
    initializedApp
      .database()
      .ref(key)
      .once("value", (data) => res(data.val()), rej);
  });
}

export const write = {
  /**
   * Write into firebase once use has autneticated themselves either thru firebase's stored authentication, or manual login.
   */
  authenticatedSelf: function() {
    return new Promise((res) => {
      if (store.getters.currentUser) {
        const ref = initializedApp.database().ref(store.getters.currentUser.id);
        const sessionKey = ref.child("sessions").push({
          studyID: store.getters.currentUser.id,
          loginTime: Date.now(),
        }).key;
        store.dispatch("SET_SESSION_KEY", sessionKey);
        ref.off();
        res();
      }
    });
  },

  startedSniffing: function() {
    if (store.getters.currentUser) {
      const ref = initializedApp.database().ref(store.getters.currentUser.id);
      const sessionKey = store.getters.sessionKey;
      ref
        .child("sessions")
        .child(sessionKey)
        .update({
          started: true,
        });
      ref.off();
    }
  },

  recordOdor: function(odor) {
    if (store.getters.currentUser) {
      const ref = initializedApp.database().ref(store.getters.currentUser.id);
      const sessionKey = store.getters.sessionKey;
      ref
        .child("sessions")
        .child(sessionKey)
        .child("odors")
        .update({ [odor]: Date.now() });
      ref.off();
    }
  },

  logout: function() {
    return new Promise((res) => {
      if (store.getters.currentUser) {
        const ref = initializedApp.database().ref(store.getters.currentUser.id);
        const sessionKey = store.getters.sessionKey;
        ref
          .child("sessions")
          .child(sessionKey)
          .update({ logoutTime: Date.now() });

        ref.off();
        res();
      }
    });
  },
};
