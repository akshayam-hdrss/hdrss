import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import auth from "../config.js";


export default async function signIn(auth, email, password) {
  let result = null,
    error = null;
  try {
    result = await auth.signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}