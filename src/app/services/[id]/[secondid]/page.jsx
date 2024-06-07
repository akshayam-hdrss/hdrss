import React from "react";
import { getServicesDocs, getServicesList } from "@/firebase/firestore/getData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import YoutubeEmbed from "@/components/YoutubeEmbed";
import ServiceCard from "@/components/ServiceCard";
export async function generateStaticParams() {
  const list = await getServicesList(null, null);
  const paths = await Promise.all(
    list.map(async (item) => {
      const list2 = await getServicesList(null, item);
      return list2.map((subitem) => ({
        id: item,
        secondid: subitem,
      }));
    })
  );
  // Flatten the array of arrays into a single array of objects
  return paths.flat();
}

async function ServiceLevel2Page({ params }) {
  const { id, secondid } = params;
  const data = await getServicesDocs(id, secondid);
  return (
    <div>
      <Header />
      <YoutubeEmbed embedId="#" />
      <div className="p-6 py-20">
        <h1 className="font-bold text-3xl text-center pb-20">{secondid}</h1>
        <div className="grid grid-cols-3 gap-y-10 gap-x-4 items-center justify-center">
          {data.map((doc) => (
            <ServiceCard
              name={doc.data.name}
              url={doc.data.iconUrl}
              slug={`/services/${id}/${secondid}/${doc.id}`}
            />
          ))}
        </div>
      </div>
      <YoutubeEmbed embedId="#" />
      <Footer />
    </div>
  );
}

export default ServiceLevel2Page;
