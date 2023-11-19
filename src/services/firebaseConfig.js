import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAEiXSFs8EvjS-57UGviOQjcN7MvvSPSfI",
  authDomain: "cn-data-marking.firebaseapp.com",
  projectId: "cn-data-marking",
  storageBucket: "cn-data-marking.appspot.com",
  messagingSenderId: "613942107572",
  appId: "1:613942107572:web:4288db87473c0515d5e6e1",
  measurementId: "G-DV6SFM256Q"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export { firebase };
