import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRLqbkVAcms8Cd7uewhbKfHfG-VboHfXM",
  authDomain: "fir-setup-20637.firebaseapp.com",
  projectId: "fir-setup-20637",
  storageBucket: "fir-setup-20637.appspot.com", // ✅ Fixed this
  messagingSenderId: "634158707495",
  appId: "1:634158707495:web:11e4240364c6d0f47e6f02",
  measurementId: "G-XMVQJZWX5N"
};

// Ensure Firebase is initialized only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth }; // ✅ Now `auth` is properly exported
