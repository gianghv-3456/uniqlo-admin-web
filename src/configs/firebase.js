import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB-CzTpfq2e0_WTZSdU0tXO-CoSyAatbqg",
    authDomain: "uniqlo-be.firebaseapp.com",
    projectId: "uniqlo-be",
    storageBucket: "uniqlo-be.appspot.com",
    messagingSenderId: "736465995371",
    appId: "1:736465995371:web:07b150d69a08adebf7932e",
    measurementId: "G-52L5G75NMT",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
