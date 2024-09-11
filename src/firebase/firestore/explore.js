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

const uploadBook = async (book, rootprevious) => {
  try {
    const bookRef = ref(storage, `${rootprevious}/${book.name}`);
    await uploadBytes(bookRef, book);
    const url = await getDownloadURL(bookRef);
    console.log("uploaded book");
    return url;
  } catch (e) {
    console.log(e);
  }
};

const uploadBookPhoto = async (photo, name, rootprevious) => {
  try {
    const photoRef = ref(storage, `${rootprevious}/${name}`);
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
    const url = await uploadBook(book, rootprevious);
    const photoUrl = await uploadBookPhoto(photo, name, rootprevious);
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

export const addAstrology = async (
  rootprevious,
  beforeprevious,
  previous,
  date,
  description,
  video
) => {
  try {
    await addDoc(
      collection(
        db,
        `explore/${rootprevious}/${rootprevious}col/${beforeprevious}/${beforeprevious}col/${previous}/${previous}col`
      ),
      {
        description: description,
        video: video,
        date: date,
      }
    );
    console.log("added astrology");
    return "success";
  } catch (e) {
    console.log(e);
  }
};
