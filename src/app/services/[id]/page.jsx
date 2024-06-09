import { getServicesDocs, getServicesList } from "@/firebase/firestore/getData";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import YoutubeEmbed from "@/components/YoutubeEmbed";
import ServiceCard from "@/components/ServiceCard";
import BackButton from "@/components/BackButton";

export async function generateStaticParams() {
  const list = await getServicesList();
  return list.map((item) => ({
    id: item,
  }));
}

export default async function ServicePages({ params }) {
  const { id } = params;
  const data = await getServicesDocs(null, null, id);
  console.log(data);
  const capitalized = id.charAt(0).toUpperCase() + id.slice(1);

  return (
    <div>
      <Header />
      <BackButton route={`/services`} />
      <YoutubeEmbed embedId="#" />
      <div className="p-6 py-20">
        <h1 className="text-center font-bold text-2xl pb-10">{capitalized}</h1>
        <div className="grid grid-cols-3 gap-y-10 gap-x-4 items-center justify-center">
          {data.map((doc) => (
            <ServiceCard
              name={doc.data.name}
              url={doc.data.iconUrl}
              slug={`/services/${id}/${doc.id}`}
            />
          ))}
        </div>
      </div>
      <YoutubeEmbed embedId="#" />
      <Footer />
    </div>
  );
}
