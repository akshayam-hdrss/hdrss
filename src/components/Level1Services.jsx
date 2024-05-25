"use client";
import React from "react";
import { useState, useEffect } from "react";
import { subscribeToServices } from "@/firebase/firestore/getData";
import ServiceCard from "./ServiceCard";

function Level1Services() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const unsubscribe = subscribeToServices(setData);
    return () => unsubscribe();
  }, []);
  return (
    <>
      {data &&
        data.map((item) => (
          <ServiceCard name={item.id} url={item.iconUrl} slug={`/${item.id}`} />
        ))}
    </>
  );
}

export default Level1Services;
