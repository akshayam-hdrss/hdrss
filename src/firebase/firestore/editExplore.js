import { app } from "../config";
import { doc, updateDoc, getFirestore } from "firebase/firestore";
import { uploadIcons } from "./addExplore";
import { getStorage, ref } from "firebase/storage";

const db = getFirestore(app);
const storage = getStorage(app);

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
