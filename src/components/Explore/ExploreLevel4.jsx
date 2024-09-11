"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import BackButton from "@/components/ui/BackButton";
import { getServiceAndProductDocs } from "@/firebase/firestore/servicesProducts";
import YoutubeEmbed from "@/components/ui/YoutubeEmbed";

function ExploreLevel4({ id, secondid, thirdid, fourthid }) {
  const [data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const data = await getServiceAndProductDocs(
        id,
        secondid,
        thirdid,
        fourthid,
        "explore"
      );
      setData(data);
    };
    fetch();
  });
  return (
    <div>
      <Header />
      <BackButton />
      <h1 className="font-bold text-2xl pb-8 p-6">{data && data.date}</h1>
      <YoutubeEmbed embedId={data && data.video} />
      <p className="p-8 text-justify">{data && data.description}</p>
      <Footer />
    </div>
  );
}

export default ExploreLevel4;
