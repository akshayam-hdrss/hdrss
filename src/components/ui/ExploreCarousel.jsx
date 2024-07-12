"use client";
import React from "react";
import { useRef, useEffect } from "react";
import { register } from "swiper/element/bundle";
register();
import Link from "next/link";
const explorecontent = [
  "Library",
  "Astrology",
  "History",
  "Yathra",
  "Ayurveda",
];
function ExploreCarousel() {
  const swiperElRef = useRef(null);

  useEffect(() => {
    // listen for Swiper events using addEventListener
    swiperElRef.current.addEventListener("swiperprogress", (e) => {
      const [swiper, progress] = e.detail;
    });

    swiperElRef.current.addEventListener("swiperslidechange", (e) => {});
  }, [explorecontent]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = new Date();
  const year = today.getFullYear();
  const monthIndex = today.getMonth();
  const monthName = months[monthIndex];
  const day = String(today.getDate()).padStart(2, "0");
  const date = `${day} ${monthName} ${year}`;

  return (
    <div>
      <swiper-container
        slides-per-view="1.7"
        slides-per-group="1"
        space-between="0"
        grab-cursor="true"
        autoplay="false"
        lazy="true"
        ref={swiperElRef}
      >
        {explorecontent.map((item, index) => (
          <swiper-slide>
            <div
              className="border border-[#808080] m-1 rounded-2xl relative overflow-hidden h-80"
              key={index}
            >
              <div className="object-cover w-full h-[60%] rounded-2xl">
                <img
                  src={`/${item}.jpg`}
                  alt="explore"
                  className=" h-full w-full object-cover rounded-t-2xl"
                />
              </div>

              <div className="h-[40%] px-3 py-2">
                <h2 className="font-bold text-2xl">{item}</h2>
                <Link
                  href={`/explore/${item.toLowerCase()}`}
                  className="text-sm bg-kaavi text-white px-3 py-2 rounded-xl mt-4"
                >
                  Learn more
                </Link>
                <div className="absolute top-[65%] right-3 border-[#acacac] border py-3 px-3 rounded-lg text-center">
                  <p className="font-bold text-lg">{day}</p>
                  <p className="font-medium text-xs">{monthName}</p>
                </div>
              </div>
            </div>
          </swiper-slide>
        ))}
      </swiper-container>
    </div>
  );
}

export default ExploreCarousel;
