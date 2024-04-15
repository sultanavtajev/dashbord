// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDo0d85TCeQUnogQ5hONraCnIcQRNDQHYM",
  authDomain: "bachelor-7e242.firebaseapp.com",
  databaseURL:
    "https://bachelor-7e242-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bachelor-7e242",
  storageBucket: "bachelor-7e242.appspot.com",
  messagingSenderId: "451357232520",
  appId: "1:451357232520:web:6badcb75345db488c0be3d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };