"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import YoutubeEmbed from "@/components/ui/YoutubeEmbed";
import BackButton from "@/components/ui/BackButton";
import Link from "next/link";
import { getServiceAds } from "@/firebase/firestore/advertisements";
import Advertisement from "@/components/ui/Advertisement";
import { getYt } from "@/firebase/firestore/servicesyt";
import Image from "next/image";
import { subscribeToServicesAndProducts } from "@/firebase/firestore/servicesProducts";
import { getName } from "@/firebase/firestore/servicesProducts";
function ServiceLevel1({ id }) {
  const [data, setData] = useState();
  const [ads, setAds] = useState();
  const [capitalized, setCapitalized] = useState();
  const [link, setLink] = useState();
  useEffect(() => {
    const fetch = async () => {
      const ads = await getServiceAds("products", null, null, id, null);
      setAds(ads);
      const capitalized = getName(null, null, id, "products");
      setCapitalized(capitalized);
      const link = await getYt("products", null, null, id);
      setLink(link);
    };
    const unsubscribe = subscribeToServicesAndProducts(
      setData,
      id,
      null,
      "products"
    );
    fetch();
    return () => {
      unsubscribe();
    };
  }, []);
  console.log(data);
  return (
    <div>
      <Header />
      <BackButton />
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
          {data &&
            data.map((doc, index) => (
              <Link
                href={`/products/${id}/${doc.id}`}
                key={index}
                className="flex items-center text-center md:gap-x-6 justify-center bg-[#F4F5F5] rounded-xl h-20 md:h-28 p-6 px-3"
              >
                <div className="w-1/3 md:w-1/5 lg:w-1/6 h-fit mr-3">
                  <img
                    src={doc.iconUrl}
                    alt="Icon"
                    className="object-scale-down aspect-square"
                  />
                </div>
                <h1 className="w-2/3 md:w-4/5 lg:w-5/6 md:text-xl md:font-medium mr-0">
                  {doc.name}
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

export default ServiceLevel1;
