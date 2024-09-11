"use client";
import React, { useState, useEffect } from "react";
import { getName } from "@/firebase/firestore/servicesProducts";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Link from "next/link";
import BackButton from "@/components/ui/BackButton";
import { getYt } from "@/firebase/firestore/servicesyt";
import { getServiceAds } from "@/firebase/firestore/advertisements";
import Advertisement from "@/components/ui/Advertisement";
import YoutubeEmbed from "@/components/ui/YoutubeEmbed";
import { subscribeToServiceAndProductDocs } from "@/firebase/firestore/servicesProducts";

function ServiceLevel3({ decodedfirst, decodedsecond, decodedthird }) {
  const [data, setData] = useState();
  const [ads, setAds] = useState();
  const [capitalized, setCapitalized] = useState();
  const [link, setLink] = useState();

  useEffect(() => {
    const unsubscribe = subscribeToServiceAndProductDocs(
      setData,
      decodedthird,
      decodedsecond,
      decodedfirst,
      "services"
    );
    const fetch = async () => {
      const capitalized = await getName(
        decodedfirst,
        decodedsecond,
        decodedthird,
        "services"
      );
      setCapitalized(capitalized);
      const link = await getYt(
        "services",
        decodedfirst,
        decodedsecond,
        decodedthird
      );
      setLink(link);
      const ads = await getServiceAds(
        "services",
        decodedfirst,
        decodedsecond,
        decodedthird,
        null
      );
      setAds(ads);
    };
    fetch();
    return () => {
      unsubscribe();
    };
  });
  return (
    <div>
      <Header />
      <BackButton />
      <Advertisement ads={ads} />
      <div>
        <h1 className="font-bold text-2xl pb-20 p-6">{capitalized}</h1>

        {data &&
          data.map((item) => (
            <Link
              href={`/services/${decodedfirst}/${decodedsecond}/${decodedthird}/${item.id}`}
              key={item.id}
              className="flex justify-start px-6 items-start border-b border-grey pb-3 mb-5 mx-0"
            >
              <div className="h-fit w-[130px] inline-block">
                <img
                  src={item.profile}
                  alt="Profile"
                  className=" rounded-xl object-cover aspect-[4/5]"
                />
              </div>
              <div className="flex flex-col justify-between items-center w-[70%]">
                <h1 className="font-bold text-3xl">{item.name}</h1>
                <h2 className="text-lg font-medium">{item.businessname}</h2>

                <p className="font-medium text-grey mt-0 pt-0">{item.area}</p>
              </div>
            </Link>
          ))}
      </div>
      <YoutubeEmbed embedId={link} />
      <Footer />
    </div>
  );
}

export default ServiceLevel3;
