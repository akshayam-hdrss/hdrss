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
    <div className="py-6 px-4">
      <h1 className="font-koulen text-grey text-4xl mb-4">Day's Special</h1>
      <div>
        <Slider {...settings}>
          {daily &&
            daily.map((doc, index) => (
              <div key={index}>
                <YoutubeEmbed embedId={doc.data.link} />
                <h1 className="text-lg font-bold px-4 mt-6">
                  {doc.data.title}
                </h1>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
}

export default Daily;
