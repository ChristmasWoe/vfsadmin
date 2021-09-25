import firebase from 'firebase/app'
// import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
// import 'firebase/functions'
let db = null
let storage = null


const firebaseConfig = {
  apiKey: "AIzaSyDh-wMqQ_K_SKi7njCNNmytIWyW_zmAQNU",
  authDomain: "vfsteel-ada5d.firebaseapp.com",
  projectId: "vfsteel-ada5d",
  storageBucket: "vfsteel-ada5d.appspot.com",
  messagingSenderId: "583840576946",
  appId: "1:583840576946:web:c20aeb88d3be71e69c20ab",
  measurementId: "G-6NFWKC8TCJ"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
  db = firebase.firestore()
  storage = firebase.storage()
}

export { db, storage }
export default firebase


