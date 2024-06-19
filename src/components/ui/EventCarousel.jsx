import Link from "next/link";
import React, { useEffect, useState } from "react";

function EventCarousel({ content }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === content?.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [content]);
  return (
    <div className="relative w-[75%] h-[24rem] overflow-hidden mx-auto mt-10">
      {content?.map((item, index) => (
        <div
          key={index}
          className="flex-col justify-between transition-transform duration-500 ease-in-out h-[24rem] rounded-2xl border-2 border-[#808080]"
          style={{ transform: `translateY(-${currentIndex * 100}%)` }}
        >
          <div className="h-[60%] w-full object-cover bg-[#808080] rounded-xl">
            <img
              src={item?.data?.pfp}
              alt={`Image ${index}`}
              className="h-full w-full object-cover rounded-t-2xl"
            />
          </div>
          <div className="h-full p-2">
            <p className="text-gray-800 text-sm font-medium text-left">
              {item.data.title.length > 80 ? item.data.title.substring(0, 80) : item.data.title}
            </p>
            <Link
              href="#"
              className="bg-kaavi text-white px-3 py-2 rounded-xl absolute bottom-4 right-8"
            >
              Know more
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EventCarousel;
