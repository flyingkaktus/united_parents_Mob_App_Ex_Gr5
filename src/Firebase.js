// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyBpNafl5F0Xxei3rysQ_u0Pfbud0l4hEz8",
  authDomain: "united-parents-chat-function.firebaseapp.com",
  databaseURL: "https://united-parents-chat-function-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "united-parents-chat-function",
  storageBucket: "united-parents-chat-function.appspot.com",
  messagingSenderId: "742675114491",
  appId: "1:742675114491:web:f6a57800c364c8c4e8c35e"

};


const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const database = getDatabase(app)
export default app