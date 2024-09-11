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

function ExploreLevel3({ id, secondid, thirdid }) {
  const [data, setData] = useState();
  const [ads, setAds] = useState();
  const [capitalized, setCapitalized] = useState();
  const [link, setLink] = useState();
  useEffect(() => {
    const unsubscribe = subscribeToServiceAndProductDocs(
      setData,
      thirdid,
      secondid,
      id,
      "explore"
    );
    const fetch = async () => {
      const capitalized = await getName(id, secondid, thirdid, "explore");
      setCapitalized(capitalized);
      const link = await getYt("explore", id, secondid, thirdid);
      setLink(link);
      const ads = await getServiceAds("explore", id, secondid, thirdid, null);
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
        <div className="grid grid-cols-2 px-12 gap-x-2">
          {data &&
            data.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-center px-3 rounded-md items-center py-3 border border-grey mb-5 mx-0 h-max"
              >
                <img
                  src={item.photo}
                  alt="Profile"
                  className=" rounded-md object-cover h-2/3 w-full"
                />
                <div className="h-1/3 flex flex-col">
                  <h1 className="mt-4 font-medium text-lg text-center">
                    {item.name}
                  </h1>
                  <a
                    href={item.link}
                    className="bg-kaavi px-4 py-1 rounded-sm text-white mt-1"
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
      <YoutubeEmbed embedId={link} />
      <Footer />
    </div>
  );
}

export default ExploreLevel3;
