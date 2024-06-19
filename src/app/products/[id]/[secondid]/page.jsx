import React from "react";
import { getProductsDocs, getProductsList } from "@/firebase/firestore/getData";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import YoutubeEmbed from "@/components/ui/YoutubeEmbed";
import ServiceCard from "@/components/ui/ServiceCard";
import BackButton from "@/components/ui/BackButton";

export async function generateStaticParams() {
  const list = await getProductsList(null, null, null);
  const paths = await Promise.all(
    list.map(async (item) => {
      const list2 = await getProductsList(null, null, item);
      return list2.map((subitem) => ({
        id: item,
        secondid: subitem,
      }));
    })
  );
  // Flatten the array of arrays into a single array of objects
  return paths.flat();
}

async function ProductLevel2Page({ params }) {
  const { id, secondid } = params;
  const data = await getProductsDocs(null, id, secondid);
  const capitalized = secondid.charAt(0).toUpperCase() + secondid.slice(1);
  return (
    <div>
      <Header />
      <BackButton route={`/products/${id}/`} />
      <YoutubeEmbed embedId="#" />
      <div className="p-6 py-20">
        <h1 className="font-bold text-3xl text-center pb-20">{capitalized}</h1>
        <div className="grid grid-cols-3 gap-y-10 gap-x-4 items-center justify-center">
          {data.map((doc) => (
            <ServiceCard
              name={doc.data.name}
              url={doc.data.iconUrl}
              slug={`/products/${id}/${secondid}/${doc.id}`}
            />
          ))}
        </div>
      </div>
      <YoutubeEmbed embedId="#" />
      <Footer />
    </div>
  );
}

export default ProductLevel2Page;
