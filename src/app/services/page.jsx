"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import BackButton from "@/components/ui/BackButton";
import YoutubeEmbed from "@/components/ui/YoutubeEmbed";
import { Carousel } from "@material-tailwind/react";
import { getServiceAds } from "@/firebase/firestore/advertisements";
import { getYt } from "@/firebase/firestore/servicesyt";
import { subscribeToServicesAndProducts } from "@/firebase/firestore/servicesProducts";
import ServiceCard from "@/components/ui/ServiceCard";
function Services() {
  const [ads, setAds] = useState([]);
  const [link, setLink] = useState();
  const [data, setData] = useState(null);
  useEffect(() => {
    const unsubscribe = subscribeToServicesAndProducts(
      setData,
      null,
      null,
      "services"
    );
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const fetch = async () => {
      const ads = await getServiceAds("services", null, null, null, null);

      setAds(ads);

      const link = await getYt("services", null, null, null);
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
          {data &&
            data.map((item) => (
              <ServiceCard
                name={item.id}
                url={item.iconUrl}
                slug={`/services/${item.id}`}
              />
            ))}
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
