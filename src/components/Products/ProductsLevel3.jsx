"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Link from "next/link";
import BackButton from "@/components/ui/BackButton";
import { MdLocalPhone } from "react-icons/md";
import YoutubeEmbed from "@/components/ui/YoutubeEmbed";
import Advertisement from "@/components/ui/Advertisement";
import { getYt } from "@/firebase/firestore/servicesyt";
import { getServiceAds } from "@/firebase/firestore/advertisements";
import { subscribeToServiceAndProductDocs } from "@/firebase/firestore/servicesProducts";
import { getName } from "@/firebase/firestore/servicesProducts";

function ProductsLevel3({ id, secondid, thirdid }) {
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
      "products"
    );
    const fetch = async () => {
      const capitalized = await getName(
        id,
        secondid,
        thirdid,
        "products"
      );
      setCapitalized(capitalized);
      const link = await getYt(
        "products",
        id,
        secondid,
        thirdid
      );
      setLink(link);
      const ads = await getServiceAds(
        "products",
        id,
        secondid,
        thirdid,
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
              href={`/products/${id}/${secondid}/${thirdid}/${item.id}`}
              key={item.id}
              className="flex justify-norm items-center border-b border-grey pb-10 px-0 mb-5 mx-0"
            >
              <img
                src={item.profile}
                alt="Profile"
                height={100}
                width={100}
                className="rounded-lg ml-4"
              />
              <div className="flex flex-col justify-between items-start ml-10">
                <h1 className="font-bold text-xl">{item.name}</h1>
                <p className="font-medium text-lg my-2 mb-4">
                  ₹{item.price}
                </p>
                <div className="flex items-center bg-[#D9D9D9] rounded-full pr-6">
                  <div className="bg-kaavi rounded-full text-white p-1 mr-4">
                    <MdLocalPhone fontSize={20} />
                  </div>
                  <p className="font-medium text-[#454545]">
                    +91 {item.mobile.slice(0, 2)} ********
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
      <YoutubeEmbed embedId={link} />
      <Footer />
    </div>
  );
}

export default ProductsLevel3;
