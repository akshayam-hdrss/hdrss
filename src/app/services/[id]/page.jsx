import { getServicesDocs, getServicesList } from "@/firebase/firestore/getData";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import YoutubeEmbed from "@/components/YoutubeEmbed";
import ServiceCard from "@/components/ServiceCard";

export async function generateStaticParams() {
  const list = await getServicesList();
  return list.map((item) => ({
    id: item,
  }));
}

export default async function ServicePages({ params }) {
  const { id } = params;
  const data = await getServicesDocs(null, id);
  console.log(data);
  return (
    <div>
      <Header />
      <div>
        <YoutubeEmbed embedId="#" />
        <h1>hello from {id}</h1>
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
      <Footer />
    </div>
  );
}
