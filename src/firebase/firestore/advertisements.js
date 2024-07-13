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
export async function uploadHomeAdvertisements(photos) {
  try {
    const ads = await uploadFilesAndSaveURLs(photos);
    ads.map(async (ad, index) => {
      const result = await setDoc(doc(db, "advertisements", `ad${index}`), {
        ad: ad,
      });
    });
    console.log("ads added");
  } catch (e) {
    console.log(e);
  }
}

export const getHomeAdvertisements = async () => {
  try {
    let ads = [];
    const snapshot = await getDocs(collection(db, "advertisements"));
    snapshot.forEach((doc) => ads.push({ id: doc.id, data: doc.data() }));
    return ads;
  } catch (e) {
    console.log(e);
  }
};

export const getLevel1ServiceAds = async () => {
  try {
    const snapshot = await getDoc(doc(db, "services/ads"));
    const data = snapshot.data().ads;
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getLevel2ServiceAds = async (level1, type) => {
  try {
    const snapshot = await getDoc(doc(db, `${type}/${level1}`));
    const data = snapshot.data().ads;
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getLevel3ServiceAds = async (level1, level2, type) => {
  try {
    const snapshot = await getDoc(
      doc(db, `${type}/${level1}/${level1}col/${level2}`)
    );
    const data = snapshot.data().ads;
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getLevel4ServiceAds = async (level1, level2, level3, type) => {
  try {
    const snapshot = await getDoc(
      doc(db, `${type}/${level1}/${level1}col/${level2}/${level2}col/${level3}`)
    );
    const data = snapshot.data().ads;
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const updateLevel1ServiceAds = async (ads, type) => {
  try {
    const adUrls = await uploadFilesAndSaveURLs(ads);
    adUrls.map(async (ad) => {
      await updateDoc(doc(db, `${type}/ads`), { ads: arrayUnion(ad) });
    });
  } catch (e) {
    console.log(e);
  }
};

export const updateLevel2ServiceAds = async (level1, ads, type) => {
  try {
    const adUrls = await uploadFilesAndSaveURLs(ads);
    adUrls.map(async (ad) => {
      await updateDoc(doc(db, `${type}/${level1}`), { ads: arrayUnion(ad) });
    });
  } catch (e) {
    console.log(e);
  }
};
export const updateLevel3ServiceAds = async (level1, level2, ads, type) => {
  try {
    const adUrls = await uploadFilesAndSaveURLs(ads);
    await updateDoc(doc(db, `${type}/${level1}/${level1}col/${level2}`), {
      ads: adUrls,
    });
  } catch (e) {
    console.log(e);
  }
};
export const updateLevel4ServiceAds = async (
  level1,
  level2,
  level3,
  ads,
  type
) => {
  try {
    const adUrls = await uploadFilesAndSaveURLs(ads);
    await updateDoc(
      doc(
        db,
        `${type}/${level1}/${level1}col/${level2}/${level2}col/${level3}`
      ),
      { ads: adUrls }
    );
  } catch (e) {
    console.log(e);
  }
};

export const deleteLevel1ServiceAds = async (valueToDelete, type) => {
  try {
    await updateDoc(doc(db, `${type}/ads`), {
      ads: arrayRemove(valueToDelete),
    });
    console.log("ad removed");
    await deleteAdImages(valueToDelete);
  } catch (e) {
    console.log(e);
  }
};

export const deleteLevel2ServiceAds = async (level1, valueToDelete, type) => {
  try {
    await updateDoc(doc(db, `${type}/${level1}`), {
      ads: arrayRemove(valueToDelete),
    });
    console.log("ad removed");
    await deleteAdImages(valueToDelete);
  } catch (e) {
    console.log(e);
  }
};

export const deleteLevel3ServiceAds = async (
  level1,
  level2,
  valueToDelete,
  type
) => {
  try {
    await updateDoc(doc(db, `${type}/${level1}/${level1}col/${level2}`), {
      ads: arrayRemove(valueToDelete),
    });
    console.log("ad removed");
    await deleteAdImages(valueToDelete);
  } catch (e) {
    console.log(e);
  }
};

export const deleteLevel4ServiceAds = async (
  level1,
  level2,
  level3,
  valueToDelete,
  type
) => {
  try {
    await updateDoc(
      doc(
        db,
        `${type}/${level1}/${level1}col/${level2}/${level2}col/${level3}`
      ),
      {
        ads: arrayRemove(valueToDelete),
      }
    );
    console.log("ad removed");
    await deleteAdImages(valueToDelete);
  } catch (e) {
    console.log(e);
  }
};
