// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getDatabase } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCW5nhO7DgKnNLG-a6ZvvJgi7L2MjBZinI",
  authDomain: "real-crypto-athletes.firebaseapp.com",
  projectId: "real-crypto-athletes",
  storageBucket: "real-crypto-athletes.appspot.com",
  messagingSenderId: "464958658187",
  appId: "1:464958658187:web:ec9dde0deb2000fb94668e",
  measurementId: "G-4FH35ZLG4Y",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const database = getDatabase(app)

const Firebase = {
  app,
  analytics,
  database,
}

export default Firebase
