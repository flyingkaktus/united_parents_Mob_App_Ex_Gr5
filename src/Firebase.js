// Import the functions you need from the SDKs you need
import { getFirestore } from "@firebase/firestore";
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
 /*  LAST SETTINGS
  apiKey: "AIzaSyDKcJzmZKZRpkSp7lZK6tX0CP9yzDhFg8g",
  authDomain: "united-parents-mobileappex.firebaseapp.com",
  databaseURL: "https://united-parents-mobileappex-default-rtdb.firebaseio.com",
  projectId: "united-parents-mobileappex",
  storageBucket: "united-parents-mobileappex.appspot.com",
  messagingSenderId: "72722565856",
  appId: "1:72722565856:web:2838a3e0cca833f2c15e85",
  measurementId: "G-LL6Y3YDCPL"
  */
  apiKey: "AIzaSyCp8lw0p39L2heNwcmqnHG2SOxHFhzACQ0",
  authDomain: "university-mobileapplicationex.firebaseapp.com",
  projectId: "university-mobileapplicationex",
  storageBucket: "university-mobileapplicationex.appspot.com",
  messagingSenderId: "375164703379",
  appId: "1:375164703379:web:018f0af79d2fa0cd2c3366",
  measurementId: "G-38D37E61VB"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const database = getDatabase(app)
export const databaseData = getFirestore(app);
export default app