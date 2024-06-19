import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../config.js";
import { app } from "../config";

import { doc, setDoc, getFirestore } from "firebase/firestore";
const db = getFirestore(app);

export default async function signUp(email, password, name) {
  let result = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;

    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: user.email,
    });
    return user;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
}
