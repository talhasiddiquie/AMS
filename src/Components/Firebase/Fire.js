import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
var firebaseConfig = {
  apiKey: "AIzaSyBMRhdPqETGv2eaL6XNYaqQTPLaX-g-jqw",
  authDomain: "di-pixels.firebaseapp.com",
  projectId: "di-pixels",
  storageBucket: "di-pixels.appspot.com",
  messagingSenderId: "998460503688",
  appId: "1:998460503688:web:d1e4f89e601b5a6c71d13d",
  measurementId: "G-DM35P4CFZV",
};
const fire = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
export { auth, db };
