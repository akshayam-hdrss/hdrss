import { app } from "../config";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";

const db = getFirestore(app);
const storage = getStorage(app);

export async function deleteServices(
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
      docUrl = `services/${rootprevious}/${rootprevious}col/${beforeprevious}/${beforeprevious}col/${previous}/${previous}col`;
    } else if (beforeprevious != null) {
      docUrl = `services/${beforeprevious}/${beforeprevious}col/${previous}/${previous}col`;
    } else if (previous != null) {
      docUrl = `services/${previous}/${previous}col`;
    } else {
      docUrl = "services";
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
