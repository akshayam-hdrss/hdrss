import {
  getServicesAndProductsList,
  getServiceAndProductDocs,
  getName,
} from "@/firebase/firestore/servicesProducts";
import React from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import YoutubeEmbed from "@/components/ui/YoutubeEmbed";
import BackButton from "@/components/ui/BackButton";
import Link from "next/link";
import { getServiceAds } from "@/firebase/firestore/advertisements";
import Advertisement from "@/components/ui/Advertisement";
import { getYt } from "@/firebase/firestore/servicesyt";
import Image from "next/image";
export async function generateStaticParams() {
  const list = await getServicesAndProductsList(null, null, null, "services");
  return list.map((item) => ({
    id: item,
  }));
}

export default async function ServicePages({ params }) {
  const { id } = params;
  const decoded = decodeURIComponent(id);
  const data = await getServiceAndProductDocs(
    null,
    null,
    decoded,
    null,
    "services"
  );
  const capitalized = getName(null, null, decoded);
  const ads = await getServiceAds("services", null, null, id, null);
  const link = await getYt("services", null, null, id);
  return (
    <div>
      <Header />
      <BackButton route={`/services`} />
      <Advertisement ads={ads} />
      <div className="p-6 py-20 relative overflow-hidden">
        <h1 className="text-center font-bold text-2xl md:text-4xl pb-10">
          {capitalized}
        </h1>
        <Image
              src="/om.svg"
              alt="om"
              width={300}
              height={300}
              className="rotate-45 opacity-[0.04] absolute left-16 -top-2 -z-10"
            ></Image>
        <div className="grid grid-cols-2 gap-y-10 gap-x-4 items-center justify-center">
          {data.map((doc, index) => (
            <Link
              href={`/services/${id}/${doc.id}`}
              key={index}
              className="flex items-center md:gap-x-6 justify-center bg-[#F4F5F5] rounded-xl h-20 md:h-28 p-6 px-3"
            >
              <div className="w-1/3 md:w-1/5 lg:w-1/6 h-fit mr-3">
                <img
                  src={doc.data.iconUrl}
                  alt="Icon"
                  className="object-scale-down aspect-square"
                />
              </div>
              <h1 className="w-2/3 md:w-4/5 lg:w-5/6 md:text-xl md:font-medium mr-0">
                {doc.data.name}
              </h1>
            </Link>
          ))}
        </div>
      </div>
      <YoutubeEmbed embedId={link} />
      <Footer />
    </div>
  );
}
