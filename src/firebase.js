import firebase from "firebase/app";
import "firebase/auth";
import "firebase/app";
import "firebase/database";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyCwpQ5pM8vnFO5azPMJDz1HREDZrEjgtL4",
  authDomain: "m-city-ed2c7.firebaseapp.com",
  databaseURL: "https://m-city-ed2c7.firebaseio.com",
  projectId: "m-city-ed2c7",
  storageBucket: "m-city-ed2c7.appspot.com",
  messagingSenderId: "116642977286"
};
firebase.initializeApp(config);

const firebaseDB = firebase.database();
/* firebaseDB
  .ref("matches")
  .once("value")
  .then(snapshot => console.log(snapshot.val())); */
const firebaseMatches = firebaseDB.ref("matches");
const firebasePromotions = firebaseDB.ref("promotions");
const firebaseTeams = firebaseDB.ref("teams");
const firebasePlayers = firebaseDB.ref("players");

export {
  firebaseDB,
  firebase,
  firebaseMatches,
  firebasePromotions,
  firebaseTeams,
  firebasePlayers
};
