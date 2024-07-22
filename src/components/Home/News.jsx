import React from "react";
import { useState, useEffect } from "react";
import { Carousel, IconButton } from "@material-tailwind/react";
import { getNews } from "@/firebase/firestore/news";
import YoutubeEmbed from "../ui/YoutubeEmbed";

function News() {
  const [news, setNews] = useState();
  useEffect(() => {
    const fetch = async () => {
      const data = await getNews();
      setNews(data);
    };
    fetch();
  }, []);
  return (
    <div className="px-0 md:px-5 pt-8 relative z-0">
      <h1 className="font-koulen text-4xl text-grey mb-4 px-6">News</h1>

      <Carousel
        className="h-[400px] md:h-fit"
        prevArrow={false}
        nextArrow={false}
        navigation={false}
        autoplay={true}
        loop
      >
        {news &&
          news.map((doc, index) => (
            <div key={index} className="relative h-full w-full">
              <div className="grid md:grid-cols-3 h-full w-full bg-kaavi/0">
                <div className="col-span-2 object-contain ">
                  <YoutubeEmbed embedId={doc.video} />
                </div>
                <div className="grid grid-cols-5 md:flex flex-col justify-between md:py-5 px-5 ">
                  <h1 className="md:hidden col-span-3 text-[15px] font-bold">
                    {doc.title.slice(0, 40)}...
                  </h1>
                  <h1 className="hidden md:flex col-span-3 text-[15px] font-bold">
                    {doc.title.slice(0, 80)}...
                  </h1>
                  <div className="md:flex col-span-2 justify-between items-center w-full">
                    <div className="md:flex hidden">
                      <h1 className="font-semibold">21-3-2004</h1>
                    </div>
                    <button className="text-center col-span-2 w-full mx-auto md:m-0 h-fit py-2 px-4 rounded-md bg-kaavi text-white ">
                     Read More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </Carousel>
    </div>
  );
}

export default News;
