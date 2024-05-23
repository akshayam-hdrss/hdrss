import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../config.js";

export default async function signUp(auth, email, password) {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
