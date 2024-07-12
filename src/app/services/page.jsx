"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Level1Services from "@/components/ui/Level1Services";
import BackButton from "@/components/ui/BackButton";
import YoutubeEmbed from "@/components/ui/YoutubeEmbed";
import { Carousel } from "@material-tailwind/react";
import { getLevel1ServiceAds } from "@/firebase/firestore/advertisements";
import { getLevel1ServicesYt } from "@/firebase/firestore/servicesyt";
function Services() {
  const [ads, setAds] = useState([]);
  const [link, setLink] = useState();
  useEffect(() => {
    const fetch = async () => {
      const ads = await getLevel1ServiceAds();

      setAds(ads);

      const link = await getLevel1ServicesYt("services");
      setLink(link);
    };
    fetch();
  }, []);

  return (
    <div>
      <Header />
      <BackButton route="/" />
      <Carousel>
        {ads &&
          ads.map((ad, index) => (
            <div
              key={index}
              className="max-h-[300px] md:max-h-[500px] w-[100vw] md:w-[70vw] mx-auto overflow-hidden"
            >
              <img
                src={ad}
                alt="advertisement"
                className="w-full object-contain aspect-video"
              />
            </div>
          ))}
      </Carousel>
      <div className="mt-4 p-6 text-center">
        <h1 className="font-koulen uppercase text-4xl text-grey">services</h1>
        <div className="grid grid-cols-3 gap-y-10 gap-x-10 mt-8 place-items-center">
          <Level1Services />
        </div>
      </div>
      <div className="my-4">
        <YoutubeEmbed embedId={link} />
      </div>
      <Footer />
    </div>
  );
}

export default Services;
