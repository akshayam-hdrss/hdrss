import React from "react";
import {
  getServicesAndProductsList,
  getServiceAndProductDocs,
  getName,
} from "@/firebase/firestore/servicesProducts";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import YoutubeEmbed from "@/components/ui/YoutubeEmbed";
import BackButton from "@/components/ui/BackButton";
import Link from "next/link";
import { getYt } from "@/firebase/firestore/servicesyt";
import { getServiceAds } from "@/firebase/firestore/advertisements";
import Advertisement from "@/components/ui/Advertisement";

export async function generateStaticParams() {
  const list = await getServicesAndProductsList(null, null, null, "explore");
  const paths = await Promise.all(
    list.map(async (item) => {
      const list2 = await getServicesAndProductsList(
        null,
        null,
        item,
        "explore"
      );
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
  const decodedfirst = decodeURIComponent(id);
  const decodedsecond = decodeURIComponent(secondid);
  const data = await getServiceAndProductDocs(
    null,
    decodedfirst,
    decodedsecond,
    null,
    "explore"
  );
  const capitalized = await getName(null, decodedfirst, decodedsecond);
  const link = await getYt("explore", null, decodedfirst, decodedsecond);
  const ads = await getServiceAds(
    "explore",
    null,
    decodedfirst,
    decodedsecond,
    null
  );
  return (
    <div>
      <Header />
      <BackButton />
      <Advertisement ads={ads} />
      <div className="p-6 py-20">
        <h1 className="font-bold text-2xl md:text-4xl text-center pb-20">
          {capitalized}
        </h1>
        <div className="grid grid-cols-2 gap-y-10 gap-x-4 items-center justify-center">
          {data.map((doc, index) => (
            <Link
              href={`/explore/${id}/${secondid}/${doc.id}`}
              key={index}
              className="flex items-center justify-center bg-[#F4F5F5] rounded-xl h-20 md:h-28 md:gap-x-6 p-6 px-3"
            >
              <div className="w-1/3 md:w-1/5 lg:w-1/6 h-fit mr-3">
                <img
                  src={doc.data.iconUrl}
                  alt="Icon"
                  className="object-scale-down aspect-square"
                />
              </div>
              <h1 className="w-2/3 md:w-4/5 lg:w-5/6 mr-0">{doc.data.name}</h1>
            </Link>
          ))}
        </div>
      </div>
      <YoutubeEmbed embedId={link} />
      <Footer />
    </div>
  );
}

export default ServiceLevel2Page;
