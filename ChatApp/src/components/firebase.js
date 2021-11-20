import firebase from "firebase/app";
import "firebase/auth";

export const auth= firebase.initializeApp({


        apiKey: "AIzaSyBEcrYBprikrhLXrhbMtW3r1ZI6FsPoSU8",
  authDomain: "chatapp-b401c.firebaseapp.com",
  projectId: "chatapp-b401c",
  storageBucket: "chatapp-b401c.appspot.com",
  messagingSenderId: "607870089358",
  appId: "1:607870089358:web:ba78fb4894c51c6197b1df"
}).auth();