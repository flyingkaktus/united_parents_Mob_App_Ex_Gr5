// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  /*
  apiKey: "AIzaSyDKcJzmZKZRpkSp7lZK6tX0CP9yzDhFg8g",
  authDomain: "united-parents-mobileappex.firebaseapp.com",
  projectId: "united-parents-mobileappex",
  storageBucket: "united-parents-mobileappex.appspot.com",
  messagingSenderId: "72722565856",
  appId: "1:72722565856:web:2838a3e0cca833f2c15e85"
  */
  apiKey: "AIzaSyDKcJzmZKZRpkSp7lZK6tX0CP9yzDhFg8g",
  authDomain: "united-parents-mobileappex.firebaseapp.com",
  databaseURL: "https://united-parents-mobileappex-default-rtdb.firebaseio.com",
  projectId: "united-parents-mobileappex",
  storageBucket: "united-parents-mobileappex.appspot.com",
  messagingSenderId: "72722565856",
  appId: "1:72722565856:web:2838a3e0cca833f2c15e85",
  measurementId: "G-LL6Y3YDCPL"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const database = getDatabase(app)
export default app
