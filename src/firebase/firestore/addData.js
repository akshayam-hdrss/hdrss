import { update } from "firebase/database";
import { app } from "../config";
import {
  getFirestore,
  doc,
  addDoc,
  setDoc,
  collection,
  updateDoc,
  getDoc,
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

export async function uploadFilesAndSaveURLs(files) {
  // Create an array of promises to upload each file and get its download URL
  const uploadPromises = files.map((file) => {
    const storageRef = ref(storage, `servicegallery/${file.name}`);
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
    if (beforeprevious != null) {
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
async function addDocument(
  rootprevious,
  beforeprevious,
  previous,
  data,
  profilepic = null,
  photos = null,
  type,
  id
) {
  let result = null;
  let e = null;
  try {
    let docUrl;
    let pfpUrl;
    let galleryUrls;
    let docData;
    console.log("inside");
    docUrl = `${type}/${rootprevious}/${rootprevious}col/${beforeprevious}/${beforeprevious}col/${previous}/${previous}col`;
    if (profilepic != null && photos != null) {
      pfpUrl = await uploadIcons(profilepic, id);
      galleryUrls = await uploadFilesAndSaveURLs(photos);
      docData = {
        ...data,
        profile: pfpUrl,
        photos: galleryUrls,
      };
    } else if (photos != null) {
      galleryUrls = await uploadFilesAndSaveURLs(photos);
      docData = {
        ...data,
        photos: galleryUrls,
      };
    } else if (profilepic != null) {
      pfpUrl = await uploadIcons(profilepic, id);
      docData = {
        ...data,
        profile: pfpUrl,
      };
    } else {
      docData = { ...data };
    }
    result = await setDoc(doc(db, docUrl, id), docData);
    console.log("added service document");
    return result;
  } catch (e) {
    console.log(e);
    return "failed in adding service document";
  }
}

export async function uploadAdvertisements(ads) {
  try {
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

export async function addRamadass(data, photo = null) {
  try {
    let profile;
    if (photo != null) {
      profile = await uploadIcons(photo, "ramadass");
      data.profile = profile;
    }
    const result = await updateDoc(doc(db, "ramadass", "ramadass"), data);
    console.log("update ramadass");
  } catch (e) {
    console.log(e);
  }
}
export async function getRamadass() {
  try {
    const result = await getDoc(doc(db, "ramadass", "ramadass"));
    if (result.exists()) {
      return result.data();
    }
  } catch (e) {
    console.log(e);
  }
}
export { addService, uploadIcons, addProduct, addDocument };
