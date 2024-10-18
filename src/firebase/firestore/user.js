import {
  collection,
  doc,
  onSnapshot,
  getFirestore,
  getDocs,
  getDoc,
  updateDoc,
  query,
  where,
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
    let data = {};
    const userref = doc(db, "users", id);
    const snap = await getDoc(userref);
    data = { id: snap.id, data: snap.data() };
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getExecutives = async () => {
  try {
    let data = [];

    const executivesRef = query(
      collection(db, "users"),
      where("executive", "==", true)
    );
    const querySnapshot = await getDocs(executivesRef);
    querySnapshot.docs.map((docs) => {
      data.push({ id: docs.id, data: docs.data() });
    });
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const updateExecutiveStatus = async (status, id) => {
  try {
    await updateDoc(doc(db, "users", id), { execstatus: status });
  } catch (e) {
    console.log(e);
  }
};

export const getExecutive = async (id) => {
  try {
    let data = {};
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    data = { id: docSnap.id, data: docSnap.data() };
    return data;
  } catch (e) {
    console.log(e);
  }
};
