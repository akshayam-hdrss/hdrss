"use client";
import React from "react";
import Link from "next/link";
import Slider from "react-slick";
import Marquee from "react-fast-marquee";
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
  var settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1.7,
    slidesToScroll: 1,
  };
  var settingsmd = {
    infinite: true,
    speed: 700,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1.7,
    slidesToScroll: 1,
  };
  return (
    <div>
    
      <div className="overflow-hidden max-h-screen grid relative">
      
        {/* <div className="md:hidden flex">
          <Slider {...settings}>
            {explorecontent.map((item, index) => (
              <div key={index} className="px-2 ">
                <div
                  className="border  border-[#808080] rounded-2xl relative overflow-hidden h-72 "
                  key={index}
                >
                  <div className="object-cover w-full h-[65%] rounded-2xl">
                    <img
                      src={`/${item}.jpg`}
                      alt="explore"
                      className=" h-full w-full object-cover rounded-t-2xl"
                    />
                  </div>

                  <div className="h-[35%] px-3 flex flex-col justify-center">
                    <div className="flex  justify-between">
                      <div className="">
                        <h2 className="font-bold text-2xl pb-3">{item}</h2>
                        <Link
                          href={`/explore/${item.toLowerCase()}`}
                          className="text-sm bg-kaavi text-white px-3 py-2 rounded-xl w-fit"
                        >
                          Learn more
                        </Link>
                      </div>
                      <div className=" border-[#acacac] border py-3 px-3 rounded-lg text-center">
                        <p className="font-bold text-lg">{day}</p>
                        <p className="font-medium text-xs">{monthName}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="hidden md:flex">
          <Slider {...settingsmd}>
            {explorecontent.map((item, index) => (
              <div key={index} className="px-2 relative z-[2] ">
                <div
                  className="border max-w-[300px] border-[#808080] rounded-2xl relative overflow-hidden h-72 "
                  key={index}
                >
                  <div className="object-cover w-full h-[65%] rounded-2xl">
                    <img
                      src={`/${item}.jpg`}
                      alt="explore"
                      className=" h-full w-full object-cover rounded-t-2xl"
                    />
                  </div>

                  <div className="h-[35%] px-3 flex flex-col justify-center">
                    <div className="flex  justify-between">
                      <div className="">
                        <h2 className="font-bold text-2xl pb-3">{item}</h2>
                        <Link
                          href={`/explore/${item.toLowerCase()}`}
                          className="text-sm bg-kaavi text-white px-3 py-2 rounded-xl w-fit"
                        >
                          Learn more
                        </Link>
                      </div>
                      <div className=" border-[#acacac] border py-3 px-3 rounded-lg text-center">
                        <p className="font-bold text-lg">{day}</p>
                        <p className="font-medium text-xs">{monthName}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div> */}
        <section className=" overflow-hidden w-full my-10 text-center py-5">
          <Marquee pauseOnClick pauseOnHover>
          {explorecontent.map((item, index) => (
              <div key={index} className="px-2 ">
                <div
                  className="border  min-w-[200px] lg:min-w-[300px] border-[#808080] rounded-2xl relative overflow-hidden h-72 "
                  key={index}
                >
                  <div className="object-cover w-full h-[65%] rounded-2xl">
                    <img
                      src={`/${item}.jpg`}
                      alt="explore"
                      className=" h-full w-full object-cover rounded-t-2xl"
                    />
                  </div>

                  <div className="h-[35%] px-3 flex flex-col justify-center">
                    <div className="flex  justify-between">
                      <div className="">
                        <h2 className="font-bold text-2xl pb-3">{item}</h2>
                        <Link
                          href={`/explore/${item.toLowerCase()}`}
                          className="text-sm bg-kaavi text-white px-3 py-[7px] rounded-md w-fit"
                        >
                          Learn more
                        </Link>
                      </div>
                      <div className=" border-[#acacac] border py-3 px-3 rounded-lg text-center">
                        <p className="font-bold text-lg">{day}</p>
                        <p className="font-medium text-xs">{monthName}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </section>
      </div>
    </div>
  );
}

export default ExploreCarousel;
