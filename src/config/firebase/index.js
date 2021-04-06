import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB3gitTgNxinl82AjsIe94EkE6Xp4-jXig",
  authDomain: "todo-react-ba7e4.firebaseapp.com",
  projectId: "todo-react-ba7e4",
  storageBucket: "todo-react-ba7e4.appspot.com",
  messagingSenderId: "767053953812",
  appId: "1:767053953812:web:3dae4d239a7ebbbe086001",
  measurementId: "G-6SQW5QF8SN",
};
// Initialize firebase
firebase.initializeApp(firebaseConfig);

// database
const database = firebase.database();

export default firebase;
