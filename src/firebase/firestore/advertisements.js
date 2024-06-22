import { app } from "../config";
import {
  getFirestore,
  doc,
  addDoc,
  setDoc,
  collection,
  updateDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { uploadFilesAndSaveURLs } from "@/firebase/firestore/common";
const db = getFirestore(app);

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
