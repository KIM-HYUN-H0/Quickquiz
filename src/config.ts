import firebase from "firebase";

const config = {
  apiKey: "AIzaSyAbFrG-B-PTzCkvBdNkT4klKOUp5wQceRM",
  authDomain: "quickquiz-579c0.firebaseapp.com",
  databaseURL: "https://quickquiz-579c0.firebaseio.com",
  projectId: "quickquiz-579c0",
  storageBucket: "quickquiz-579c0.appspot.com",
  messagingSenderId: "423345237620",
  appId: "1:423345237620:web:1e06359bbf06e77e606b21",
  measurementId: "G-XYY9FWXH2V",
};

firebase.initializeApp(config);
export const db = firebase.firestore();
export const dbs = firebase.storage().ref();
export const auth = firebase.auth();
