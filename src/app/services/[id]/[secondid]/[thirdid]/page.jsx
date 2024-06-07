import React from "react";
import { getServicesDocs, getServicesList } from "@/firebase/firestore/getData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export async function generateStaticParams() {
  const list = await getServicesList(null, null);
  const paths = await Promise.all(
    list.map(async (item) => {
      const list2 = await getServicesList(null, item);
      list2.map(async (subitem) => {
        const list3 = await getServicesList(item, subitem);
        return list3.map((subitem2) => ({
          id: item,
          secondid: subitem,
          thirdid: subitem2,
        }));
      });
    })
  );
  // Flatten the array of arrays into a single array of objects
  return paths.flat();
}

function ServiceLevel3Page({ params }) {
  const { id, secondid, thirdid } = params;
  console.log(secondid);
  return (
    <div>
      <Header />
      <div></div>
      <Footer />
    </div>
  );
}

export default ServiceLevel3Page;
