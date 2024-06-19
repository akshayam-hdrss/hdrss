import { collection, getFirestore, getDocs } from "firebase/firestore";

import { app } from "../config";
const db = getFirestore(app);

async function getLocation() {
  try {
    let locations = [];
    const level1data = [];
    const level1 = await getDocs(collection(db, "services"));

    for (const doc of level1.docs) {
      const level2 = await getDocs(
        collection(db, `services/${doc.id}/${doc.id}col`)
      );
      for (const doc2 of level2.docs) {
        const level3 = await getDocs(
          collection(
            db,
            `services/${doc.id}/${doc.id}col/${doc2.id}/${doc2.id}col`
          )
        );
        for (const doc3 of level3.docs) {
          const level4 = await getDocs(
            collection(
              db,
              `services/${doc.id}/${doc.id}col/${doc2.id}/${doc2.id}col/${doc3.id}/${doc3.id}col`
            )
          );
          for (const doc4 of level4.docs) {
            locations.push(doc4.data().location);
          }
        }
      }
    }

    return locations;
  } catch (e) {
    console.error("Error fetching locations:", e);
    throw e; // Re-throw error for proper error handling in calling code
  }
}
export async function getDistrict() {
  try {
    let locations = [];
    const level1data = [];
    const level1 = await getDocs(collection(db, "services"));

    for (const doc of level1.docs) {
      const level2 = await getDocs(
        collection(db, `services/${doc.id}/${doc.id}col`)
      );
      for (const doc2 of level2.docs) {
        const level3 = await getDocs(
          collection(
            db,
            `services/${doc.id}/${doc.id}col/${doc2.id}/${doc2.id}col`
          )
        );
        for (const doc3 of level3.docs) {
          const level4 = await getDocs(
            collection(
              db,
              `services/${doc.id}/${doc.id}col/${doc2.id}/${doc2.id}col/${doc3.id}/${doc3.id}col`
            )
          );
          for (const doc4 of level4.docs) {
            locations.push(doc4.data().district);
          }
        }
      }
    }

    return locations;
  } catch (e) {
    console.error("Error fetching locations:", e);
    throw e; // Re-throw error for proper error handling in calling code
  }
}
export default getLocation;
