"use client";
import React from "react";
import { useState, useEffect } from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import BackButton from "@/components/ui/BackButton";
import YoutubeEmbed from "@/components/ui/YoutubeEmbed";
import { subscribeToExplore } from "@/firebase/firestore/getExplore";
import ServiceCard from "@/components/ui/ServiceCard";

function Products() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const unsubscribe = subscribeToExplore(setData);
    return () => unsubscribe();
  }, []);
  return (
    <div>
      <Header />
      <BackButton route="/" />
      <YoutubeEmbed href="#" />
      <div className="mt-12 p-6">
        <h1 className="font-koulen uppercase text-4xl text-grey">products</h1>
        <div className="grid grid-cols-3 gap-y-10 gap-x-10 mt-8">
          {data &&
            data.map((item) => (
              <ServiceCard
                name={item.id}
                url={item.iconUrl}
                slug={`/explore/${item.id}`}
              />
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Products;
