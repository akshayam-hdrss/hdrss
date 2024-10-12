"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
const explorecontent = [
  "Library",
  "Astrology",
  "History",
  "Yathra",
  "Ayurveda",
];
function ExploreCarousel() {
  const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const today = new Date();
  const year = today.getFullYear();
  const monthIndex = today.getMonth();
  const monthName = months[monthIndex];
  const day = String(today.getDate()).padStart(2, "0");
  const date = `${day} ${monthName} ${year}`;

  return (
    <div>
      <div className="overflow-hidden max-h-screen grid relative">
        <div className="flex gap-5 overflow-x-scroll p-5 nosc ">
          {explorecontent.map((item, index) => (
            <div key={index} className="px-2 ">
              <div
                className="border  min-w-[200px] lg:min-w-[300px] border-[#808080] rounded-2xl relative overflow-hidden h-72 "
                key={index}
              >
                <div className="object-cover w-full h-[65%] rounded-2xl">
                  <Image
                    height={100}
                    width={100}
                    src={`/${item}.jpg`}
                    alt="explore"
                    className=" h-full w-full object-cover rounded-t-2xl"
                  />
                </div>

                <div className="h-[35%] px-3 flex flex-col justify-center">
                  <div className="flex flex-row gap-x-4 justify-between">
                    <div className="w-fit">
                      <h2 className="font-bold text-2xl pb-3">{item}</h2>
                      <Link
                        href={`/explore/${item.toLowerCase()}`}
                        className="text-sm bg-kaavi text-white px-3 py-[7px] rounded-md w-fit"
                      >
                        Learn more
                      </Link>
                    </div>
                    <div className=" border-[#acacac] border py-3 px-3 rounded-lg text-center w-fit">
                      <p className="font-bold text-lg">{day}</p>
                      <p className="font-medium text-xs">{monthName}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExploreCarousel;
