// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey:process.env.API_KEY,
  authDomain: "coffee-shop-619db.firebaseapp.com",
  projectId: "coffee-shop-619db",
  storageBucket: "coffee-shop-619db.appspot.com",
  messagingSenderId: "691565591920",
  appId: "1:691565591920:web:91f9a6f279519d0f4ba3b5",
  measurementId: "G-6E6Y4WFZD7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
//const analytics = getAnalytics(app);
