import React, { useEffect, useState } from "react";
import { getDaily } from "../../firebase/firestore/daily";
import Slider from "react-slick";
import YoutubeEmbed from "@/components/ui/YoutubeEmbed";
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
    <div className="py-6 px-4 overflow-hidden">
      <h1 className="font-koulen text-grey text-4xl mb-4">Day's Special</h1>
      <div>
        <Slider {...settings}>
          {daily &&
            daily.map((doc, index) => (
              <div key={index}>
                <YoutubeEmbed embedId={doc.data.link} />
                <div className="grid grid-cols-3 pt-5">
                <h1 className="text-lg col-span-2 font-bold ">
                  {doc.data.title}
                </h1>
                <div className="">
                <h1 className="py-2 px-3 rounded-xl h-fit w-fit bg-kaavi text-white">Read More</h1>
                </div>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
}

export default Daily;
