import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLGN_vuilv50OMRBSVwzZCu2iI16EbgiQ",
  authDomain: "mini-test-331ad.firebaseapp.com",
  databaseURL:
    "https://mini-test-331ad-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mini-test-331ad",
  storageBucket: "mini-test-331ad.appspot.com",
  messagingSenderId: "221131832138",
  appId: "1:221131832138:web:2dc86b9cc0b881063c1fb3",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const updateUser = (displayName) => {
//   updateProfile(auth.currentUser, {
//     displayName: displayName,
//   })
//     .then(() => {
//       console.log("Profile updated successfully");
//     })
//     .catch((error) => {
//       console.error("Error updating profile: ", error);
//     });
// };

export { app, auth, db };
