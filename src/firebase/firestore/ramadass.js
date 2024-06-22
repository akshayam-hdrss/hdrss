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
import { uploadIcons } from "@/firebase/firestore/common";
const db = getFirestore(app);

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
