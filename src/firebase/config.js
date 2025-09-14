import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  setPersistence, 
  browserLocalPersistence 
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDofbj7DW13aJCh52TlowagVSAfeKEVHqg",
  authDomain: "krushimandi-fruit.firebaseapp.com",
  // databaseURL: "https://krushimandi-fruit-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "krushimandi-fruit",
  storageBucket: "krushimandi-fruit.firebasestorage.app",
  messagingSenderId: "915325221809",
  appId: "1:915325221809:web:3522cc30254f739b92db90",
  // measurementId: "G-2PYHX1G1BD"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Set persistence to LOCAL
setPersistence(auth, browserLocalPersistence);

export { auth, db, storage };