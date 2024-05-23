import {
  collection,
  doc,
  onSnapshot,
  getFirestore,
  getDocs,
} from "firebase/firestore";

import { app } from "../config";
const db = getFirestore(app);
//Function to get Level 1 Services

export const subscribeToLevel1 = (callback) => {
  const unsubscribe = onSnapshot(collection(db, "services"), (snapshot) => {
    let data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(data);
  });
  return unsubscribe;
};

export const subscribeToLevel2 = (callback, docid) => {
  try {
    const unsubscribe = onSnapshot(
      collection(db, "services", docid, `${docid}col`),
      (snapshot) => {
        let data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        callback(data);
      }
    );
    return unsubscribe;
  } catch (e) {
    console.log(e);
  }
};

export const subscribeToLevel3 = (callback, docid, beforedocid) => {
  try {
    const unsubscribe = onSnapshot(
      collection(db, "services", beforedocid, `${beforedocid}col`, docid, `${docid}col`),
      (snapshot) => {
        let data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        callback(data);
      }
    );
    return unsubscribe;
  } catch (e) {
    console.log(e);
  }
};
