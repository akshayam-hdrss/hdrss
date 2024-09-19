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
import { getServiceAndProductDocs } from "./servicesProducts";

const db = getFirestore(app);
const storage = getStorage(app);

export const addCharity = async (
  name,
  description,
  video,
  profile,
  backgroundPhoto
) => {
  try {
    const profileUrl = await addCharityPhoto(profile, name);
    const backgroundUrl = await addCharityBackground(backgroundPhoto);
    const charityRef = collection(db, "charities");
    await addDoc(charityRef, {
      name: name,
      description: description,
      video: video,
      profile: profileUrl,
      background: backgroundUrl,
    });
  } catch (e) {
    console.log(e);
  }
};

export const addCharityPhoto = async (profile, name) => {
  try {
    const profileRef = ref(storage, `charities/${name}`);
    await uploadBytes(profileRef, profile);
    const downloadURL = await getDownloadURL(profileRef);
    return downloadURL;
  } catch (e) {
    console.log(e);
  }
};

export const addCharityBackground = async (backgroundPhoto) => {
  try {
    const backgroundRef = ref(
      storage,
      `charities/backgrounds/${backgroundPhoto.name}`
    );
    await uploadBytes(backgroundRef, backgroundPhoto);
    const downloadURL = await getDownloadURL(backgroundRef);
    return downloadURL;
  } catch (e) {
    console.log(e);
  }
};

export const getCharities = async () => {
  try {
    let charities = [];
    const snapshot = await getDocs(collection(db, "charities"));
    snapshot.docs.map((doc) => {
      charities.push({ id: doc.id, data: doc.data() });
    });
    return charities;
  } catch (e) {
    console.log(e);
  }
};
