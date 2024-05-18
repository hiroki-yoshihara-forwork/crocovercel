import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD3G42AHH7dDMSTQmd22v6OQAWVLMtuslk",
  authDomain: "study-cloud-database.firebaseapp.com",
  projectId: "study-cloud-database",
  storageBucket: "study-cloud-database.appspot.com",
  messagingSenderId: "103234919879",
  appId: "1:103234919879:web:81477abfacbb1a8c688de2",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export { db };