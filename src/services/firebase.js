// Firebase core
import { initializeApp } from "firebase/app";

// 🔥 AUTH IMPORTS
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// (optional - future use)
import { getFirestore } from "firebase/firestore";

// Your config
const firebaseConfig = {
  apiKey: "AIzaSyD-unttGrlRD-Ciy83ke2XIe-q-PCOWc-Q",
  authDomain: "quiz-app-38e89.firebaseapp.com",
  projectId: "quiz-app-38e89",
  storageBucket: "quiz-app-38e89.firebasestorage.app",
  messagingSenderId: "383421973495",
  appId: "1:383421973495:web:e500277a1e26e9be36e4f2"
};

// Initialize app
const app = initializeApp(firebaseConfig);

// ✅ EXPORT AUTH
export const auth = getAuth(app);

// ✅ EXPORT GOOGLE PROVIDER
export const googleProvider = new GoogleAuthProvider();

// ✅ OPTIONAL DATABASE (for later)
export const db = getFirestore(app);