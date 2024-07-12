import { app } from "../config";

import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";

const storage = getStorage(app);

export async function uploadFilesAndSaveURLs(files) {
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

export async function uploadIcons(file, id) {
  try {
    const storageRef = ref(storage, `icons/${id}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    console.log("uploaded icon")
    return url;
  } catch (e) {
    console.log(e);
  }
}
