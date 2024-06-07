import {
  collection,
  doc,
  onSnapshot,
  getFirestore,
  getDocs,
} from "firebase/firestore";

import { app } from "../config";
const db = getFirestore(app);

//Function to get Services

export const subscribeToServices = (
  callback,
  docid = null,
  beforedocid = null
) => {
  try {
    if (beforedocid != null) {
      const unsubscribe = onSnapshot(
        collection(
          db,
          "services",
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
    } else {
      const unsubscribe = onSnapshot(collection(db, "services"), (snapshot) => {
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

export const subscribeToProducts = (
  callback,
  docid = null,
  beforedocid = null
) => {
  try {
    if (beforedocid != null) {
      const unsubscribe = onSnapshot(
        collection(
          db,
          "products",
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
        collection(db, "products", docid, `${docid}col`),
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
      const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
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

export const subscribeToServiceDocuments = (
  callback,
  docid,
  beforedocid,
  rootdocid
) => {
  try {
    const unsubscribe = onSnapshot(
      collection(
        db,
        "services",
        rootdocid,
        `${rootdocid}col`,
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
  } catch (e) {
    console.log(e);
  }
};

export const subscribeToProductsDocuments = (
  callback,
  docid,
  beforedocid,
  rootdocid
) => {
  try {
    const unsubscribe = onSnapshot(
      collection(
        db,
        "products",
        rootdocid,
        `${rootdocid}col`,
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
  } catch (e) {
    console.log(e);
  }
};

export const getServicesList = async (rootdocid = null, beforedocid = null) => {
  try {
    let data = [];
    let snapshot;
    if (rootdocid != null && beforedocid != null) {
      snapshot = await getDocs(
        collection(
          db,
          `services/${rootdocid}/${rootdocid}col/${beforedocid}/${beforedocid}col`
        )
      );
    } else if (beforedocid != null) {
      snapshot = await getDocs(
        collection(db, `services/${beforedocid}/${beforedocid}col`)
      );
    } else {
      snapshot = await getDocs(collection(db, "services"));
    }
    snapshot.forEach((doc) => data.push(doc.id));
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getServicesDocs = async (rootdocid = null, beforedocid = null) => {
  try {
    let q;
    let alldocs=[];
    if (rootdocid != null && beforedocid != null) {
      q = collection(
        db,
        `services/${rootdocid}/${rootdocid}col/${beforedocid}/${beforedocid}col`
      );
    } else if (beforedocid != null) {
      q = collection(db, `services/${beforedocid}/${beforedocid}col`);
    } else {
      q = collection(db, "services");
    }
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      alldocs.push({ id: doc.id, data: doc.data() });
    });
    return alldocs;
  } catch (e) {
    console.log(e);
  }
};
