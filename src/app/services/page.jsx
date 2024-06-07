"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Carousel } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import Level1Services from "@/components/Level1Services";
import BackButton from "@/components/BackButton";

function Services() {
  const [isEventActive, setIsEventActive] = useState(true);
  const handleArchiveClick = () => {
    setIsEventActive(false);
  };
  const handleEventClick = () => {
    setIsEventActive(true);
  };
  return (
    <div>
      <Header />
      <BackButton route="/" />
      <Carousel
        autoplay="true"
        loop="true"
        className="rounded-xl h-52 w-[95%] z-10 mt-8 mx-auto"
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        <img
          src="/advertisement.jpg"
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
          alt="image 3"
          className="h-full w-full object-cover"
        />
      </Carousel>

      <div className="mt-12 p-6">
        <h1 className="font-koulen uppercase text-4xl text-grey">services</h1>
        <div className="grid grid-cols-3 gap-y-10 gap-x-10 mt-8">
          <Level1Services />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Services;
