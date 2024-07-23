import React, { useEffect, useState } from "react";
import { getDaily } from "../../firebase/firestore/daily";
import Slider from "react-slick";
import YoutubeEmbed from "@/components/ui/YoutubeEmbed";
import Image from "next/image";
function Daily() {
  const [daily, setDaily] = useState();
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  useEffect(() => {
    const fetch = async () => {
      const data = await getDaily();
      setDaily(data);
    };
    fetch();
  }, []);
  return (
    <div className="py-6 px-4 overflow-hidden relative">
      <div className="">
        <Image
          src="/om.svg"
          alt="om"
          width={300}
          height={300}
          className="rotate-45 opacity-[0.04] absolute right-7 -top-4 -z-10"
        ></Image>
        <h1 className="font-koulen text-grey text-4xl mb-4">Day's Special</h1>
        <div>
          <Slider {...settings}>
            {daily &&
              daily.map((doc, index) => (
                <div key={index} className="relative">
                  <div className="grid md:grid-cols-7">
                  <div className="col-span-4 w-full object-contain max-h-[500px]">
                    <YoutubeEmbed embedId={doc.data.link} />
                  </div>
                  <div className="col-span-3 grid grid-cols-3 md:flex flex-col justify-between w-full pt-5 md:p-5 gap-2">
                    <h1 className="text-[15px] col-span-2 font-bold text-justify ">
                      {doc.data.title.slice(0,80)}..
                    </h1>
                    <div className="flex justify-end">
                      <h1 className="py-1 px-3 rounded-md h-fit w-fit bg-kaavi text-white">
                        Read More
                      </h1>
                    </div>
                  </div>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Daily;
