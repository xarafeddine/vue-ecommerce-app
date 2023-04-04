//Import the required methods
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//The config we copied from firebase(Replace with your config)
const firebaseConfig = {
  apiKey: "AIzaSyBf88kzdxA0-cJakGWWKtLcYXIn3cpsZbY",
  authDomain: "vue-ecommerce-app-4d489.firebaseapp.com",
  databaseURL: "https://vue-ecommerce-app-4d489-default-rtdb.firebaseio.com",
  projectId: "vue-ecommerce-app-4d489",
  storageBucket: "vue-ecommerce-app-4d489.appspot.com",
  messagingSenderId: "367899631324",
  appId: "1:367899631324:web:5523244794ab7750ce5e19",
};

//initialize the firebase app
const app = initializeApp(firebaseConfig);

//initialize firebase auth
const auth = getAuth();

// db
const db = getFirestore(app);

//export the auth object
export { auth, db };
