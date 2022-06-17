import firebase from 'firebase/app'
import 'firebase/auth'

var firebaseConfig = {
  apiKey: "AIzaSyA6q1XUcSI_S7I6j5Magn2ewMJLydKqNl8",
  authDomain: "otp-app-demo-e0420.firebaseapp.com",
  projectId: "otp-app-demo-e0420",
  storageBucket: "otp-app-demo-e0420.appspot.com",
  messagingSenderId: "35130574661",
  appId: "1:35130574661:web:00c29d118ba4674034202c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
export default firebase