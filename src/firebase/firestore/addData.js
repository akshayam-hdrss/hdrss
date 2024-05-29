import { app } from "../config";
import {
  getFirestore,
  doc,
  addDoc,
  setDoc,
  collection,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";

const db = getFirestore(app);
const storage = getStorage(app);

//Function to upload level 1 icons
async function uploadIcons(file, id) {
  try {
    const storageRef = ref(storage, `icons/${id}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (e) {
    console.log(e);
  }
}

async function addService(
  rootprevious = null,
  beforeprevious = null,
  previous = null,
  id,
  data,
  file
) {
  let result = null;
  let e = null;

  try {
    let docUrl;
    if (rootprevious != null) {
      docUrl = `services/${rootprevious}/${rootprevious}col/${beforeprevious}/${beforeprevious}col/${previous}/${previous}col`;
    } else if (beforeprevious != null) {
      docUrl = `services/${beforeprevious}/${beforeprevious}col/${previous}/${previous}col`;
    } else if (previous != null) {
      docUrl = `services/${previous}/${previous}col`;
    } else {
      docUrl = "services";
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

async function addProduct(
  rootprevious = null,
  beforeprevious = null,
  previous = null,
  id,
  data,
  file
) {
  let result = null;
  let e = null;

  try {
    let docUrl;
    if (rootprevious != null) {
      docUrl = `products/${rootprevious}/${rootprevious}col/${beforeprevious}/${beforeprevious}col/${previous}/${previous}col`;
    } else if (beforeprevious != null) {
      docUrl = `products/${beforeprevious}/${beforeprevious}col/${previous}/${previous}col`;
    } else if (previous != null) {
      docUrl = `products/${previous}/${previous}col`;
    } else {
      docUrl = "products";
    }
    const fileUrl = await uploadIcons(file, id);
    const docData = { ...data, iconUrl: fileUrl };
    result = await setDoc(doc(db, docUrl, id), docData);
    console.log("added product");
  } catch (e) {
    console.log(e);
    return "failure";
  }
}

export { addService, uploadIcons, addProduct };