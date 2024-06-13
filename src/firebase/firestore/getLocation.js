import { collection, getFirestore, getDocs } from "firebase/firestore";

import { app } from "../config";
const db = getFirestore(app);

async function getLocation() {
  try {
    let level1data = [];
    let level3data = [];
    let locations = [];
    let districts = [];
    const level1 = await getDocs(collection(db, "services"));
    level1.forEach((doc) => {
      level1data.push(doc.id);
    });

    const getLevel2 = async () => {
      let level2data = await Promise.all(
        level1data.map(async (doc) => {
          const level2 = await getDocs(
            collection(db, `services/${doc}/${doc}col`)
          );
          const leve = level2.docs.map((doc) => doc.id);
          leve.map(async (lev) => {
            const level3 = await getDocs(
              collection(db, `services/${doc}/${doc}col/${lev}/${lev}col`)
            );
            level3data.push(level3.docs.map((doc) => doc.id));
            const leve2 = level3.docs.map((doc) => doc.id);
            leve2.map(async (doc2) => {
              const lev4 = await getDocs(
                collection(
                  db,
                  `services/${doc}/${doc}col/${lev}/${lev}col/${doc2}/${doc2}col`
                )
              );
              locations.push(lev4.docs.map((doc) => doc.data().location));
              districts.push(lev4.docs.map((doc) => doc.data().district));
            });
          });
        })
      );
    };
    getLevel2();
    return [locations, districts];
  } catch (e) {
    console.log(e);
  }
}

export default getLocation;
