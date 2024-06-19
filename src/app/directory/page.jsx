"use client";
import React, { useState } from "react";
import BackButton from "@/components/ui/BackButton";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import { IoSearch } from "react-icons/io5";

function Directory() {
  const [isGOactive, setGOactive] = useState(true);
  const [isPMactive, setPMactive] = useState(false);
  const [isOactive, setOactive] = useState(false);

  const handleGOclick = () => {
    setGOactive(true);
    setPMactive(false);
    setOactive(false);
  };

  const handlePMclick = () => {
    setGOactive(false);
    setPMactive(true);
    setOactive(false);
  };

  const handleOclick = () => {
    setGOactive(false);
    setPMactive(false);
    setOactive(true);
  };

  const governmentofficials = [
    {
      name: "Person 1",
      photo: "/sample1.jpg",
      designation: "Post Office Head",
    },
    {
      name: "Person 2",
      photo: "/sample1.jpg",
      designation: "Post Office Head",
    },
    {
      name: "Person 3",
      photo: "/sample1.jpg",
      designation: "Post Office Head",
    },
  ];

  const partymembers = [
    {
      name: "Person 1",
      photo: "/sample1.jpg",
      designation: "Post Office Head",
    },
    {
      name: "Person 2",
      photo: "/sample1.jpg",
      designation: "Post Office Head",
    },
    {
      name: "Person 3",
      photo: "/sample1.jpg",
      designation: "Post Office Head",
    },
  ];
  const others = [
    {
      name: "Person 1",
      photo: "/sample1.jpg",
      designation: "Post Office Head",
    },
    {
      name: "Person 2",
      photo: "/sample1.jpg",
      designation: "Post Office Head",
    },
    {
      name: "Person 3",
      photo: "/sample1.jpg",
      designation: "Post Office Head",
    },
  ];
  return (
    <div>
      <Header />

      <BackButton route="/" />
      <div className="p-6">
        <h1 className="font-koulen text-4xl text-grey">Telephone directory</h1>
        <div className="flex my-6 bg-white rounded-xl items-center shadow-[100px_100px_80px_rgba(0,0,0,0.08)] p-3">
          <IoSearch fontSize={25} className="text-kaavi" />
          <input
            type="text"
            placeholder="Search for your city"
            className="bg-inherit ml-5 text-lg"
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={handleGOclick}
            className={`border rounded-xl p-1 text-sm font-medium border-grey  mr-2 text-center ${
              isGOactive
                ? "text-white bg-kaavi border-none"
                : "text-black bg-inherit"
            }`}
          >
            <p>Government Officials</p>
          </button>
          <button
            onClick={handlePMclick}
            className={`border rounded-xl p-1 text-sm font-medium border-grey  mr-2 text-center ${
              isPMactive
                ? "text-white bg-kaavi border-none"
                : "text-black bg-inherit"
            }`}
          >
            <p>Party members</p>
          </button>
          <button
            onClick={handleOclick}
            className={`border rounded-xl p-1 text-sm font-medium border-grey text-center ${
              isOactive
                ? "text-white bg-kaavi border-none"
                : "text-black bg-inherit"
            }`}
          >
            <p>Others</p>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Directory;
