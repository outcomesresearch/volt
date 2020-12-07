import firebase from "firebase";
import store from "../store/";
import picturesPerOdor from "../assets/picturesPerOdor.json";

const getDate = () => {
  return new Date().toString();
};

const getRand = (odor) => {
  const total = picturesPerOdor[odor];
  return ((Math.random() * total) << 0) + 1;
};

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  projectId: process.env.VUE_APP_PROJECTID,
  databaseURL: process.env.VUE_APP_DB_URL,
  storageBucket: process.env.VUE_APP_STORAGE_URL,
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
          read
            .simpleRead(user.uid)
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

export const read = {
  async getImages() {
    const user = store.getters.currentUser;
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
  simpleRead(key) {
    return new Promise((res, rej) => {
      initializedApp
        .database()
        .ref(key)
        .once("value", (data) => res(data.val()), rej);
    });
  },
};

function writeChild(path, obj, action) {
  action = action || "update";
  const ref = initializedApp.database().ref(store.getters.currentUser.id);
  let pointer = ref;
  path.split(".").forEach((k) => (pointer = pointer.child(k)));
  const response = pointer[action](obj);
  ref.off();
  return response;
}

export const write = {
  /**
   * Write into firebase once use has autneticated themselves either thru firebase's stored authentication, or manual login.
   */
  authenticatedSelf: function() {
    return new Promise((res) => {
      if (store.getters.currentUser) {
        const startedTime = getDate();
        const obj = { studyID: store.getters.currentUser.id, startedTime };
        const sessionKey = writeChild(`sessions`, obj, "push").key;
        store.dispatch("SET_SESSION_KEY", sessionKey);
        res();
      }
    });
  },

  recordOdor: function(odor) {
    if (store.getters.currentUser) {
      const sessionKey = store.getters.sessionKey;
      writeChild(`sessions.${sessionKey}.odors`, { [odor]: getDate() });
    }
  },

  recordSessionEnd: function() {
    if (store.getters.currentUser) {
      const sessionKey = store.getters.sessionKey;
      const endedTime = getDate();
      writeChild(`sessions.${sessionKey}`, { endedTime });
    }
  },

  recordNote: function(content) {
    if (store.getters.currentUser) {
      const recordedTime = getDate();
      writeChild("notes", { recordedTime, content }, "push");
    }
  },
};
