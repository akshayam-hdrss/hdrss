import { app } from "../config";
import {
  getFirestore,
  onSnapshot,
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

export async function editExplore(
  rootprevious = null,
  beforeprevious = null,
  previous = null,
  id,
  name,
  icon,
  iconUrl
) {
  let result = null;
  let e = null;
  try {
    let docUrl;
    let fileUrl;
    if (rootprevious != null) {
      docUrl = `explore/${rootprevious}/${rootprevious}col/${beforeprevious}/${beforeprevious}col/${previous}/${previous}col`;
    } else if (beforeprevious != null) {
      docUrl = `explore/${beforeprevious}/${beforeprevious}col/${previous}/${previous}col`;
    } else if (previous != null) {
      docUrl = `explore/${previous}/${previous}col`;
    } else {
      docUrl = "explore";
    }
    if (icon != null && name != null) {
      const fileRef = ref(storage, iconUrl);

      fileUrl = await uploadIcons(icon, id);
      await updateDoc(doc(db, docUrl, id), {
        name: name,
        iconUrl: fileUrl,
      });
    } else if (icon != null) {
      const fileRef = ref(storage, iconUrl);

      fileUrl = await uploadIcons(icon, id);
      await updateDoc(doc(db, docUrl, id), {
        iconUrl: fileUrl,
      });
    } else {
      await updateDoc(doc(db, docUrl, id), {
        name: name,
      });
    }
  } catch (e) {
    console.log(e);
    return "failure";
  }
}

export async function deleteExplore(
  rootprevious = null,
  beforeprevious = null,
  previous = null,
  id,
  iconUrl
) {
  let result = null;
  let e = null;

  try {
    let docUrl;
    if (rootprevious != null) {
      docUrl = `explore/${rootprevious}/${rootprevious}col/${beforeprevious}/${beforeprevious}col/${previous}/${previous}col`;
    } else if (beforeprevious != null) {
      docUrl = `explore/${beforeprevious}/${beforeprevious}col/${previous}/${previous}col`;
    } else if (previous != null) {
      docUrl = `explore/${previous}/${previous}col`;
    } else {
      docUrl = "explore";
    }
    if (iconUrl != null) {
      const fileRef = ref(storage, iconUrl);
      deleteObject(fileRef)
        .then(() => {
          console.log("deleted successfully");
        })
        .catch((e) => {
          console.log(e);
        });
      await deleteDoc(doc(db, docUrl, id));

      return "success";
    } else {
      await deleteDoc(doc(db, docUrl, id));

      return "success";
    }
  } catch (e) {
    console.log(e);
    return "failure";
  }
}

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
