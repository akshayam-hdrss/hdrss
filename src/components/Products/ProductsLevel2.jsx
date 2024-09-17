"use client";
import React, { useState, useEffect } from "react";
import { getProductDocs } from "@/firebase/firestore/products";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import BackButton from "@/components/ui/BackButton";
import GalleryCarousel from "@/components/ui/GalleryCarousel";

function ProductsLevel2({ id, secondid }) {
  const [data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const res = await getProductDocs(id, secondid);
      setData(res);
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
            <div className="w-[130px] h-fit">
              <img
                src={data.profile}
                alt="profile"
                className="rounded-md object-cover aspect-[4/5]"
              />
            </div>
            <h1 className="font-bold text-3xl pt-6">{data.name}</h1>
            <p className="text-grey font-medium">₹{data.price}</p>
            <div className="my-4">
              <a
                href={`tel:${data.mobile}`}
                className="my-6 mr-2 font-medium bg-kaavi text-white rounded-lg p-3 px-4"
              >
                Contact
              </a>
            </div>
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

export default ProductsLevel2;
