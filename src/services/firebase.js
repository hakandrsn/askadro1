import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore"
import { getStorage } from "@firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyD47F6xz--OhYXGIjXOwD8xtIaBuTwi9eg",
  authDomain: "askadro-58279.firebaseapp.com",
  projectId: "askadro-58279",
  storageBucket: "askadro-58279.appspot.com",
  messagingSenderId: "98649141765",
  appId: "1:98649141765:web:869ba1c0e56ae372e2a26c",
  measurementId: "G-CDC92C72HV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const storage = getStorage(app)