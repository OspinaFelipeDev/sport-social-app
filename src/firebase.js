// src/firebase.js

// Importa las funciones necesarias del SDK de Firebase
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // ✅ Importa storage

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCoDUqJjgAFA6Wu3thjuYgFxfBCoZcEwPM",
  authDomain: "sport-social-774c6.firebaseapp.com",
  projectId: "sport-social-774c6",
  storageBucket: "sport-social-774c6.appspot.com", // ✅ Este campo es importante para usar Firebase Storage
  messagingSenderId: "784680932411",
  appId: "1:784680932411:web:c28326c539fe0614c0381e"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa los servicios
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app); // ✅ Inicializa Firebase Storage

// Exporta todo lo necesario
export {
  db,
  auth,
  storage, // ✅ Exporta storage
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
};
