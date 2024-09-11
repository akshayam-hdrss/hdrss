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
} from "firebase/storage";

const db = getFirestore(app);
const storage = getStorage(app);

const uploadBook = async (book) => {
  try {
    const bookRef = ref(storage, `library/${book.name}`);
    await uploadBytes(bookRef, book);
    const url = await getDownloadURL(bookRef);
    console.log("uploaded book");
    return url;
  } catch (e) {
    console.log(e);
  }
};

const uploadBookPhoto = async (photo, name) => {
  try {
    const photoRef = ref(storage, `library/${name}`);
    await uploadBytes(photoRef, photo);
    const photoUrl = await getDownloadURL(photoRef);
    console.log("uploaded photo");
    return photoUrl;
  } catch (e) {
    console.log(e);
  }
};
export const addLibraryBook = async (
  rootprevious,
  beforeprevious,
  previous,
  book,
  name,
  photo
) => {
  try {
    const url = await uploadBook(book);
    const photoUrl = await uploadBookPhoto(photo, name);
    await addDoc(
      collection(
        db,
        `explore/${rootprevious}/${rootprevious}col/${beforeprevious}/${beforeprevious}col/${previous}/${previous}col`
      ),
      { name: name, link: url, photo: photoUrl }
    );
    return "success";
  } catch (e) {
    console.log(e);
    return "failure";
  }
};
