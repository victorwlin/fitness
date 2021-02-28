import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAi9nlAMAlx9aGcVYcdHQyiQGnVVT9Ln4Q",
    authDomain: "weight-tracker-d90aa.firebaseapp.com",
    projectId: "weight-tracker-d90aa",
    storageBucket: "weight-tracker-d90aa.appspot.com",
    messagingSenderId: "922210635275",
    appId: "1:922210635275:web:bfc8c38c457c494f42810e",
    measurementId: "G-MRSRRH892T"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = event => {
  event.preventDefault();
  auth.signInWithPopup(provider);
};

export const firestore = firebase.firestore();