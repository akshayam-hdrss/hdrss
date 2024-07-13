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
  where,
  query,
  orderBy,
} from "firebase/firestore";
import { ref, deleteObject, getStorage, getMetadata } from "firebase/storage";
import { uploadIcons, uploadFilesAndSaveURLs } from "./common";

const db = getFirestore(app);
const storage = getStorage(app);

export async function addServiceAndProduct(
  beforeprevious = null,
  previous = null,
  id = null,
  data,
  file,
  type
) {
  let result = null;
  let e = null;
  console.log("inside firebase");
  try {
    let docUrl;
    if (beforeprevious != null) {
      docUrl = `${type}/${beforeprevious}/${beforeprevious}col/${previous}/${previous}col`;
    } else if (previous != null) {
      docUrl = `${type}/${previous}/${previous}col`;
    } else {
      docUrl = `${type}`;
    }
    const fileUrl = await uploadIcons(file, id);
    const docData = { ...data, iconUrl: fileUrl };
    result = await setDoc(doc(db, docUrl, id), docData);
    console.log("added service");
  } catch (e) {
    console.log(e);
    return "failure";
  }
}

export async function addServicesAndProductsDoc(
  rootprevious,
  beforeprevious,
  previous,
  data,
  profilepic = null,
  photos = null,
  type,
  id
) {
  let result = null;
  let e = null;
  try {
    let docUrl;
    let pfpUrl;
    let galleryUrls;
    let docData;
    console.log("inside");
    docUrl = `${type}/${rootprevious}/${rootprevious}col/${beforeprevious}/${beforeprevious}col/${previous}/${previous}col`;
    if (profilepic != null && photos != null) {
      pfpUrl = await uploadIcons(profilepic, id);
      galleryUrls = await uploadFilesAndSaveURLs(photos);
      docData = {
        ...data,
        profile: pfpUrl,
        photos: galleryUrls,
      };
    } else if (photos != null) {
      galleryUrls = await uploadFilesAndSaveURLs(photos);
      docData = {
        ...data,
        photos: galleryUrls,
      };
    } else if (profilepic != null) {
      pfpUrl = await uploadIcons(profilepic, id);
      docData = {
        ...data,
        profile: pfpUrl,
      };
    } else {
      docData = { ...data };
    }
    result = await setDoc(doc(db, docUrl, id), docData);
    console.log("added service document");
    return result;
  } catch (e) {
    console.log(e);
    return "failed in adding service document";
  }
}

export async function deleteServicesAndProducts(
  rootprevious = null,
  beforeprevious = null,
  previous = null,
  id,
  iconUrl,
  type
) {
  let result = null;
  let e = null;

  try {
    let docUrl;
    if (rootprevious != null) {
      docUrl = `${type}/${rootprevious}/${rootprevious}col/${beforeprevious}/${beforeprevious}col/${previous}/${previous}col`;
    } else if (beforeprevious != null) {
      docUrl = `${type}/${beforeprevious}/${beforeprevious}col/${previous}/${previous}col`;
    } else if (previous != null) {
      docUrl = `${type}/${previous}/${previous}col`;
    } else {
      docUrl = "services";
    }
    if (iconUrl != null) {
      const fileRef = ref(storage, iconUrl);
      deleteObject(fileRef)
        .then(() => {
          console.log("deleted successfully");
        })
        .catch((e) => {
          console.log(e);
        });
      await deleteDoc(doc(db, docUrl, id));

      return "success";
    } else {
      await deleteDoc(doc(db, docUrl, id));

      return "success";
    }
  } catch (e) {
    console.log(e);
    return "failure";
  }
}

export async function deleteServicesAndProductsDoc(
  rootprevious = null,
  beforeprevious = null,
  previous = null,
  id,
  profilepic,
  photos,
  type
) {
  let result = null;
  let e = null;

  try {
    let docUrl;
    console.log(photos);
    docUrl = `${type}/${rootprevious}/${rootprevious}col/${beforeprevious}/${beforeprevious}col/${previous}/${previous}col`;

    if (photos != "") {
      photos.map((photo) => {
        const fileRef = ref(storage, photo);
        deleteObject(fileRef)
          .then(() => {
            console.log("photo deleted successfully");
          })
          .catch((e) => {
            console.log(e);
          });
      });
    }
    if (profilepic != "") {
      const fileRef = ref(storage, profilepic);
      deleteObject(fileRef)
        .then(() => {
          console.log("profile deleted successfully");
        })
        .catch((e) => {
          console.log(e);
        });
      await deleteDoc(doc(db, docUrl, id));

      return "success";
    } else {
      await deleteDoc(doc(db, docUrl, id));
      return "success";
    }
  } catch (e) {
    console.log(e);
    return "failure";
  }
}

export async function editServicesAndProducts(
  rootprevious = null,
  beforeprevious = null,
  previous = null,
  id,
  name,
  icon,
  iconUrl,
  type
) {
  let result = null;
  let e = null;
  try {
    let docUrl;
    let fileUrl;
    if (rootprevious != null) {
      docUrl = `${type}/${rootprevious}/${rootprevious}col/${beforeprevious}/${beforeprevious}col/${previous}/${previous}col`;
    } else if (beforeprevious != null) {
      docUrl = `${type}/${beforeprevious}/${beforeprevious}col/${previous}/${previous}col`;
    } else if (previous != null) {
      docUrl = `${type}/${previous}/${previous}col`;
    } else {
      docUrl = type;
    }
    if (icon != null && name != null) {
      const fileRef = ref(storage, iconUrl);
      deleteObject(fileRef)
        .then(() => {
          console.log("deleted successfully");
        })
        .catch((e) => {
          console.log(e);
        });
      fileUrl = await uploadIcons(icon, id);
      await updateDoc(doc(db, docUrl, id), {
        name: name,
        iconUrl: fileUrl,
      });
    } else if (icon != null) {
      if (iconUrl) {
        const fileRef = ref(storage, iconUrl);

        getMetadata(fileRef)
          .then(() => {
            // File exists, proceed to delete
            deleteObject(fileRef)
              .then(() => {
                console.log("deleted successfully");
              })
              .catch((e) => {
                console.log("Error deleting file:", e);
              });
          })
          .catch((e) => {
            if (e.code === "storage/object-not-found") {
              console.log("File does not exist");
            } else {
              console.log("Error checking file:", e);
            }
          });
      }

      fileUrl = await uploadIcons(icon, id);
      await updateDoc(doc(db, docUrl, id), {
        iconUrl: fileUrl,
      });
    } else {
      await updateDoc(doc(db, docUrl, id), {
        name: name,
      });
    }
  } catch (e) {
    console.log(e);
    return "failure";
  }
}

export async function editServiceAndProductDocs(
  rootprevious = null,
  beforeprevious = null,
  previous = null,
  id,
  data,
  newprofile,
  newphotos,
  oldprofile,
  oldphotos,
  type
) {
  try {
    let docUrl;
    let fileUrl;
    docUrl = `${type}/${rootprevious}/${rootprevious}col/${beforeprevious}/${beforeprevious}col/${previous}/${previous}col/${id}`;

    // check for old profile
    if (newprofile != null) {
      //delete old profile pic
      if ( oldprofile != undefined) {
        const oldprofileRef = ref(storage, oldprofile);
        await getMetadata(oldprofileRef)
          .then(() => {
            deleteObject(oldprofileRef)
              .then(() => console.log("deleted old profile pic"))
              .catch((e) => console.log(e));
          })
          .catch((e) => console.log(e));
      }

      const newprofileRef = ref(storage, newprofile);
      const newprofileUrl = await uploadIcons(newprofileRef, id);
      data.profile = newprofileUrl;
    }

    //check for old photos
    if (newphotos != null) {
      //delete old photos
      if (oldphotos != []) {
        oldphotos.map(async (oldphoto) => {
          const oldphotoRef = ref(storage, oldphoto);

          await getMetadata(oldphotoRef)
            .then(() => {
              deleteObject(oldphotoRef)
                .then(() => console.log("deleted old photo"))
                .catch((e) => console.log(e));
            })
            .catch((e) => console.log(e));
        });
      }

      let newphotosUrls = [];
      newphotos.map(async (newphoto) => {
        const newphotoRef = ref(storage, newphoto);
        const newphotosUrl = uploadIcons(newphotoRef, id);
        newphotosUrls.push(newphotosUrl);
      });
      data.photos = newphotosUrls;
    }

    await updateDoc(doc(db, docUrl), data);
    console.log("doc updated");
  } catch (e) {
    console.log(e);
    return "failure";
  }
}

export const subscribeToServicesAndProducts = (
  callback,
  docid = null,
  beforedocid = null,
  type
) => {
  try {
    if (beforedocid != null) {
      const q = query(
        collection(
          db,
          type,
          beforedocid,
          `${beforedocid}col`,
          docid,
          `${docid}col`
        ),
        orderBy("sno")
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        let data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        callback(data);
      });
      return unsubscribe;
    } else if (docid != null) {
      const q = query(
        collection(db, type, docid, `${docid}col`),
        orderBy("sno")
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        let data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        callback(data);
      });
      return unsubscribe;
    } else {
      const q = query(
        collection(db, type),
        orderBy("sno"),
        where("__name__", "not-in", ["ads", "yt"])
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        let data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        callback(data);
      });
      return unsubscribe;
    }
  } catch (e) {
    console.log(e);
  }
};

export const subscribeToServiceAndProductDocs = (
  callback,
  docid,
  beforedocid,
  rootdocid,
  type
) => {
  try {
    const unsubscribe = onSnapshot(
      collection(
        db,
        type,
        rootdocid,
        `${rootdocid}col`,
        beforedocid,
        `${beforedocid}col`,
        docid,
        `${docid}col`
      ),
      (snapshot) => {
        let data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        callback(data);
      }
    );
    return unsubscribe;
  } catch (e) {
    console.log(e);
  }
};

export const getServicesAndProductsList = async (
  rootbeforedocid = null,
  rootdocid = null,
  beforedocid = null,
  type
) => {
  try {
    let data = [];
    let snapshot;
    if (rootbeforedocid != null && rootdocid != null && beforedocid != null) {
      snapshot = await getDocs(
        collection(
          db,
          `${type}/${rootbeforedocid}/${rootbeforedocid}col/${rootdocid}/${rootdocid}col/${beforedocid}/${beforedocid}col`
        )
      );
    } else if (rootdocid != null && beforedocid != null) {
      snapshot = await getDocs(
        collection(
          db,
          `${type}/${rootdocid}/${rootdocid}col/${beforedocid}/${beforedocid}col`
        )
      );
    } else if (beforedocid != null) {
      snapshot = await getDocs(
        collection(db, `${type}/${beforedocid}/${beforedocid}col`)
      );
    } else {
      snapshot = await getDocs(collection(db, `${type}`));
    }
    snapshot.forEach((doc) => data.push(doc.id));
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getServiceAndProductDocs = async (
  rootbeforedocid = null,
  rootdocid = null,
  beforedocid = null,
  docid = null,
  type
) => {
  try {
    let q;
    let querySnapshot;
    let alldocs = [];
    if (docid != null) {
      q = doc(
        db,
        `${type}/${rootbeforedocid}/${rootbeforedocid}col/${rootdocid}/${rootdocid}col/${beforedocid}/${beforedocid}col`,
        docid
      );
    } else if (rootbeforedocid != null) {
      q = collection(
        db,
        `${type}/${rootbeforedocid}/${rootbeforedocid}col/${rootdocid}/${rootdocid}col/${beforedocid}/${beforedocid}col`
      );
    } else if (rootdocid != null && beforedocid != null) {
      q = collection(
        db,
        `${type}/${rootdocid}/${rootdocid}col/${beforedocid}/${beforedocid}col`
      );
    } else if (beforedocid != null) {
      q = collection(db, `${type}/${beforedocid}/${beforedocid}col/`);
    } else {
      q = collection(db, type);
    }
    if (docid == null) {
      querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        alldocs.push({ id: doc.id, data: doc.data() });
      });
      return alldocs;
    } else {
      querySnapshot = await getDoc(q);
      return querySnapshot.data();
    }
  } catch (e) {
    console.log(e);
  }
};

export async function getLocation() {
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

export async function getName(beforeprevious = null, previous = null, id) {
  try {
    let document;
    if (beforeprevious != null) {
      document = await getDoc(
        doc(
          db,
          `services/${beforeprevious}/${beforeprevious}col/${previous}/${previous}col/${id}`
        )
      );
    } else if (previous != null) {
      document = await getDoc(
        doc(db, `services/${previous}/${previous}col/${id}`)
      );
    } else {
      document = await getDoc(doc(db, `services/${id}`));
    }

    return document.data().name;
  } catch (e) {
    console.log(e);
  }
}
