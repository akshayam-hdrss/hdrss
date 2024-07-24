import {
  getServiceAndProductDocs,
  getServicesAndProductsList,
} from "@/firebase/firestore/servicesProducts";
import React from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import YoutubeEmbed from "@/components/ui/YoutubeEmbed";
import ServiceCard from "@/components/ui/ServiceCard";
import BackButton from "@/components/ui/BackButton";
import AdCarousel from "../../../components/ui/AdCarousel";
import { getServiceAds } from "@/firebase/firestore/advertisements";

export async function generateStaticParams() {
  const list = await getServicesAndProductsList(null, null, null, "products");
  return list.map((item) => ({
    id: item,
  }));
}

export default async function ProductPages({ params }) {
  const { id } = params;
  const data = await getServiceAndProductDocs(null, null, id, null, "products");
  const capitalized = id.charAt(0).toUpperCase() + id.slice(1);

  const ads = await getServiceAds("products", null, null, null, null);
  return (
    <div>
      <Header />
      <BackButton />
      <AdCarousel ads={ads} />

      <div className="p-6 py-20">
        <h1 className="text-center font-bold text-2xl pb-10">{capitalized}</h1>
        <div className="grid grid-cols-3 gap-y-10 gap-x-4 items-center justify-center">
          {data.map((doc) => (
            <ServiceCard
              name={doc.data.name}
              url={doc.data.iconUrl}
              slug={`/products/${id}/${doc.id}`}
            />
          ))}
        </div>
      </div>
      <YoutubeEmbed embedId="#" />
      <Footer />
    </div>
  );
}
