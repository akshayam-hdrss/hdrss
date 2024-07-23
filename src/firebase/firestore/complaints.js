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
  addDoc,
} from "firebase/firestore";
import {
  ref,
  deleteObject,
  getStorage,
  getMetadata,
  getDownloadURL,
} from "firebase/storage";

import { uploadFilesAndSaveURLs } from "@/firebase/firestore/common";

const db = getFirestore(app);
const storage = getStorage(app);

export async function uploadComplaintPhotos(files) {
  const uploadPromises = files.map((file) => {
    const storageRef = ref(storage, `complaints/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
        }
      );
    });
  });
  const downloadURLs = await Promise.all(uploadPromises);
  return downloadURLs;
}
export async function submitComplaint(data, photos) {
  try {
    await addDoc(collection(db, "complaints"), data);
  } catch (e) {
    console.log(e);
  }
}

export async function getComplaints() {
  try {
    let data = [];
    const snap = await getDocs(collection(db, "complaints"));
    snap.forEach((doc) => {
      data.push({ id: doc.id, data: doc.data() });
    });
  } catch (e) {
    console.log(e);
  }
}
