import {
  collection,
  doc,
  onSnapshot,
  getFirestore,
  getDocs,
  getDoc,
  updateDoc,
  query,
} from "firebase/firestore";

import { app } from "../config";
const db = getFirestore(app);

//Function to get Services




export const updateUserDoc = async (user, newLocation) => {
  try {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        location: newLocation,
      });
    }
    console.log("user updated");
  } catch (e) {
    console.log(e);
  }
};

export const updateUserDocDistrict = async (user, newLocation) => {
  try {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        district: newLocation,
      });
    }
    console.log("user updated");
  } catch (e) {
    console.log(e);
  }
};

export const getUser = async (id) => {
  try {
    const userref = doc(db, "users", id);
    const snap = await getDoc(userref);
    return snap.data();
  } catch (e) {
    console.log(e);
  }
};
