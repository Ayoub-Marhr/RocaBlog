// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuCCkodoA6x0J4Grz9Ub-KyL1lN_3W-4M",
  authDomain: "mern-rocablog.firebaseapp.com",
  projectId: "mern-rocablog",
  storageBucket: "mern-rocablog.appspot.com",
  messagingSenderId: "672959485239",
  appId: "1:672959485239:web:adaa0f35b987d7dbcab6b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage }; // Export named exports
