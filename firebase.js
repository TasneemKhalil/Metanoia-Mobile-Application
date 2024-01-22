
import { initializeApp , getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyApXBjaFjUMt9U_h9Zz6Nb_LsbIJBlE_p0",
  authDomain: "metanoia-final-try.firebaseapp.com",
  projectId: "metanoia-final-try",
  storageBucket: "metanoia-final-try.appspot.com",
  messagingSenderId: "1070124075239",
  appId: "1:1070124075239:web:324f89cbbbdddac5d37a42"
};

// Initialize Firebase
initializeApp(firebaseConfig)
var app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const db = getFirestore(app);
export {db, auth}


