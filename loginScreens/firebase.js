import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBh8cHyirmIiNaJtP-ERT-P7IlWZUxfYh8",
    authDomain: "fyxed-chat.firebaseapp.com",
    projectId: "fyxed-chat",
    storageBucket: "fyxed-chat.appspot.com",
    messagingSenderId: "276474668829",
    appId: "1:276474668829:web:03a9022ee9dcdbc2c8e3f4"
  };

  let app;
if (firebase.apps.length === 0) {
app = firebase.initializeApp(firebaseConfig);
} else {
app = firebase.app();
}
const db = app.firestore();
const auth = firebase.auth();
export { db, auth };