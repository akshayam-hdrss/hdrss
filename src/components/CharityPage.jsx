"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/ui/Header";
import BackButton from "@/components/ui/BackButton";
import Footer from "@/components/ui/Footer";
import { getCharities } from "@/firebase/firestore/charity";
import YoutubeEmbed from "./ui/YoutubeEmbed";
function CharityPage() {
  const [data, setData] = useState();
  const handleUPIPayment = (amount) => {
    const upiId = "charity@upi"; // Replace with your charity's UPI ID
    const name = "Charity Name"; // Replace with your charity's name
    const url = `upi://pay?pa=${upiId}&pn=${name}&am=${amount}&cu=INR`;

    // Redirect to UPI payment
    window.location.href = url;
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await getCharities();
      setData(res);
    };
    fetch();
  });

  return (
    <div>
      <Header />
      <BackButton />
      {data &&
        data.map((charity, index) => (
          <div key={index} className="p-6 lg:px-20 px-8">
            <img
              src={charity.data.background}
              alt=""
              className="w-full mx-auto max-w-[600px]"
            />
            <div className="mx-auto mt-[-80px]">
              <img
                src={charity.data.profile}
                alt=""
                className="w-[150px] rounded-full mx-auto"
              />
            </div>
            <div className="pt-5">
              <h1 className="font-semibold lg:text-3xl text-xl text-center">
                {charity.data.name}
              </h1>
              <h5 className="text-justify py-3">{charity.data.description}</h5>
            </div>
            <YoutubeEmbed embedId={charity.data.video} />
            <div className="pt-5">
              <h1>Choose amount</h1>
              <div className="grid gap-3 pt-5">
                <h1
                  onClick={() => handleUPIPayment(100)}
                  className={
                    "bg-gray-200 hover:bg-kaavi/20 rounded-md text-center py-1.5"
                  }
                >
                  100
                </h1>
                <h1
                  onClick={() => handleUPIPayment(200)}
                  className={
                    "bg-gray-200 hover:bg-kaavi/20 rounded-md text-center py-1.5"
                  }
                >
                  200
                </h1>

                <h1 className="bg-kaavi text-white rounded-md text-center py-2">
                  Donate
                </h1>
              </div>
            </div>
          </div>
        ))}

      <Footer />
    </div>
  );
}

export default CharityPage;
