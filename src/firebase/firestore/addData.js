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
async function uploadIcons(file, metadata) {
  try {
    const storageRef = ref(storage, `icons/${file.name}`);
    await uploadBytes(storageRef, file, metadata);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (e) {
    console.log(e);
  }
}

//Function to add level 1 services
async function addLevel1Service(id, data, iconName, file) {
  let result = null;
  let error = null;

  try {
    const metadata = {
      contentType: "image/jpg",
      name: iconName,
    };
    const fileUrl = await uploadIcons(file);
    const docData = { ...data, iconUrl: fileUrl };
    result = await setDoc(doc(db, "services", id), docData);
    console.log("added successfully");
  } catch (e) {
    error = e;
    console.log(error);
  }

  return { result, error };
}

async function addLevel2Service(previous, id, data, file) {
  let result = null;
  const docUrl = `services/${previous}/${previous}col`;
  try {
    const fileUrl = await uploadIcons(file);
    const docData = { ...data, iconUrl: fileUrl };
    result = await setDoc(
      doc(db, `services/${previous}/${previous}col`, id),
      docData
    );
    console.log("added level2");
    return result;
  } catch (e) {
    console.log(e);
    return "failure";
  }
}

async function addLevel3Service(beforeprevious,previous, id, data, file) {
  let result = null;
  const docUrl = `services/${previous}/${previous}col`;
  try {
    const fileUrl = await uploadIcons(file);
    const docData = { ...data, iconUrl: fileUrl };
    result = await setDoc(
      doc(db, `services/${beforeprevious}/${beforeprevious}col/${previous}/${previous}col`, id),
      docData
    );
    console.log("added level3");
    return result;
  } catch (e) {
    console.log(e);
    return "failure";
  }
}

async function addLevel4Service(rootprevious,beforeprevious, previous, id, data, file) {
  let result = null;
  const docUrl = `services/${previous}/${previous}col`;
  try {
    const fileUrl = await uploadIcons(file);
    const docData = { ...data, iconUrl: fileUrl };
    result = await setDoc(
      doc(
        db,
        `services/${rootprevious}/${rootprevious}col/${beforeprevious}/${beforeprevious}col/${previous}/${previous}col`,
        id
      ),
      docData
    );
    console.log("added level3");
    return result;
  } catch (e) {
    console.log(e);
    return "failure";
  }
}

export { addLevel1Service, uploadIcons, addLevel2Service, addLevel3Service, addLevel4Service };
