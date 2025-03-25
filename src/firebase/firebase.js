import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9FcKGmlnTt-8O1-MpbSAhsv31-7tzQeo",
  authDomain: "techcycle-afe6b.firebaseapp.com",
  projectId: "techcycle-afe6b",
  storageBucket: "techcycle-afe6b.firebasestorage.app",
  messagingSenderId: "19919777135",
  appId: "1:19919777135:web:0f768792fc08a163120c9a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
