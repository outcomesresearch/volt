import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  projectId: process.env.VUE_APP_PROJECTID,
  databaseURL: process.env.VUE_APP_DB_URL,
};

const service = firebase.initializeApp(firebaseConfig);

export default service;
