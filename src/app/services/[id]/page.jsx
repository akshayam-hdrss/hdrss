import {
  getServicesAndProductsList,
  getServiceAndProductDocs,
} from "@/firebase/firestore/servicesProducts";
import React from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import YoutubeEmbed from "@/components/ui/YoutubeEmbed";
import ServiceCard from "@/components/ui/ServiceCard";
import BackButton from "@/components/ui/BackButton";
import Link from "next/link";
export async function generateStaticParams() {
  const list = await getServicesAndProductsList(null, null, null, "services");
  return list.map((item) => ({
    id: item,
  }));
}

export default async function ServicePages({ params }) {
  const { id } = params;
  const data = await getServiceAndProductDocs(null, null, id, null, "services");
  console.log(data)
  const capitalized = id.charAt(0).toUpperCase() + id.slice(1);

  return (
    <div>
      <Header />
      <BackButton route={`/services`} />

      <div className="p-6 py-20">
        <h1 className="text-center font-bold text-2xl pb-10">{capitalized}</h1>
        <div className="grid grid-cols-2 gap-y-10 gap-x-4 items-center justify-center">
          {data.map((doc) => (
            <Link
              href={`/services/${id}/${doc.id}`}
              className="flex items-center justify-center bg-[#F4F5F5] rounded-xl h-20 p-6 px-3"
            >
              <div className="w-1/3 h-fit mr-3">
                <img
                  src={doc.data.iconUrl}
                  alt="Icon"
                  className="object-scale-down aspect-square"
                />
              </div>
              <h1 className="w-2/3 mr-0">{doc.data.name}</h1>
            </Link>
          ))}
        </div>
      </div>
      <YoutubeEmbed embedId="#" />
      <Footer />
    </div>
  );
}
