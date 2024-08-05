"use client";
import React from "react";
import { useState, useEffect } from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import BackButton from "@/components/ui/BackButton";
import YoutubeEmbed from "@/components/ui/YoutubeEmbed";
import { subscribeToServicesAndProducts } from "@/firebase/firestore/servicesProducts";
import ServiceCard from "@/components/ui/ServiceCard";
import Navbar from "@/components/Navbar";

function Products() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const unsubscribe = subscribeToServicesAndProducts(
      setData,
      null,
      null,
      "products"
    );
    return () => unsubscribe();
  }, []);
  return (
    <div>
      <div className="fixed w-full top-0 z-[50]">
        <Header />
      </div>
      <div className="grid lg:grid-cols-4">
        <Navbar />
        <div className="col-span-3">
          <BackButton />
          <YoutubeEmbed href="#" />
          <div className="mt-12 p-6">
            <h1 className="font-koulen uppercase text-4xl text-grey">
              products
            </h1>
            <div className="grid grid-cols-3 gap-y-10 gap-x-10 mt-8">
              {data &&
                data.map((item) => (
                  <ServiceCard
                    name={item.id}
                    url={item.iconUrl}
                  
                    slug={`/products/${item.id}`}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Products;
