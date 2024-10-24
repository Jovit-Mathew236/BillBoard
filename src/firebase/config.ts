import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFaKm-nR7oHoLAt4hKUi16UOiRLNRR0-E",
  authDomain: "billboard-4b946.firebaseapp.com",
  databaseURL:
    "https://billboard-4b946-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "billboard-4b946",
  storageBucket: "billboard-4b946.appspot.com",
  messagingSenderId: "845867566544",
  appId: "1:845867566544:web:a1be3106a464e7d518e5d5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const updateUser = (displayName: string) => {
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
