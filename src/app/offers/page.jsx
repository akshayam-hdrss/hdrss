"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/ui/Header";
import BackButton from "@/components/ui/BackButton";
import { getOffers } from "@/firebase/firestore/offers";

export default function Page() {
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const data = await getOffers();
      setOffers(data);
    };
    fetch();
  }, []);
  return (
    <div>
      <Header />
      <main>
        <BackButton />
        <div className="px-8">
          <h1 className="font-koulen text-grey text-3xl">REWARD COUPONS</h1>
          <div className="grid gap-2 pt-5">
            {offers &&
              offers.map((doc, index) => (
                <div className="flex justify-center" key={index}>
                  <div
                    className="w-full h-40 bg-no-repeat bg-contain"
                    style={{ backgroundImage: `url(/coupon.png)` }}
                  >
                    <div className="grid grid-cols-2 h-full px-5 gap-5">
                      <h1 className="font-inter font-bold text-4xl text-kaavi uppercase my-auto mx-auto mt-12">
                        {doc.brand}
                      </h1>

                      <div className="flex justify-center items-center h-full">
                        <div className="">
                          <h1 className="font-semibold text-2xl">
                            {doc.percent}
                          </h1>
                          <h3>{doc.subText}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}
