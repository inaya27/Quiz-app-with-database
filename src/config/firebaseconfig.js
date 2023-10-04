// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdIqTiJiNj_BBYN-LKVoNMtFJSMAaO5OY",
  authDomain: "quizappreact-d2fe0.firebaseapp.com",
  projectId: "quizappreact-d2fe0",
  storageBucket: "quizappreact-d2fe0.appspot.com",
  messagingSenderId: "164299651281",
  appId: "1:164299651281:web:dcd70c5fd355dfdbea2df0",
  measurementId: "G-V65LHYFJRP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
