import { app } from "../config";
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  arrayRemove,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import { ref, deleteObject, getStorage, getMetadata } from "firebase/storage";

import { uploadFilesAndSaveURLs } from "@/firebase/firestore/common";

const db = getFirestore(app);
const storage = getStorage(app);

export async function deleteAdImages(ad) {
  try {
    const storageRef = ref(storage, ad);
    await getMetadata(storageRef)
      .then(() => {
        deleteObject(storageRef)
          .then(() => console.log("deleted images"))
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  } catch (e) {
    console.log(e);
  }
}

export const getServiceAds = async (
  type,
  level1 = null,
  level2 = null,
  level3 = null,
  home = null
) => {
  try {
    let docRef;
    if (level1 && level2 && level3) {
      docRef = doc(
        db,
        `${type}/${level1}/${level1}col/${level2}/${level2}col/${level3}`
      );
    } else if (level1 && level2) {
      docRef = doc(db, `${type}/${level1}/${level1}col/${level2}`);
    } else if (level1) {
      docRef = doc(db, `${type}/${level1}`);
    } else if (home) {
      docRef = doc(db, "advertisements/ads");
    } else {
      docRef = doc(db, `${type}/ads`);
    }
    const snapshot = await getDoc(docRef);
    const data = snapshot.data().ads;
    return data;
  } catch (e) {
    console.log(e);
  }
};
export const updateServiceAds = async (
  ads,
  type,
  level1 = null,
  level2 = null,
  level3 = null,
  home = null
) => {
  try {
    let docRef;
    if (level1 && level2 && level3) {
      docRef = doc(
        db,
        `${type}/${level1}/${level1}col/${level2}/${level2}col/${level3}`
      );
    } else if (level1 && level2) {
      docRef = doc(db, `${type}/${level1}/${level1}col/${level2}`);
    } else if (level1) {
      docRef = doc(db, `${type}/${level1}`);
    } else if (home) {
      docRef = doc(db, "advertisements/ads");
    } else {
      docRef = doc(db, `${type}/ads`);
    }
    const adUrls = await uploadFilesAndSaveURLs(ads);
    adUrls.map(async (ad) => {
      await updateDoc(docRef, { ads: arrayUnion(ad) });
    });
  } catch (e) {
    console.log(e);
  }
};
export const deleteServiceAds = async (
  valueToDelete,
  type,
  level1 = null,
  level2 = null,
  level3 = null,
  home = null
) => {
  try {
    let docRef;

    if (level1 && level2 && level3) {
      docRef = doc(
        db,
        `${type}/${level1}/${level1}col/${level2}/${level2}col/${level3}`
      );
    } else if (level1 && level2) {
      docRef = doc(db, `${type}/${level1}/${level1}col/${level2}`);
    } else if (level1) {
      docRef = doc(db, `${type}/${level1}`);
    } else if (home) {
      docRef = doc(db, "advertisements/ads");
    } else {
      docRef = doc(db, `${type}/ads`);
    }

    await updateDoc(docRef, {
      ads: arrayRemove(valueToDelete),
    });
    console.log("ad removed");
    await deleteAdImages(valueToDelete);
  } catch (e) {
    console.log(e);
  }
};
