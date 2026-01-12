// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD7eQuwC0446hztWzZHWDUjGeHvEYLiPD4",
  authDomain: "ai-image-generation-plat-36311.firebaseapp.com",
  projectId: "ai-image-generation-plat-36311",
  storageBucket: "ai-image-generation-plat-36311.firebasestorage.app",
  messagingSenderId: "918721605932",
  appId: "1:918721605932:web:23ec28eb441d92968d3c89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
