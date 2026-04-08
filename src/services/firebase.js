import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-unttGrlRD-Ciy83ke2XIe-q-PCOWc-Q",
  authDomain: "quiz-app-38e89.firebaseapp.com",
  projectId: "quiz-app-38e89",
  storageBucket: "quiz-app-38e89.firebasestorage.app",
  messagingSenderId: "383421973495",
  appId: "1:383421973495:web:e500277a1e26e9be36e4f2",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
