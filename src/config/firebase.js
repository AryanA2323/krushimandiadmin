import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDofbj7DW13aJCh52TlowagVSAfeKEVHqg",
  authDomain: "krushimandi-fruit.firebaseapp.com",
  databaseURL: "https://krushimandi-fruit-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "krushimandi-fruit",
  storageBucket: "krushimandi-fruit.firebasestorage.app",
  messagingSenderId: "915325221809",
  appId: "1:915325221809:web:3522cc30254f739b92db90",
  measurementId: "G-2PYHX1G1BD"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);