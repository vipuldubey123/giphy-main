import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAWnDNhcJ8zZpUsg2Xp7NMYccokhNO-PHc",
    authDomain: "giphy-56aa4.firebaseapp.com",
    projectId: "giphy-56aa4",
    storageBucket: "giphy-56aa4.appspot.com",
    messagingSenderId: "35988000566",
    appId: "1:35988000566:web:24e33f0dacc59a4b1eed97"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const auth = getAuth(app)

export { app, auth }