import { app } from "../config";
import {
  getFirestore,
  doc,
  addDoc,
  setDoc,
  collection,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";

const db = getFirestore(app);
const storage = getStorage(app);

export async function uploadIcons(file, id) {
  try {
    const storageRef = ref(storage, `icons/${id}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (e) {
    console.log(e);
  }
}

export async function addExplore(
  beforeprevious = null,
  previous = null,
  id = null,
  data,
  file
) {
  let result = null;
  let e = null;
  console.log("inside firebase");
  try {
    let docUrl;
    if (beforeprevious != null) {
      docUrl = `explore/${beforeprevious}/${beforeprevious}col/${previous}/${previous}col`;
    } else if (previous != null) {
      docUrl = `explore/${previous}/${previous}col`;
    } else {
      docUrl = "explore";
    }
    const fileUrl = await uploadIcons(file, id);
    const docData = { ...data, iconUrl: fileUrl };
    result = await setDoc(doc(db, docUrl, id), docData);
    console.log("added service");
  } catch (e) {
    console.log(e);
    return "failure";
  }
}