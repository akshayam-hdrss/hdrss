"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import YoutubeEmbed from "@/components/ui/YoutubeEmbed";
import BackButton from "@/components/ui/BackButton";
import Advertisement from "@/components/ui/Advertisement";
import { subscribeToServicesAndProducts } from "@/firebase/firestore/servicesProducts";
import { getName } from "@/firebase/firestore/servicesProducts";
import { getServiceAds } from "@/firebase/firestore/advertisements";
import { getYt } from "@/firebase/firestore/servicesyt";
import { IoIosArrowDown } from "react-icons/io";
import ProductsFilter from "@/components/Products/ProductsFilter";

function ProductsLevel1({ id }) {
  const [data, setData] = useState();
  const [ads, setAds] = useState();
  const [capitalized, setCapitalized] = useState();
  const [link, setLink] = useState();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [gender, setGender] = useState([]);
  const [size, setSize] = useState([]);
  const [price, setPrice] = useState([500, 1000]);
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
    <div className="overflow-hidden">
      <Header />
      <BackButton />
      <Advertisement ads={ads} />
      <div className="p-6 ">
        <h1 className="text-center font-bold text-2xl">{capitalized}</h1>
      </div>
      <div className="w-max flex gap-x-4 py-2 overflow-x-scroll nosc px-4">
        <ProductsFilter
          open={filtersOpen}
          setOpen={setFiltersOpen}
          price={price}
          setPrice={setPrice}
          data={data}
          setData={setData}
          id={id}
          size={size}
          setSize={setSize}
          gender={gender}
          setGender={setGender}
        />
        <div className="flex gap-x-2 border border-grey w-fit px-4 py-2 rounded-full items-center">
          <p className="font-medium">Pricing</p>
          <IoIosArrowDown />
        </div>
        <div className=" flex gap-x-2 border border-grey w-fit px-4 py-2 rounded-full items-center">
          <p className="font-medium ">Rating 4+</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4 mx-4 mt-10">
        {data &&
          data.map((doc, index) => (
            <div key={index}>
              <img
                src={doc.profile}
                alt="profile photo"
                className="h-[150px] w-[150px] rounded-md"
              />
              <div className="pt-4">
                <h1 className="font-medium text-lg">{doc.name}</h1>
                <p className="text-grey font-medium">₹{doc.price}</p>
                <div className="mt-4">
                  <a
                    href={`/products/${id}/${doc.id}`}
                    className="bg-kaavi text-white px-4 py-2 rounded-md"
                  >
                    View
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>
      <YoutubeEmbed embedId={link} />

      <Footer />
    </div>
  );
}

export default ProductsLevel1;
