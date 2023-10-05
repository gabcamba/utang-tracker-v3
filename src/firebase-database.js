import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  databaseURL:
    "https://gabmeiutangtrack-default-rtdb.asia-southeast1.firebasedatabase.app",
  apiKey: "AIzaSyDmQnbj4au69iMdvn3eTR1an5TUHI-32ZE",
  authDomain: "gabmeiutangtrack.firebaseapp.com",
  projectId: "gabmeiutangtrack",
  storageBucket: "gabmeiutangtrack.appspot.com",
  messagingSenderId: "281228300923",
  appId: "1:281228300923:web:942f87f2079a438aff48de",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
