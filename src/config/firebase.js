import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBndiFK5dtVi1CvJO_Qpwa8BHr8BkRJxro",
  authDomain: "girlscoutcookietracker-a26cf.firebaseapp.com",
  databaseURL: "https://girlscoutcookietracker-a26cf-default-rtdb.firebaseio.com",
  projectId: "girlscoutcookietracker-a26cf",
  storageBucket: "girlscoutcookietracker-a26cf.firebasestorage.app",
  messagingSenderId: "173472918495",
  appId: "1:173472918495:web:78e09bc15650a6e8c5f26a",
  measurementId: "G-WBLHLL02JT"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

