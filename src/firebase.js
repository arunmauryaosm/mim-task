import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCpIQouLcnD5LXk5h1e_APZJ15L6vb7c3o",
  authDomain: "otp-project-1fb5a.firebaseapp.com",
  projectId: "otp-project-1fb5a",
  storageBucket: "otp-project-1fb5a.appspot.com",
  messagingSenderId: "903300564124",
  appId: "1:903300564124:web:1fafadf0a0fbb89a01d959"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export default app;