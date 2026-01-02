import { initializeApp } from "firebase/app";
import { getFirestore, persistentLocalCache, CACHE_SIZE_UNLIMITED } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDk9ENzaK7mQdncVM8lYpUfwjbBbiarKfs",
  authDomain: "tracker-2k25.firebaseapp.com",
  projectId: "tracker-2k25",
  storageBucket: "tracker-2k25.firebasestorage.app",
  messagingSenderId: "230311187884",
  appId: "1:230311187884:web:52b5de2184b23ebdfc1609"
};

const app = initializeApp(firebaseConfig, {
  localCache: persistentLocalCache(/*settings*/ {}),
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
});
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const firestoreDB = getFirestore(app);
