import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCDyv6bqY7FiLyUWNke0JvFnKntslDEWZg",
  authDomain: "online-sheba-point-3b924.firebaseapp.com",
  projectId: "online-sheba-point-3b924",
  storageBucket: "online-sheba-point-3b924.firebasestorage.app",
  messagingSenderId: "514344534444",
  appId: "1:514344534444:web:1c61322547c5ad3384fa09",
  measurementId: "G-9DEY6PL1LD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);