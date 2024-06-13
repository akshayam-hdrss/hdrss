import {
  collection,
  doc,
  onSnapshot,
  getFirestore,
  getDocs,
  getDoc,
  query,
} from "firebase/firestore";

import { app } from "../config";
const db = getFirestore(app);

export const subscribeToExplore = (
  callback,
  docid = null,
  beforedocid = null
) => {
  try {
    if (beforedocid != null) {
      const unsubscribe = onSnapshot(
        collection(
          db,
          "explore",
          beforedocid,
          `${beforedocid}col`,
          docid,
          `${docid}col`
        ),
        (snapshot) => {
          let data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          callback(data);
        }
      );
      return unsubscribe;
    } else if (docid != null) {
      const unsubscribe = onSnapshot(
        collection(db, "explore", docid, `${docid}col`),
        (snapshot) => {
          let data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          callback(data);
        }
      );
      return unsubscribe;
    } else {
      const unsubscribe = onSnapshot(collection(db, "explore"), (snapshot) => {
        let data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        callback(data);
      });
      return unsubscribe;
    }
  } catch (e) {
    console.log(e);
  }
};