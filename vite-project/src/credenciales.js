import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDDdnUxxoRoIBihLK2j-GG16xTHoMgLUbE",
  authDomain: "login-287ad.firebaseapp.com",
  projectId: "login-287ad",
  storageBucket: "login-287ad.appspot.com",
  messagingSenderId: "317300771326",
  appId: "1:317300771326:web:960ba80763c51198a198af"
};

const appFirebase = initializeApp(firebaseConfig);


export const  db = getFirestore(appFirebase);
export const storage = getStorage(appFirebase);

export default appFirebase;
