import { app } from "../config";
import {
  getFirestore,
  doc,
  updateDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";
const db = getFirestore(app);

export const updateLevel1ServicesYt = async (type, ytlink) => {
  await updateDoc(doc(db, `${type}/yt`), { link: ytlink });
  console.log("updated yt link");
};

export const updateLevel2ServicesYt = async (level1, ytlink, type) => {
  await updateDoc(doc(db, `${type}/${level1}`), { link: ytlink });
  console.log("yt link updated");
};

export const updateLevel3ServicesYt = async (level1, level2, ytlink, type) => {
  await updateDoc(doc(db, `${type}/${level1}/${level1}col/${level2}`), {
    link: ytlink,
  });
  console.log("yt link updated");
};

export const updateLevel4ServicesYt = async (
  level1,
  level2,
  level3,
  ytlink,
  type
) => {
  await updateDoc(
    doc(db, `${type}/${level1}/${level1}col/${level2}/${level2}col/${level3}`),
    {
      link: ytlink,
    }
  );
  console.log("yt link updated");
};

export const getLevel1ServicesYt = async (type) => {
  try {
    const link = await getDoc(doc(db, `${type}/yt`));
    return link.data().link;
  } catch (e) {
    console.log(e);
  }
};

export const getLevel2ServicesYt = async (level1, type) => {
  try {
    const link = await getDoc(doc(db, `${type}/${level1}`));
    return link.data().link;
  } catch (e) {
    console.log(e);
  }
};

export const getLevel3ServicesYt = async (level1, level2, type) => {
  try {
    const link = await getDoc(
      doc(db, `${type}/${level1}/${level1}col/${level2}`)
    );
    return link.data().link;
  } catch (e) {
    console.log(e);
  }
};

export const getLevel4ServicesYt = async (level1, level2, level3, type) => {
  try {
    const link = await getDoc(
      doc(db, `${type}/${level1}/${level1}col/${level2}/${level2}col/${level3}`)
    );
    return link.data().link;
  } catch (e) {
    console.log(e);
  }
};
