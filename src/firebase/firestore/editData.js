import { app } from "../config";
import { doc, updateDoc, getFirestore } from "firebase/firestore";
import { uploadFilesAndSaveURLs, uploadIcons } from "./addData";
import { deleteObject, getStorage, ref } from "firebase/storage";

const db = getFirestore(app);
const storage = getStorage(app);

export async function editServices(
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
      docUrl = `services/${rootprevious}/${rootprevious}col/${beforeprevious}/${beforeprevious}col/${previous}/${previous}col`;
    } else if (beforeprevious != null) {
      docUrl = `services/${beforeprevious}/${beforeprevious}col/${previous}/${previous}col`;
    } else if (previous != null) {
      docUrl = `services/${previous}/${previous}col`;
    } else {
      docUrl = "services";
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

export async function editProducts(
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
      docUrl = `products/${rootprevious}/${rootprevious}col/${beforeprevious}/${beforeprevious}col/${previous}/${previous}col`;
    } else if (beforeprevious != null) {
      docUrl = `products/${beforeprevious}/${beforeprevious}col/${previous}/${previous}col`;
    } else if (previous != null) {
      docUrl = `products/${previous}/${previous}col`;
    } else {
      docUrl = "products";
    }
    if (icon != null && name != null) {
      const fileRef = ref(storage, iconUrl);
      deleteObject(fileRef)
        .then(() => {
          console.log("deleted successfully");
        })
        .catch((e) => {
          console.log(e);
        });
      fileUrl = await uploadIcons(icon, id);
      await updateDoc(doc(db, docUrl, id), {
        name: name,
        iconUrl: fileUrl,
      });
    } else if (icon != null) {
      const fileRef = ref(storage, iconUrl);
      deleteObject(fileRef)
        .then(() => {
          console.log("deleted successfully");
        })
        .catch((e) => {
          console.log(e);
        });
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

export async function editServicesDoc(
  rootprevious = null,
  beforeprevious = null,
  previous = null,
  id,
  data,
  profilepic,
  oldphotos,
  type,
  icon,
  photos
) {
  let result = null;
  let e = null;
  try {
    let docUrl;
    let fileUrl;
    docUrl = `${type}/${rootprevious}/${rootprevious}col/${beforeprevious}/${beforeprevious}col/${previous}/${previous}col`;
    if (profilepic != null && photos != null) {
      // const fileRef = ref(storage, iconUrl);
      // deleteObject(fileRef)
      //   .then(() => {
      //     console.log("deleted successfully");
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });
      fileUrl = await uploadIcons(icon, id);
      photosurl = await uploadFilesAndSaveURLs(photos);
      await updateDoc(doc(db, docUrl, id), {
        ...data,
        profile: fileUrl,
        photos: photosurl,
      });
    } else if (icon != null) {
      // const fileRef = ref(storage, iconUrl);
      // deleteObject(fileRef)
      //   .then(() => {
      //     console.log("deleted successfully");
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });
      fileUrl = await uploadIcons(icon, id);
      await updateDoc(doc(db, docUrl, id), {
        ...data,
        profile: fileUrl,
      });
    } else {
      await updateDoc(doc(db, docUrl, id), {
        ...data,
      });
    }
  } catch (e) {
    console.log(e);
    return "failure";
  }
}
