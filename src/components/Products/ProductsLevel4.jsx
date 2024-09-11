"use client";
import React, { useState, useEffect } from "react";
import { getServiceAndProductDocs } from "@/firebase/firestore/servicesProducts";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import BackButton from "@/components/ui/BackButton";
import GalleryCarousel from "@/components/ui/GalleryCarousel";

function ProductsLevel4({ id, secondid, thirdid, fourthid }) {
  const [data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const data = await getServiceAndProductDocs(
        id,
        secondid,
        thirdid,
        fourthid,
        "products"
      );
      setData(data);
    };
    fetch();
  });
  return (
    <div>
      <Header />
      <BackButton />
      {data && (
        <div className="p-6">
          <div className="flex flex-col items-center justify-evenly py-6">
            <img src={data.profile} alt="profile" />
            <h1 className="font-bold text-3xl pt-6">{data.name}</h1>
            <p className="font-medium text-xl my-2">₹{data.price}</p>
            <a
              href={`tel:${data.mobile}`}
              className="mb-6 font-medium bg-kaavi text-white rounded-lg p-3 px-4"
            >
              Contact
            </a>
          </div>

          <h1 className="font-koulen text-3xl text-grey pb-4">About</h1>
          <p className="px-4 text-justify">{data.about}</p>
          <h1 className="font-koulen text-3xl pt-10 text-grey">Gallery</h1>
          {data.photos && <GalleryCarousel data={data.photos} />}
          <h1 className="font-koulen text-3xl pt-10 text-grey">Reviews</h1>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default ProductsLevel4;
