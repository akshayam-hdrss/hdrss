import { app } from "../config";
import {
  getFirestore,
  doc,
  addDoc,
  setDoc,
  collection,
  onSnapshot,
  updateDoc,
  getDoc,
  getDocs,
  deleteDoc,
  where,
  query,
  orderBy,
} from "firebase/firestore";
import {
  ref,
  deleteObject,
  getStorage,
  getMetadata,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

const db = getFirestore(app);
const storage = getStorage(app);

export const addProductProfile = async (previous, photo) => {
  try {
    const photoRef = ref(storage, `products/${previous}/${photo.name}`);
    await uploadBytes(photoRef, photo);
    const photoUrl = await getDownloadURL(photoRef);
    console.log("product profile pic uploaded");
    return photoUrl;
  } catch (e) {
    console.log(e);
  }
};

export async function uploadProductPhotosAndSaveURLs(previous, files) {
  const uploadPromises = files.map((file) => {
    const storageRef = ref(storage, `productPhotos/${previous}/${file.name}`);
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

export const addProduct = async (
  previous,
  name,
  price,
  number,
  about,
  gender,
  size,
  profilepic,
  photos
) => {
  try {
    const profileUrl = await addProductProfile(previous, profilepic);
    const productPhotos = await uploadProductPhotosAndSaveURLs(
      previous,
      photos
    );
    const sno = Math.floor(Math.random() * 100);
    await addDoc(collection(db, `products/${previous}/${previous}col`), {
      name: name,
      number: number,
      about: about,
      price: price,
      gender: gender,
      size: size,
      profile: profileUrl,
      photos: productPhotos,
      sno: sno,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getProductDocs = async (id, secondid) => {
  try {
    const snapshot = await getDoc(
      doc(db, `products/${id}/${id}col/${secondid}`)
    );
    return snapshot.data();
  } catch (e) {
    console.log(e);
  }
};

export const applyProductFilters = async (
  id,
  minPrice,
  maxPrice,
  gender,
  size
) => {
  try {
    let q;
    console.log(size);
    if (gender.length != 0 && size.length != 0) {
      q = query(
        collection(db, `products/${id}/${id}col`),
        where("price", ">=", minPrice),
        where("price", "<=", maxPrice),
        where("gender", "in", gender),
        where("size", "in", size)
      );
    } else if (gender.length != 0) {
      q = query(
        collection(db, `products/${id}/${id}col`),
        where("price", ">=", minPrice),
        where("price", "<=", maxPrice),
        where("gender", "in", gender)
      );
    } else if (size.length != 0) {
      q = query(
        collection(db, `products/${id}/${id}col`),
        where("price", ">=", minPrice),
        where("price", "<=", maxPrice),
        where("size", "in", size)
      );
    } else {
      q = query(
        collection(db, `products/${id}/${id}col`),
        where("price", ">=", minPrice),
        where("price", "<=", maxPrice)
      );
    }
    const querySnapshot = await getDocs(q);
    const filteredData = [];
    querySnapshot.forEach((doc) => {
      filteredData.push({ id: doc.id, ...doc.data() });
    });

    console.log("Filtered Data:", filteredData);
    return filteredData;
  } catch (e) {
    console.log(e);
  }
};
